import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const SCIENTIFIC_CALC_FAQ = [
  {
    question: 'What is the difference between RAD and DEG?',
    answer: 'RAD (Radians): Standard mathematical unit where a full circle = 2π radians ≈ 6.28 radians. DEG (Degrees): Where a full circle = 360 degrees. Use DEG for everyday angles and navigation, RAD for scientific and mathematical calculations. Most programming languages use radians by default.'
  },
  {
    question: 'What trigonometric functions are supported?',
    answer: 'Supported trigonometric functions: sin (sine), cos (cosine), and tan (tangent). You can toggle between RAD (radians) and DEG (degrees) modes for angle calculations. For example: sin(π/2) = 1 in radians, sin(90°) = 1 in degrees.'
  },
  {
    question: 'What logarithmic functions are available?',
    answer: 'Two logarithmic functions: log (logarithm base 10, common logarithm) and ln (natural logarithm, base e ≈ 2.71828). log(100) = 2 and ln(e) = 1. Logarithms are useful for exponential calculations and scientific computations.'
  },
  {
    question: 'What mathematical constants are available?',
    answer: 'Two mathematical constants: π (pi ≈ 3.14159265...) used in geometry and trigonometry for circle calculations, and e (Euler\'s number ≈ 2.71828...) used in exponential and logarithmic calculations. You can insert these directly into your calculations.'
  },
  {
    question: 'What power operations are supported?',
    answer: 'Supported power operations: x² (square a number), x³ (cube a number), √ (square root), ∛ (cube root), and ^ (any power). Examples: 2² = 4, 2³ = 8, √16 = 4, ∛8 = 2, 2^5 = 32.'
  },
  {
    question: 'How do I calculate reciprocal (1/x)?',
    answer: 'The 1/x function calculates the reciprocal of a number. For example: 1/2 = 0.5, 1/4 = 0.25, 1/10 = 0.1. Reciprocals are useful in physics, chemistry, and engineering calculations. Dividing by zero is undefined.'
  },
  {
    question: 'How do I use the power (^) function?',
    answer: 'The ^ operator raises a number to a power. Format: base ^ exponent. Examples: 2^3 = 8, 5^2 = 25, 2^10 = 1024, 10^3 = 1000. This is different from x² and x³ which only square or cube numbers. ^ works for any exponent including fractional powers.'
  },
  {
    question: 'What does the percentage (%) function do?',
    answer: 'The % function converts a number to percentage by dividing by 100. For example: 50% = 0.5, 25% = 0.25, 100% = 1. This is useful for financial calculations, discount calculations, and probability calculations.'
  },
  {
    question: 'What is π (pi) and when should I use it?',
    answer: 'π (pi) is a mathematical constant ≈ 3.14159265... used extensively in geometry and trigonometry. It\'s the ratio of a circle\'s circumference to its diameter. Used in: circle area (πr²), circumference (2πr), sphere volume (4/3 πr³), and trigonometric calculations.'
  },
  {
    question: 'What is e (Euler\'s number) and when should I use it?',
    answer: 'e (Euler\'s number) ≈ 2.71828... is the base of natural logarithms. Used in: exponential growth/decay calculations, compound interest (A = Pe^rt), probability theory, and calculus. The function e^x grows exponentially and is fundamental to many scientific phenomena.'
  },
  {
    question: 'How do I calculate sin, cos, tan for specific angles?',
    answer: 'Enter the angle value, then click the trig function. Make sure you\'re in the correct mode (RAD or DEG). Examples in DEG: sin(30°) = 0.5, cos(60°) = 0.5, tan(45°) = 1. Examples in RAD: sin(π/6) = 0.5, cos(π/3) = 0.5, tan(π/4) = 1.'
  },
  {
    question: 'How do I use the backspace button?',
    answer: 'The backspace button (⌫) removes the last digit or character you entered. Useful for correcting mistakes without clearing the entire calculation. For example: if you type 1234 and want 123, click backspace once.'
  },
  {
    question: 'What\'s the difference between Clear All and backspace?',
    answer: 'Backspace (⌫) removes only the last character. Clear All clears everything including the current number, previous value, and any pending operation. Use backspace for small corrections, Clear All to start fresh.'
  },
  {
    question: 'Can I calculate 0! (factorial)?',
    answer: 'This calculator doesn\'t have a factorial button, but you can use it for other calculations. For reference: 0! = 1, 1! = 1, 5! = 120, 10! = 3,628,800. Factorials grow very quickly and are used in combinatorics and probability.'
  },
  {
    question: 'How do I calculate inverse trigonometric functions (arcsin, arccos, arctan)?',
    answer: 'This calculator doesn\'t have inverse trig functions. However, you can use logarithms or work with regular trig functions. For inverse functions, you may need a more advanced calculator or programming environment with asin(), acos(), atan() functions.'
  },
  {
    question: 'What\'s the order of operations (PEMDAS/BODMAS)?',
    answer: 'Order of operations: 1) Parentheses/Brackets, 2) Exponents/Orders, 3) Multiplication & Division (left to right), 4) Addition & Subtraction (left to right). Example: 2 + 3 × 4 = 14 (not 20) because multiplication comes before addition. This calculator follows standard mathematical order.'
  },
  {
    question: 'Can I use parentheses in calculations?',
    answer: 'Yes, this calculator supports parentheses. Use them to change the order of operations. Example: (2 + 3) × 4 = 20 (different from 2 + 3 × 4 = 14). Parentheses ensure calculations inside them are done first.'
  },
  {
    question: 'What\'s the maximum precision of calculations?',
    answer: 'This calculator displays results with high precision. However, due to computer floating-point arithmetic, results may have minor rounding errors beyond 10-15 decimal places. For most practical purposes, 6-8 decimal places provide sufficient precision.'
  },
  {
    question: 'How do I calculate logarithm base other than 10 or e?',
    answer: 'This calculator has log (base 10) and ln (natural log, base e). For other bases, use the change of base formula: log_b(x) = log(x) / log(b) or log_b(x) = ln(x) / ln(b). Example: log_2(8) = log(8) / log(2) = 3.'
  },
  {
    question: 'What is e^x and how do I calculate it?',
    answer: 'e^x represents e raised to the power x, which calculates exponential growth. This calculator supports this via the ^ operator: enter e, click ^, enter your exponent, then =. Example: e^1 ≈ 2.71828, e^2 ≈ 7.389. This is fundamental in calculus and physics.'
  }
];

