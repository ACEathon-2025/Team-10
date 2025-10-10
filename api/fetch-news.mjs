import axios from 'axios';

// Initialize OpenAI only if API key is available
let openai = null;
if (process.env.OPENAI_API_KEY) {
  const OpenAI = (await import('openai')).default;
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// NewsAPI configuration
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// Function to fetch financial news from NewsAPI
async function fetchFinancialNews() {
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
    throw new Error('Failed to fetch news');
  }
}

// Function to summarize news article using OpenAI (optional)
async function summarizeNewsArticle(article) {
  // If OpenAI is not available, use description as summary
  if (!openai) {
    return article.description || article.title || 'No summary available';
  }

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

    return completion.choices[0]?.message?.content?.trim() || article.description || 'Summary not available';
  } catch (error) {
    console.error('Error summarizing article:', error);
    return article.description || article.title || 'Summary not available due to processing error';
  }
}

// Function to analyze sentiment (optional OpenAI)
async function analyzeSentiment(text) {
  // If OpenAI is not available, return neutral sentiment
  if (!openai) {
    return 'neutral';
  }

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

// Helper function to determine news category
function determineCategory(text) {
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
function generateNewsId(article) {
  const date = new Date(article.publishedAt).getTime();
  const titleHash = article.title.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 20);
  return `${date}_${titleHash}`;
}

async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch news articles
    const articles = await fetchFinancialNews();

    // Process each article
    const summarizedNews = [];

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
      const newsItem = {
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

    // For now, return the data directly (we'll add Supabase storage later)
    res.status(200).json({
      success: true,
      message: `Processed ${summarizedNews.length} news articles`,
      data: summarizedNews,
      count: summarizedNews.length,
    });

  } catch (error) {
    console.error('Error in news processing:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process news',
    });
  }
}

export default handler;