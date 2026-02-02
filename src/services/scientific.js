/**
 * Scientific Calculator - Shared Business Logic
 * Framework-agnostic calculation functions
 */

export const convertAngle = (val, toRad) => {
  return toRad ? (val * Math.PI) / 180 : (val * 180) / Math.PI;
};

export const performScientificOperation = (value, operation, angleMode = 'RAD') => {
  let result;

  switch (operation) {
    case 'sin':
      result = Math.sin(angleMode === 'RAD' ? value : convertAngle(value, true));
      break;
    case 'cos':
      result = Math.cos(angleMode === 'RAD' ? value : convertAngle(value, true));
      break;
    case 'tan':
      result = Math.tan(angleMode === 'RAD' ? value : convertAngle(value, true));
      break;
    case 'sqrt':
      result = Math.sqrt(value);
      break;
    case 'cbrt':
      result = Math.cbrt(value);
      break;
    case 'log':
      result = Math.log10(value);
      break;
    case 'ln':
      result = Math.log(value);
      break;
    case 'π':
      result = Math.PI;
      break;
    case 'e':
      result = Math.E;
      break;
    case '1/x':
      result = 1 / value;
      break;
    case 'x²':
      result = value * value;
      break;
    case 'x³':
      result = value * value * value;
      break;
    case '±':
      result = -value;
      break;
    case '%':
      result = value / 100;
      break;
    default:
      result = value;
  }

  return result;
};

export const performBasicOperation = (prev, current, operation) => {
  switch (operation) {
    case '+':
      return prev + current;
    case '-':
      return prev - current;
    case '×':
      return prev * current;
    case '÷':
      return prev / current;
    case '^':
      return Math.pow(prev, current);
    default:
      return current;
  }
};
