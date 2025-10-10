import React from 'react';
import { 
  FaCalculator, 
  FaCreditCard, 
  FaUniversity, 
  FaPiggyBank, 
  FaSeedling, 
  FaChartLine, 
  FaUserShield, 
  FaLandmark 
} from 'react-icons/fa';
import './LearnPage.css'; // Import the new CSS

const learnModules = [
  // --- Basics ---
  {
    icon: <FaCalculator />,
    title: 'What is Budgeting?',
    description: 'Learn the fundamentals of creating a budget to manage your income and expenses effectively.',
    pageKey: 'what-is-budgeting' // Note: You will need to create this component
  },
  {
    icon: <FaCreditCard />,
    title: 'Understanding CIBIL Score',
    description: 'Discover what a CIBIL score is, why it\'s crucial for your financial health, and how to improve it.',
    pageKey: 'cibil-score'
  },
  {
    icon: <FaUniversity />,
    title: 'Intro to Savings Accounts',
    description: 'Explore the basics of savings accounts, interest rates, and why they are the first step to financial security.',
    pageKey: 'savings-accounts' // Note: You will need to create this component
  },
  {
    icon: <FaPiggyBank />,
    title: 'Emergency Funds 101',
    description: 'Understand the importance of building an emergency fund to protect yourself from unexpected financial shocks.',
    pageKey: 'emergency-funds' // Note: You will need to create this component
  },
  // --- Intermediate ---
  {
    icon: <FaSeedling />,
    title: 'Starting an SIP',
    description: 'A step-by-step guide to Systematic Investment Plans (SIPs) and how they help in disciplined wealth creation.',
    pageKey: 'start-sip'
  },
  {
    icon: <FaChartLine />,
    title: 'Stock Market Basics',
    description: 'Get introduced to the stock market. Learn about shares, indices, and the principles of investing.',
    pageKey: 'stock-basics'
  },
  // --- Advanced ---
  {
    icon: <FaUserShield />,
    title: 'Retirement Planning',
    description: 'Dive into long-term financial planning, exploring options like PPF and NPS to secure your future.',
    pageKey: 'retirement-planning'
  },
  {
    icon: <FaLandmark />,
    title: 'Understanding Education Loans',
    description: 'A comprehensive guide on how education loans work, eligibility, and the repayment process.',
    pageKey: 'education-loans'
  },
];

const LearnPage = ({ setCurrentPage }) => {
  return (
    <div className="learn-page-container">
      <header className="learn-header">
        <h1 className="learn-title">Start Your Financial Journey</h1>
        <p className="learn-subtitle">
          From the basics of budgeting to advanced investment strategies, select a topic below to begin learning.
        </p>
      </header>
      
      <div className="learn-grid">
        {learnModules.map((module) => (
          <div key={module.pageKey} className="learn-card">
            <div className="card-icon">{module.icon}</div>
            <h3 className="card-title">{module.title}</h3>
            <p className="card-description">{module.description}</p>
            <button 
              className="card-button" 
              onClick={() => setCurrentPage(module.pageKey)}
            >
              Start Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnPage;