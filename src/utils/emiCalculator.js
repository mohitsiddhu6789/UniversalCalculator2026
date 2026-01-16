/**
 * EMI Calculator Utility Functions
 * Implements standard EMI formula and related calculations
 */

/**
 * Calculate EMI (Equated Monthly Installment)
 * Formula: EMI = P × R × (1+R)^N / ((1+R)^N − 1)
 * where P = Principal, R = Monthly Interest Rate, N = Number of months
 * 
 * @param {number} principal - Loan amount
 * @param {number} annualRate - Annual interest rate (%)
 * @param {number} months - Tenure in months
 * @returns {number} Monthly EMI amount
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

/**
 * Calculate total interest payable
 * @param {number} emi - Monthly EMI
 * @param {number} months - Tenure in months
 * @param {number} principal - Loan amount
 * @returns {number} Total interest
 */
export const calculateTotalInterest = (emi, months, principal) => {
  return emi * months - principal;
};

/**
 * Generate EMI schedule table
 * @param {number} principal - Loan amount
 * @param {number} annualRate - Annual interest rate (%)
 * @param {number} months - Tenure in months
 * @returns {Array} Array of month-wise schedule objects
 */
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

/**
 * Calculate EMI with part payment
 * @param {number} principal - Original loan amount
 * @param {number} annualRate - Annual interest rate (%)
 * @param {number} months - Total tenure in months
 * @param {Array} partPayments - Array of {month, amount, chargePercent}
 * @returns {Object} Calculation result with new EMI and interest saved
 */
export const calculateWithPartPayment = (principal, annualRate, months, partPayments = []) => {
  if (!partPayments || partPayments.length === 0) {
    const emi = calculateEMI(principal, annualRate, months);
    return {
      originalEMI: emi,
      newEMI: emi,
      totalInterestOriginal: calculateTotalInterest(emi, months, principal),
      totalInterestNew: calculateTotalInterest(emi, months, principal),
      interestSaved: 0,
      totalPartPaymentCharges: 0,
    };
  }

  const originalEMI = calculateEMI(principal, annualRate, months);
  const originalInterest = calculateTotalInterest(originalEMI, months, principal);

  let remainingBalance = principal;
  let monthsRemaining = months;
  const monthlyRate = annualRate / 100 / 12;
  let totalCharges = 0;

  // Sort part payments by month
  const sortedPayments = partPayments.sort((a, b) => a.month - b.month);

  // Process part payments
  for (const payment of sortedPayments) {
    if (payment.month <= months && payment.amount > 0) {
      // Calculate interest up to this month
      for (let i = 0; i < payment.month - 1; i++) {
        const interest = remainingBalance * monthlyRate;
        remainingBalance -= originalEMI - interest;
      }

      // Apply part payment
      const chargeAmount = (payment.amount * (payment.chargePercent || 0)) / 100;
      totalCharges += chargeAmount;
      remainingBalance -= payment.amount;
      monthsRemaining = months - payment.month;
    }
  }

  // Calculate new EMI for remaining balance
  const newEMI = remainingBalance > 0 ? calculateEMI(remainingBalance, annualRate, monthsRemaining) : 0;
  const newInterest = remainingBalance > 0 ? calculateTotalInterest(newEMI, monthsRemaining, remainingBalance) : 0;

  return {
    originalEMI: Math.round(originalEMI * 100) / 100,
    newEMI: Math.round(newEMI * 100) / 100,
    totalInterestOriginal: Math.round(originalInterest * 100) / 100,
    totalInterestNew: Math.round(newInterest * 100) / 100,
    interestSaved: Math.round((originalInterest - newInterest - totalCharges) * 100) / 100,
    totalPartPaymentCharges: Math.round(totalCharges * 100) / 100,
  };
};

/**
 * Calculate pre-closure penalty
 * @param {number} remainingBalance - Outstanding balance
 * @param {number} penaltyPercent - Penalty percentage
 * @param {number} gstPercent - GST percentage (default 18%)
 * @returns {Object} Penalty breakdown
 */
export const calculatePreClosurePenalty = (remainingBalance, penaltyPercent = 2, gstPercent = 18) => {
  const penalty = (remainingBalance * penaltyPercent) / 100;
  const gst = (penalty * gstPercent) / 100;
  const totalPenalty = penalty + gst;

  return {
    penalty: Math.round(penalty * 100) / 100,
    gst: Math.round(gst * 100) / 100,
    totalPenalty: Math.round(totalPenalty * 100) / 100,
  };
};

/**
 * Validate loan input parameters
 * @param {Object} params - Loan parameters
 * @returns {Object} Validation result with errors array
 */
export const validateLoanInput = (params) => {
  const errors = [];

  if (!params.principal || params.principal <= 0) {
    errors.push('Principal amount must be greater than 0');
  }

  if (!params.interestRate || params.interestRate < 0) {
    errors.push('Interest rate cannot be negative');
  }

  if (!params.tenure || params.tenure <= 0) {
    errors.push('Tenure must be greater than 0');
  }

  if (params.principal > 100000000) {
    errors.push('Principal amount exceeds maximum limit of 100 crore');
  }

  if (params.interestRate > 50) {
    errors.push('Interest rate seems unusually high (>50%)');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
