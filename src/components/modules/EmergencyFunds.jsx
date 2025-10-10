import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './ModuleDetail.css'; // Use the same shared CSS

const EmergencyFunds = ({ onBack }) => {
  return (
    <div className="module-container">
      <div className="back-button-wrapper">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft className="back-button-icon" />
          <span>Back to Learn</span>
        </button>
      </div>

      <header className="module-header">
        <h1 className="module-title">Emergency Funds 101</h1>
        <p className="module-intro">
          Your personal financial superhero that protects you when life throws a curveball.
        </p>
      </header>

      <div className="module-content">
        <section className="module-section">
          <h2>What is an Emergency Fund?</h2>
          <p>
            An emergency fund is a stash of money set aside specifically for unexpected life events. Think of it as a financial safety net. It's not for planned purchases like a vacation; it's for true emergencies like a sudden job loss, an unexpected medical bill, or an urgent car repair.
          </p>
          
        </section>

        <section className="module-section">
          <h2>A Story: The Unexpected Rainy Day</h2>
          <div className="story-block">
            <p>
              <strong>Rohan</strong> and <strong>Sameer</strong> both worked at the same company and earned the same salary. Rohan had read in a book, <em>"I Will Teach You to Be Rich,"</em> that you must "save for a rainy day before you start investing." He diligently saved up three months' worth of his living expenses in a separate savings account. Sameer thought it was boring and invested all his extra money in stocks.
            </p>
            <br/>
            <p>
              One day, their company unexpectedly had to downsize, and both lost their jobs. Sameer panicked. The stock market was down, and selling his investments would mean losing a lot of money. He had to take a high-interest personal loan just to pay his rent.
            </p>
            <br/>
            <p>
              Rohan, while disappointed about his job, was calm. His emergency fund covered his expenses while he searched for a new job. He didn't have to go into debt or sell his investments at a loss. His fund acted as a buffer, turning a major crisis into a manageable inconvenience.
            </p>
          </div>
        </section>

        <section className="module-section">
          <h2>How Much Should You Save?</h2>
          <p>
            A good rule of thumb is to save **3 to 6 months' worth of essential living expenses**. This includes things like rent, utilities, food, and transportation. Keep this money in a high-yield savings account where it's easily accessible but separate from your normal bank account.
          </p>
          <div className="key-takeaways">
            <h2>Key Takeaways</h2>
            <ul>
              <li>An emergency fund is for true, unexpected emergencies only.</li>
              <li>Aim to save 3-6 months of essential living expenses.</li>
              <li>It provides peace of mind and prevents you from going into debt during a crisis.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmergencyFunds;