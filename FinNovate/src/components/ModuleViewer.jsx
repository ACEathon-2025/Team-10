import React, { useMemo, useState } from 'react';
import './ModuleViewer.css';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function ProgressBar({ currentIndex, total }) {
  const progressPercent = useMemo(() => {
    if (total <= 1) return 100;
    return Math.round(((currentIndex + 1) / total) * 100);
  }, [currentIndex, total]);

  return (
    <div className="mv-progress">
      <div className="mv-progress-track">
        <div className="mv-progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>
      <span className="mv-progress-label">{progressPercent}%</span>
    </div>
  );
}

function NavControls({ canPrev, canNext, onPrev, onNext, onExit }) {
  return (
    <div className="mv-nav">
      <button className="mv-btn ghost" onClick={onExit} aria-label="Exit module">Exit</button>
      <div className="mv-nav-spacer" />
      <button className="mv-btn" onClick={onPrev} disabled={!canPrev} aria-label="Previous slide">Back</button>
      <button className="mv-btn primary" onClick={onNext} disabled={!canNext} aria-label="Next slide">Next</button>
    </div>
  );
}

function Quiz({ question, options, correctIndex, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = submitted && selected === correctIndex;

  return (
    <div className="mv-quiz">
      <h3 className="mv-quiz-title">Quick Check</h3>
      <p className="mv-quiz-question">{question}</p>
      <div className="mv-quiz-options">
        {options.map((opt, idx) => (
          <button
            key={idx}
            className={`mv-quiz-option${selected === idx ? ' selected' : ''}${submitted && idx === correctIndex ? ' correct' : ''}${submitted && selected === idx && idx !== correctIndex ? ' wrong' : ''}`}
            onClick={() => !submitted && setSelected(idx)}
            disabled={submitted}
          >
            {opt}
          </button>
        ))}
      </div>
      {!submitted && (
        <button
          className="mv-btn primary mv-quiz-submit"
          onClick={() => {
            if (selected === null) return;
            setSubmitted(true);
            setTimeout(() => onComplete(selected === correctIndex), 900);
          }}
          disabled={selected === null}
        >
          Submit
        </button>
      )}
      {submitted && (
        <div className={`mv-quiz-feedback ${isCorrect ? 'success' : 'error'}`}>
          {isCorrect ? 'Great job! You got it right.' : 'Close! Review and try again next time.'}
        </div>
      )}
    </div>
  );
}

export default function ModuleViewer({ moduleKey, moduleData, onExit }) {
  const slides = moduleData?.[moduleKey] || [];
  const [index, setIndex] = useState(0);

  const total = slides.length;
  const current = slides[index] || {};

  const canPrev = index > 0;
  const canNext = index < total - 1;

  const goPrev = () => setIndex((i) => clamp(i - 1, 0, total - 1));
  const goNext = () => setIndex((i) => clamp(i + 1, 0, total - 1));

  return (
    <div className="mv-container">
      <div className="mv-card">
        <ProgressBar currentIndex={index} total={total} />

        <div className="mv-slide">
          {current.image && (
            <div className="mv-media">
              <img src={current.image} alt={current.imageAlt || current.title || 'slide visual'} />
            </div>
          )}
          {current.chart && (
            <div className="mv-media">
              {current.chart}
            </div>
          )}
          <div className="mv-content">
            {current.kicker && <span className="mv-kicker">{current.kicker}</span>}
            {current.title && <h2 className="mv-title">{current.title}</h2>}
            {current.text && (
              <div className="mv-text">
                {Array.isArray(current.text) ? current.text.map((t, i) => <p key={i}>{t}</p>) : <p>{current.text}</p>}
              </div>
            )}
          </div>
        </div>

        {current.quiz ? (
          <Quiz
            question={current.quiz.question}
            options={current.quiz.options}
            correctIndex={current.quiz.correctIndex}
            onComplete={() => setTimeout(() => onExit?.(), 400)}
          />
        ) : (
          <NavControls canPrev={canPrev} canNext={canNext} onPrev={goPrev} onNext={goNext} onExit={onExit} />
        )}
      </div>
    </div>
  );
}


