/**
 * Bank-specific loan rules and configurations
 */

export const LOAN_TYPES = {
  PERSONAL: 'personal',
  HOME: 'home',
  CAR: 'car',
  EDUCATION: 'education',
  BUSINESS: 'business',
  OVERDRAFT: 'overdraft',
  CUSTOM: 'custom',
};

/**
 * Default bank rules for different loan types
 * Can be customized by users
 */
export const DEFAULT_LOAN_RULES = {
  [LOAN_TYPES.PERSONAL]: {
    name: 'Personal Loan',
    minPrincipal: 10000,
    maxPrincipal: 5000000,
    minRate: 7,
    maxRate: 20,
    minTenure: 6,
    maxTenure: 360,
    preClosurePenalty: 2,
    defaultPenalty: 1,
  },
  [LOAN_TYPES.HOME]: {
    name: 'Home Loan',
    minPrincipal: 500000,
    maxPrincipal: 100000000,
    minRate: 5,
    maxRate: 12,
    minTenure: 60,
    maxTenure: 360,
    preClosurePenalty: 1,
    defaultPenalty: 0.5,
  },
  [LOAN_TYPES.CAR]: {
    name: 'Car Loan',
    minPrincipal: 100000,
    maxPrincipal: 5000000,
    minRate: 6,
    maxRate: 15,
    minTenure: 12,
    maxTenure: 84,
    preClosurePenalty: 2,
    defaultPenalty: 1,
  },
  [LOAN_TYPES.EDUCATION]: {
    name: 'Education Loan',
    minPrincipal: 50000,
    maxPrincipal: 10000000,
    minRate: 4,
    maxRate: 12,
    minTenure: 12,
    maxTenure: 120,
    preClosurePenalty: 1.5,
    defaultPenalty: 0,
  },
  [LOAN_TYPES.BUSINESS]: {
    name: 'Business Loan',
    minPrincipal: 100000,
    maxPrincipal: 50000000,
    minRate: 8,
    maxRate: 18,
    minTenure: 12,
    maxTenure: 120,
    preClosurePenalty: 2,
    defaultPenalty: 1.5,
  },
  [LOAN_TYPES.OVERDRAFT]: {
    name: 'Overdraft (OD)',
    minPrincipal: 50000,
    maxPrincipal: 10000000,
    minRate: 10,
    maxRate: 18,
    minTenure: 1,
    maxTenure: 60,
    preClosurePenalty: 0,
    defaultPenalty: 0,
  },
  [LOAN_TYPES.CUSTOM]: {
    name: 'Custom Loan',
    minPrincipal: 1000,
    maxPrincipal: 100000000,
    minRate: 0,
    maxRate: 50,
    minTenure: 1,
    maxTenure: 360,
    preClosurePenalty: 0,
    defaultPenalty: 0,
  },
};

/**
 * Get loan rules for a specific type
 * @param {string} loanType
 * @returns {Object} Loan rules
 */
export const getLoanRules = (loanType) => {
  return DEFAULT_LOAN_RULES[loanType] || DEFAULT_LOAN_RULES[LOAN_TYPES.CUSTOM];
};

/**
 * Get all loan types
 * @returns {Array} Array of loan type objects with id and name
 */
export const getAllLoanTypes = () => {
  return Object.entries(LOAN_TYPES).map(([key, value]) => ({
    id: value,
    name: DEFAULT_LOAN_RULES[value].name,
  }));
};

/**
 * Validate input against loan rules
 * @param {string} loanType
 * @param {number} principal
 * @param {number} rate
 * @param {number} tenure
 * @returns {Object} Validation result
 */
export const validateAgainstRules = (loanType, principal, rate, tenure) => {
  const rules = getLoanRules(loanType);
  const errors = [];

  if (principal < rules.minPrincipal) {
    errors.push(`Minimum principal for ${rules.name} is ₹${rules.minPrincipal.toLocaleString('en-IN')}`);
  }

  if (principal > rules.maxPrincipal) {
    errors.push(`Maximum principal for ${rules.name} is ₹${rules.maxPrincipal.toLocaleString('en-IN')}`);
  }

  if (rate < rules.minRate) {
    errors.push(`Minimum interest rate for ${rules.name} is ${rules.minRate}%`);
  }

  if (rate > rules.maxRate) {
    errors.push(`Maximum interest rate for ${rules.name} is ${rules.maxRate}%`);
  }

  if (tenure < rules.minTenure) {
    errors.push(`Minimum tenure for ${rules.name} is ${rules.minTenure} months`);
  }

  if (tenure > rules.maxTenure) {
    errors.push(`Maximum tenure for ${rules.name} is ${rules.maxTenure} months`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
