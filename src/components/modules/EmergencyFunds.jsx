import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './ModuleDetail.css';
import Quiz from './Quiz';

const quizQuestions = [
    {
      question: "What is the primary purpose of an emergency fund?",
      options: ["To invest in the stock market", "To pay for a planned vacation", "To cover unexpected, urgent expenses", "To buy a new car"],
      correctAnswer: "To cover unexpected, urgent expenses"
    },
    {
      question: "How much should you ideally save in an emergency fund?",
      options: ["1 month of income", "1 month of expenses", "3-6 months of essential living expenses", "Enough to buy a new phone"],
      correctAnswer: "3-6 months of essential living expenses"
    }
];

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
          <h2>Where to Keep Your Fund</h2>
          <p>
            Your emergency fund needs to be **liquid**, meaning you can access it quickly and easily. However, it shouldn't be *too* easy to access, or you might be tempted to spend it on non-emergencies. The best place is a **High-Yield Savings Account** that is separate from your primary checking account. This way, the money is safe, earning a little interest, and requires a conscious effort to transfer and use.
          </p>
        </section>
        
        <section className="module-section quiz-section">
          <h2>Test Your Knowledge</h2>
          <Quiz questions={quizQuestions} />
        </section>
      </div>
    </div>
  );
};

export default EmergencyFunds;