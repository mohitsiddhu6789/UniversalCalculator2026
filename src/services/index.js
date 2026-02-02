/**
 * Shared Module Exports
 * Central export point for all shared business logic
 */

// EMI Calculator Exports
export {
  calculateEMI,
  calculateFlatRateEMI,
  calculateTotalInterest,
  generateEmiSchedule,
  generateFlatRateEmiSchedule,
  calculatePartPaymentStrategy,
  validateLoanInput,
} from './calculators/emi.js';

// SWP Calculator Exports
export {
  calculateSWP,
  validateSWPInput,
} from './calculators/swp.js';

// Scientific Calculator Exports
export {
  convertAngle,
  performScientificOperation,
  performBasicOperation,
} from './calculators/scientific.js';

// Unit Converter Exports
export {
  CONVERSION_UNITS,
  convertUnit,
  validateUnitConversion,
} from './converters/unitConverter.js';

// Temperature Converter Exports
export {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  celsiusToKelvin,
  kelvinToCelsius,
  fahrenheitToKelvin,
  kelvinToFahrenheit,
  convertTemperature,
  validateTemperatureInput,
} from './converters/temperatureConverter.js';

// Email Validator Exports
export {
  validateEmail,
  validateEmailInput,
} from './validators/emailValidator.js';
