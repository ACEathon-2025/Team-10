import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './NewsUpdates.css';

const NewsUpdates = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories for filtering
  const categories = ['All', 'Stocks', 'Cryptocurrency', 'Banking', 'Economy', 'General Finance'];

  // Mock data for when API is not available
  const mockNews = useMemo(() => [
    {
      id: 1,
      title: "RBI Announces New Digital Currency Framework",
      description: "The Reserve Bank of India unveiled a comprehensive framework for central bank digital currency implementation, aiming to enhance financial inclusion and payment efficiency.",
      content: "The RBI's framework outlines the technical, legal, and operational aspects of introducing a digital rupee, which could revolutionize India's payment landscape.",
      source: "Economic Times",
      publishedAt: new Date().toISOString(),
      category: "Banking",
      url: "#"
    },
    {
      id: 2,
      title: "Stock Market Rally Continues Amid Economic Recovery",
      description: "Indian stock indices hit new highs as investors remain optimistic about the country's economic recovery and corporate earnings growth.",
      content: "The Nifty 50 and Sensex both closed at record levels, driven by strong performance in IT and banking sectors.",
      source: "Business Standard",
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      category: "Stocks",
      url: "#"
    },
    {
      id: 3,
      title: "Cryptocurrency Regulations Expected Soon",
      description: "Government officials indicate that comprehensive cryptocurrency regulations will be announced in the upcoming budget session.",
      content: "The new regulations are expected to provide clarity on taxation, licensing, and consumer protection in the crypto space.",
      source: "Financial Express",
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      category: "Cryptocurrency",
      url: "#"
    },
    {
      id: 4,
      title: "Inflation Rate Shows Signs of Stabilization",
      description: "Latest data indicates that inflation has stabilized at manageable levels, providing room for monetary policy adjustments.",
      content: "The Consumer Price Index showed a reading of 4.8%, down from previous month's 5.2%, signaling cooling inflationary pressures.",
      source: "Mint",
      publishedAt: new Date(Date.now() - 259200000).toISOString(),
      category: "Economy",
      url: "#"
    },
    {
      id: 5,
      title: "Digital Banking Adoption Reaches New Milestone",
      description: "Over 60% of banking transactions now happen digitally, marking a significant shift in consumer behavior.",
      content: "The increase in digital adoption has been driven by improved internet penetration and user-friendly mobile banking apps.",
      source: "Hindu BusinessLine",
      publishedAt: new Date(Date.now() - 345600000).toISOString(),
      category: "Banking",
      url: "#"
    }
  ], []);

  // Fetch news from our Vercel API
  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to call our local API endpoint
      const response = await fetch('http://localhost:3001/api/fetch-news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = await response.json();

      if (data.success) {
        setNews(data.data);
      } else {
        throw new Error(data.error || 'Failed to fetch news');
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      // Fallback to mock data if API is not available
      console.log('Using mock data as fallback');
      setNews(mockNews);
      setError(null); // Clear error since we're using mock data
    } finally {
      setLoading(false);
    }
  }, [mockNews]);

  // Filter news by category
  const filteredNews = selectedCategory === 'All'
    ? news
    : news.filter(item => item.category === selectedCategory);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get sentiment color
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return '#10b981'; // green
      case 'negative': return '#ef4444'; // red
      default: return '#6b7280'; // gray
    }
  };

  useEffect(() => {
    fetchNews();

    // Set up polling every 5 minutes for real-time updates
    const interval = setInterval(fetchNews, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchNews]);

  if (loading && news.length === 0) {
    return (
      <div className="news-updates">
        <div className="news-header">
          <h2>Financial News Updates</h2>
        </div>
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading latest financial news...</p>
        </div>
      </div>
    );
  }

  if (error && news.length === 0) {
    return (
      <div className="news-updates">
        <div className="news-header">
          <h2>Financial News Updates</h2>
        </div>
        <div className="error">
          <p>Unable to load news updates. Please try again later.</p>
          <button onClick={fetchNews} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="news-updates">
      <div className="news-header">
        <h2>Financial News Updates</h2>
        <div className="news-controls">
          <div className="category-filter">
            <label htmlFor="category-select">Filter by category:</label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <button onClick={fetchNews} className="refresh-btn" disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      <div className="news-stats">
        <span className="news-count">
          Showing {filteredNews.length} of {news.length} articles
        </span>
        {loading && <span className="updating">Updating...</span>}
      </div>

      <div className="news-list">
        {filteredNews.length === 0 ? (
          <div className="no-news">
            <p>No news articles found for the selected category.</p>
          </div>
        ) : (
          filteredNews.map((item) => (
            <div key={item.id} className="news-item">
              <div className="news-item-header">
                <div className="news-meta">
                  <span className="news-source">{item.source}</span>
                  <span className="news-date">{formatDate(item.publishedAt)}</span>
                  <span
                    className="news-category"
                    style={{ backgroundColor: getSentimentColor(item.sentiment) }}
                  >
                    {item.category}
                  </span>
                </div>
                <div className="news-sentiment">
                  <span
                    className="sentiment-indicator"
                    style={{ backgroundColor: getSentimentColor(item.sentiment) }}
                  >
                    {item.sentiment.toUpperCase()}
                  </span>
                </div>
              </div>

              <h3 className="news-title">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </h3>

              <p className="news-summary">{item.summary}</p>

              <div className="news-actions">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more-btn"
                >
                  Read Full Article
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsUpdates;