/**
 * SWP Calculator - Shared Business Logic
 * Framework-agnostic calculation functions
 */

export const calculateSWP = (investedAmount, monthlyWithdrawal, expectedReturns, duration) => {
  if (!investedAmount || !monthlyWithdrawal || !expectedReturns || !duration) {
    return null;
  }

  const monthlyRate = expectedReturns / 100 / 12;
  let balance = investedAmount;
  let totalWithdrawn = 0;

  for (let month = 1; month <= duration * 12; month++) {
    const interestEarned = balance * monthlyRate;
    balance += interestEarned;

    if (balance >= monthlyWithdrawal) {
      balance -= monthlyWithdrawal;
      totalWithdrawn += monthlyWithdrawal;
    } else {
      totalWithdrawn += balance;
      balance = 0;
      break;
    }
  }

  const finalValue = Math.max(0, balance);
  const totalReturnsEarned = totalWithdrawn + finalValue - investedAmount;

  return {
    investedAmount: Math.round(investedAmount * 100) / 100,
    totalWithdrawn: Math.round(totalWithdrawn * 100) / 100,
    finalValue: Math.round(finalValue * 100) / 100,
    totalReturnsEarned: Math.round(totalReturnsEarned * 100) / 100,
    months: Math.floor((totalWithdrawn / monthlyWithdrawal) || 0),
  };
};

export const validateSWPInput = (params) => {
  const errors = [];

  if (!params.investedAmount || params.investedAmount <= 0) {
    errors.push('Investment amount must be a positive number');
  }

  if (!params.monthlyWithdrawal || params.monthlyWithdrawal <= 0) {
    errors.push('Monthly withdrawal must be a positive number');
  }

  if (params.expectedReturns === undefined || params.expectedReturns === null || params.expectedReturns < 0) {
    errors.push('Expected returns cannot be negative');
  }

  if (!params.duration || params.duration <= 0) {
    errors.push('Duration must be greater than 0');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
