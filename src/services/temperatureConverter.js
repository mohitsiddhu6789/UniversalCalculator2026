/**
 * Temperature Converter - Shared Business Logic
 * Framework-agnostic conversion functions
 */

export const celsiusToFahrenheit = (celsius) => {
  if (isNaN(celsius)) return '';
  return (celsius * 9/5 + 32).toFixed(2);
};

export const fahrenheitToCelsius = (fahrenheit) => {
  if (isNaN(fahrenheit)) return '';
  return ((fahrenheit - 32) * 5/9).toFixed(2);
};

export const celsiusToKelvin = (celsius) => {
  if (isNaN(celsius)) return '';
  return (celsius + 273.15).toFixed(2);
};

export const kelvinToCelsius = (kelvin) => {
  if (isNaN(kelvin)) return '';
  return (kelvin - 273.15).toFixed(2);
};

export const fahrenheitToKelvin = (fahrenheit) => {
  if (isNaN(fahrenheit)) return '';
  const celsius = (fahrenheit - 32) * 5/9;
  return (celsius + 273.15).toFixed(2);
};

export const kelvinToFahrenheit = (kelvin) => {
  if (isNaN(kelvin)) return '';
  const celsius = kelvin - 273.15;
  return (celsius * 9/5 + 32).toFixed(2);
};

export const convertTemperature = (value, fromScale, toScale) => {
  if (isNaN(value)) return '';

  if (fromScale === 'C' && toScale === 'F') return celsiusToFahrenheit(value);
  if (fromScale === 'F' && toScale === 'C') return fahrenheitToCelsius(value);
  if (fromScale === 'C' && toScale === 'K') return celsiusToKelvin(value);
  if (fromScale === 'K' && toScale === 'C') return kelvinToCelsius(value);
  if (fromScale === 'F' && toScale === 'K') return fahrenheitToKelvin(value);
  if (fromScale === 'K' && toScale === 'F') return kelvinToFahrenheit(value);

  return value.toFixed(2);
};

export const validateTemperatureInput = (params) => {
  const errors = [];

  if (params.value === undefined || params.value === null || isNaN(params.value)) {
    errors.push('Temperature value must be a valid number');
  }

  const validScales = ['C', 'F', 'K'];
  if (!validScales.includes(params.fromScale) || !validScales.includes(params.toScale)) {
    errors.push('Invalid temperature scale');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
