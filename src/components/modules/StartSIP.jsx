import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './ModuleStyles.css';
import QuizComponent from './QuizComponent';

const StartSIP = ({ onBack }) => {
  return (
    <div className="module-page">
      <div className="module-header">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft />
        </button>
        <h1>Starting an SIP</h1>
      </div>

      <div className="module-content">
        <section className="module-section">
          <p className="module-intro">
            The simple, powerful way to build wealth one small step at a time.
          </p>
        </section>
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
            <h2>The Power of Compounding</h2>
            <p>
                The real magic of SIPs happens over the long term. Not only do you benefit from averaging, but your investments start to generate their own earnings. Then, those earnings start to generate *their own* earnings. This snowball effect is called compounding. A small amount invested regularly can grow into a very large sum over 15, 20, or 30 years, which is why it's so important to start as early as you can.
            </p>
        </section>
        
        <section className="module-section quiz-section">
          <h2>Test Your Knowledge</h2>
          <QuizComponent topic="sip" />
        </section>
      </div>
    </div>
  );
};

export default StartSIP;