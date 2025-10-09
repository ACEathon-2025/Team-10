import React, { useState } from 'react';
import { FaArrowLeft, FaPiggyBank, FaCalculator, FaListUl, FaDownload } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { calculateRetirement } from '../../utils/finance';
import DynamicFAQ from './DynamicFAQ';
import QuizComponent from './QuizComponent';
import './ModuleStyles.css';

const RetirementPlanning = ({ setCurrentPage }) => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyContribution, setMonthlyContribution] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [inflation, setInflation] = useState(4);

  const result = calculateRetirement(currentAge, retirementAge, monthlyContribution, expectedReturn, inflation);

  // Generate projection data
  const generateProjectionData = () => {
    const data = [];
    const years = retirementAge - currentAge;
    for (let year = 1; year <= years; year++) {
      const projection = calculateRetirement(currentAge, currentAge + year, monthlyContribution, expectedReturn, inflation);
      data.push({
        year: currentAge + year,
        nominalCorpus: projection.nominalCorpus,
        realCorpus: projection.realCorpus,
        contributions: projection.totalContributions
      });
    }
    return data;
  };

  const chartData = generateProjectionData();

  const investmentOptions = [
    {
      name: "Employee Provident Fund (EPF)",
      description: "Mandatory retirement savings with employer contribution",
      returns: "7-8% per annum",
      tax: "Tax-free withdrawals after 5 years",
      risk: "Very Low"
    },
    {
      name: "National Pension System (NPS)",
      description: "Government-backed retirement scheme",
      returns: "8-10% per annum",
      tax: "Tax benefits under 80C, partial withdrawal allowed",
      risk: "Medium"
    },
    {
      name: "Mutual Funds (ELSS)",
      description: "Tax-saving mutual funds with equity exposure",
      returns: "10-12% per annum",
      tax: "Tax benefits under 80C, LTCG after 3 years",
      risk: "Medium-High"
    },
    {
      name: "Public Provident Fund (PPF)",
      description: "Long-term savings with sovereign guarantee",
      returns: "7-8% per annum",
      tax: "Tax-free interest and withdrawals",
      risk: "Very Low"
    }
  ];

  const assetAllocation = [
    { age: "20-30", equity: 80, debt: 15, gold: 5 },
    { age: "30-40", equity: 70, debt: 20, gold: 10 },
    { age: "40-50", equity: 60, debt: 30, gold: 10 },
    { age: "50-60", equity: 40, debt: 45, gold: 15 },
    { age: "60+", equity: 20, debt: 60, gold: 20 }
  ];

  const checklist = [
    "Calculate your retirement corpus requirement",
    "Start investing early to benefit from compounding",
    "Diversify across different asset classes",
    "Review and adjust your portfolio annually",
    "Consider inflation when planning",
    "Take advantage of tax-saving instruments",
    "Plan for healthcare expenses in retirement"
  ];

  return (
    <div className="module-page">
      <div className="module-header">
        <button className="back-button" onClick={() => setCurrentPage('learn')}>
          <FaArrowLeft />
        </button>
        <h1>Plan for Retirement</h1>
      </div>

      <div className="module-content">
        {/* Introduction */}
        <section className="module-section">
          <h2><FaPiggyBank /> The Power of Compound Interest</h2>
          <p>Compound interest is the interest you earn on both your original money and the interest you've already earned. It's like earning "interest on interest" and can significantly grow your retirement savings over time.</p>

          <div className="compound-example">
            <h3>Example: ₹1,000/month at 8% for 30 years</h3>
            <div className="example-calculation">
              <div className="calc-step">
                <span className="label">Monthly Investment:</span>
                <span className="value">₹1,000</span>
              </div>
              <div className="calc-step">
                <span className="label">Total Invested:</span>
                <span className="value">₹3,60,000</span>
              </div>
              <div className="calc-step">
                <span className="label">Future Value at 8%:</span>
                <span className="value">₹11,46,293</span>
              </div>
              <div className="calc-step">
                <span className="label">Wealth Created:</span>
                <span className="value gains">₹7,86,293</span>
              </div>
            </div>
          </div>
        </section>

        {/* Retirement Calculator */}
        <section className="module-section">
          <h2><FaCalculator /> Retirement Calculator</h2>
          <div className="calculator-card">
            <div className="calculator-inputs">
              <div className="input-group">
                <label>Current Age</label>
                <input
                  type="range"
                  min="20"
                  max="50"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                />
                <input
                  type="number"
                  min="20"
                  max="50"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                />
              </div>
              <div className="input-group">
                <label>Retirement Age</label>
                <input
                  type="range"
                  min="50"
                  max="70"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                />
                <input
                  type="number"
                  min="50"
                  max="70"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                />
              </div>
              <div className="input-group">
                <label>Monthly Contribution (₹)</label>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                />
                <input
                  type="number"
                  min="1000"
                  max="100000"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                />
              </div>
              <div className="input-group">
                <label>Expected Return (% per annum)</label>
                <input
                  type="range"
                  min="5"
                  max="15"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                />
                <input
                  type="number"
                  min="5"
                  max="15"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  step="0.5"
                />
              </div>
              <div className="input-group">
                <label>Expected Inflation (% per annum)</label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="0.5"
                  value={inflation}
                  onChange={(e) => setInflation(Number(e.target.value))}
                />
                <input
                  type="number"
                  min="2"
                  max="8"
                  value={inflation}
                  onChange={(e) => setInflation(Number(e.target.value))}
                  step="0.5"
                />
              </div>
            </div>

            <div className="retirement-results">
              <div className="result-item">
                <span className="result-label">Years to Retirement:</span>
                <span className="result-value">{result.years}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Total Contributions:</span>
                <span className="result-value">₹{result.totalContributions.toLocaleString()}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Nominal Corpus:</span>
                <span className="result-value">₹{result.nominalCorpus.toLocaleString()}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Real Corpus (Inflation-adjusted):</span>
                <span className="result-value">₹{result.realCorpus.toLocaleString()}</span>
              </div>
            </div>

            <div className="chart-container">
              <h3>Retirement Corpus Projection</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: 'Age', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                  <Legend />
                  <Line type="monotone" dataKey="nominalCorpus" stroke="#8884d8" name="Nominal Value" />
                  <Line type="monotone" dataKey="realCorpus" stroke="#82ca9d" name="Inflation-adjusted" />
                  <Line type="monotone" dataKey="contributions" stroke="#ffc658" name="Total Invested" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Investment Options */}
        <section className="module-section">
          <h2><FaListUl /> Investment Options for Retirement</h2>
          <div className="investment-options">
            {investmentOptions.map((option, index) => (
              <div key={index} className="investment-card">
                <h3>{option.name}</h3>
                <p>{option.description}</p>
                <div className="option-details">
                  <div className="detail">
                    <span className="label">Expected Returns:</span>
                    <span className="value">{option.returns}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Tax Benefits:</span>
                    <span className="value">{option.tax}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Risk Level:</span>
                    <span className="value">{option.risk}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Asset Allocation */}
        <section className="module-section">
          <h2>Asset Allocation by Age</h2>
          <p>Diversify your investments across different asset classes based on your age and risk tolerance.</p>

          <div className="allocation-table">
            <div className="table-header">
              <span>Age Group</span>
              <span>Equity (%)</span>
              <span>Debt (%)</span>
              <span>Gold (%)</span>
            </div>
            {assetAllocation.map((alloc, index) => (
              <div key={index} className="table-row">
                <span>{alloc.age}</span>
                <span>{alloc.equity}%</span>
                <span>{alloc.debt}%</span>
                <span>{alloc.gold}%</span>
              </div>
            ))}
          </div>

          <div className="allocation-chart">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={assetAllocation}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="equity" stackId="a" fill="#8884d8" name="Equity" />
                <Bar dataKey="debt" stackId="a" fill="#82ca9d" name="Debt" />
                <Bar dataKey="gold" stackId="a" fill="#ffc658" name="Gold" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Checklist */}
        <section className="module-section">
          <h2>Annual Review Checklist</h2>
          <div className="checklist">
            {checklist.map((item, index) => (
              <div key={index} className="checklist-item">
                <input type="checkbox" id={`check-${index}`} />
                <label htmlFor={`check-${index}`}>{item}</label>
              </div>
            ))}
          </div>
        </section>

        {/* Download Plan */}
        <section className="module-section">
          <h2><FaDownload /> Download Your Retirement Plan</h2>
          <p>Get a personalized retirement planning template with your calculations and recommendations.</p>
          <button className="download-button">
            <FaDownload /> Download PDF Plan
          </button>
        </section>

        {/* Dynamic FAQ */}
        <DynamicFAQ topic="retirement-planning" />

        {/* Knowledge Quiz */}
        <QuizComponent topic="retirement-planning" />
      </div>
    </div>
  );
};

export default RetirementPlanning;