import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaChartLine, FaPlay, FaPause, FaBook } from 'react-icons/fa';
import Button from '../Button';
import DynamicFAQ from './DynamicFAQ';
import QuizComponent from './QuizComponent';
import './ModuleStyles.css';

const StockBasics = ({ setCurrentPage }) => {
  const [virtualBalance, setVirtualBalance] = useState(100000);
  const [portfolio, setPortfolio] = useState([]);
  const [selectedStock, setSelectedStock] = useState('RELIANCE');
  const [quantity, setQuantity] = useState(1);
  const [isDemoRunning, setIsDemoRunning] = useState(false);

  // Mock stock data with historical prices
  const stockData = {
    RELIANCE: {
      name: 'Reliance Industries',
      price: 2500,
      history: [
        { time: '9:15', price: 2480 },
        { time: '9:30', price: 2495 },
        { time: '9:45', price: 2500 },
        { time: '10:00', price: 2510 },
        { time: '10:15', price: 2498 },
        { time: '10:30', price: 2505 },
        { time: '10:45', price: 2520 },
        { time: '11:00', price: 2515 }
      ]
    },
    TCS: {
      name: 'Tata Consultancy Services',
      price: 3200,
      history: [
        { time: '9:15', price: 3180 },
        { time: '9:30', price: 3195 },
        { time: '9:45', price: 3200 },
        { time: '10:00', price: 3215 },
        { time: '10:15', price: 3198 },
        { time: '10:30', price: 3208 },
        { time: '10:45', price: 3225 },
        { time: '11:00', price: 3218 }
      ]
    },
    HDFC: {
      name: 'HDFC Bank',
      price: 1650,
      history: [
        { time: '9:15', price: 1635 },
        { time: '9:30', price: 1645 },
        { time: '9:45', price: 1650 },
        { time: '10:00', price: 1660 },
        { time: '10:15', price: 1648 },
        { time: '10:30', price: 1655 },
        { time: '10:45', price: 1670 },
        { time: '11:00', price: 1665 }
      ]
    }
  };

  const [currentPrices, setCurrentPrices] = useState({
    RELIANCE: stockData.RELIANCE.price,
    TCS: stockData.TCS.price,
    HDFC: stockData.HDFC.price
  });

  // Simulate price changes
  useEffect(() => {
    if (!isDemoRunning) return;

    const interval = setInterval(() => {
      setCurrentPrices(prev => ({
        RELIANCE: prev.RELIANCE + (Math.random() - 0.5) * 20,
        TCS: prev.TCS + (Math.random() - 0.5) * 25,
        HDFC: prev.HDFC + (Math.random() - 0.5) * 15
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isDemoRunning]);

  const buyStock = () => {
    const stock = stockData[selectedStock];
    const currentPrice = currentPrices[selectedStock];
    const totalCost = currentPrice * quantity;

    if (totalCost > virtualBalance) {
      alert('Insufficient balance!');
      return;
    }

    setVirtualBalance(prev => prev - totalCost);
    setPortfolio(prev => {
      const existing = prev.find(p => p.symbol === selectedStock);
      if (existing) {
        return prev.map(p =>
          p.symbol === selectedStock
            ? { ...p, quantity: p.quantity + quantity, avgPrice: ((p.avgPrice * p.quantity) + (currentPrice * quantity)) / (p.quantity + quantity) }
            : p
        );
      } else {
        return [...prev, {
          symbol: selectedStock,
          name: stock.name,
          quantity,
          avgPrice: currentPrice,
          currentPrice
        }];
      }
    });
  };

  const sellStock = () => {
    const holding = portfolio.find(p => p.symbol === selectedStock);
    if (!holding || holding.quantity < quantity) {
      alert('Insufficient shares!');
      return;
    }

    const currentPrice = currentPrices[selectedStock];
    const totalValue = currentPrice * quantity;

    setVirtualBalance(prev => prev + totalValue);
    setPortfolio(prev =>
      prev.map(p =>
        p.symbol === selectedStock
          ? { ...p, quantity: p.quantity - quantity }
          : p
      ).filter(p => p.quantity > 0)
    );
  };

  const glossary = [
    {
      term: "Stock",
      definition: "A share in the ownership of a company. When you buy a stock, you become a shareholder.",
      example: "Buying 10 shares of Reliance makes you a part-owner of Reliance Industries."
    },
    {
      term: "NSE/BSE",
      definition: "National Stock Exchange and Bombay Stock Exchange - the two main stock exchanges in India.",
      example: "Most stocks are listed on both NSE and BSE, but prices are usually similar."
    },
    {
      term: "Market Order",
      definition: "An order to buy or sell immediately at the best available current price.",
      example: "If you place a market order to buy Reliance, you'll get it at whatever the current market price is."
    },
    {
      term: "Limit Order",
      definition: "An order to buy below or sell above a specified price.",
      example: "Buy Reliance only if price goes below ₹2,450."
    },
    {
      term: "Bull Market",
      definition: "A market condition where stock prices are rising or expected to rise.",
      example: "During a bull market, most stocks tend to go up in value."
    },
    {
      term: "Bear Market",
      definition: "A market condition where stock prices are falling or expected to fall.",
      example: "During a bear market, investors become cautious and stock prices decline."
    }
  ];

  const riskTips = [
    "Never invest money you can't afford to lose",
    "Diversify across different stocks and sectors",
    "Set stop-loss orders to limit potential losses",
    "Invest for the long term (5+ years)",
    "Keep learning and stay updated with market news"
  ];

  return (
    <div className="module-page">
      <div className="module-header">
        <Button
          variant="outline"
          size="small"
          onClick={() => setCurrentPage('learn')}
          className="back-button"
        >
          <FaArrowLeft />
        </Button>
        <h1>Basics of Stock Market</h1>
      </div>

      <div className="module-content">
        {/* Introduction */}
        <section className="module-section">
          <h2><FaChartLine /> Understanding Stocks</h2>
          <p>Stocks represent ownership in a company. When you buy stocks, you become a shareholder and can benefit from the company's growth through dividends and price appreciation.</p>

          <div className="stock-concepts">
            <div className="concept">
              <h3>How Stock Trading Works</h3>
              <ol>
                <li><strong>Choose a stockbroker:</strong> Open a demat and trading account</li>
                <li><strong>Research companies:</strong> Study financials, management, industry trends</li>
                <li><strong>Place orders:</strong> Buy or sell through your broker's platform</li>
                <li><strong>Monitor investments:</strong> Track performance and make decisions</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Virtual Trading */}
        <section className="module-section">
          <h2><FaPlay /> Virtual Trading Simulator</h2>
          <p>Practice trading with virtual money. This demo simulates real market conditions.</p>

          <div className="trading-simulator">
            <div className="simulator-controls">
              <button
                className={`demo-button ${isDemoRunning ? 'running' : ''}`}
                onClick={() => setIsDemoRunning(!isDemoRunning)}
              >
                {isDemoRunning ? <FaPause /> : <FaPlay />}
                {isDemoRunning ? 'Stop Demo' : 'Start Demo'}
              </button>
              <div className="balance">Virtual Balance: ₹{virtualBalance.toLocaleString()}</div>
            </div>

            <div className="trading-interface">
              <div className="stock-selector">
                <h3>Stock Prices</h3>
                {Object.entries(currentPrices).map(([symbol, price]) => (
                  <div
                    key={symbol}
                    className={`stock-price ${selectedStock === symbol ? 'selected' : ''}`}
                    onClick={() => setSelectedStock(symbol)}
                  >
                    <span className="symbol">{symbol}</span>
                    <span className="name">{stockData[symbol].name}</span>
                    <span className="price">₹{price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="trading-panel">
                <h3>Trade {selectedStock}</h3>
                <div className="trade-inputs">
                  <div className="input-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                  </div>
                  <div className="trade-buttons">
                    <Button
                      variant="success"
                      size="small"
                      onClick={buyStock}
                      className="buy-button"
                    >
                      Buy
                    </Button>
                    <Button
                      variant="danger"
                      size="small"
                      onClick={sellStock}
                      className="sell-button"
                    >
                      Sell
                    </Button>
                  </div>
                </div>
              </div>

              <div className="portfolio-panel">
                <h3>Your Portfolio</h3>
                {portfolio.length === 0 ? (
                  <p>No holdings yet. Start trading!</p>
                ) : (
                  <div className="portfolio-list">
                    {portfolio.map((holding) => (
                      <div key={holding.symbol} className="portfolio-item">
                        <span className="symbol">{holding.symbol}</span>
                        <span className="quantity">{holding.quantity} shares</span>
                        <span className="avg-price">Avg: ₹{holding.avgPrice.toFixed(2)}</span>
                        <span className="current-price">Current: ₹{currentPrices[holding.symbol].toFixed(2)}</span>
                        <span className={`pnl ${((currentPrices[holding.symbol] - holding.avgPrice) / holding.avgPrice * 100) >= 0 ? 'positive' : 'negative'}`}>
                          P&L: {(((currentPrices[holding.symbol] - holding.avgPrice) / holding.avgPrice * 100)).toFixed(2)}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Glossary */}
        <section className="module-section">
          <h2><FaBook /> Stock Market Glossary</h2>
          <div className="glossary-list">
            {glossary.map((item, index) => (
              <details key={index} className="glossary-item">
                <summary>{item.term}</summary>
                <div className="definition">
                  <p>{item.definition}</p>
                  <div className="example">Example: {item.example}</div>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Risk Management */}
        <section className="module-section">
          <h2>Risk Management Tips</h2>
          <div className="risk-tips">
            {riskTips.map((tip, index) => (
              <div key={index} className="risk-tip">
                <span className="tip-number">{index + 1}</span>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic FAQ */}
        <DynamicFAQ topic="stock-basics" />

        {/* Knowledge Quiz */}
        <QuizComponent topic="stock-basics" />
      </div>
    </div>
  );
};

export default StockBasics;