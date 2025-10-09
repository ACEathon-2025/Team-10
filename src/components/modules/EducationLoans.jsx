import React, { useState } from 'react';
import { FaArrowLeft, FaCalculator, FaLightbulb, FaLink } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculateEMI } from '../../utils/finance';
import DynamicFAQ from './DynamicFAQ';
import QuizComponent from './QuizComponent';
import './ModuleStyles.css';

const EducationLoans = ({ setCurrentPage }) => {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(5);

  const result = calculateEMI(principal, rate, years);

  // Generate amortization data for chart
  const generateAmortizationData = () => {
    const data = [];
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;
    let balance = principal;
    let totalInterest = 0;

    for (let month = 1; month <= numPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = result.emi - interestPayment;
      balance -= principalPayment;
      totalInterest += interestPayment;

      if (month % 6 === 0 || month === numPayments) { // Show every 6 months
        data.push({
          month,
          principal: Number((principal - balance).toFixed(2)),
          interest: Number(totalInterest.toFixed(2)),
          balance: Number(balance.toFixed(2))
        });
      }
    }
    return data;
  };

  const chartData = generateAmortizationData();

  const resources = [
    { title: "RBI Model Education Loan Scheme", url: "https://www.rbi.org.in/" },
    { title: "Government Subsidies", url: "https://www.education.gov.in/" },
    { title: "Bank Education Loan Schemes", url: "https://www.sbi.co.in/" }
  ];

  return (
    <div className="module-page">
      <div className="module-header">
        <button className="back-button" onClick={() => setCurrentPage('learn')}>
          <FaArrowLeft />
        </button>
        <h1>Manage Education Loans</h1>
      </div>

      <div className="module-content">
        {/* Introduction */}
        <section className="module-section">
          <h2>What is an Education Loan?</h2>
          <p>An education loan helps you finance higher education when you don't have enough savings. There are different types:</p>
          <ul>
            <li><strong>Government-subsidized loans:</strong> Lower interest rates, longer repayment periods</li>
            <li><strong>Public sector bank loans:</strong> Reasonable rates with government backing</li>
            <li><strong>Private bank loans:</strong> Higher rates but faster approval and more flexibility</li>
          </ul>
        </section>

        {/* Tips */}
        <section className="module-section">
          <h2><FaLightbulb /> Smart Tips for Managing Your Loan</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>Budget Wisely</h3>
              <p>Calculate your monthly expenses and ensure your EMI fits within 30-40% of your income.</p>
            </div>
            <div className="tip-card">
              <h3>Choose Right Repayment Plan</h3>
              <p>Opt for graduated repayment if you expect salary increases, or standard EMI for steady income.</p>
            </div>
            <div className="tip-card">
              <h3>Consider Refinancing</h3>
              <p>If interest rates drop, refinance your loan to save on interest payments.</p>
            </div>
            <div className="tip-card">
              <h3>Keep Records</h3>
              <p>Maintain all loan documents and payment receipts for tax benefits and future reference.</p>
            </div>
          </div>
        </section>

        {/* EMI Calculator */}
        <section className="module-section">
          <h2><FaCalculator /> Education Loan EMI Calculator</h2>
          <div className="calculator-card">
            <div className="calculator-inputs">
              <div className="input-group">
                <label>Loan Amount (₹)</label>
                <input
                  type="range"
                  min="100000"
                  max="5000000"
                  step="50000"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                />
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                />
              </div>
              <div className="input-group">
                <label>Interest Rate (% per annum)</label>
                <input
                  type="range"
                  min="5"
                  max="15"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                />
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  step="0.1"
                />
              </div>
              <div className="input-group">
                <label>Loan Tenure (years)</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                />
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="calculator-results">
              <div className="result-item">
                <span className="result-label">Monthly EMI:</span>
                <span className="result-value">₹{result.emi.toLocaleString()}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Total Payment:</span>
                <span className="result-value">₹{result.totalPayment.toLocaleString()}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Total Interest:</span>
                <span className="result-value">₹{result.totalInterest.toLocaleString()}</span>
              </div>
            </div>

            <div className="chart-container">
              <h3>Loan Amortization Schedule</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                  <Legend />
                  <Line type="monotone" dataKey="principal" stroke="#8884d8" name="Principal Paid" />
                  <Line type="monotone" dataKey="interest" stroke="#82ca9d" name="Interest Paid" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="module-section">
          <h2><FaLink /> Helpful Resources</h2>
          <div className="resources-grid">
            {resources.map((resource, index) => (
              <a key={index} href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-card">
                <h3>{resource.title}</h3>
              </a>
            ))}
          </div>
        </section>

        {/* Dynamic FAQ */}
        <DynamicFAQ topic="education-loans" />

        {/* Knowledge Quiz */}
        <QuizComponent topic="education-loans" />
      </div>
    </div>
  );
};

export default EducationLoans;