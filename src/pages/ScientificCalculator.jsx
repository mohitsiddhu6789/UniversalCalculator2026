import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function ScientificCalculator({ onNavigate }) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [angle, setAngle] = useState('RAD'); // RAD or DEG

  const handleNumber = (num) => {
    if (display === '0') {
      setDisplay(String(num));
    } else {
      setDisplay(display + num);
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op) => {
    const currentValue = parseFloat(display);
    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setPreviousValue(result);
      setDisplay(String(result));
    }
    setOperation(op);
    setDisplay('0');
  };

  const calculate = (prev, current, op) => {
    switch (op) {
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

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
  };

  const handleScientific = (func) => {
    const value = parseFloat(display);
    let result;

    const convertAngle = (val, toRad) => {
      return toRad ? (val * Math.PI) / 180 : (val * 180) / Math.PI;
    };

    switch (func) {
      case 'sin':
        result = Math.sin(angle === 'RAD' ? value : convertAngle(value, true));
        break;
      case 'cos':
        result = Math.cos(angle === 'RAD' ? value : convertAngle(value, true));
        break;
      case 'tan':
        result = Math.tan(angle === 'RAD' ? value : convertAngle(value, true));
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

    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
  };

  const toggleAngle = () => {
    setAngle(angle === 'RAD' ? 'DEG' : 'RAD');
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  return (
    <>
      <Helmet>
        <title>Scientific Calculator</title>
        <meta name="description" content="Advanced scientific calculator for complex calculations" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">🧮 Scientific Calculator</h1>
            <p className="text-lg text-slate-700">
              Advanced calculator for complex mathematical calculations
            </p>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Display */}
            <div className="bg-slate-900 text-white p-6 rounded-lg mb-6">
              <div className="text-right">
                <div className="text-sm text-slate-400 mb-2 h-6">
                  {operation && `${previousValue} ${operation}`}
                </div>
                <div className="text-5xl font-bold break-words overflow-hidden">
                  {display}
                </div>
              </div>
            </div>

            {/* Angle Toggle */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={toggleAngle}
                className={`px-4 py-2 rounded-lg font-bold transition duration-200 ${
                  angle === 'RAD'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-900'
                }`}
              >
                RAD
              </button>
              <button
                onClick={toggleAngle}
                className={`px-4 py-2 rounded-lg font-bold transition duration-200 ${
                  angle === 'DEG'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-900'
                }`}
              >
                DEG
              </button>
              <button
                onClick={handleClear}
                className="ml-auto px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition duration-200"
              >
                Clear All
              </button>
              <button
                onClick={handleBackspace}
                className="px-4 py-2 bg-slate-400 hover:bg-slate-500 text-white rounded-lg font-bold transition duration-200"
              >
                ⌫
              </button>
            </div>

            {/* Calculator Grid */}
            <div className="grid grid-cols-5 gap-2">
              {/* Scientific Functions Row 1 */}
              <button
                onClick={() => handleScientific('x²')}
                className="bg-purple-100 hover:bg-purple-200 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                x²
              </button>
              <button
                onClick={() => handleScientific('cbrt')}
                className="bg-purple-100 hover:bg-purple-200 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                ∛
              </button>
              <button
                onClick={() => handleScientific('1/x')}
                className="bg-purple-100 hover:bg-purple-200 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                1/x
              </button>
              <button
                onClick={toggleAngle}
                className="bg-slate-300 hover:bg-slate-400 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                {angle === 'RAD' ? 'RAD' : 'DEG'}
              </button>
              <button
                onClick={() => handleScientific('log')}
                className="bg-purple-100 hover:bg-purple-200 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                log
              </button>

              {/* Scientific Functions Row 2 */}
              <button
                onClick={() => handleScientific('sqrt')}
                className="bg-purple-100 hover:bg-purple-200 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                √
              </button>
              <button
                onClick={() => handleScientific('x³')}
                className="bg-purple-100 hover:bg-purple-200 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                x³
              </button>
              <button
                onClick={() => handleScientific('π')}
                className="bg-purple-100 hover:bg-purple-200 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                π
              </button>
              <button
                onClick={() => handleNumber('7')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                7
              </button>
              <button
                onClick={() => handleNumber('8')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                8
              </button>

              {/* Trigonometric Functions */}
              <button
                onClick={() => handleScientific('sin')}
                className="bg-orange-100 hover:bg-orange-200 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                sin
              </button>
              <button
                onClick={() => handleScientific('cos')}
                className="bg-orange-100 hover:bg-orange-200 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                cos
              </button>
              <button
                onClick={() => handleScientific('tan')}
                className="bg-orange-100 hover:bg-orange-200 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                tan
              </button>
              <button
                onClick={() => handleNumber('4')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                4
              </button>
              <button
                onClick={() => handleNumber('5')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                5
              </button>

              {/* Basic Operations */}
              <button
                onClick={() => handleScientific('(')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                (
              </button>
              <button
                onClick={() => handleScientific(')')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                )
              </button>
              <button
                onClick={() => handleScientific('e')}
                className="bg-purple-100 hover:bg-purple-200 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                e
              </button>
              <button
                onClick={() => handleNumber('1')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                1
              </button>
              <button
                onClick={() => handleNumber('2')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                2
              </button>

              {/* Basic Operations Row */}
              <button
                onClick={() => handleOperation('÷')}
                className="bg-green-100 hover:bg-green-200 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                ÷
              </button>
              <button
                onClick={() => handleOperation('^')}
                className="bg-blue-100 hover:bg-blue-200 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                ^
              </button>
              <button
                onClick={() => handleScientific('%')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                %
              </button>
              <button
                onClick={() => handleNumber('3')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                3
              </button>
              <button
                onClick={() => handleOperation('×')}
                className="bg-green-100 hover:bg-green-200 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                ×
              </button>

              {/* Bottom Row */}
              <button
                onClick={() => handleNumber('0')}
                className="col-span-2 bg-slate-200 hover:bg-slate-300 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                0
              </button>
              <button
                onClick={handleDecimal}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                .
              </button>
              <button
                onClick={() => handleScientific('ln')}
                className="bg-purple-100 hover:bg-purple-200 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                ln
              </button>
              <button
                onClick={() => handleOperation('-')}
                className="bg-green-100 hover:bg-green-200 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
              >
                −
              </button>

              {/* Equals Button */}
              <button
                onClick={handleEquals}
                className="col-span-5 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-bold text-lg transition duration-200"
              >
                ↵
              </button>
            </div>

            {/* Add Button */}
            <button
              onClick={() => handleOperation('+')}
              className="w-full mt-2 bg-green-100 hover:bg-green-200 text-slate-900 p-3 rounded-lg font-bold transition duration-200"
            >
              +
            </button>
          </div>

          {/* Info Section */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">📚 Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
              <div>
                <h3 className="font-bold text-slate-900 mb-2">✓ Trigonometric Functions</h3>
                <p>sin, cos, tan with RAD/DEG toggle</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">✓ Power Functions</h3>
                <p>x², x³, √, ∛, and power (^) operations</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">✓ Logarithmic Functions</h3>
                <p>log₁₀ and natural logarithm (ln)</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">✓ Constants</h3>
                <p>π (pi) and e (Euler's number)</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">✓ Basic Operations</h3>
                <p>Addition, subtraction, multiplication, division</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">✓ Utilities</h3>
                <p>Percentage, reciprocal, backspace, clear all</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
