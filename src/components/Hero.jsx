import React from 'react';
import Button from './Button';
import './Hero.css';

const Hero = ({ toggleAuthPage, user, onNavigateToLearn }) => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-container">
        <div className="hero-content stagger-item">
          <h1 className="hero-headline">
            From Student Debt to Financial Freedom
          </h1>
          <p className="hero-subheadline">
            With over ₹90,000 crore in education loans and a national financial
            literacy rate of only 27%, India's youth face significant challenges. 
            RupeeRoute offers a simple, step-by-step guide to help you manage debt, 
            invest wisely, and build a secure financial future.
          </p>
          <Button
            variant="primary"
            size="large"
            onClick={() => {
              if (user) {
                // If user is logged in, navigate to learn page
                onNavigateToLearn('learn');
              } else {
                // If not logged in, show auth page
                toggleAuthPage();
              }
            }}
            className="hero-cta-button"
          >
            Start Your Journey
          </Button>
        </div>
        <div className="hero-image-container stagger-item" style={{ animationDelay: '0.2s' }}>
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