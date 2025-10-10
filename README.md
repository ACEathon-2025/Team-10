# FinNovate 💸

A financial literacy web application designed for the **ACEATHON 2025** Finance theme. FinNovate provides a guided journey to help Indian students transition from managing education debt to building long-term wealth.

## 🎯 The Problem
With over **₹90,000 crore in outstanding education loans** and a national **financial literacy rate of only 27%**, India's youth face significant financial challenges upon graduation. This lack of financial knowledge often leads to increased loan defaults (NPAs), financial stress, and a delay in personal wealth creation, which limits the economic potential of our demographic dividend.

## ✨ Our Solution
FinNovate tackles this problem with a unique **"Debt-First" approach** that focuses on the most immediate financial concern for students: their education loan. Our platform is a complete, step-by-step guide that takes users from learning the absolute basics to building their own personalized financial plan.

## 🚀 Key Features
Our application follows a simple three-step methodology:

* **1. Learn 📚**
    * Access curated, bite-sized micro-learning modules on essential Indian financial topics like CIBIL scores, SIPs, and retirement planning. Each 5-minute lesson includes interactive quizzes to ensure comprehension.

* **2. Practice 🕹️**
    * Apply knowledge in a hyper-realistic, **risk-free simulation engine**. Users can practice investing with virtual money on a simulated Indian stock market (NSE/BSE) or model different repayment strategies for their education loan.

* **3. Plan 📈**
    * Transition from practice to reality with **personalized financial roadmaps**. The app analyzes simulation performance to generate actionable insights, including optimized debt repayment schedules and custom investment strategies.

## 🛠️ Built With
This web application was built using modern web technologies:
* [React.js](https://reactjs.org/)
* [CSS3](https://en.wikipedia.org/wiki/CSS) & Flexbox
* [HTML5](https://en.wikipedia.org/wiki/HTML5)
* [JavaScript (ES6+)](https://www.javascript.com/)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ACEathon-2025/Team-10.git
   cd Team-10
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file and add your API keys:
   ```env
   # NewsAPI key (already configured)
   NEWS_API_KEY=ea02476d8cdc465f8766d06611fadfd5

   # OpenAI API key (optional - app works without it)
   # OPENAI_API_KEY=your_actual_openai_api_key_here
   ```

   **⚠️ Security Note:** Never commit your `.env` file to version control. It contains sensitive API keys.

4. **Start the application with a single command**
   ```bash
   npm run dev
   ```

   This single command starts both the React app (http://localhost:3000) and API server (http://localhost:3001) simultaneously!

## 🔑 API Keys Setup

### NewsAPI (Free Tier)
1. Visit [NewsAPI.org](https://newsapi.org/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file as `NEWS_API_KEY`

### OpenAI API
1. Visit [OpenAI Platform](https://platform.openai.com/account/api-keys)
2. Sign in to your OpenAI account
3. Create a new API key
4. Add it to your `.env` file as `OPENAI_API_KEY`

**Note:** OpenAI provides free credits for new accounts. The news summarization feature uses minimal tokens.

## 📁 Project Structure

```
Team-10/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   ├── utils/             # Utility functions
│   └── ...
├── api/                   # Backend API routes
├── .env.example           # Environment variables template
└── server.mjs            # Express server
```
