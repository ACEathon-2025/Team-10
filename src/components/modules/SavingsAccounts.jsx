import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './ModuleStyles.css';
import QuizComponent from './QuizComponent';

const SavingsAccounts = ({ onBack }) => {
  return (
    <div className="module-page">
      <div className="module-header">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft />
        </button>
        <h1>Intro to Savings Accounts</h1>
      </div>

      <div className="module-content">
        <section className="module-section">
          <p className="module-intro">
            Your money's first safe home, where it can rest and even grow a little.
          </p>
        </section>
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
          <QuizComponent topic="savings-accounts" />
        </section>
      </div>
    </div>
  );
};

export default SavingsAccounts;