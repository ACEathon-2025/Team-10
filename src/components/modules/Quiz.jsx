import React, { useState } from 'react';
import './ModuleDetail.css'; // The quiz styles will be in this shared file

const Quiz = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (option) => {
    if (selectedAnswer !== null) return; // Prevent changing answer
    setSelectedAnswer(option);
    const correct = questions[currentQuestionIndex].correctAnswer === option;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };
  
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setShowResult(false);
  }

  if (showResult) {
    return (
      <div className="quiz-result">
        <h2>Quiz Complete!</h2>
        <p>You scored <strong>{score}</strong> out of <strong>{questions.length}</strong></p>
        <button onClick={handleRestartQuiz} className="quiz-button">Try Again</button>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div className="quiz-question">
        <p className="question-counter">Question {currentQuestionIndex + 1}/{questions.length}</p>
        <h3>{currentQuestion.question}</h3>
      </div>
      <ul className="quiz-options">
        {currentQuestion.options.map((option, index) => {
          let className = 'option';
          if (selectedAnswer !== null) {
            if (option === currentQuestion.correctAnswer) {
              className += ' correct';
            } else if (option === selectedAnswer) {
              className += ' incorrect';
            }
          }
          return (
            <li key={index} className={className} onClick={() => handleAnswerSelect(option)}>
              {option}
            </li>
          );
        })}
      </ul>
      {selectedAnswer && (
        <div className="quiz-feedback">
          <p className={isCorrect ? 'feedback-correct' : 'feedback-incorrect'}>
            {isCorrect ? 'Correct!' : 'Not quite!'}
          </p>
          <button onClick={handleNextQuestion} className="quiz-button">
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Show Results'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;