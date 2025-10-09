import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import axios from 'axios';
import OpenAI from 'openai';

// Initialize Firebase Admin
admin.initializeApp();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// NewsAPI configuration
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// Firestore collection reference
const NEWS_COLLECTION = 'financial_news';

// Interface for news article
interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

// Interface for summarized news
interface SummarizedNews {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  category: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  createdAt: string;
}

// Function to fetch financial news from NewsAPI
async function fetchFinancialNews(): Promise<NewsArticle[]> {
  try {
    const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
      params: {
        q: 'finance OR stocks OR cryptocurrency OR economy OR banking',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 20,
        apiKey: NEWS_API_KEY,
      },
    });

    return response.data.articles || [];
  } catch (error) {
    console.error('Error fetching news from NewsAPI:', error);
    throw new HttpsError('internal', 'Failed to fetch news');
  }
}

// Function to summarize news article using OpenAI
async function summarizeNewsArticle(article: NewsArticle): Promise<string> {
  try {
    const prompt = `
Summarize the following financial news article in 2-3 sentences, focusing on key financial implications and market impact:

Title: ${article.title}
Description: ${article.description || 'No description available'}
Content: ${article.content || 'No content available'}

Summary:`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a financial news summarizer. Provide concise, accurate summaries focusing on market implications.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 150,
      temperature: 0.3,
    });

    return completion.choices[0]?.message?.content?.trim() || 'Summary not available';
  } catch (error) {
    console.error('Error summarizing article:', error);
    return 'Summary not available due to processing error';
  }
}

// Function to analyze sentiment
async function analyzeSentiment(text: string): Promise<'positive' | 'negative' | 'neutral'> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Analyze the sentiment of the following financial news text. Respond with only: positive, negative, or neutral.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      max_tokens: 10,
      temperature: 0.1,
    });

    const sentiment = completion.choices[0]?.message?.content?.trim().toLowerCase();
    return sentiment === 'positive' || sentiment === 'negative' ? sentiment : 'neutral';
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    return 'neutral';
  }
}

// Cloud Function to fetch and process news
export const fetchAndSummarizeNews = onCall(
  {
    timeoutSeconds: 540, // 9 minutes
    memory: '1GiB',
  },
  async (request) => {
    try {
      // Fetch news articles
      const articles = await fetchFinancialNews();

      // Process each article
      const summarizedNews: SummarizedNews[] = [];

      for (const article of articles) {
        // Skip articles without essential data
        if (!article.title || !article.url) continue;

        // Create summary
        const summary = await summarizeNewsArticle(article);

        // Analyze sentiment
        const sentiment = await analyzeSentiment(summary);

        // Determine category
        const category = determineCategory(article.title + ' ' + (article.description || ''));

        // Create summarized news object
        const newsItem: SummarizedNews = {
          id: generateNewsId(article),
          title: article.title,
          summary,
          source: article.source.name,
          url: article.url,
          publishedAt: article.publishedAt,
          category,
          sentiment,
          createdAt: new Date().toISOString(),
        };

        summarizedNews.push(newsItem);
      }

      // Store in Firestore
      const batch = admin.firestore().batch();
      summarizedNews.forEach((news) => {
        const docRef = admin.firestore().collection(NEWS_COLLECTION).doc(news.id);
        batch.set(docRef, news);
      });

      await batch.commit();

      return {
        success: true,
        message: `Processed ${summarizedNews.length} news articles`,
        count: summarizedNews.length,
      };
    } catch (error) {
      console.error('Error in fetchAndSummarizeNews:', error);
      throw new HttpsError('internal', 'Failed to process news');
    }
  });

// Scheduled function to run every 6 hours
export const scheduledNewsUpdate = onSchedule(
  '0 */6 * * *', // Every 6 hours
  async (event) => {
    try {
      console.log('Running scheduled news update...');

      // Fetch news articles
      const articles = await fetchFinancialNews();

      // Process each article
      const summarizedNews: SummarizedNews[] = [];

      for (const article of articles) {
        if (!article.title || !article.url) continue;

        const summary = await summarizeNewsArticle(article);
        const sentiment = await analyzeSentiment(summary);
        const category = determineCategory(article.title + ' ' + (article.description || ''));

        const newsItem: SummarizedNews = {
          id: generateNewsId(article),
          title: article.title,
          summary,
          source: article.source.name,
          url: article.url,
          publishedAt: article.publishedAt,
          category,
          sentiment,
          createdAt: new Date().toISOString(),
        };

        summarizedNews.push(newsItem);
      }

      // Store in Firestore
      const batch = admin.firestore().batch();
      summarizedNews.forEach((news) => {
        const docRef = admin.firestore().collection(NEWS_COLLECTION).doc(news.id);
        batch.set(docRef, news);
      });

      await batch.commit();

      console.log(`Scheduled update completed. Processed ${summarizedNews.length} articles.`);
      return;
    } catch (error) {
      console.error('Error in scheduled news update:', error);
      throw error;
    }
  });

// HTTP endpoint to get latest news
export const getLatestNews = onRequest(async (req, res) => {
  try {
    // Enable CORS
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    // Get latest 10 news items
    const snapshot = await admin
      .firestore()
      .collection(NEWS_COLLECTION)
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();

    const news = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error('Error getting latest news:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch news',
    });
  }
});

// Helper function to determine news category
function determineCategory(text: string): string {
  const lowerText = text.toLowerCase();

  if (lowerText.includes('crypto') || lowerText.includes('bitcoin') || lowerText.includes('ethereum')) {
    return 'Cryptocurrency';
  } else if (lowerText.includes('stock') || lowerText.includes('shares') || lowerText.includes('market')) {
    return 'Stocks';
  } else if (lowerText.includes('bank') || lowerText.includes('fed') || lowerText.includes('interest rate')) {
    return 'Banking';
  } else if (lowerText.includes('economy') || lowerText.includes('gdp') || lowerText.includes('inflation')) {
    return 'Economy';
  } else {
    return 'General Finance';
  }
}

// Helper function to generate unique news ID
function generateNewsId(article: NewsArticle): string {
  const date = new Date(article.publishedAt).getTime();
  const titleHash = article.title.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 20);
  return `${date}_${titleHash}`;
}