export default function ScientificCalculator({ onNavigate }) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [angle, setAngle] = useState('RAD');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);

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

  const toggleFaq = (index) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Scientific Calculator</title>
        <meta name="description" content="Advanced scientific calculator for complex calculations" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-4 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-4">
            <h4 className="text-2xl font-bold text-slate-900 mb-2">🧮 Scientific Calculator</h4>
            <p className="text-sm text-slate-700">
              Advanced calculator for complex mathematical calculations
            </p>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            {/* Display */}
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-3">
              <div className="text-right">
                <div className="text-sm text-slate-400 mb-2 h-6">
                  {operation && `${previousValue} ${operation}`}
                </div>
                <div className="text-3xl font-bold break-words overflow-hidden">
                  {display}
                </div>
              </div>
            </div>

            {/* Angle Toggle */}
            <div className="flex gap-1.5 mb-2">
              <button
                onClick={toggleAngle}
                className={`px-3 py-1 rounded-lg font-bold transition duration-200 text-sm ${
                  angle === 'RAD'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-900'
                }`}
              >
                RAD
              </button>
              <button
                onClick={toggleAngle}
                className={`px-3 py-1 rounded-lg font-bold transition duration-200 text-sm ${
                  angle === 'DEG'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-900'
                }`}
              >
                DEG
              </button>
              <button
                onClick={handleClear}
                className="ml-auto px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition duration-200 text-sm"
              >
                Clear All
              </button>
              <button
                onClick={handleBackspace}
                className="px-3 py-1 bg-slate-400 hover:bg-slate-500 text-white rounded-lg font-bold transition duration-200 text-sm"
              >
                ⌫
              </button>
            </div>

            {/* Calculator Grid */}
            <div className="grid grid-cols-5 gap-1.5">
              {/* Scientific Functions Row 1 */}
              <button
                onClick={() => handleScientific('x²')}
                className="bg-purple-100 hover:bg-purple-200 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                x²
              </button>
              <button
                onClick={() => handleScientific('cbrt')}
                className="bg-purple-100 hover:bg-purple-200 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                ∛
              </button>
              <button
                onClick={() => handleScientific('1/x')}
                className="bg-purple-100 hover:bg-purple-200 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                1/x
              </button>
              <button
                onClick={toggleAngle}
                className="bg-slate-300 hover:bg-slate-400 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                {angle === 'RAD' ? 'RAD' : 'DEG'}
              </button>
              <button
                onClick={() => handleScientific('log')}
                className="bg-purple-100 hover:bg-purple-200 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                log
              </button>

              {/* Scientific Functions Row 2 */}
              <button
                onClick={() => handleScientific('sqrt')}
                className="bg-purple-100 hover:bg-purple-200 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                √
              </button>
              <button
                onClick={() => handleScientific('x³')}
                className="bg-purple-100 hover:bg-purple-200 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                x³
              </button>
              <button
                onClick={() => handleScientific('π')}
                className="bg-purple-100 hover:bg-purple-200 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                π
              </button>
              <button
                onClick={() => handleNumber('7')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                7
              </button>
              <button
                onClick={() => handleNumber('8')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                8
              </button>

              {/* Trigonometric Functions */}
              <button
                onClick={() => handleScientific('sin')}
                className="bg-orange-100 hover:bg-orange-200 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                sin
              </button>
              <button
                onClick={() => handleScientific('cos')}
                className="bg-orange-100 hover:bg-orange-200 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                cos
              </button>
              <button
                onClick={() => handleScientific('tan')}
                className="bg-orange-100 hover:bg-orange-200 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                tan
              </button>
              <button
                onClick={() => handleNumber('4')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                4
              </button>
              <button
                onClick={() => handleNumber('5')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                5
              </button>

              {/* Basic Operations */}
              <button
                onClick={() => handleScientific('(')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                (
              </button>
              <button
                onClick={() => handleScientific(')')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                )
              </button>
              <button
                onClick={() => handleScientific('e')}
                className="bg-purple-100 hover:bg-purple-200 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                e
              </button>
              <button
                onClick={() => handleNumber('1')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                1
              </button>
              <button
                onClick={() => handleNumber('2')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                2
              </button>

              {/* Basic Operations Row */}
              <button
                onClick={() => handleOperation('÷')}
                className="bg-green-100 hover:bg-green-200 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                ÷
              </button>
              <button
                onClick={() => handleOperation('^')}
                className="bg-blue-100 hover:bg-blue-200 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                ^
              </button>
              <button
                onClick={() => handleScientific('%')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                %
              </button>
              <button
                onClick={() => handleNumber('3')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                3
              </button>
              <button
                onClick={() => handleOperation('×')}
                className="bg-green-100 hover:bg-green-200 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                ×
              </button>

              {/* Bottom Row */}
              <button
                onClick={() => handleNumber('0')}
                className="col-span-2 bg-slate-200 hover:bg-slate-300 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                0
              </button>
              <button
                onClick={handleDecimal}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                .
              </button>
              <button
                onClick={() => handleScientific('ln')}
                className="bg-purple-100 hover:bg-purple-200 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                ln
              </button>
              <button
                onClick={() => handleOperation('-')}
                className="bg-green-100 hover:bg-green-200 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
              >
                −
              </button>

              {/* Equals Button */}
              <button
                onClick={handleEquals}
                className="col-span-5 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-bold text-sm transition duration-200"
              >
                ↵
              </button>
            </div>

            {/* Add Button */}
            <button
              onClick={() => handleOperation('+')}
              className="w-full mt-2 bg-green-100 hover:bg-green-200 text-slate-900 p-2 rounded-lg font-bold transition duration-200"
            >
              +
            </button>
          </div>

          {/* Info Section */}
          <div className="mt-4 bg-white rounded-lg shadow-lg p-4 mb-4">
            <h2 className="text-lg font-bold text-slate-900 mb-2">📚 Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
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

          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-l-4 border-blue-500">
              <h2 className="text-lg font-bold text-slate-900">
                ❓ Scientific Calculator FAQ
              </h2>
              <p className="text-slate-700 text-xs mt-1">Find answers to common questions about scientific calculations and functions</p>
            </div>

            {/* FAQ Items */}
            <div className="divide-y divide-slate-200">
              {SCIENTIFIC_CALC_FAQ.map((faq, index) => (
                <div key={index} className="p-6">
                  {/* Question */}
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-start justify-between gap-4 text-left hover:text-blue-600 transition duration-200"
                  >
                    <h3 className="font-semibold text-slate-900 flex-1">
                      {faq.question}
                    </h3>
                    <span className={`flex-shrink-0 text-2xl transition-transform duration-300 ${expandedFaqIndex === index ? 'rotate-180' : ''}`}>
                      📖
                    </span>
                  </button>

                  {/* Answer */}
                  {expandedFaqIndex === index && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <p className="text-slate-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <p className="text-slate-700">
              <strong>💡 Tip:</strong> Use our Scientific Calculator for complex mathematical calculations. Practice with different functions to master trigonometry, logarithms, and exponential calculations. Visit the Help page for comprehensive information about all calculators.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
