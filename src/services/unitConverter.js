/**
 * Unit Converter - Shared Business Logic
 * Framework-agnostic conversion functions
 */

export const CONVERSION_UNITS = {
  length: {
    name: 'Length',
    icon: '📏',
    units: {
      m: { name: 'Meter', factor: 1 },
      km: { name: 'Kilometer', factor: 0.001 },
      cm: { name: 'Centimeter', factor: 100 },
      mm: { name: 'Millimeter', factor: 1000 },
      mi: { name: 'Mile', factor: 0.000621371 },
      yd: { name: 'Yard', factor: 1.09361 },
      ft: { name: 'Foot', factor: 3.28084 },
      in: { name: 'Inch', factor: 39.3701 },
    },
  },
  weight: {
    name: 'Weight/Mass',
    icon: '⚖️',
    units: {
      kg: { name: 'Kilogram', factor: 1 },
      g: { name: 'Gram', factor: 1000 },
      mg: { name: 'Milligram', factor: 1000000 },
      lb: { name: 'Pound', factor: 2.20462 },
      oz: { name: 'Ounce', factor: 35.274 },
      ton: { name: 'Metric Ton', factor: 0.001 },
    },
  },
  volume: {
    name: 'Volume',
    icon: '🧪',
    units: {
      l: { name: 'Liter', factor: 1 },
      ml: { name: 'Milliliter', factor: 1000 },
      m3: { name: 'Cubic Meter', factor: 0.001 },
      gal: { name: 'US Gallon', factor: 0.264172 },
      pt: { name: 'Pint', factor: 2.11338 },
      cup: { name: 'Cup', factor: 4.22675 },
      oz: { name: 'Fluid Ounce', factor: 33.814 },
    },
  },
};

export const convertUnit = (inputValue, category, fromUnit, toUnit) => {
  if (!inputValue || isNaN(inputValue)) return '';

  const units = CONVERSION_UNITS[category].units;
  const baseValue = inputValue / units[fromUnit].factor;
  const result = baseValue * units[toUnit].factor;

  return result.toFixed(6).replace(/\.?0+$/, '');
};

export const validateUnitConversion = (params) => {
  const errors = [];

  if (params.inputValue === undefined || params.inputValue === null || isNaN(params.inputValue)) {
    errors.push('Input value must be a valid number');
  }

  if (!params.category || !CONVERSION_UNITS[params.category]) {
    errors.push('Invalid category selected');
  }

  if (!params.fromUnit || !params.toUnit) {
    errors.push('Please select both units');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
