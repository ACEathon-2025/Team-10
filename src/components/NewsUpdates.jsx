import React, { useState, useEffect } from 'react';
import './NewsUpdates.css';

const NewsUpdates = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories for filtering
  const categories = ['All', 'Stocks', 'Cryptocurrency', 'Banking', 'Economy', 'General Finance'];

  // Fetch news from our Vercel API
  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call our local API endpoint
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
  }, []);

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