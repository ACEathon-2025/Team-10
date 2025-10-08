import React, { useState } from 'react';
import { FaUniversity, FaChartLine, FaPiggyBank, FaIdCard, FaSeedling } from 'react-icons/fa';
import './LearnPage.css';
import ModuleViewer from './ModuleViewer';
import { learningModules } from '../data/learningModules';

// The data for our learning modules
const modules = [
  {
    icon: <FaUniversity />,
    title: "Manage Education Loans",
    description: "Learn strategies to handle your biggest financial worry and avoid the debt trap.",
    key: 'educationLoan'
  },
  {
    icon: <FaIdCard />,
    title: "Understand CIBIL Score",
    description: "Discover what a CIBIL score is and how it impacts your financial future.",
    key: 'cibilScore'
  },
  {
    icon: <FaChartLine />,
    title: "Start a SIP",
    description: "Explore how Systematic Investment Plans can help you grow your money over time.",
    key: 'sipBasics'
  },
  {
    icon: <FaSeedling />,
    title: "Basics of Stock Market",
    description: "Get a risk-free introduction to investing on the NSE/BSE with virtual money.",
    key: 'stockBasics'
  },
  {
    icon: <FaPiggyBank />,
    title: "Plan for Retirement",
    description: "It's never too early. Learn how compound interest can secure your long-term future.",
    key: 'retirementPlanning'
  }
];

const LearnPage = ({ setCurrentPage }) => {
  const [activeModuleKey, setActiveModuleKey] = useState(null);

  return (
    <div className="learn-page">
      <div className="learn-header stagger-item">
        <h1>Start Your Learning Journey</h1>
        <p>Select a module to begin building your financial knowledge.</p>
      </div>
      <div className="modules-grid">
        {modules.map((module, index) => (
          <div className="module-card stagger-item" key={index} style={{ animationDelay: `${0.1 * (index + 2)}s` }}>
            <div className="module-icon">{module.icon}</div>
            <h3 className="module-title">{module.title}</h3>
            <p className="module-description">{module.description}</p>
            <button className="module-button" onClick={() => setActiveModuleKey(module.key)}>Start Learning</button>
          </div>
        ))}
      </div>
      <button className="back-button stagger-item" onClick={() => setCurrentPage('home')} style={{ animationDelay: '0.8s' }}>
        &larr; Back to Home
      </button>

      {activeModuleKey && (
        <div className="mv-overlay">
          <div className="mv-overlay-backdrop" onClick={() => setActiveModuleKey(null)} />
          <div className="mv-overlay-content">
            <ModuleViewer
              moduleKey={activeModuleKey}
              moduleData={learningModules}
              onExit={() => setActiveModuleKey(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnPage;