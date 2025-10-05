import React from 'react';
import './Hero.css';

const Hero = ({ toggleAuthPage }) => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-headline">
            From Student Debt to Financial Freedom
          </h1>
          <p className="hero-subheadline">
            With over ₹90,000 crore in education loans and a national financial
            literacy rate of only 27%, India's youth face significant challenges. 
            RupeeRoute offers a simple, step-by-step guide to help you manage debt, 
            invest wisely, and build a secure financial future.
          </p>
          <button className="hero-cta-button" onClick={toggleAuthPage}>
            Start Your Journey
          </button>
        </div>
        <div className="hero-image-container">
          <img 
            src="/assets/finance_illustration.svg" 
            alt="Financial Planning Illustration" 
            className="hero-image" 
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;