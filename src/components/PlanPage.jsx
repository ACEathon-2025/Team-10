import React from 'react';
import { FaPiggyBank, FaCreditCard, FaChartLine } from 'react-icons/fa';
import './PlanPage.css';

// Plan page component that works as a full page
const PlanPage = ({ setCurrentPage }) => {

  // Handle navigation to plan detail pages
  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="plan-page">
      <div className="plan-container">

        <div className="plan-header">
          <h2 className="plan-title">Financial Planning Scenarios</h2>
          <p className="plan-subtitle">
            Choose a scenario to learn how to finance your budget and achieve your goals.
          </p>
        </div>

        <div className="scenarios-grid">
          {/* Scenario 1: 50/30/20 Rule */}
          <div className="scenario-card">
            <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', color: '#10B981' }}>
              <FaPiggyBank />
            </div>
            <h3 className="card-title">The 50/30/20 Rule</h3>
            <p className="card-description">
              A simple budgeting framework. Allocate 50% of your income to Needs, 30% to Wants, and 20% to Savings & Debt Repayment. Ideal for beginners.
            </p>
            <button className="card-button" onClick={() => handleNavigation('plan-503020')}>
              Explore this Plan
            </button>
          </div>

          {/* Scenario 2: Debt Snowball Method */}
          <div className="scenario-card">
            <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}>
              <FaCreditCard />
            </div>
            <h3 className="card-title">Debt Snowball Method</h3>
            <p className="card-description">
              Tackle your debts by paying them off from smallest to largest, regardless of interest rate. Builds momentum and keeps you motivated.
            </p>
            <button className="card-button" onClick={() => handleNavigation('plan-debt-snowball')}>
              Explore this Plan
            </button>
          </div>

          {/* Scenario 3: Zero-Based Budgeting */}
          <div className="scenario-card">
            <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
              <FaChartLine />
            </div>
            <h3 className="card-title">Zero-Based Budgeting</h3>
            <p className="card-description">
              Assign every single dollar of your income a job. Your income minus your expenses equals zero. Perfect for detailed financial control.
            </p>
            <button className="card-button" onClick={() => handleNavigation('plan-zero-based-budgeting')}>
              Explore this Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanPage;