import React, { useState } from 'react';
import { FaArrowLeft, FaInfoCircle, FaChartPie, FaCheckCircle, FaCalculator } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { simulateCIBILScore } from '../../utils/finance';
import DynamicFAQ from './DynamicFAQ';
import QuizComponent from './QuizComponent';
import './ModuleStyles.css';

const CIBILScore = ({ setCurrentPage }) => {
  const [currentScore, setCurrentScore] = useState(650);
  const [utilization, setUtilization] = useState(40);
  const [missedPayments, setMissedPayments] = useState(0);
  const [newInquiries, setNewInquiries] = useState(1);
  const [creditAge, setCreditAge] = useState(24);

  const simulation = simulateCIBILScore(currentScore, utilization, missedPayments, newInquiries, creditAge);

  const factorsData = [
    { name: 'Payment History', value: 35, color: '#3498db' },
    { name: 'Credit Utilization', value: 30, color: '#e74c3c' },
    { name: 'Credit History Length', value: 15, color: '#2ecc71' },
    { name: 'New Credit', value: 10, color: '#f39c12' },
    { name: 'Credit Mix', value: 10, color: '#9b59b6' }
  ];

  const improvementTips = [
    "Pay all bills on time",
    "Keep credit utilization below 30%",
    "Avoid opening multiple new accounts",
    "Regularly check your credit report",
    "Maintain a good credit mix"
  ];

  return (
    <div className="module-page">
      <div className="module-header">
        <button className="back-button" onClick={() => setCurrentPage('learn')}>
          <FaArrowLeft />
        </button>
        <h1>Understand CIBIL Score</h1>
      </div>

      <div className="module-content">
        {/* Introduction */}
        <section className="module-section">
          <h2><FaInfoCircle /> What is a CIBIL Score?</h2>
          <p>Your CIBIL score is a three-digit number that lenders use to assess your creditworthiness. It ranges from 300 to 900, where higher scores indicate better credit health.</p>
          <div className="score-ranges">
            <div className="score-range poor">
              <span>300-499: Poor</span>
            </div>
            <div className="score-range fair">
              <span>500-649: Fair</span>
            </div>
            <div className="score-range good">
              <span>650-749: Good</span>
            </div>
            <div className="score-range excellent">
              <span>750-900: Excellent</span>
            </div>
          </div>
        </section>

        {/* Factors */}
        <section className="module-section">
          <h2><FaChartPie /> What Affects Your CIBIL Score?</h2>
          <div className="factors-content">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={factorsData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {factorsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="factors-list">
              <div className="factor-item">
                <h3>Payment History (35%)</h3>
                <p>Making payments on time is the most important factor. Even one missed payment can hurt your score significantly.</p>
              </div>
              <div className="factor-item">
                <h3>Credit Utilization (30%)</h3>
                <p>This is how much of your available credit you're using. Keep it below 30% for the best scores.</p>
              </div>
              <div className="factor-item">
                <h3>Credit History Length (15%)</h3>
                <p>The longer you've had credit accounts, the better. New accounts can temporarily lower your score.</p>
              </div>
              <div className="factor-item">
                <h3>New Credit Inquiries (10%)</h3>
                <p>Each time you apply for credit, it creates a "hard inquiry" that can lower your score by a few points.</p>
              </div>
              <div className="factor-item">
                <h3>Credit Mix (10%)</h3>
                <p>Having different types of credit (credit cards, loans) can positively impact your score.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Improvement Tips */}
        <section className="module-section">
          <h2><FaCheckCircle /> How to Improve Your Score</h2>
          <div className="tips-grid">
            {improvementTips.map((tip, index) => (
              <div key={index} className="tip-card">
                <p>{tip}</p>
              </div>
            ))}
          </div>
          <div className="improvement-timeline">
            <h3>Timeline for Improvement</h3>
            <ul>
              <li><strong>1-3 months:</strong> Paying down high utilization and making on-time payments</li>
              <li><strong>3-6 months:</strong> Closing unused accounts and avoiding new inquiries</li>
              <li><strong>6-12 months:</strong> Significant score improvements with consistent good habits</li>
            </ul>
          </div>
        </section>

        {/* Simulator */}
        <section className="module-section">
          <h2><FaCalculator /> CIBIL Score Simulator</h2>
          <p>Use this simulator to see how different actions might affect your credit score. Remember, this is for educational purposes only.</p>

          <div className="simulator-card">
            <div className="simulator-inputs">
              <div className="input-group">
                <label>Current CIBIL Score</label>
                <input
                  type="range"
                  min="300"
                  max="900"
                  value={currentScore}
                  onChange={(e) => setCurrentScore(Number(e.target.value))}
                />
                <input
                  type="number"
                  min="300"
                  max="900"
                  value={currentScore}
                  onChange={(e) => setCurrentScore(Number(e.target.value))}
                />
              </div>
              <div className="input-group">
                <label>Credit Utilization (%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={utilization}
                  onChange={(e) => setUtilization(Number(e.target.value))}
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={utilization}
                  onChange={(e) => setUtilization(Number(e.target.value))}
                />
              </div>
              <div className="input-group">
                <label>Missed Payments (last 12 months)</label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={missedPayments}
                  onChange={(e) => setMissedPayments(Number(e.target.value))}
                />
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={missedPayments}
                  onChange={(e) => setMissedPayments(Number(e.target.value))}
                />
              </div>
              <div className="input-group">
                <label>New Credit Inquiries (last 6 months)</label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={newInquiries}
                  onChange={(e) => setNewInquiries(Number(e.target.value))}
                />
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={newInquiries}
                  onChange={(e) => setNewInquiries(Number(e.target.value))}
                />
              </div>
              <div className="input-group">
                <label>Credit History Age (months)</label>
                <input
                  type="range"
                  min="0"
                  max="120"
                  value={creditAge}
                  onChange={(e) => setCreditAge(Number(e.target.value))}
                />
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={creditAge}
                  onChange={(e) => setCreditAge(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="simulator-results">
              <div className="result-card">
                <h3>Current Score</h3>
                <div className="score-display current">{currentScore}</div>
              </div>
              <div className="result-card">
                <h3>Predicted Score</h3>
                <div className={`score-display predicted ${simulation.scoreDelta > 0 ? 'positive' : simulation.scoreDelta < 0 ? 'negative' : 'neutral'}`}>
                  {simulation.predictedScore}
                </div>
                <div className="score-change">
                  {simulation.scoreDelta > 0 ? '+' : ''}{simulation.scoreDelta}
                </div>
              </div>
            </div>

            <div className="simulator-explanation">
              <h3>Recommendations</h3>
              <ul>
                {simulation.explanation.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="disclaimer">
                <strong>Disclaimer:</strong> This is a simplified simulation for educational purposes. Your actual CIBIL score depends on many factors. Check your official credit report for accurate information.
              </p>
            </div>
          </div>
        </section>

        {/* Dynamic FAQ */}
        <DynamicFAQ topic="cibil-score" />

        {/* Knowledge Quiz */}
        <QuizComponent topic="cibil-score" />
      </div>
    </div>
  );
};

export default CIBILScore;