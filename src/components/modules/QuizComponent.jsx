import React, { useState, useEffect, useCallback } from 'react';
import { FaCheckCircle, FaTimesCircle, FaQuestion, FaTrophy, FaRedo, FaChevronRight } from 'react-icons/fa';
import Button from '../Button';
import './ModuleStyles.css';

const QuizComponent = ({ topic, onComplete = () => {} }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  // Dynamic quiz questions based on topics
  const getQuizQuestions = (topic) => {
    const quizData = {
      'stock-basics': [
        {
          question: "What does buying a stock represent?",
          options: [
            "Ownership in a company",
            "A loan to the company",
            "A guarantee of profits",
            "Company management rights"
          ],
          correct: 0,
          explanation: "Buying stocks means you own a share of the company and can benefit from its growth through dividends and price appreciation."
        },
        {
          question: "What is the main difference between NSE and BSE?",
          options: [
            "NSE is older than BSE",
            "NSE is more technology-driven",
            "BSE has more companies listed",
            "They are exactly the same"
          ],
          correct: 1,
          explanation: "NSE (National Stock Exchange) is more modern and technology-driven compared to BSE (Bombay Stock Exchange)."
        },
        {
          question: "What is a 'bull market'?",
          options: [
            "When stock prices are falling",
            "When stock prices are rising",
            "When trading volume is low",
            "When companies go bankrupt"
          ],
          correct: 1,
          explanation: "A bull market refers to a market condition where stock prices are rising or expected to rise."
        },
        {
          question: "What should you do first before investing in stocks?",
          options: [
            "Buy the most expensive stock",
            "Research the company thoroughly",
            "Sell all your savings",
            "Ignore market news"
          ],
          correct: 1,
          explanation: "Always research companies, their financials, management, and industry before investing."
        },
        {
          question: "What is diversification in investing?",
          options: [
            "Putting all money in one stock",
            "Spreading investments across different assets",
            "Trading frequently",
            "Investing only in foreign stocks"
          ],
          correct: 1,
          explanation: "Diversification means spreading your investments across different stocks, sectors, and asset types to reduce risk."
        }
      ],
      'sip': [
        {
          question: "What does SIP stand for?",
          options: [
            "Systematic Investment Plan",
            "Stock Investment Program",
            "Savings Interest Plan",
            "Share Investment Portfolio"
          ],
          correct: 0,
          explanation: "SIP stands for Systematic Investment Plan, which allows regular, fixed investments in mutual funds."
        },
        {
          question: "What is the main benefit of rupee cost averaging in SIP?",
          options: [
            "Guaranteed high returns",
            "Reduces the impact of market timing",
            "Eliminates all investment risk",
            "Only works in bull markets"
          ],
          correct: 1,
          explanation: "Rupee cost averaging helps by buying more units when prices are low and fewer when high, averaging out the purchase cost."
        },
        {
          question: "When should you stop your SIP investment?",
          options: [
            "During every market downturn",
            "When you need cash urgently",
            "After achieving your financial goals",
            "Never stop once started"
          ],
          correct: 2,
          explanation: "Stop SIP only after achieving your financial goals or if you genuinely need the money for emergencies."
        },
        {
          question: "What happens to your SIP during market volatility?",
          options: [
            "Your investments are automatically stopped",
            "You buy more units at lower prices",
            "You lose all your money",
            "Nothing changes"
          ],
          correct: 1,
          explanation: "During market falls, your SIP buys more units at lower prices, which benefits you long-term."
        },
        {
          question: "What is the minimum amount for starting a SIP?",
          options: [
            "₹1 lakh",
            "₹10,000",
            "₹100 (varies by fund)",
            "₹50,000"
          ],
          correct: 2,
          explanation: "Most mutual funds allow SIP starting from as low as ₹100-500 per month, making it accessible to everyone."
        }
      ],
      'retirement-planning': [
        {
          question: "When is the best time to start retirement planning?",
          options: [
            "At age 50",
            "At age 35",
            "As early as possible",
            "Just before retirement"
          ],
          correct: 2,
          explanation: "The power of compounding makes starting early extremely valuable for retirement planning."
        },
        {
          question: "What is the 4% rule in retirement planning?",
          options: [
            "Invest 4% of salary monthly",
            "Withdraw 4% annually from retirement corpus",
            "Get 4% guaranteed returns",
            "Save 4% of income"
          ],
          correct: 1,
          explanation: "The 4% rule suggests you can withdraw 4% of your retirement corpus annually without running out of money."
        },
        {
          question: "Which investment has tax benefits for retirement?",
          options: [
            "Regular savings account",
            "NPS (National Pension System)",
            "Gold investment",
            "Real estate"
          ],
          correct: 1,
          explanation: "NPS offers tax benefits under Section 80C and additional tax advantages for retirement planning."
        },
        {
          question: "How does inflation affect retirement planning?",
          options: [
            "It increases your savings",
            "It reduces purchasing power over time",
            "It has no impact",
            "It only affects investments"
          ],
          correct: 1,
          explanation: "Inflation reduces the purchasing power of money over time, so your retirement corpus must beat inflation."
        },
        {
          question: "What percentage of income should you save for retirement?",
          options: [
            "5-10%",
            "15-25%",
            "50-70%",
            "100%"
          ],
          correct: 1,
          explanation: "Financial experts recommend saving 15-25% of your income for a comfortable retirement."
        }
      ],
      'cibil-score': [
        {
          question: "What is the range of CIBIL score?",
          options: [
            "0-100",
            "100-500",
            "300-900",
            "500-1000"
          ],
          correct: 2,
          explanation: "CIBIL scores range from 300 to 900, with higher scores indicating better creditworthiness."
        },
        {
          question: "Which factor has the highest weight in CIBIL score?",
          options: [
            "Credit utilization",
            "Payment history",
            "Credit age",
            "Number of credit cards"
          ],
          correct: 1,
          explanation: "Payment history carries the highest weight (35%) in calculating your CIBIL score."
        },
        {
          question: "What should be your credit utilization ratio?",
          options: [
            "Above 50%",
            "Below 30%",
            "Above 80%",
            "100%"
          ],
          correct: 1,
          explanation: "Keep your credit utilization below 30% to maintain a good CIBIL score."
        },
        {
          question: "How often can you check your CIBIL score for free?",
          options: [
            "Daily",
            "Weekly",
            "Monthly",
            "Annually"
          ],
          correct: 3,
          explanation: "You can check your CIBIL score for free once annually from the CIBIL website."
        },
        {
          question: "What happens if you miss a credit card payment?",
          options: [
            "Nothing significant",
            "Small increase in score",
            "Significant negative impact",
            "Score becomes zero"
          ],
          correct: 2,
          explanation: "Missing payments has a significant negative impact on your CIBIL score."
        }
      ],
      'education-loans': [
        {
          question: "What is the typical interest rate for education loans?",
          options: [
            "2-5%",
            "8.5-15%",
            "25-30%",
            "50%+"
          ],
          correct: 1,
          explanation: "Education loan interest rates typically range from 8.5% to 15%, depending on the bank and borrower profile."
        },
        {
          question: "When does repayment of education loan start?",
          options: [
            "Immediately after loan sanction",
            "During the course period",
            "After course completion + grace period",
            "After 10 years"
          ],
          correct: 2,
          explanation: "Repayment starts after course completion plus a 6-12 month grace period to allow time for job placement."
        },
        {
          question: "Who can be a co-applicant for education loan?",
          options: [
            "Only parents",
            "Only siblings",
            "Parents, siblings, or spouse",
            "Only bank employees"
          ],
          correct: 2,
          explanation: "Co-applicants can be parents, siblings, or spouse who provide financial guarantee for the loan."
        },
        {
          question: "What is the maximum loan amount for education loans?",
          options: [
            "₹1 lakh",
            "₹4 lakhs",
            "₹10 lakhs",
            "₹1.5 crores (for premier institutions)"
          ],
          correct: 3,
          explanation: "Education loans can go up to ₹1.5 crores for studies at premier institutions abroad."
        },
        {
          question: "Are education loans taxable?",
          options: [
            "Always taxable",
            "Never taxable",
            "Interest portion is tax-deductible",
            "Principal amount is tax-deductible"
          ],
          correct: 2,
          explanation: "The interest portion of education loans is tax-deductible under Section 80E of the Income Tax Act."
        }
      ],
      'what-is-budgeting': [
        {
          question: "What is the primary purpose of a budget?",
          options: [
            "To stop you from spending money",
            "To give your money a plan and control",
            "To track your past mistakes",
            "To get a loan"
          ],
          correct: 1,
          explanation: "A budget gives your money a clear plan and helps you maintain control over your finances."
        },
        {
          question: "In the story, what was Priya's 'money leak'?",
          options: [
            "Buying clothes",
            "Eating out for dinner",
            "Daily fancy coffees",
            "Subscribing to streaming services"
          ],
          correct: 2,
          explanation: "Priya's daily fancy coffees were costing her ₹4,000 a month, which could have been saved for her trip."
        },
        {
          question: "What should you do if you overspend in one category?",
          options: [
            "Give up on budgeting completely",
            "Adjust other categories to compensate",
            "Ignore it and continue spending",
            "Stop using your cards"
          ],
          correct: 1,
          explanation: "If you overspend in one area, adjust spending in other categories to stay within your overall budget."
        },
        {
          question: "Why is tracking expenses important?",
          options: [
            "To feel guilty about spending",
            "To understand where your money goes",
            "To restrict all fun activities",
            "To compare with friends"
          ],
          correct: 1,
          explanation: "Tracking expenses helps you understand your spending patterns and make better financial decisions."
        },
        {
          question: "What is the 50/30/20 rule?",
          options: [
            "Spend 50% on needs, 30% on wants, 20% on savings",
            "Spend 50% on wants, 30% on needs, 20% on debt",
            "Spend 50% on savings, 30% on needs, 20% on wants",
            "Spend 50% on debt, 30% on wants, 20% on needs"
          ],
          correct: 0,
          explanation: "The 50/30/20 rule suggests allocating 50% of income to needs, 30% to wants, and 20% to savings/debt repayment."
        }
      ],
      'savings-accounts': [
        {
          question: "What is the main benefit of a savings account?",
          options: [
            "High-risk, high-return investments",
            "It's a safe place to keep money and earn interest",
            "It allows you to spend money easily",
            "It's used for buying stocks"
          ],
          correct: 1,
          explanation: "Savings accounts provide a safe place to store money while earning interest on your balance."
        },
        {
          question: "What is compound interest?",
          options: [
            "Interest that is simple to calculate",
            "Interest earned only on your initial deposit",
            "Interest earned on both your initial deposit and the interest it has already earned",
            "A type of loan"
          ],
          correct: 2,
          explanation: "Compound interest means you earn interest on both your original deposit and the interest you've already earned."
        },
        {
          question: "What is the minimum balance requirement for savings accounts?",
          options: [
            "Always ₹1 lakh",
            "Varies by bank, can be ₹0-₹10,000",
            "Always ₹50,000",
            "No minimum balance needed"
          ],
          correct: 1,
          explanation: "Minimum balance requirements vary by bank, ranging from ₹0 for zero-balance accounts to ₹10,000 or more."
        },
        {
          question: "What is the current interest rate range for savings accounts?",
          options: [
            "1-2% per annum",
            "3-7% per annum",
            "10-15% per annum",
            "20-25% per annum"
          ],
          correct: 1,
          explanation: "Savings account interest rates typically range from 3-7% per annum, depending on the bank and balance."
        },
        {
          question: "What is the magic of starting to save early?",
          options: [
            "You get higher interest rates",
            "The power of compounding over time",
            "Banks give you bonus money",
            "You avoid all fees"
          ],
          correct: 1,
          explanation: "Starting early allows compound interest to work for longer periods, significantly growing your savings."
        }
      ],
      'emergency-funds': [
        {
          question: "What is the primary purpose of an emergency fund?",
          options: [
            "To invest in the stock market",
            "To pay for planned vacations",
            "To cover unexpected, urgent expenses",
            "To buy luxury items"
          ],
          correct: 2,
          explanation: "An emergency fund is specifically for covering unexpected expenses like medical emergencies, job loss, or urgent repairs."
        },
        {
          question: "How much should you ideally save in an emergency fund?",
          options: [
            "1 month of income",
            "3-6 months of essential living expenses",
            "1 year of income",
            "Enough to buy a new car"
          ],
          correct: 1,
          explanation: "Financial experts recommend 3-6 months of essential living expenses as an emergency fund."
        },
        {
          question: "Where should you keep your emergency fund?",
          options: [
            "In the stock market",
            "In a high-yield savings account or liquid fund",
            "Under your mattress",
            "In cryptocurrency"
          ],
          correct: 1,
          explanation: "Emergency funds should be kept in easily accessible, low-risk options like savings accounts or liquid funds."
        },
        {
          question: "When should you use your emergency fund?",
          options: [
            "For planned purchases",
            "For investment opportunities",
            "Only for true emergencies",
            "Whenever you need cash"
          ],
          correct: 2,
          explanation: "Emergency funds should only be used for genuine emergencies, not for planned expenses or investments."
        },
        {
          question: "What is the best way to build an emergency fund?",
          options: [
            "Save a lump sum all at once",
            "Set aside a small amount regularly",
            "Borrow money when needed",
            "Skip saving and use credit cards"
          ],
          correct: 1,
          explanation: "Building an emergency fund gradually by setting aside a small amount regularly is more sustainable and achievable."
        }
      ]
    };

    return quizData[topic] || [];
  };

  const questions = getQuizQuestions(topic);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleAnswerSubmit = useCallback((forcedAnswer = null) => {
    const answer = forcedAnswer !== null ? forcedAnswer : selectedAnswer;
    const isCorrect = answer === questions[currentQuestion].correct;

    const answerData = {
      question: currentQuestion,
      selected: answer,
      correct: questions[currentQuestion].correct,
      isCorrect,
      timeSpent: quizStartTime ? Math.floor((Date.now() - quizStartTime) / 1000) : 30
    };

    setAnswers([...answers, answerData]);

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);
  }, [selectedAnswer, questions, currentQuestion, quizStartTime, answers, score]);

  useEffect(() => {
    if (questions.length > 0 && !quizStartTime && quizStarted) {
      setQuizStartTime(Date.now());
    }
  }, [questions, quizStartTime, quizStarted]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !quizCompleted && quizStarted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult && quizStarted) {
      handleAnswerSubmit(null); // Auto-submit when time runs out
    }
  }, [timeLeft, showResult, quizCompleted, quizStarted, handleAnswerSubmit]);

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(30);
    setQuizStartTime(Date.now());
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
      setQuizStartTime(Date.now());
    } else {
      setQuizCompleted(true);
      if (onComplete) {
        const finalScore = score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0);
        onComplete(finalScore, questions.length);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
    setAnswers([]);
    setTimeLeft(30);
    setQuizStartTime(null);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return { message: "Excellent! 🎉", color: "var(--success-color)" };
    if (percentage >= 60) return { message: "Good job! 👍", color: "var(--warning-color)" };
    return { message: "Keep learning! 📚", color: "var(--error-color)" };
  };

  if (questions.length === 0) {
    return (
      <section className="module-section">
        <div className="quiz-loading">
          <FaQuestion />
          <p>Loading quiz questions...</p>
        </div>
      </section>
    );
  }

  if (quizCompleted) {
    const scoreMessage = getScoreMessage();
    return (
      <section className="module-section">
        <div className="quiz-completed">
          <div className="quiz-header">
            <FaTrophy />
            <h2>Quiz Completed!</h2>
          </div>

          <div className="final-score">
            <div className="score-circle" style={{ borderColor: scoreMessage.color }}>
              <span className="score-number">{score}/{questions.length}</span>
              <span className="score-percentage">
                {Math.round((score / questions.length) * 100)}%
              </span>
            </div>
            <h3 style={{ color: scoreMessage.color }}>{scoreMessage.message}</h3>
          </div>

          <div className="quiz-stats">
            <div className="stat-item">
              <span className="stat-label">Correct Answers:</span>
              <span className="stat-value">{score}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Questions:</span>
              <span className="stat-value">{questions.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Accuracy:</span>
              <span className="stat-value">{Math.round((score / questions.length) * 100)}%</span>
            </div>
          </div>

          <div className="quiz-actions">
            <Button
              variant="secondary"
              size="medium"
              onClick={restartQuiz}
              className="restart-button"
            >
              <FaRedo /> Try Again
            </Button>
          </div>

          <div className="learning-tips">
            <h4>💡 Learning Tips:</h4>
            <ul>
              <li>Review the explanations for questions you got wrong</li>
              <li>Revisit the learning modules for better understanding</li>
              <li>Practice regularly to improve your financial knowledge</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

  const currentQ = questions[currentQuestion];

  // Show start screen if quiz hasn't started yet
  if (!quizStarted) {
    return (
      <section className="module-section">
        <div className="quiz-start-screen">
          <div className="start-header">
            <FaQuestion className="quiz-icon" />
            <h2>Ready for the Quiz?</h2>
            <p>Test your knowledge and earn your certificate!</p>
          </div>

          <div className="quiz-info">
            <div className="info-item">
              <span className="info-icon">📚</span>
              <span>{questions.length} Questions</span>
            </div>
            <div className="info-item">
              <span className="info-icon">⏱️</span>
              <span>30 Seconds per Question</span>
            </div>
            <div className="info-item">
              <span className="info-icon">🎯</span>
              <span>Multiple Choice</span>
            </div>
          </div>

          <div className="start-instructions">
            <h3>How it works:</h3>
            <ul>
              <li>Each question has a 30-second timer</li>
              <li>Select your answer and click submit</li>
              <li>Review explanations for each answer</li>
              <li>Aim for a high score to master the topic!</li>
            </ul>
          </div>

          <Button
            variant="primary"
            size="large"
            onClick={startQuiz}
            className="start-quiz-button"
          >
            <FaChevronRight /> Start Quiz
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="module-section">
      <div className="quiz-header">
        <h2><FaQuestion /> Knowledge Check</h2>
        <div className="quiz-progress">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="quiz-content">
        <div className="question-card">
          <div className="timer">
            <div className="timer-bar">
              <div
                className="timer-fill"
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              ></div>
            </div>
            <span className="time-left">{timeLeft}s</span>
          </div>

          <h3 className="question-text">{currentQ.question}</h3>

          <div className="options">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedAnswer === index ? 'selected' :
                  showResult ? (
                    index === currentQ.correct ? 'correct' :
                    index === selectedAnswer ? 'incorrect' : ''
                  ) : ''
                }`}
                onClick={() => !showResult && handleAnswerSelect(index)}
                disabled={showResult}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
                {showResult && index === currentQ.correct && <FaCheckCircle />}
                {showResult && index === selectedAnswer && index !== currentQ.correct && <FaTimesCircle />}
              </button>
            ))}
          </div>

          {showResult && (
            <div className="result-feedback">
              <div className="explanation">
                <h4>Explanation:</h4>
                <p>{currentQ.explanation}</p>
              </div>
              <Button
                variant="primary"
                size="medium"
                onClick={nextQuestion}
                className="next-button"
              >
                {currentQuestion < questions.length - 1 ? (
                  <>Next Question <FaChevronRight /></>
                ) : (
                  <>View Results <FaTrophy /></>
                )}
              </Button>
            </div>
          )}

          {!showResult && selectedAnswer !== null && (
            <Button
              variant="success"
              size="medium"
              onClick={() => handleAnswerSubmit()}
              className="submit-button"
            >
              Submit Answer
            </Button>
          )}
        </div>

        <div className="quiz-sidebar">
          <div className="current-score">
            <h4>Current Score</h4>
            <div className="score-display">
              <span className="score-number">{score}</span>
              <span className="score-total">/{currentQuestion + (showResult ? 1 : 0)}</span>
            </div>
          </div>

          <div className="question-indicators">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`question-indicator ${
                  index < currentQuestion ? 'completed' :
                  index === currentQuestion ? 'current' : 'upcoming'
                }`}
              >
                {index < currentQuestion && (
                  answers[index]?.isCorrect ? <FaCheckCircle /> : <FaTimesCircle />
                )}
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizComponent;