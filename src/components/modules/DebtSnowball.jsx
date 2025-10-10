import React from 'react';
import { FaArrowLeft, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import './PlanDetail.css';

// 1. Change prop from `setCurrentPage` to `onBack`
const DebtSnowball = ({ onBack }) => {
  return (
    <div className="plan-detail-container">
      <div className="back-button-wrapper">
        {/* 2. Update the onClick handler and button text */}
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft className="back-button-icon" />
          <span>Back to Plans</span>
        </button>
      </div>

      {/* ...rest of the component is unchanged... */}
      <header className="plan-header-accent">
        <h1 className="plan-title">The Debt Snowball Method</h1>
        <p className="plan-subtitle">A powerful strategy focused on motivation to help you become debt-free.</p>
      </header>
      <div className="plan-content">
        <section className="plan-section">
            <h2>What is the Debt Snowball?</h2>
            <p>
                The Debt Snowball method is a debt-reduction strategy that focuses on building momentum through psychological wins. Instead of prioritizing debts by interest rate, you tackle them from the smallest balance to the largest. As you pay off each small debt, you gain confidence and "roll" that payment into the next one, creating an unstoppable snowball of debt repayment.
            </p>
            
        </section>
        <section className="plan-section">
            <h2>How It Works: Step-by-Step</h2>
            <div className="steps-container">
                <div className="step-item"><p><b>List Your Debts:</b> Write down all your debts (excluding your mortgage) from the smallest balance to the largest.</p></div>
                <div className="step-item"><p><b>Focus on the Smallest:</b> Make minimum payments on all your debts except for the one with the smallest balance.</p></div>
                <div className="step-item"><p><b>Attack It:</b> Throw every extra rupee you can find at that smallest debt until it's gone. Sell things, pick up extra hours—get intense!</p></div>
                <div className="step-item"><p><b>Roll It Up:</b> Once the smallest debt is paid off, take its payment amount and add it to the minimum payment of the next-smallest debt.</p></div>
                <div className="step-item"><p><b>Repeat:</b> Continue this process, rolling each freed-up payment into the next debt until you're completely debt-free.</p></div>
            </div>
        </section>
        <section className="plan-section">
          <h2>Pros & Cons</h2>
          <div className="pros-cons-grid">
            <div className="pros-card">
              <h3><FaThumbsUp /> Pros</h3>
              <ul>
                <li><strong>Highly Motivating:</strong> Quick wins from paying off small debts provide powerful psychological boosts.</li>
                <li><strong>Builds Habits:</strong> Creates positive momentum and reinforces good financial behavior.</li>
                <li><strong>Simple to Follow:</strong> The plan is clear and easy to implement without complex calculations.</li>
              </ul>
            </div>
            <div className="cons-card">
              <h3><FaThumbsDown /> Cons</h3>
              <ul>
                <li><strong>Mathematically Inefficient:</strong> By ignoring interest rates, you may pay more in total interest over time compared to the Debt Avalanche method.</li>
                <li><strong>Requires Discipline:</strong> You must commit to rolling the payments over rather than spending the extra cash.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DebtSnowball;