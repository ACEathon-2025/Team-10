import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './ModuleDetail.css';
import Quiz from './Quiz';

const quizQuestions = [
    {
      question: "What is the main benefit of a savings account?",
      options: ["High-risk, high-return investments", "It's a safe place to keep money and earn interest", "It allows you to spend money easily", "It's used for buying stocks"],
      correctAnswer: "It's a safe place to keep money and earn interest"
    },
    {
      question: "What is compound interest?",
      options: ["Interest that is simple to calculate", "Interest earned only on your initial deposit", "Interest earned on both your initial deposit and the interest it has already earned", "A type of loan"],
      correctAnswer: "Interest earned on both your initial deposit and the interest it has already earned"
    }
];

const SavingsAccounts = ({ onBack }) => {
  return (
    <div className="module-container">
      <div className="back-button-wrapper">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft className="back-button-icon" />
          <span>Back to Learn</span>
        </button>
      </div>

      <header className="module-header">
        <h1 className="module-title">Intro to Savings Accounts</h1>
        <p className="module-intro">
          Your money's first safe home, where it can rest and even grow a little.
        </p>
      </header>

      <div className="module-content">
        <section className="module-section">
          <h2>What is a Savings Account?</h2>
          <p>
            A savings account is one of the safest places to keep your money. It's a special account at a bank designed to hold money you don't plan to spend right away. In return for keeping your money with them, the bank pays you a small amount called **interest**.
          </p>
          
        </section>

        <section className="module-section">
          <h2>A Story: The Magic Money Tree</h2>
          <div className="story-block">
            <p>
              Imagine two friends, <strong>Arjun</strong> and <strong>Ben</strong>. Both were given a "magic seed" (₹1,000) from a book called <em>"The Psychology of Money"</em>. The book said, "Plant this seed in the 'Bank Garden' (a savings account), and it will grow."
            </p>
            <br/>
            <p>
              Arjun planted his seed immediately. After a year, his seed had sprouted a tiny leaf (it earned interest and became ₹1,040). The next year, both the seed and the new leaf earned interest together. Ben, however, kept his seed in a drawer for five years before planting it.
            </p>
            <br/>
            <p>
              Years later, Arjun's "money tree" was noticeably bigger than Ben's. Even though they started with the same seed, Arjun's had more time to grow on its own growth. This is called **compound interest**—your money starts earning money, and then your money's earnings start earning their own money. The most important ingredient is **time**.
            </p>
          </div>
        </section>

        <section className="module-section">
          <h2>Types of Savings Accounts</h2>
          <p>
            While a basic savings account is great, banks in India also offer variations. A **High-Yield Savings Account** offers a better interest rate than a standard one, making it ideal for your emergency fund. Some banks also offer accounts for specific goals, like for children's education or for senior citizens.
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

export default SavingsAccounts;