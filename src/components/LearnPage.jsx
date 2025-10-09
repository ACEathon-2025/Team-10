import React from 'react';
import { FaUniversity, FaChartLine, FaPiggyBank, FaIdCard, FaSeedling, FaArrowLeft } from 'react-icons/fa';
import Button from './Button';
import './LearnPage.css';

// The data for our learning modules
const modules = [
  {
    icon: <FaUniversity />,
    title: "Manage Education Loans",
    description: "Learn strategies to handle your biggest financial worry and avoid the debt trap.",
    page: 'education-loans'
  },
  {
    icon: <FaIdCard />,
    title: "Understand CIBIL Score",
    description: "Discover what a CIBIL score is and how it impacts your financial future.",
    page: 'cibil-score'
  },
  {
    icon: <FaChartLine />,
    title: "Start a SIP",
    description: "Explore how Systematic Investment Plans can help you grow your money over time.",
    page: 'start-sip'
  },
  {
    icon: <FaSeedling />,
    title: "Basics of Stock Market",
    description: "Get a risk-free introduction to investing on the NSE/BSE with virtual money.",
    page: 'stock-basics'
  },
  {
    icon: <FaPiggyBank />,
    title: "Plan for Retirement",
    description: "It's never too early. Learn how compound interest can secure your long-term future.",
    page: 'retirement-planning'
  }
];

const LearnPage = ({ setCurrentPage }) => {
  const handleModuleClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="learn-page">
      <div className="learn-header">
        <h1>Start Your Learning Journey</h1>
        <p>Select a module to begin building your financial knowledge.</p>
      </div>
      <div className="modules-grid">
        {modules.map((module, index) => (
          <div className="module-card" key={index} onClick={() => handleModuleClick(module.page)}>
            <div className="module-icon">{module.icon}</div>
            <h3 className="module-title">{module.title}</h3>
            <p className="module-description">{module.description}</p>
            <Button
              variant="primary"
              size="small"
              onClick={() => handleModuleClick(module.page)}
              className="module-button"
            >
              Start Learning
            </Button>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        size="medium"
        onClick={() => setCurrentPage('home')}
        className="back-button"
      >
        <FaArrowLeft /> Back to Home
      </Button>
    </div>
  );
};

export default LearnPage;