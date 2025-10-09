import React, { useState } from 'react';
import { FaArrowLeft, FaPiggyBank, FaChartLine, FaListUl, FaCalculator } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculateSIPFutureValue } from '../../utils/finance';
import DynamicFAQ from './DynamicFAQ';
import QuizComponent from './QuizComponent';
import './ModuleStyles.css';

const StartSIP = ({ setCurrentPage }) => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [years, setYears] = useState(10);

  const result = calculateSIPFutureValue(monthlyInvestment, annualReturn, years);

  // Generate projection data for chart
  const generateProjectionData = () => {
    const data = [];
    for (let year = 1; year <= years; year++) {
      const projection = calculateSIPFutureValue(monthlyInvestment, annualReturn, year);
      data.push({
        year,
        invested: projection.totalInvested,
        value: projection.futureValue,
        gains: projection.gains
      });
    }
    return data;
  };

  const chartData = generateProjectionData();

  const benefits = [
    {
      title: "Rupee Cost Averaging",
      description: "Invest fixed amounts regularly, buying more units when prices are low and fewer when high.",
      example: "₹5,000/month for 10 years at 12% returns = ₹10.5 lakhs (vs ₹6 lakhs invested)"
    },
    {
      title: "Power of Compounding",
      description: "Earnings generate more earnings over time, creating exponential growth.",
      example: "Small regular investments grow significantly due to compound interest."
    },
    {
      title: "Disciplined Investing",
      description: "Automated investments prevent emotional decision-making during market volatility.",
      example: "Continue investing through market ups and downs for better long-term results."
    }
  ];

  const risks = [
    {
      title: "Market Risk",
      description: "Mutual fund values can fluctuate with market conditions.",
      mitigation: "Long-term horizon (5+ years) reduces short-term volatility impact."
    },
    {
      title: "Inflation Risk",
      description: "Purchasing power may decrease if returns don't beat inflation.",
      mitigation: "Choose equity-oriented funds for higher long-term returns."
    },
    {
      title: "Liquidity Risk",
      description: "May need to wait for lock-in periods or face exit loads.",
      mitigation: "Choose liquid funds for emergency needs, equity funds for long-term goals."
    }
  ];

  return (
    <div className="module-page">
      <div className="module-header">
        <button className="back-button" onClick={() => setCurrentPage('learn')}>
          <FaArrowLeft />
        </button>
        <h1>Start a SIP</h1>
      </div>

      <div className="module-content">
        {/* Introduction */}
        <section className="module-section">
          <h2><FaPiggyBank /> What is a SIP?</h2>
          <p>A Systematic Investment Plan (SIP) is a smart way to invest small amounts regularly in mutual funds. Instead of trying to time the market, you invest a fixed amount every month, benefiting from market fluctuations through rupee cost averaging.</p>

          <div className="sip-types">
            <div className="sip-type">
              <h3>SIP vs Lump Sum</h3>
              <div className="comparison">
                <div className="method">
                  <h4>Lump Sum</h4>
                  <p>Invest large amount at once. Higher risk if market timing is wrong.</p>
                </div>
                <div className="method">
                  <h4>SIP</h4>
                  <p>Invest regularly. Reduces risk through averaging. More disciplined.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits vs Risks */}
        <section className="module-section">
          <h2><FaListUl /> Benefits & Risks</h2>

          <div className="benefits-risks">
            <div className="benefits">
              <h3>Benefits</h3>
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <h4>{benefit.title}</h4>
                  <p>{benefit.description}</p>
                  <div className="example">{benefit.example}</div>
                </div>
              ))}
            </div>

            <div className="risks">
              <h3>Risks & Mitigation</h3>
              {risks.map((risk, index) => (
                <div key={index} className="risk-item">
                  <h4>{risk.title}</h4>
                  <p>{risk.description}</p>
                  <div className="mitigation">💡 {risk.mitigation}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SIP Calculator */}
        <section className="module-section">
          <h2><FaCalculator /> SIP Calculator</h2>
          <div className="calculator-card">
            <div className="calculator-inputs">
              <div className="input-group">
                <label>Monthly Investment (₹)</label>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                />
                <input
                  type="number"
                  min="500"
                  max="50000"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                />
              </div>
              <div className="input-group">
                <label>Expected Annual Return (%)</label>
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="0.5"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(Number(e.target.value))}
                />
                <input
                  type="number"
                  min="5"
                  max="20"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(Number(e.target.value))}
                  step="0.5"
                />
              </div>
              <div className="input-group">
                <label>Investment Period (years)</label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                />
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="sip-results">
              <div className="result-item">
                <span className="result-label">Total Invested:</span>
                <span className="result-value">₹{result.totalInvested.toLocaleString()}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Future Value:</span>
                <span className="result-value">₹{result.futureValue.toLocaleString()}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Total Gains:</span>
                <span className="result-value gains">₹{result.gains.toLocaleString()}</span>
              </div>
            </div>

            <div className="chart-container">
              <h3>SIP Growth Projection</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                  <Legend />
                  <Line type="monotone" dataKey="invested" stroke="#8884d8" name="Amount Invested" />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" name="Portfolio Value" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="module-section">
          <h2><FaChartLine /> How to Start a SIP</h2>
          <div className="getting-started">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Choose Your Goal</h3>
                <p>Identify your financial goal: retirement, child's education, buying a house, etc.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Select Fund Type</h3>
                <p>Large-cap for stability, mid-cap for growth, ELSS for tax savings, debt for safety.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Complete KYC</h3>
                <p>Submit identity proof, address proof, and PAN card to start investing.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Set Up Auto-Debit</h3>
                <p>Link your bank account for automatic monthly investments.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic FAQ */}
        <DynamicFAQ topic="sip" />

        {/* Knowledge Quiz */}
        <QuizComponent topic="sip" />
      </div>
    </div>
  );
};

export default StartSIP;