import React from 'react';
import './Hero.css';

const Hero = ({ user, onNavigateToLearn, toggleAuthPage, setCurrentPage }) => {
  return (
    <>
      {/* Main Hero Section */}
      <section className="hero-section">
        <div className="hero-content-wrapper">
          {/* Left Side: Text Content */}
          <div className="hero-text-content">
            <h1 className="hero-headline">
              From Student Debt to Financial Freedom
            </h1>
            <p className="hero-subheadline">
              With over ₹90,000 crore in education loans and a national financial
              literacy rate of only 27%, India's youth face significant challenges.
              RupeeRoute offers a simple, step-by-step guide to help you manage debt,
              invest wisely, and build a secure financial future.
            </p>
            <div className="hero-buttons">
              <button
                className="hero-primary-button"
                onClick={() => user ? onNavigateToLearn('learn') : toggleAuthPage()}
              >
                {user ? 'Start Your Journey' : 'Get Started for Free'}
              </button>
            </div>
          </div>
          {/* Right Side: Image */}
          <div className="hero-image-container">
            <img
              src="/assets/finance_illustration.svg"
              alt="Financial Planning Illustration"
              className="hero-image"
            />
          </div>
        </div>
      </section>

      {/* Features Section Below Hero */}
      <section className="features-section">
        <h2 className="features-title">Everything You Need, All in One Place</h2>
        <p className="features-subtitle">
          Whether you're starting your journey, planning for the future, or staying updated, we've got you covered.
        </p>
        <div className="features-grid">
          <div className="feature-card" onClick={() => onNavigateToLearn('learn')}>
            <img src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Library of books" className="feature-image" />
            <div className="feature-content">
              <h3>Learn the Fundamentals</h3>
              <p>Explore our curated modules, from basic budgeting to advanced investment strategies, all designed to be simple and engaging.</p>
            </div>
          </div>
          <div className="feature-card" onClick={() => setCurrentPage('plan')}>
            <img src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Financial planning on a desk" className="feature-image" />
            <div className="feature-content">
              <h3>Create a Financial Plan</h3>
              <p>Use our interactive tools to explore different financial strategies and build a personalized plan that works for you.</p>
            </div>
          </div>
          <div className="feature-card" onClick={() => onNavigateToLearn('news')}>
            <img src="https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Financial news on a tablet" className="feature-image" />
            <div className="feature-content">
              <h3>Stay Updated with News</h3>
              <p>Get the latest financial news and market updates to make informed decisions and stay ahead of the curve.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;

