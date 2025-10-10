import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './ModuleDetail.css';
import Quiz from './Quiz'; // Import Quiz component

const quizQuestions = [
  {
    question: "What is the primary purpose of a budget?",
    options: ["To stop you from spending money", "To give your money a plan and control", "To track your past mistakes", "To get a loan"],
    correctAnswer: "To give your money a plan and control"
  },
  {
    question: "In the story, what was Priya's 'money leak'?",
    options: ["Buying clothes", "Eating out for dinner", "Daily fancy coffees", "Subscribing to streaming services"],
    correctAnswer: "Daily fancy coffees"
  }
];

const WhatIsBudgeting = ({ onBack }) => {
  return (
    <div className="module-container">
      <div className="back-button-wrapper">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft className="back-button-icon" />
          <span>Back to Learn</span>
        </button>
      </div>

      <header className="module-header">
        <h1 className="module-title">What is Budgeting?</h1>
        <p className="module-intro">
          Think of it as giving your money a map, so it knows exactly where to go.
        </p>
      </header>

      <div className="module-content">
        <section className="module-section">
          <h2>Giving Your Money a Plan</h2>
          <p>
            At its core, a budget is simply a plan for your money. It's a way of telling your money what to do, instead of wondering where it all went at the end of the month. It's not about restriction; it's about control and freedom.
          </p>
          
          <p>
            By creating a budget, you are making conscious decisions about your spending and saving, which helps you achieve your financial goals much faster.
          </p>
        </section>

        <section className="module-section">
          <h2>A Story: Priya's Coffee Problem</h2>
          <div className="story-block">
            <p>
              Meet <strong>Priya</strong>, a young professional who loved her daily fancy coffee. She felt like she was earning a good salary but was always broke before her next paycheck. She had a dream of saving up for a solo trip but it felt impossible.
            </p>
            <br/>
            <p>
              One day, she read a line in the book <em>"The Richest Man in Babylon"</em> which said, <strong>"A part of all you earn is yours to keep."</strong> It struck her. She decided to track her spending for just one week. The culprit? Those delicious, but expensive, coffees were costing her over ₹4,000 a month! That was the money for her trip, disappearing one cup at a time.
            </p>
            <br/>
            <p>
              She didn't stop drinking coffee. Instead, she made a simple budget. She decided to enjoy the fancy coffee twice a week and make her own on other days. Just by giving that money a new "job"—the "Trip Fund"—she was able to save for her vacation without feeling deprived. <strong>That's the power of a budget.</strong>
            </p>
          </div>
        </section>
        
        <section className="module-section">
          <h2>Common Budgeting Pitfalls</h2>
          <p>
            Starting a budget is easy, but sticking to it can be tricky. Here are common mistakes to avoid:
          </p>
          <ul>
            <li><strong>Being Too Restrictive:</strong> A budget that leaves no room for fun is a budget you won't stick to. Be realistic and allocate some money for your wants.</li>
            <li><strong>Not Tracking Your Spending:</strong> A budget is useless if you don't know where your money is actually going. Use an app or a simple notebook to track your expenses.</li>
            <li><strong>Giving Up After One Mistake:</strong> You will overspend some months. That's okay! The key is to acknowledge it, adjust, and get back on track the next month.</li>
          </ul>
        </section>

        <section className="module-section quiz-section">
          <h2>Test Your Knowledge</h2>
          <Quiz questions={quizQuestions} />
        </section>
      </div>
    </div>
  );
};

export default WhatIsBudgeting;