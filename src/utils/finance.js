// utils/finance.js

// EMI Calculator
export function calculateEMI(principal, annualRatePercent, tenureYears) {
  const r = annualRatePercent / 100 / 12; // monthly rate
  const n = tenureYears * 12;
  if (r === 0) return { emi: principal / n, totalPayment: principal, totalInterest: 0 };
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;
  return {
    emi: Number(emi.toFixed(2)),
    totalPayment: Number(totalPayment.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2))
  };
}

// SIP Future Value Calculator
export function calculateSIPFutureValue(monthlyContribution, annualReturnPercent, years) {
  const r = annualReturnPercent / 100 / 12; // monthly return rate
  const n = years * 12; // number of months
  const fv = monthlyContribution * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const totalInvested = monthlyContribution * n;
  const gains = fv - totalInvested;
  return {
    futureValue: Number(fv.toFixed(2)),
    totalInvested: Number(totalInvested.toFixed(2)),
    gains: Number(gains.toFixed(2))
  };
}

// Compound Interest Calculator
export function calculateCompoundInterest(principal, annualRatePercent, years) {
  const r = annualRatePercent / 100;
  const fv = principal * Math.pow(1 + r, years);
  const interest = fv - principal;
  return {
    futureValue: Number(fv.toFixed(2)),
    totalInterest: Number(interest.toFixed(2))
  };
}

// CIBIL Score Simulator (simplified rule-based)
export function simulateCIBILScore(currentScore, utilizationPercent, missedPayments, newInquiries, creditAgeMonths) {
  let delta = 0;

  // Payment history (35% weight)
  if (missedPayments === 0) delta += 35;
  else if (missedPayments === 1) delta -= 50;
  else delta -= 100;

  // Credit utilization (30% weight)
  if (utilizationPercent <= 30) delta += 30;
  else if (utilizationPercent <= 50) delta += 10;
  else if (utilizationPercent <= 80) delta -= 20;
  else delta -= 50;

  // Length of credit history (15% weight)
  if (creditAgeMonths >= 24) delta += 15;
  else if (creditAgeMonths >= 12) delta += 7;
  else delta -= 10;

  // New credit inquiries (10% weight)
  if (newInquiries === 0) delta += 10;
  else if (newInquiries <= 2) delta -= 5;
  else delta -= 15;

  // Types of credit (10% weight) - simplified
  delta += 10; // Assume good mix

  const predictedScore = Math.max(300, Math.min(900, currentScore + delta));
  const scoreDelta = predictedScore - currentScore;

  return {
    predictedScore,
    scoreDelta,
    explanation: generateCIBILExplanation(scoreDelta, utilizationPercent, missedPayments, newInquiries)
  };
}

function generateCIBILExplanation(delta, utilization, missed, inquiries) {
  let explanation = [];
  if (delta > 0) {
    explanation.push("Your score may improve due to good payment history and low utilization.");
  } else {
    explanation.push("Your score may decrease due to high utilization or missed payments.");
  }

  if (utilization > 50) {
    explanation.push("Reduce credit card utilization below 30% for better scores.");
  }
  if (missed > 0) {
    explanation.push("Avoid missed payments to maintain a good score.");
  }
  if (inquiries > 2) {
    explanation.push("Limit new credit applications to avoid score drops.");
  }

  return explanation;
}

// Retirement Calculator
export function calculateRetirement(currentAge, retirementAge, monthlyContribution, expectedReturnPercent, inflationPercent) {
  const years = retirementAge - currentAge;
  const nominalReturn = calculateCompoundInterest(monthlyContribution * 12, expectedReturnPercent, years);
  const realReturn = calculateCompoundInterest(monthlyContribution * 12, expectedReturnPercent - inflationPercent, years);

  return {
    nominalCorpus: nominalReturn.futureValue,
    realCorpus: realReturn.futureValue,
    totalContributions: monthlyContribution * 12 * years,
    years
  };
}