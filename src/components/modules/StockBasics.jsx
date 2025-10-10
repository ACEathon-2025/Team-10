import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './ModuleDetail.css';
import Quiz from './Quiz';

const quizQuestions = [
    {
      question: "What does buying a stock or share represent?",
      options: ["Loaning money to a company", "A tiny piece of ownership in a company", "A guaranteed profit", "A job at the company"],
      correctAnswer: "A tiny piece of ownership in a company"
    },
    {
      question: "According to the story, when does the value of your stock increase?",
      options: ["When you sell it", "Every month, automatically", "When the company you own a piece of becomes more successful and valuable", "Only when the stock market is going up"],
      correctAnswer: "When the company you own a piece of becomes more successful and valuable"
    }
];

const StockBasics = ({ onBack }) => {
  return (
    <div className="module-container">
      <div className="back-button-wrapper">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft className="back-button-icon" />
          <span>Back to Learn</span>
        </button>
      </div>

      <header className="module-header">
        <h1 className="module-title">Stock Market Basics</h1>
        <p className="module-intro">
          Understanding how you can own a tiny piece of your favorite companies.
        </p>
      </header>

      <div className="module-content">
        <section className="module-section">
          <h2>What is a Stock?</h2>
          <p>
            A stock (also called a share or equity) is a certificate that represents a tiny piece of ownership in a company. When you buy a stock of a company like Reliance or TCS, you become a part-owner of that business. If the company does well and its value grows, the value of your piece of ownership (your stock) also grows.
          </p>
          
        </section>

        <section className="module-section">
          <h2>A Story: The Neighborhood Bakery</h2>
          <div className="story-block">
            <p>
              Imagine your favorite local bakery is so popular it wants to expand. The owner needs ₹1,00,000 to open a new shop. She decides to divide the ownership of her bakery into 1,000 tiny pieces (shares) and sell each piece for ₹100.
            </p>
            <br/>
            <p>
              You believe in her bakery, so you buy 10 shares for ₹1,000. You are now a part-owner! As Warren Buffett, a famous investor, says in <em>"The Intelligent Investor"</em>, you shouldn't just buy a stock, you should buy a business you understand.
            </p>
            <br/>
            <p>
              The new shop is a huge success, and the bakery's total value doubles. Now, each of your 10 shares is worth ₹200. You didn't bake a single cake, but your investment grew because you owned a piece of a successful business. That is the fundamental idea of the stock market.
            </p>
          </div>
        </section>

        <section className="module-section">
            <h2>Risk vs. Reward</h2>
            <p>
                While owning stocks offers the potential for high growth, it also comes with risk. If the bakery in our story had failed, the value of your shares could have dropped to zero. This is why it's important not to put all your money into one single stock. **Diversification**, or spreading your money across many different companies and industries (often through mutual funds), is a key strategy to manage this risk.
            </p>
        </section>
        
        <section className="module-section quiz-section">
          <h2>Test Your Knowledge</h2>
          <Quiz questions={quizQuestions} />
        </section>
      </div>
    </div>
  );
};

export default StockBasics;