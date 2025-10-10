import React from 'react';
import { FaArrowLeft, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import './PlanDetail.css';

// 1. Change prop from `setCurrentPage` to `onBack`
const ZeroBasedBudgeting = ({ onBack }) => {
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
        <h1 className="plan-title">Zero-Based Budgeting</h1>
        <p className="plan-subtitle">Take full control of your finances by giving every rupee a specific job.</p>
      </header>
      <div className="plan-content">
        <section className="plan-section">
            <h2>The Core Principle</h2>
            <p>
                Zero-based budgeting is a method where you create a budget for each new month from scratch. The goal is to make your total income minus your total expenses (including savings and debt payments) equal exactly zero. This ensures that every rupee of your income is intentionally allocated, leaving no room for mindless spending.
            </p>
            
        </section>
        <section className="plan-section">
            <h2>How to Create Your First Zero-Based Budget</h2>
            <div className="steps-container">
                <div className="step-item"><p><b>Know Your Income:</b> Calculate your total expected income for the upcoming month. If your income is variable, use a conservative estimate.</p></div>
                <div className="step-item"><p><b>List All Expenses:</b> Write down every single expense you anticipate for the month. Start with fixed costs (rent, utilities) and then move to variable costs (groceries, fuel) and discretionary spending (entertainment).</p></div>
                <div className="step-item"><p><b>Include Financial Goals:</b> Don't forget to list your savings, investments, and extra debt payments as "expenses." You are "paying" your future self.</p></div>
                <div className="step-item"><p><b>Do the Math:</b> Subtract your total planned expenses from your total income. If the result isn't zero, adjust your variable/discretionary categories until it is. If you have money left over, assign it to a goal!</p></div>
                <div className="step-item"><p><b>Track and Repeat:</b> Track your spending throughout the month to stay on budget. Repeat this process every single month.</p></div>
            </div>
        </section>
        <section className="plan-section">
          <h2>Pros & Cons</h2>
          <div className="pros-cons-grid">
            <div className="pros-card">
              <h3><FaThumbsUp /> Pros</h3>
              <ul>
                <li><strong>Complete Control:</strong> You know exactly where every rupee is going.</li>
                <li><strong>Promotes Mindfulness:</strong> Forces you to be intentional with your spending and saving.</li>
                <li><strong>Optimizes Spending:</strong> Helps identify and eliminate wasteful spending quickly.</li>
              </ul>
            </div>
            <div className="cons-card">
              <h3><FaThumbsDown /> Cons</h3>
              <ul>
                <li><strong>Time-Consuming:</strong> Can be tedious to create a new budget from scratch every month.</li>
                <li><strong>Can Be Rigid:</strong> May not feel flexible enough for unexpected expenses if not planned for.</li>
                <li><strong>Requires Diligence:</strong> You must be committed to tracking your expenses closely.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ZeroBasedBudgeting;