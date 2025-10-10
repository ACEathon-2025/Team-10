import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './ModuleDetail.css'; // Use the same shared CSS

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
          <h2>Popular Options in India</h2>
          <p>
            Tools like the PPF and NPS are powerful because they are long-term, government-backed schemes that offer tax benefits and the magic of compounding. Setting up automatic deductions into these accounts is the easiest way to ensure you are consistently preparing for your future.
          </p>
          <div className="key-takeaways">
            <h2>Key Takeaways</h2>
            <ul>
              <li>Start planning for retirement as early as possible.</li>
              <li>"Pay Yourself First" by automating your savings and investments.</li>
              <li>Utilize long-term tools like PPF and NPS for disciplined growth.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RetirementPlanning;