import React from 'react';

// Narrative slide data for each module key
// Each slide keeps content very brief and visual-first

const cdn = (name) => `/assets/${name}`; // expects images in public/assets

export const learningModules = {
  educationLoan: [
    {
      kicker: 'Chapter 1',
      title: 'The Tuition Mountain',
      text: [
        'A student stands before a tall mountain: fees, books, living.',
        'Loans are the bridge—powerful, but best crossed wisely.'
      ],
      image: cdn('finance_illustration.svg'),
      imageAlt: 'Student viewing a mountain of expenses'
    },
    {
      kicker: 'Chapter 2',
      title: 'Borrow Only What You Need',
      text: [
        'Estimate total annual cost, minus scholarships and family support.',
        'Keep an emergency buffer small to avoid over-borrowing.'
      ],
      image: cdn('logo.svg'),
      imageAlt: 'Balanced scale representing needs vs wants'
    },
    {
      kicker: 'Chapter 3',
      title: 'Know the Interest',
      text: [
        'Compare interest type: simple vs compound, fixed vs floating.',
        'Even small rate differences change total cost dramatically.'
      ],
      chart: (
        <svg viewBox="0 0 220 120" width="100%" height="100%" role="img" aria-label="Interest growth comparison">
          <rect x="0" y="0" width="220" height="120" fill="transparent" />
          <polyline points="10,100 70,90 130,70 190,40" fill="none" stroke="#38bdf8" strokeWidth="3" />
          <polyline points="10,100 70,95 130,90 190,80" fill="none" stroke="#94a3b8" strokeWidth="3" />
          <text x="14" y="112" fontSize="10" fill="currentColor">time</text>
          <text x="160" y="22" fontSize="10" fill="#38bdf8">compound</text>
          <text x="160" y="92" fontSize="10" fill="#94a3b8">simple</text>
        </svg>
      )
    },
    {
      kicker: 'Final Step',
      title: 'Your Turn',
      text: ['Pick the smarter path: small steps today lower stress tomorrow.'],
      quiz: {
        question: 'Which action reduces your total loan cost the most?',
        options: [
          'Delaying payments until grace ends',
          'Paying interest during study period',
          'Borrowing extra for lifestyle'
        ],
        correctIndex: 1
      }
    }
  ],

  cibilScore: [
    { kicker: 'Scene 1', title: 'Your Financial Report Card', text: [
      'CIBIL score (300-900) summarizes your credit habits.',
      'Lenders glance at it first to decide trust.'
    ], image: cdn('finance_illustration.svg') },
    { kicker: 'Scene 2', title: 'What Moves the Needle', text: [
      'On-time payments matter most.',
      'Lower credit utilization (<30%) helps.'
    ], image: cdn('logo.svg') },
    { kicker: 'Final Step', title: 'Quick Check', text: ['Small habits, big score.'], quiz: {
      question: 'Best habit for a strong score?',
      options: ['Apply for many cards quickly', 'Pay bills on time consistently', 'Max out your limits'],
      correctIndex: 1
    }}
  ],

  sipBasics: [
    { kicker: 'Start', title: 'Tiny Drops, Big Ocean', text: [
      'SIP invests a fixed amount regularly.',
      'Volatility smooths over time.'
    ], image: cdn('finance_illustration.svg') },
    { kicker: 'Grow', title: 'Power of Compounding', text: [
      'Reinvested gains earn gains.',
      'Time in market beats timing the market.'
    ], chart: (
      <svg viewBox="0 0 220 120" width="100%" height="100%" role="img" aria-label="Compounding curve">
        <rect x="0" y="0" width="220" height="120" fill="transparent" />
        <path d="M10 100 C 70 95, 130 80, 190 40" stroke="#22c55e" strokeWidth="3" fill="none" />
      </svg>
    ) },
    { kicker: 'Finish', title: 'Quick Check', text: ['Stay consistent and patient.'], quiz: {
      question: 'SIP works best when you…',
      options: ['Invest irregularly', 'Invest regularly over years', 'Stop during dips'],
      correctIndex: 1
    }}
  ],

  stockBasics: [
    { kicker: 'Act 1', title: 'Owning a Slice', text: [
      'A stock is ownership in a company.',
      'Price moves with business and sentiment.'
    ], image: cdn('finance_illustration.svg') },
    { kicker: 'Act 2', title: 'Risk and Reward', text: [
      'Higher potential returns come with higher risk.',
      'Diversify to reduce single-stock shocks.'
    ], image: cdn('logo.svg') },
    { kicker: 'Final', title: 'Quick Check', text: ['Basics first, then explore.'], quiz: {
      question: 'A simple way to reduce risk is…',
      options: ['Put all money in one stock', 'Diversify across sectors', 'Chase hot tips only'],
      correctIndex: 1
    }}
  ],

  retirementPlanning: [
    { kicker: 'Scene 1', title: 'Future You', text: [
      'Retirement is a long journey; start with small steps now.',
      'Time multiplies savings.'
    ], image: cdn('finance_illustration.svg') },
    { kicker: 'Scene 2', title: 'Inflation and Goals', text: [
      'Costs rise with time.',
      'Invest to outpace inflation.'
    ], chart: (
      <svg viewBox="0 0 220 120" width="100%" height="100%" role="img" aria-label="Inflation vs investment">
        <polyline points="10,100 190,80" fill="none" stroke="#ef4444" strokeWidth="3" />
        <polyline points="10,100 190,50" fill="none" stroke="#38bdf8" strokeWidth="3" />
      </svg>
    ) },
    { kicker: 'Final', title: 'Quick Check', text: ['Automate, increase yearly, stay the course.'], quiz: {
      question: 'A helpful habit for retirement is…',
      options: ['Skip investing in your 20s', 'Automate monthly contributions', 'Withdraw during dips'],
      correctIndex: 1
    }}
  ]
};


