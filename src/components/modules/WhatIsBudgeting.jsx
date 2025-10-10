import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './ModuleDetail.css'; // Use the new shared CSS file

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
          <h2>Why It Matters</h2>
          <p>
            Just like Priya, many of us have "leaks" in our finances that we don't notice. A budget helps you plug those leaks and direct your money towards what truly matters to you.
          </p>
          <div className="key-takeaways">
            <h2>Key Takeaways</h2>
            <ul>
              <li>A budget is a plan that gives you control over your money.</li>
              <li>It helps you identify and reduce unnecessary spending.</li>
              <li>Budgeting is the first and most crucial step toward achieving any financial goal.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WhatIsBudgeting;