import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './ModuleDetail.css'; // Use the same shared CSS

const StartSIP = ({ onBack }) => {
  return (
    <div className="module-container">
      <div className="back-button-wrapper">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft className="back-button-icon" />
          <span>Back to Learn</span>
        </button>
      </div>

      <header className="module-header">
        <h1 className="module-title">Starting an SIP</h1>
        <p className="module-intro">
          The simple, powerful way to build wealth one small step at a time.
        </p>
      </header>

      <div className="module-content">
        <section className="module-section">
          <h2>What is a Systematic Investment Plan?</h2>
          <p>
            An SIP is a method of investing a fixed amount of money in mutual funds at regular intervals (usually monthly). Instead of investing a large lump sum at once, you invest smaller amounts consistently. This automates the process of investing and makes it accessible to everyone, even with a small starting amount like ₹500 per month.
          </p>
          
        </section>

        <section className="module-section">
          <h2>A Story: The Two Gardeners</h2>
          <div className="story-block">
            <p>
              In his book <em>"The Little Book of Common Sense Investing,"</em> John Bogle emphasizes consistency. Imagine two gardeners, <strong>Aisha</strong> and <strong>Vikram</strong>, who want to grow a mango grove.
            </p>
            <br/>
            <p>
              Vikram waited for the "perfect" rainy day, trying to time the market. He bought all his saplings (invested a lump sum) on one day. But a dry spell followed, and many saplings withered. Aisha, however, planted one sapling every week (invested via SIP). Some weeks the weather was perfect, other weeks it was harsh.
            </p>
            <br/>
            <p>
              Over the years, Aisha's grove was lush and fruitful. By planting consistently, she bought saplings in all weather conditions, averaging out her risk. She didn't need to predict the weather. Vikram's grove was sparse because his one-time bet didn't pay off. An SIP works the same way; it averages your purchase cost over time, a powerful strategy known as **Rupee Cost Averaging**.
            </p>
          </div>
        </section>

        <section className="module-section">
          <h2>Why It's So Powerful</h2>
          <p>
            SIPs are popular because they build discipline and harness the power of compounding. By investing regularly, you buy more units when the market is low and fewer when it's high, which can lead to better returns over the long term.
          </p>
          <div className="key-takeaways">
            <h2>Key Takeaways</h2>
            <ul>
              <li>An SIP is an automated way to invest a fixed amount regularly.</li>
              <li>It reduces risk through Rupee Cost Averaging.</li>
              <li>It helps build long-term wealth through consistency and compounding.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StartSIP;