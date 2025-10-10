import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './ModuleDetail.css';
import Quiz from './Quiz';

const quizQuestions = [
    {
      question: "What is the main idea of 'Paying Yourself First'?",
      options: ["Paying all your bills before saving", "Treating your savings and retirement contributions as a non-negotiable expense", "Spending your money on yourself first", "Buying things that make you happy"],
      correctAnswer: "Treating your savings and retirement contributions as a non-negotiable expense"
    },
    {
      question: "Why is it important to start retirement planning early?",
      options: ["Because you get tax benefits only when you are young", "To give your money more time to grow through the power of compounding", "Because it is illegal to start late", "To impress your friends"],
      correctAnswer: "To give your money more time to grow through the power of compounding"
    }
];

const RetirementPlanning = ({ onBack }) => {
  return (
    <div className="module-container">
      <div className="back-button-wrapper">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft className="back-button-icon" />
          <span>Back to Learn</span>
        </button>
      </div>

      <header className="module-header">
        <h1 className="module-title">Retirement Planning</h1>
        <p className="module-intro">
          Paying your future self first, so you can live comfortably later.
        </p>
      </header>

      <div className="module-content">
        <section className="module-section">
          <h2>What is Retirement Planning?</h2>
          <p>
            Retirement planning is the process of setting aside money today to have enough to live on when you no longer work. It involves figuring out how much money you'll need and creating a plan to get there through saving and investing over your working years. The earlier you start, the more powerful your money's growth will be.
          </p>
          
        </section>

        <section className="module-section">
          <h2>A Story: The Ant and the Grasshopper</h2>
          <div className="story-block">
            <p>
              This classic fable is the perfect analogy for retirement. The grasshopper spent his summer singing and playing, enjoying the present. The ant, however, worked hard to store food for the winter. The grasshopper laughed at the ant for not "living in the moment."
            </p>
            <br/>
            <p>
              When winter came, the grasshopper had no food and was freezing, while the ant was comfortable and well-fed. The moral, as explained in many finance books like David Bach's <em>"The Automatic Millionaire"</em>, is to "Pay Yourself First."
            </p>
            <br/>
            <p>
              Retirement planning is your way of being the ant. By automatically contributing to accounts like the Public Provident Fund (PPF) or the National Pension System (NPS) from every paycheck, you are storing up "food" for your future. It's a non-negotiable expense you pay to your future self.
            </p>
          </div>
        </section>

        <section className="module-section">
            <h2>The Enemy: Inflation</h2>
            <p>
                One of the biggest challenges in retirement planning is **inflation**. Inflation is the rate at which the general level of prices for goods and services is rising, and subsequently, purchasing power is falling. The ₹100 you have today will buy less stuff in 20 years. This is why simply saving money in a low-interest account is not enough for retirement. You must invest in assets that can grow faster than inflation, such as equity mutual funds.
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

export default RetirementPlanning;