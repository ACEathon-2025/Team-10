# 🚀 FinNovate - Financial Literacy App

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()

> **A beginner-friendly financial literacy platform designed for Indian students** 💰📚

---

## 📖 Table of Contents
- [🎯 What is FinNovate?](#-what-is-finnovate)
- [🌟 Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start Guide](#-quick-start-guide)
- [📋 Prerequisites](#-prerequisites)
- [⚙️ Installation](#️-installation)
- [🎮 How to Use](#-how-to-use)
- [📁 Project Structure](#-project-structure)
- [🔧 API Configuration](#-api-configuration)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👥 Team](#-team)

---

## 🎯 What is FinNovate?

**FinNovate** is a comprehensive financial literacy web application built for the **ACEATHON 2025** competition. Our mission is to empower Indian students with essential financial knowledge to make informed decisions about education loans, investments, and wealth building.

### The Problem We're Solving
- **₹90,000+ crore** in outstanding education loans in India
- Only **27%** financial literacy rate among Indians
- Students struggle with debt management and wealth creation
- Lack of accessible, practical financial education

### Our Solution
A **"Learn → Practice → Plan"** approach that takes students from basic concepts to personalized financial strategies.

---

## 🌟 Key Features

### 📚 **Learn Module**
- **Interactive Lessons**: Bite-sized modules on essential topics
- **Progress Tracking**: Visual progress indicators
- **Quizzes**: Test your knowledge with 5-question assessments
- **Topics Covered**:
  - CIBIL Score Management
  - Debt Snowball Method
  - 50/30/20 Budgeting Rule
  - Emergency Funds
  - SIP (Systematic Investment Plan)
  - Stock Market Basics
  - Retirement Planning
  - Education Loan Management

### 📰 **News & Updates**
- **Real-time Financial News**: Latest market updates
- **Category Filtering**: Filter by Stocks, Crypto, Banking, etc.
- **Offline Support**: Works even without internet
- **Smart Summaries**: AI-powered news summaries (optional)

### 📊 **Financial Planning**
- **Interactive Scenarios**: Explore different financial strategies
- **Debt Repayment Calculator**: Optimize your loan payments
- **Investment Planning**: Learn about SIP and mutual funds
- **Personalized Insights**: Get tailored recommendations

### 🎨 **Modern UI/UX**
- **Dark/Light Mode**: Automatic theme switching
- **Responsive Design**: Works on all devices
- **Smooth Animations**: Page transitions and micro-interactions
- **Accessibility**: Screen reader friendly

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern JavaScript library
- **CSS3** - Custom properties for theming
- **React Router** - Client-side routing
- **React Icons** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **NewsAPI** - Financial news integration
- **OpenAI** - AI-powered summaries (optional)

### Development Tools
- **Create React App** - Build setup
- **ESLint** - Code linting
- **Git** - Version control
- **VS Code** - Recommended editor

---

## 🚀 Quick Start Guide

### For Complete Beginners (Step-by-Step)

1. **Install Node.js** 📥
   - Download from [nodejs.org](https://nodejs.org/)
   - Choose the **LTS version** (recommended for beginners)
   - Follow the installation wizard

2. **Verify Installation** ✅
   ```bash
   node --version  # Should show v16 or higher
   npm --version   # Should show a version number
   ```

3. **Clone and Run** 🚀
   ```bash
   git clone https://github.com/ACEathon-2025/Team-10.git
   cd Team-10
   npm install
   npm start
   ```

4. **Open in Browser** 🌐
   - Visit `http://localhost:3000`
   - Start exploring the app!

---

## 📋 Prerequisites

### Required Software
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Git** (for cloning) - [Download here](https://git-scm.com/)
- **Code Editor** (VS Code recommended) - [Download here](https://code.visualstudio.com/)

### System Requirements
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **OS**: Windows 10+, macOS 10.14+, Ubuntu 18.04+

---

## ⚙️ Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/ACEathon-2025/Team-10.git
cd Team-10
```

### Step 2: Install Dependencies
```bash
npm install
```
This will install all required packages (may take 2-3 minutes).

### Step 3: Environment Setup (Optional)
```bash
cp .env.example .env
```

Edit `.env` file with your API keys (explained below).

### Step 4: Start the Application
```bash
npm start
```

**That's it!** Your app will open at `http://localhost:3000`

---

## 🎮 How to Use

### For New Users
1. **Landing Page**: Choose between Learn, News, or Plan
2. **Learn Section**: Start with basic modules, complete quizzes
3. **News Section**: Stay updated with financial news
4. **Plan Section**: Explore financial scenarios and strategies

### Navigation Tips
- Use the **header navigation** to switch between sections
- Click **"Explore this Plan"** to dive deeper into topics
- Use the **back button** (←) to return to previous pages
- Toggle **dark/light mode** using the theme switcher

### Learning Path
```
Start Here → Learn Basics → Take Quizzes → Explore Plans → Create Strategy
```

---

## 📁 Project Structure

```
Team-10/
├── 📁 public/                 # Static files (favicon, icons)
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── 📁 src/                    # React application
│   ├── 📁 components/         # Reusable UI components
│   │   ├── AuthPage.jsx      # Login/Register page
│   │   ├── Header.jsx        # Navigation header
│   │   ├── Hero.jsx          # Landing page
│   │   ├── NewsUpdates.jsx   # News section
│   │   ├── PlanPage.jsx      # Financial planning
│   │   └── modules/          # Learning modules
│   ├── 📁 utils/             # Helper functions
│   ├── App.js               # Main app component
│   ├── index.js             # App entry point
│   └── index.css            # Global styles
├── 📁 api/                   # Backend API routes
│   └── fetch-news.mjs       # News fetching endpoint
├── 📄 server.mjs            # Express server
├── 📄 package.json          # Dependencies & scripts
├── 📄 README.md             # This file!
└── 📄 .env.example          # Environment template
```

---

## 🔧 API Configuration

### NewsAPI (Required for Live News)
1. Visit [newsapi.org](https://newsapi.org/)
2. Create free account
3. Get your API key
4. Add to `.env`:
   ```env
   NEWS_API_KEY=your_api_key_here
   ```

### OpenAI (Optional - For AI Summaries)
1. Visit [platform.openai.com](https://platform.openai.com/)
2. Create account (get free credits)
3. Generate API key
4. Add to `.env`:
   ```env
   OPENAI_API_KEY=your_openai_key_here
   ```

**Note**: The app works perfectly without these APIs using mock data!

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### For Beginners
1. **Fork** this repository
2. **Clone** your fork: `git clone https://github.com/yourusername/Team-10.git`
3. **Create** a feature branch: `git checkout -b feature-name`
4. **Make** your changes
5. **Test** thoroughly: `npm run build`
6. **Commit**: `git commit -m "Add feature description"`
7. **Push**: `git push origin feature-name`
8. **Create** a Pull Request

### Development Guidelines
- Follow React best practices
- Use meaningful commit messages
- Test your changes before submitting
- Keep code clean and well-commented

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Team 10 - ACEATHON 2025**
- **Project Lead**: [Your Name]
- **Frontend Developer**: [Team Member]
- **Backend Developer**: [Team Member]
- **UI/UX Designer**: [Team Member]

### Special Thanks
- ACEATHON 2025 organizers
- Open source community
- Financial education advocates

---

## 📞 Support

### Having Issues?
1. Check the [Issues](https://github.com/ACEathon-2025/Team-10/issues) page
2. Create a new issue with detailed description
3. Include error messages and screenshots

### Common Solutions
- **"npm start" not working?** → Run `npm install` first
- **Port 3000 busy?** → App will automatically use next available port
- **API not working?** → Check your `.env` file and internet connection

---

## 🎉 What's Next?

### Planned Features
- [ ] Mobile App (React Native)
- [ ] User Authentication
- [ ] Progress Saving
- [ ] Advanced Investment Simulator
- [ ] Multi-language Support
- [ ] Offline Mode

### Join the Journey!
Star ⭐ this repository if you found it helpful!
Share with friends who need financial education!

---

**Made with ❤️ for India's financial future**

*Empowering students, building wealth, creating opportunities* 💪🚀
