/**
 * EMI Calculator - Shared Business Logic
 * Framework-agnostic calculation functions
 */

export const calculateEMI = (principal, annualRate, months) => {
  if (principal <= 0 || months <= 0 || annualRate < 0) {
    return 0;
  }

  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
    return principal / months;
  }

  const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, months);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;

  return numerator / denominator;
};

export const calculateFlatRateEMI = (principal, annualRate, months) => {
  if (principal <= 0 || months <= 0 || annualRate < 0) {
    return 0;
  }

  const totalInterest = (principal * annualRate * months) / (100 * 12);
  const emi = (principal + totalInterest) / months;

  return emi;
};

export const calculateTotalInterest = (emi, months, principal) => {
  return emi * months - principal;
};

export const generateEmiSchedule = (principal, annualRate, months) => {
  const emi = calculateEMI(principal, annualRate, months);
  const monthlyRate = annualRate / 100 / 12;
  const schedule = [];

  let balance = principal;

  for (let i = 1; i <= months; i++) {
    const interestPayable = balance * monthlyRate;
    const principalPayable = emi - interestPayable;
    balance -= principalPayable;

    schedule.push({
      month: i,
      emi: Math.round(emi * 100) / 100,
      principal: Math.round(principalPayable * 100) / 100,
      interest: Math.round(interestPayable * 100) / 100,
      balance: Math.max(0, Math.round(balance * 100) / 100),
    });
  }

  return schedule;
};

export const generateFlatRateEmiSchedule = (principal, annualRate, months) => {
  const emi = calculateFlatRateEMI(principal, annualRate, months);
  const monthlyInterest = (principal * annualRate) / (100 * 12);
  const monthlyPrincipal = principal / months;
  const schedule = [];

  let balance = principal;

  for (let i = 1; i <= months; i++) {
    balance -= monthlyPrincipal;

    schedule.push({
      month: i,
      emi: Math.round(emi * 100) / 100,
      principal: Math.round(monthlyPrincipal * 100) / 100,
      interest: Math.round(monthlyInterest * 100) / 100,
      balance: Math.max(0, Math.round(balance * 100) / 100),
    });
  }

  return schedule;
};

export const calculatePartPaymentStrategy = (
  principal,
  annualRate,
  months,
  partPayments = [],
  strategy = 'emi'
) => {
  if (!partPayments || partPayments.length === 0) {
    const emi = calculateEMI(principal, annualRate, months);
    return {
      strategy,
      originalEMI: emi,
      newEMI: emi,
      originalTenure: months,
      newTenure: months,
      originalPrincipal: principal,
      newPrincipal: principal,
      totalInterestOriginal: calculateTotalInterest(emi, months, principal),
      totalInterestNew: calculateTotalInterest(emi, months, principal),
      interestSaved: 0,
      totalPartPaymentCharges: 0,
      totalPartPaymentAmount: 0,
    };
  }

  const originalEMI = calculateEMI(principal, annualRate, months);
  const originalInterest = calculateTotalInterest(originalEMI, months, principal);
  const monthlyRate = annualRate / 100 / 12;

  let remainingBalance = principal;
  let totalCharges = 0;
  let totalPartPaymentAmount = 0;

  for (const payment of partPayments) {
    if (payment.month <= months && payment.amount > 0) {
      const chargeAmount = (payment.amount * (payment.chargePercent || 0)) / 100;
      totalCharges += chargeAmount;
      totalPartPaymentAmount += payment.amount;
      remainingBalance -= payment.amount;
    }
  }

  remainingBalance = Math.max(0, remainingBalance);

  let result = {
    strategy,
    originalEMI: Math.round(originalEMI * 100) / 100,
    originalTenure: months,
    originalPrincipal: principal,
    totalInterestOriginal: Math.round(originalInterest * 100) / 100,
    totalPartPaymentCharges: Math.round(totalCharges * 100) / 100,
    totalPartPaymentAmount: Math.round(totalPartPaymentAmount * 100) / 100,
  };

  if (strategy === 'emi') {
    const newTenure = remainingBalance > 0
      ? Math.ceil(Math.log(originalEMI / (originalEMI - remainingBalance * monthlyRate)) / Math.log(1 + monthlyRate))
      : 0;
    const newInterest = remainingBalance > 0 ? calculateTotalInterest(originalEMI, newTenure, remainingBalance) : 0;

    result = {
      ...result,
      newEMI: Math.round(originalEMI * 100) / 100,
      newTenure: Math.max(0, newTenure),
      newPrincipal: Math.round(remainingBalance * 100) / 100,
      totalInterestNew: Math.round(Math.max(0, newInterest) * 100) / 100,
      interestSaved: Math.round((originalInterest - Math.max(0, newInterest) - totalCharges) * 100) / 100,
      tenureReduction: months - Math.max(0, newTenure),
    };
  } else if (strategy === 'tenure') {
    const newEMI = remainingBalance > 0 ? calculateEMI(remainingBalance, annualRate, months) : 0;
    const newInterest = remainingBalance > 0 ? calculateTotalInterest(newEMI, months, remainingBalance) : 0;

    result = {
      ...result,
      newEMI: Math.round(newEMI * 100) / 100,
      newTenure: months,
      newPrincipal: Math.round(remainingBalance * 100) / 100,
      totalInterestNew: Math.round(newInterest * 100) / 100,
      interestSaved: Math.round((originalInterest - newInterest - totalCharges) * 100) / 100,
      emiReduction: Math.round((originalEMI - newEMI) * 100) / 100,
    };
  } else if (strategy === 'principal') {
    const newEMI = remainingBalance > 0 ? calculateEMI(remainingBalance, annualRate, months) : 0;
    const newInterest = remainingBalance > 0 ? calculateTotalInterest(newEMI, months, remainingBalance) : 0;

    result = {
      ...result,
      newEMI: Math.round(newEMI * 100) / 100,
      newTenure: months,
      newPrincipal: Math.round(remainingBalance * 100) / 100,
      totalInterestNew: Math.round(newInterest * 100) / 100,
      interestSaved: Math.round((originalInterest - newInterest - totalCharges) * 100) / 100,
      principalReduction: Math.round((principal - remainingBalance) * 100) / 100,
      emiReduction: Math.round((originalEMI - newEMI) * 100) / 100,
    };
  }

  return result;
};

export const validateLoanInput = (params) => {
  const errors = [];

  if (!params.principal || params.principal <= 0) {
    errors.push('Principal amount must be a positive number');
  }

  if (params.interestRate === undefined || params.interestRate === null || params.interestRate < 0) {
    errors.push('Interest rate cannot be negative');
  }

  if (!params.tenure || params.tenure <= 0) {
    errors.push('Tenure must be greater than 0');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
