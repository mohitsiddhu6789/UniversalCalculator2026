/**
 * Web EMI Calculator Wrapper
 * Re-exports shared business logic for backward compatibility
 */

export {
  calculateEMI,
  calculateFlatRateEMI,
  calculateTotalInterest,
  generateEmiSchedule,
  generateFlatRateEmiSchedule,
  calculatePartPaymentStrategy,
  validateLoanInput,
} from '../../shared/calculators/emi.js';
