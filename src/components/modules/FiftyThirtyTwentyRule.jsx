import React from 'react';
import { FaArrowLeft, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import './PlanDetail.css';

// 1. Change prop from `setCurrentPage` to `onBack`
const FiftyThirtyTwentyRule = ({ onBack }) => {
  return (
    <div className="plan-detail-container">
      <div className="back-button-wrapper">
        {/* 2. Update the onClick handler and button text */}
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft />
        </button>
      </div>

      {/* ...rest of the component is unchanged... */}
      <header className="plan-header-accent">
        <h1 className="plan-title">The 50/30/20 Budgeting Rule</h1>
        <p className="plan-subtitle">A simple, percentage-based approach to managing your money effectively.</p>
      </header>
      <div className="plan-content">
        <section className="plan-section">
          <h2>What is the 50/30/20 Rule?</h2>
          <p>
            The 50/30/20 rule is a popular budgeting guideline that provides a simple framework for allocating your after-tax income. Instead of tracking every single transaction, it divides your money into three main categories, making it easy to see where your money should go.
          </p>
          [Image of a 50/30/20 budget rule pie chart]
        </section>
        <section className="plan-section">
          <h2>The Breakdown</h2>
          <div className="breakdown-cards">
            <div className="info-card info-card-needs">
              <h3>50% for Needs</h3>
              <p>This half of your income should cover all your absolute essentials. These are the expenses you must pay to live, such as rent/mortgage, utilities, groceries, insurance, and transportation.</p>
            </div>
            <div className="info-card info-card-wants">
              <h3>30% for Wants</h3>
              <p>This portion is for your lifestyle choices—things that make life more enjoyable but aren't essential. This includes dining out, hobbies, entertainment, vacations, and subscription services.</p>
            </div>
            <div className="info-card info-card-savings">
              <h3>20% for Savings & Debt</h3>
              <p>The final 20% is for your future self. It should be directed towards financial goals like building an emergency fund, investing for retirement, saving for a down payment, or paying off high-interest debt.</p>
            </div>
          </div>
        </section>
        <section className="plan-section">
            <h2>How to Get Started</h2>
            <div className="steps-container">
                <div className="step-item"><p><b>Calculate Your After-Tax Income:</b> Start with the net amount you receive in your bank account each month.</p></div>
                <div className="step-item"><p><b>Categorize Your Spending:</b> Review your last 2-3 months of bank statements and categorize every expense into "Needs," "Wants," or "Savings/Debt."</p></div>
                <div className="step-item"><p><b>Analyze and Adjust:</b> Compare your actual spending to the 50/30/20 targets. If your "Needs" take up 70%, you may need to find ways to reduce them or cut back significantly on "Wants."</p></div>
            </div>
        </section>
        <section className="plan-section">
          <h2>Pros & Cons</h2>
          <div className="pros-cons-grid">
            <div className="pros-card">
              <h3><FaThumbsUp /> Pros</h3>
              <ul>
                <li><strong>Simple & Easy:</strong> Doesn't require complex spreadsheets or tracking every rupee.</li>
                <li><strong>Flexible:</strong> Gives you freedom to spend within broad categories.</li>
                <li><strong>Balanced:</strong> Ensures you're saving for the future while still enjoying the present.</li>
              </ul>
            </div>
            <div className="cons-card">
              <h3><FaThumbsDown /> Cons</h3>
              <ul>
                <li><strong>Not One-Size-Fits-All:</strong> May not work well for those with very low incomes or very high debt.</li>
                <li><strong>Vague Categories:</strong> The line between a "need" and a "want" can sometimes be blurry.</li>
                <li><strong>Can Neglect Debt:</strong> May not be aggressive enough for paying down large amounts of high-interest debt.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FiftyThirtyTwentyRule;