import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './ModuleStyles.css';
import QuizComponent from './QuizComponent';

const EducationLoans = ({ onBack }) => {
  return (
    <div className="module-page">
      <div className="module-header">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft />
        </button>
        <h1>Understanding Education Loans</h1>
      </div>

      <div className="module-content">
        <section className="module-section">
          <p className="module-intro">
            Investing in your greatest asset—yourself—with a little help.
          </p>
        </section>
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
            <h2>Things to Consider Before Applying</h2>
            <p>
                An education loan is a serious commitment. Before you sign the papers, make sure you have considered the following:
            </p>
            <ul>
                <li><strong>Compare Interest Rates:</strong> Different banks offer different rates. Shop around to find the best deal. Public sector banks often have slightly lower rates.</li>
                <li><strong>Read the Fine Print:</strong> Understand the terms of the moratorium period. Does interest accumulate? Are there any processing fees or prepayment penalties?</li>
                <li><strong>Assess Future Income:</strong> Realistically evaluate the average starting salary for the field you are entering. Can you comfortably afford the EMI on that salary?</li>
            </ul>
        </section>
        
        <section className="module-section quiz-section">
          <h2>Test Your Knowledge</h2>
          <QuizComponent topic="education-loans" />
        </section>
      </div>
    </div>
  );
};

export default EducationLoans;