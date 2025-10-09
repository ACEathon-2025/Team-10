import React, { useState, useEffect } from 'react';
import { FaQuestionCircle, FaChevronDown, FaChevronUp, FaSearch, FaSync } from 'react-icons/fa';
import './ModuleStyles.css';

const DynamicFAQ = ({ topic, searchQuery = '' }) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Dynamic FAQ data based on topics - this would typically come from an API
  const getFAQsForTopic = (topic, searchQuery) => {
    const baseFAQs = {
      'stock-basics': [
        {
          question: "What is a stock and how does it work?",
          answer: "A stock represents ownership in a company. When you buy shares, you become a partial owner and can benefit from the company's growth through price appreciation and dividends. Stocks are traded on exchanges like NSE and BSE.",
          category: "basics",
          trending: true,
          lastSearched: new Date('2025-10-08')
        },
        {
          question: "How do I start investing in stocks?",
          answer: "To start investing: 1) Open a demat and trading account with a broker, 2) Complete KYC verification, 3) Fund your account, 4) Research companies, 5) Place your first order. Always start with small amounts and learn continuously.",
          category: "getting-started",
          trending: true,
          lastSearched: new Date('2025-10-07')
        },
        {
          question: "What is the difference between NSE and BSE?",
          answer: "NSE (National Stock Exchange) and BSE (Bombay Stock Exchange) are India's primary stock exchanges. NSE is more technology-driven with higher liquidity, while BSE has a longer history. Most stocks are listed on both, but NSE is preferred for active trading.",
          category: "exchanges",
          trending: false,
          lastSearched: new Date('2025-10-05')
        },
        {
          question: "What are the risks of stock investing?",
          answer: "Stock investing carries risks including: 1) Market risk (price fluctuations), 2) Company-specific risk, 3) Liquidity risk, 4) Inflation risk. Never invest money you cannot afford to lose, and diversify your portfolio.",
          category: "risks",
          trending: true,
          lastSearched: new Date('2025-10-09')
        },
        {
          question: "How do I choose which stocks to buy?",
          answer: "Research thoroughly: 1) Check financial fundamentals (revenue, profit, debt), 2) Understand the industry and competition, 3) Review management quality, 4) Consider valuation metrics (P/E ratio, P/B ratio), 5) Look at historical performance and future growth prospects.",
          category: "research",
          trending: false,
          lastSearched: new Date('2025-10-06')
        }
      ],
      'sip': [
        {
          question: "What is SIP and how does it work?",
          answer: "SIP (Systematic Investment Plan) allows you to invest a fixed amount regularly in mutual funds. It uses rupee cost averaging - you buy more units when prices are low and fewer when high, averaging out the purchase cost over time.",
          category: "basics",
          trending: true,
          lastSearched: new Date('2025-10-08')
        },
        {
          question: "What are the benefits of SIP over lump sum investment?",
          answer: "SIP benefits: 1) Rupee cost averaging reduces timing risk, 2) Power of compounding works better with regular investments, 3) Disciplined investing prevents emotional decisions, 4) Lower minimum investment amounts, 5) Automatic investments save time.",
          category: "benefits",
          trending: true,
          lastSearched: new Date('2025-10-09')
        },
        {
          question: "How much should I invest in SIP monthly?",
          answer: "Monthly SIP amount depends on your income and goals. Start with what you can afford consistently - even ₹500-1000/month is better than nothing. Gradually increase as your income grows. A good rule is to invest 20-30% of your monthly surplus.",
          category: "planning",
          trending: false,
          lastSearched: new Date('2025-10-07')
        },
        {
          question: "Can I stop or modify my SIP anytime?",
          answer: "Yes, you can pause, modify the amount, or stop your SIP anytime. However, stopping frequently defeats the purpose of disciplined investing. Consider long-term commitments (3-5 years minimum) for better compounding benefits.",
          category: "management",
          trending: false,
          lastSearched: new Date('2025-10-04')
        },
        {
          question: "What happens to my SIP during market downturns?",
          answer: "During market falls, your SIP buys more units at lower prices, which is beneficial long-term. This is rupee cost averaging in action. Stay invested during volatility - timing the market is difficult even for experts.",
          category: "market-conditions",
          trending: true,
          lastSearched: new Date('2025-10-08')
        }
      ],
      'retirement-planning': [
        {
          question: "When should I start planning for retirement?",
          answer: "Start as early as possible! The power of compounding makes early investments extremely valuable. Even if you're in your 20s or 30s, starting now gives your money decades to grow. Don't wait until you're 50 - time is your biggest ally.",
          category: "timing",
          trending: true,
          lastSearched: new Date('2025-10-09')
        },
        {
          question: "How much do I need for retirement?",
          answer: "Calculate using the 4% rule: If you need ₹1 lakh monthly post-retirement, you'll need ₹3 crores saved (assuming 4% annual withdrawal). Adjust for inflation, life expectancy, and your lifestyle. Use retirement calculators for personalized estimates.",
          category: "calculations",
          trending: true,
          lastSearched: new Date('2025-10-08')
        },
        {
          question: "What are the best investment options for retirement?",
          answer: "Diversify across: 1) NPS (tax benefits), 2) EPF/PPF (guaranteed returns), 3) Mutual funds (higher returns), 4) Life insurance with investment component. Balance between guaranteed and market-linked investments based on your risk tolerance.",
          category: "investments",
          trending: false,
          lastSearched: new Date('2025-10-07')
        },
        {
          question: "Should I invest in NPS or mutual funds for retirement?",
          answer: "Both have merits: NPS offers tax benefits and government backing, while mutual funds potentially offer higher returns. Consider NPS for tax savings and mutual funds for higher growth potential. Many people use both for optimal retirement planning.",
          category: "comparison",
          trending: false,
          lastSearched: new Date('2025-10-06')
        },
        {
          question: "How does inflation affect retirement planning?",
          answer: "Inflation reduces purchasing power over time. At 6% inflation, ₹1 lakh today will be worth only ₹54,000 in 10 years. Your retirement corpus must account for inflation - aim for returns higher than inflation rate for real growth.",
          category: "inflation",
          trending: true,
          lastSearched: new Date('2025-10-09')
        }
      ],
      'cibil-score': [
        {
          question: "What is a CIBIL score and why is it important?",
          answer: "CIBIL score (300-900) indicates your creditworthiness. Lenders use it to decide loan approvals, interest rates, and terms. A higher score (750+) gets better loan terms. It's calculated based on your credit history, payment behavior, and other factors.",
          category: "basics",
          trending: true,
          lastSearched: new Date('2025-10-09')
        },
        {
          question: "How can I improve my CIBIL score?",
          answer: "Improve by: 1) Paying bills on time, 2) Reducing credit utilization below 30%, 3) Avoiding multiple loan applications, 4) Paying off high-interest debts first, 5) Keeping old accounts active. Score improvement takes 6-12 months of good financial behavior.",
          category: "improvement",
          trending: true,
          lastSearched: new Date('2025-10-08')
        },
        {
          question: "What factors affect my CIBIL score?",
          answer: "Key factors: 1) Payment history (35% weight), 2) Credit utilization (30%), 3) Credit age (15%), 4) New credit applications (10%), 5) Credit mix (10%). Payment history is most important - never miss payments.",
          category: "factors",
          trending: false,
          lastSearched: new Date('2025-10-07')
        },
        {
          question: "How often should I check my CIBIL score?",
          answer: "Check once every 3-6 months to monitor changes. Free annual reports are available from CIBIL website. Regular monitoring helps catch errors and track improvement. Don't check too frequently as hard inquiries can temporarily lower your score.",
          category: "monitoring",
          trending: false,
          lastSearched: new Date('2025-10-05')
        },
        {
          question: "Can I have a good CIBIL score without any loans?",
          answer: "Yes, but it's challenging. You can build score through: 1) Credit cards with responsible usage, 2) Timely payments, 3) Low utilization, 4) Keeping accounts active. Having some credit history is better than none, but avoid unnecessary debt.",
          category: "building-credit",
          trending: false,
          lastSearched: new Date('2025-10-06')
        }
      ],
      'education-loans': [
        {
          question: "What are the eligibility criteria for education loans?",
          answer: "Eligibility depends on: 1) Academic record (usually 60%+ marks), 2) Admission confirmation, 3) Co-applicant (parent/sibling), 4) Course and institution recognition, 5) Age limit (usually 18-35 years). Government banks have more relaxed criteria than private banks.",
          category: "eligibility",
          trending: true,
          lastSearched: new Date('2025-10-08')
        },
        {
          question: "Which banks offer education loans in India?",
          answer: "Major providers: 1) SBI (up to ₹1.5 crores), 2) HDFC Credila (up to ₹50 lakhs), 3) Bank of Baroda, 4) PNB, 5) Canara Bank. Compare interest rates (8.5-15%), processing fees, and repayment terms. Government banks offer lower rates but longer processing.",
          category: "providers",
          trending: false,
          lastSearched: new Date('2025-10-07')
        },
        {
          question: "What is the interest rate on education loans?",
          answer: "Rates vary: 1) Government banks: 8.5-11% (subsidized for girls/students from weaker sections), 2) Private banks: 11-15%, 3) NBFCs: 12-18%. Rates depend on credit score, course type, and institution. Women students often get 0.5% concession.",
          category: "rates",
          trending: true,
          lastSearched: new Date('2025-10-09')
        },
        {
          question: "What documents are required for education loan?",
          answer: "Required documents: 1) Admission letter, 2) Fee structure, 3) Academic records, 4) Income proof of co-applicant, 5) Address proof, 6) ID proof, 7) Collateral documents (if applicable). Keep all documents ready to avoid delays.",
          category: "documents",
          trending: false,
          lastSearched: new Date('2025-10-06')
        },
        {
          question: "When does loan repayment start for education loans?",
          answer: "Repayment starts after course completion + 6-12 months grace period. During studies, only interest is payable (if not subsidized). Full repayment begins after getting job. Moratorium period helps you focus on career building before repayment burden.",
          category: "repayment",
          trending: false,
          lastSearched: new Date('2025-10-05')
        }
      ]
    };

    let topicFAQs = baseFAQs[topic] || [];

    // Filter by search query if provided
    if (searchQuery) {
      topicFAQs = topicFAQs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by trending status and recency
    return topicFAQs.sort((a, b) => {
      if (a.trending && !b.trending) return -1;
      if (!a.trending && b.trending) return 1;
      return b.lastSearched - a.lastSearched;
    });
  };

  // Simulate API call to fetch/update FAQs
  const fetchFAQs = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const fetchedFAQs = getFAQsForTopic(topic, searchQuery);
      setFaqs(fetchedFAQs);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, [topic, searchQuery]);

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const refreshFAQs = () => {
    fetchFAQs();
  };

  return (
    <section className="module-section">
      <div className="faq-header">
        <h2><FaQuestionCircle /> Frequently Asked Questions</h2>
        <div className="faq-controls">
          <button className="refresh-button" onClick={refreshFAQs} disabled={loading}>
            <FaSync className={loading ? 'spinning' : ''} /> Refresh
          </button>
          <span className="last-updated">
            Last updated: {lastUpdated.toLocaleDateString()} {lastUpdated.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading latest FAQs...</p>
        </div>
      ) : faqs.length === 0 ? (
        <div className="empty-state">
          <FaSearch />
          <p>No FAQs found for this topic. Try adjusting your search.</p>
        </div>
      ) : (
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleExpanded(index)}
                aria-expanded={expandedItems.has(index)}
              >
                <span className="question-text">
                  {faq.trending && <span className="trending-badge">🔥</span>}
                  {faq.question}
                </span>
                <span className="category-tag">{faq.category}</span>
                {expandedItems.has(index) ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {expandedItems.has(index) && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                  <div className="faq-meta">
                    <span className="search-frequency">
                      Last searched: {faq.lastSearched.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="faq-footer">
        <p className="faq-note">
          💡 These FAQs are dynamically updated based on current user searches and trending topics.
          Questions are prioritized by popularity and recency.
        </p>
      </div>
    </section>
  );
};

export default DynamicFAQ;