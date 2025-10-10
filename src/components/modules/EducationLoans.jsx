import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './ModuleDetail.css'; // Use the same shared CSS

const EducationLoans = ({ onBack }) => {
  return (
    <div className="module-container">
      <div className="back-button-wrapper">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft className="back-button-icon" />
          <span>Back to Learn</span>
        </button>
      </div>

      <header className="module-header">
        <h1 className="module-title">Understanding Education Loans</h1>
        <p className="module-intro">
          Investing in your greatest asset—yourself—with a little help.
        </p>
      </header>

      <div className="module-content">
        <section className="module-section">
          <h2>What is an Education Loan?</h2>
          <p>
            An education loan is a sum of money borrowed from a bank or financial institution to finance higher education expenses. These loans can cover tuition fees, accommodation, books, and other related costs. It's a form of "good debt" because it's an investment in your future earning potential.
          </p>
          
        </section>

        <section className="module-section">
          <h2>Key Concepts to Understand</h2>
          <div className="story-block">
            <p>
              Think of it like a business plan. A company borrows money to build a factory that will make profits later. Similarly, you borrow money for an education that will increase your skills and salary potential in the future.
            </p>
            <br/>
            <p>
             There are a few key terms:
              <ul>
                <li><strong>Principal:</strong> The initial amount you borrow.</li>
                <li><strong>Interest Rate:</strong> The percentage the bank charges you for borrowing the money.</li>
                <li><strong>Moratorium Period:</strong> A "grace period" after you finish your course (usually 6-12 months) before you have to start making payments. Interest, however, often still accumulates during this time.</li>
                <li><strong>EMI (Equated Monthly Instalment):</strong> The fixed monthly payment you make to the bank to repay the loan.</li>
              </ul>
            </p>
          </div>
        </section>

        <section className="module-section">
          <h2>Is It the Right Choice?</h2>
          <p>
            An education loan can be a fantastic tool if used wisely. It allows you to access quality education you might not otherwise afford. However, it's crucial to understand the terms and have a clear plan for repayment. Always research the potential salary for your chosen field to ensure the loan is a manageable investment.
          </p>
          <div className="key-takeaways">
            <h2>Key Takeaways</h2>
            <ul>
              <li>An education loan is an investment in your future earning capacity.</li>
              <li>Understand all the terms, especially the interest rate and moratorium period.</li>
              <li>Always borrow responsibly and have a clear repayment strategy.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EducationLoans;