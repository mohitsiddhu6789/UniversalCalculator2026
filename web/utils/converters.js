/**
 * Web Converters Wrapper
 * Re-exports shared business logic for backward compatibility
 */

export {
  CONVERSION_UNITS,
  convertUnit,
  validateUnitConversion,
} from '../../shared/converters/unitConverter.js';

export {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  celsiusToKelvin,
  kelvinToCelsius,
  fahrenheitToKelvin,
  kelvinToFahrenheit,
  convertTemperature,
  validateTemperatureInput,
} from '../../shared/converters/temperatureConverter.js';
