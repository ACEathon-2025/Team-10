import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './ModuleDetail.css'; // Use the same shared CSS

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
          <h2>Why You Need One</h2>
          <p>
            A savings account is the perfect place for your short-term goals, like saving for a new phone, a vacation, or building your emergency fund. It keeps your money safe and separate from your daily spending money.
          </p>
          <div className="key-takeaways">
            <h2>Key Takeaways</h2>
            <ul>
              <li>A savings account is a safe place to store money for your goals.</li>
              <li>It pays you interest, which helps your money grow over time.</li>
              <li>It's the ideal starting point for anyone beginning their financial journey.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SavingsAccounts;