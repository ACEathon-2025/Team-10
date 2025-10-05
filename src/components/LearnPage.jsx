import React from 'react';
import { FaUniversity, FaChartLine, FaPiggyBank, FaIdCard, FaSeedling } from 'react-icons/fa';
import './LearnPage.css';

// The data for our learning modules
const modules = [
  {
    icon: <FaUniversity />,
    title: "Manage Education Loans",
    description: "Learn strategies to handle your biggest financial worry and avoid the debt trap."
  },
  {
    icon: <FaIdCard />,
    title: "Understand CIBIL Score",
    description: "Discover what a CIBIL score is and how it impacts your financial future."
  },
  {
    icon: <FaChartLine />,
    title: "Start a SIP",
    description: "Explore how Systematic Investment Plans can help you grow your money over time."
  },
  {
    icon: <FaSeedling />,
    title: "Basics of Stock Market",
    description: "Get a risk-free introduction to investing on the NSE/BSE with virtual money."
  },
  {
    icon: <FaPiggyBank />,
    title: "Plan for Retirement",
    description: "It's never too early. Learn how compound interest can secure your long-term future."
  }
];

const LearnPage = ({ setCurrentPage }) => {
  return (
    <div className="learn-page">
      <div className="learn-header">
        <h1>Start Your Learning Journey</h1>
        <p>Select a module to begin building your financial knowledge.</p>
      </div>
      <div className="modules-grid">
        {modules.map((module, index) => (
          <div className="module-card" key={index}>
            <div className="module-icon">{module.icon}</div>
            <h3 className="module-title">{module.title}</h3>
            <p className="module-description">{module.description}</p>
            <button className="module-button">Start Learning</button>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={() => setCurrentPage('home')}>
        &larr; Back to Home
      </button>
    </div>
  );
};

export default LearnPage;