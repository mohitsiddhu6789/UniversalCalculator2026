import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Help({ onNavigate }) {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqSections = [
    {
      title: 'EMI Calculator',
      icon: '🏠',
      questions: [
        {
          q: 'What is the difference between Reducing Balance and Flat Rate?',
          a: 'Reducing Balance: Interest is calculated on the outstanding balance each month (you pay less interest over time). Flat Rate: Interest is calculated on the original principal for all months (constant total interest).'
        },
        {
          q: 'How is EMI calculated?',
          a: 'For Reducing Balance: EMI = P × R × (1+R)^N / ((1+R)^N − 1), where P = Principal, R = Monthly Rate, N = Months. For Flat Rate: EMI = (Principal + Total Interest) / Number of Months.'
        },
        {
          q: 'What factors affect my EMI amount?',
          a: 'EMI depends on: (1) Loan Amount - Higher amount = Higher EMI, (2) Interest Rate - Higher rate = Higher EMI, (3) Tenure - Longer tenure = Lower EMI but higher total interest.'
        },
        {
          q: 'Can I compare different loan options?',
          a: 'Yes! Calculate EMI for various combinations of principal, rate, and tenure to compare different loan options and make an informed decision.'
        },
        {
          q: 'Are my calculations saved automatically?',
          a: 'Yes, all calculations are automatically saved to your email. You can view your calculation history from the Admin Dashboard.'
        }
      ]
    },
    {
      title: 'Part Payment Calculator',
      icon: '💰',
      questions: [
        {
          q: 'What is a part payment?',
          a: 'A part payment (prepayment) is an additional lump sum amount paid towards your loan before the maturity date. It reduces your outstanding balance and can save interest.'
        },
        {
          q: 'How do the three strategies differ?',
          a: 'Reduce Tenure: Keep EMI same, finish loan faster. Reduce EMI: Keep tenure same, lower monthly payment. Balanced: Reduce both EMI and tenure proportionally.'
        },
        {
          q: 'What is a prepayment penalty?',
          a: 'A prepayment penalty is a charge imposed by the bank when you make a part payment. It\'s usually a percentage of the part payment amount. You can customize this percentage.'
        },
        {
          q: 'How much can I save with part payments?',
          a: 'Your savings depend on the part payment amount, timing, and interest rate. Use the calculator to add multiple part payments and see the exact savings.'
        },
        {
          q: 'Can I add multiple part payments?',
          a: 'Yes! You can add as many part payments as you want in different months with different amounts and penalty percentages.'
        }
      ]
    },
    {
      title: 'SWP Calculator',
      icon: '📊',
      questions: [
        {
          q: 'What is SWP (Systematic Withdrawal Plan)?',
          a: 'SWP is a strategy where you withdraw a fixed amount regularly from your investments while the remaining balance continues to earn returns. Ideal for retirement planning.'
        },
        {
          q: 'How is SWP different from SIP?',
          a: 'SIP (Systematic Investment Plan) involves regular investments. SWP (Systematic Withdrawal Plan) involves regular withdrawals. SWP is typically used after accumulation phase is complete.'
        },
        {
          q: 'What should be my monthly withdrawal amount?',
          a: 'Your withdrawal amount should be sustainable based on your investment growth and expected returns. Use the calculator to test different withdrawal amounts.'
        },
        {
          q: 'Can my investment last for my desired period?',
          a: 'The calculator shows your final investment value. If it\'s positive, your investment lasts beyond the desired period. Adjust withdrawal amount if needed.'
        },
        {
          q: 'Does higher expected return mean higher withdrawals?',
          a: 'Yes, higher returns mean your investment grows faster, allowing you to withdraw more while maintaining the capital for longer periods.'
        }
      ]
    },
    {
      title: 'Scientific Calculator',
      icon: '🧮',
      questions: [
        {
          q: 'What trigonometric functions are supported?',
          a: 'Supported functions: sin, cos, tan. You can toggle between RAD (radians) and DEG (degrees) modes for angle calculations.'
        },
        {
          q: 'What is the difference between RAD and DEG?',
          a: 'RAD (Radians): Standard mathematical unit where a full circle = 2π radians. DEG (Degrees): Where a full circle = 360 degrees. Use DEG for everyday angles, RAD for scientific calculations.'
        },
        {
          q: 'What logarithmic functions are available?',
          a: 'log (log base 10) and ln (natural logarithm, base e). These are useful for exponential calculations and scientific computations.'
        },
        {
          q: 'Can I use mathematical constants?',
          a: 'Yes, you can use π (pi = 3.14159...) and e (Euler\'s number = 2.71828...) directly in calculations.'
        },
        {
          q: 'What power operations are supported?',
          a: 'Supported: x² (square), x³ (cube), √ (square root), ∛ (cube root), and ^ (any power). Example: 2^10 = 1024.'
        }
      ]
    },
    {
      title: 'Unit Converter',
      icon: '📏',
      questions: [
        {
          q: 'What units can I convert?',
          a: 'Three categories: Length (m, km, cm, mm, mi, yd, ft, in), Weight (kg, g, mg, lb, oz, ton), Volume (l, ml, m³, gal, pt, cup, oz).'
        },
        {
          q: 'How accurate are the conversions?',
          a: 'Conversions are highly accurate with precision up to 6 decimal places. The calculator uses international standard conversion factors.'
        },
        {
          q: 'Can I convert between metric and imperial?',
          a: 'Yes! The converter supports both metric (kg, meters) and imperial (pounds, feet) systems and can convert between them.'
        },
        {
          q: 'What is the conversion formula for length?',
          a: 'Length conversions use base unit meter: 1 km = 1000 m, 1 m = 100 cm, 1 m = 3.28084 feet, 1 m = 39.3701 inches, etc.'
        },
        {
          q: 'How do I convert weight to volume?',
          a: 'You cannot directly convert weight to volume as they measure different properties. Weight = how heavy, Volume = how much space. You need density information to convert between them.'
        },
        {
          q: 'What is a good use case for unit converter?',
          a: 'Useful for: cooking recipes (cups to ml), construction (feet to meters), fitness (pounds to kg), international travel (miles to km), and scientific work.'
        }
      ]
    },
    {
      title: 'Temperature Converter',
      icon: '🌡️',
      questions: [
        {
          q: 'How do temperature scales differ?',
          a: 'Celsius: Water freezes at 0°C. Fahrenheit: Water freezes at 32°F (common in US). Kelvin: Absolute scale used in science (0K = -273.15°C, no negatives).'
        },
        {
          q: 'What is absolute zero?',
          a: 'Absolute zero (0K or −273.15°C or −459.67°F) is the lowest possible temperature - the point where all molecular motion stops. Nothing can be colder.'
        },
        {
          q: 'When should I use Kelvin?',
          a: 'Use Kelvin in scientific and engineering calculations. It\'s the SI unit and avoids negative numbers. Used in physics, chemistry, and advanced calculations.'
        },
        {
          q: 'Can I convert between all three scales?',
          a: 'Yes! The converter supports bidirectional conversion between Celsius ↔ Fahrenheit, Celsius ↔ Kelvin, and Fahrenheit ↔ Kelvin.'
        },
        {
          q: 'What is room temperature in all scales?',
          a: 'Room temperature ≈ 20°C = 68°F = 293.15K. This is a comfortable temperature for most people indoors.'
        },
        {
          q: 'Is the conversion formula the same always?',
          a: 'Yes, the conversion formulas are constant: °F = (°C × 9/5) + 32, K = °C + 273.15. These are universal standards.'
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Help & Support</title>
        <meta name="description" content="Get help and support for using all calculators and converters" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-4 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-4">
            <h4 className="text-2xl font-bold text-slate-900 mb-2">❓ Help & Support</h4>
            <p className="text-sm text-slate-700">
              Complete guide to all our calculators and converters
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="mb-4 grid grid-cols-2 md:grid-cols-3 gap-2">
            {faqSections.map((section, index) => (
              <button
                key={index}
                onClick={() => document.getElementById(`section-${index}`).scrollIntoView({ behavior: 'smooth' })}
                className="bg-white hover:bg-blue-50 p-4 rounded-lg shadow border-l-4 border-blue-500 transition duration-200 text-left"
              >
                <span className="text-2xl">{section.icon}</span>
                <p className="text-xs font-bold text-slate-900 mt-2">{section.title}</p>
              </button>
            ))}
          </div>

          {/* Calculators Section Overview */}
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900 mb-3">🧮 Our Calculators</h2>
            
            <div className="space-y-2">
              {/* EMI Calculator */}
              <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-start gap-2">
                  <span className="text-3xl">🏠</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">EMI Calculator</h3>
                    <p className="text-slate-700 mb-2 text-sm">
                      Calculate your loan EMI (Equated Monthly Installment) for any type of loan including personal, home, auto, education, and business loans.
                    </p>
                    <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600 mb-2">
                      <div>✓ Multiple loan types</div>
                      <div>✓ Flexible tenure</div>
                      <div>✓ Month-wise schedule</div>
                      <div>✓ Visual charts</div>
                      <div>✓ Reducing/Flat rates</div>
                      <div>✓ Save calculations</div>
                    </div>
                    <button
                      onClick={() => onNavigate('home')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition duration-200"
                    >
                      Go to EMI Calculator
                    </button>
                  </div>
                </div>
              </div>

              {/* Part Payment Calculator */}
              <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-orange-500">
                <div className="flex items-start gap-2">
                  <span className="text-3xl">💰</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Part Payment Calculator</h3>
                    <p className="text-slate-700 mb-2 text-sm">
                      Analyze the impact of part payments (prepayments) on your loan. See how much interest you can save and reduce your tenure with multiple payment strategies.
                    </p>
                    <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600 mb-2">
                      <div>✓ Multiple part payments</div>
                      <div>✓ Custom penalties</div>
                      <div>✓ 3 strategies</div>
                      <div>✓ Interest savings</div>
                      <div>✓ Tenure reduction</div>
                      <div>✓ Detailed comparison</div>
                    </div>
                    <button
                      onClick={() => onNavigate('part-payment')}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition duration-200"
                    >
                      Go to Part Payment
                    </button>
                  </div>
                </div>
              </div>

              {/* SWP Calculator */}
              <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-indigo-500">
                <div className="flex items-start gap-2">
                  <span className="text-3xl">📊</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">SWP Calculator</h3>
                    <p className="text-slate-700 mb-2 text-sm">
                      Systematic Withdrawal Plan (SWP) calculator for planning regular withdrawals from your investments while maintaining growth and ensuring sustainability.
                    </p>
                    <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600 mb-2">
                      <div>✓ Flexible investment amounts</div>
                      <div>✓ Custom withdrawal amounts</div>
                      <div>✓ Variable returns</div>
                      <div>✓ Duration planning</div>
                      <div>✓ Growth projections</div>
                      <div>✓ Retirement planning</div>
                    </div>
                    <button
                      onClick={() => onNavigate('swp')}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition duration-200"
                    >
                      Go to SWP Calculator
                    </button>
                  </div>
                </div>
              </div>

              {/* Scientific Calculator */}
              <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-cyan-500">
                <div className="flex items-start gap-2">
                  <span className="text-3xl">🧮</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Scientific Calculator</h3>
                    <p className="text-slate-700 mb-2 text-sm">
                      Advanced scientific calculator for complex mathematical calculations including trigonometric, logarithmic, and power functions with full precision.
                    </p>
                    <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600 mb-2">
                      <div>✓ Trigonometric functions</div>
                      <div>✓ Logarithmic functions</div>
                      <div>✓ Power operations</div>
                      <div>✓ Constants (π, e)</div>
                      <div>✓ RAD/DEG toggle</div>
                      <div>✓ Full precision</div>
                    </div>
                    <button
                      onClick={() => onNavigate('scientific')}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition duration-200"
                    >
                      Go to Scientific Calculator
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Converters Section Overview */}
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900 mb-3">🔄 Unit Converters</h2>
            
            <div className="space-y-4">
              {/* Unit Converter */}
              <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-green-500">
                <div className="flex items-start gap-2">
                  <span className="text-3xl">📏</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Unit Converter</h3>
                    <p className="text-slate-700 mb-2 text-sm">
                      Convert between different units of measurement including length, weight, and volume. Supports both metric and imperial systems with high precision.
                    </p>
                    <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600 mb-2">
                      <div>✓ Length conversion</div>
                      <div>✓ Weight/Mass conversion</div>
                      <div>✓ Volume conversion</div>
                      <div>✓ Multiple units</div>
                      <div>✓ Real-time conversion</div>
                      <div>✓ Metric & Imperial</div>
                    </div>
                    <div className="mb-2 p-2 bg-green-50 rounded-lg text-xs text-slate-700">
                      <strong>Supported Conversions:</strong>
                      <ul className="mt-2 space-y-1">
                        <li>📏 <strong>Length:</strong> m, km, cm, mm, mi, yd, ft, in</li>
                        <li>⚖️ <strong>Weight:</strong> kg, g, mg, lb, oz, ton</li>
                        <li>🧪 <strong>Volume:</strong> l, ml, m³, gal, pt, cup, oz</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => onNavigate('units')}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition duration-200"
                    >
                      Go to Unit Converter
                    </button>
                  </div>
                </div>
              </div>

              {/* Temperature Converter */}
              <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-red-500">
                <div className="flex items-start gap-2">
                  <span className="text-3xl">🌡️</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Temperature Converter</h3>
                    <p className="text-slate-700 mb-2 text-sm">
                      Convert between Celsius, Fahrenheit, and Kelvin temperature scales. Perfect for scientific calculations, cooking, and everyday temperature conversions.
                    </p>
                    <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600 mb-2">
                      <div>✓ Celsius ↔ Fahrenheit</div>
                      <div>✓ Celsius ↔ Kelvin</div>
                      <div>✓ Fahrenheit ↔ Kelvin</div>
                      <div>✓ Real-time conversion</div>
                      <div>✓ Reference points</div>
                      <div>✓ Full precision</div>
                    </div>
                    <div className="mb-2 p-2 bg-red-50 rounded-lg text-xs text-slate-700">
                      <strong>Quick Reference Points:</strong>
                      <ul className="mt-2 space-y-1">
                        <li>❄️ Water Freezes: 0°C = 32°F = 273.15K</li>
                        <li>🌡️ Room Temp: 20°C = 68°F = 293.15K</li>
                        <li>🔥 Water Boils: 100°C = 212°F = 373.15K</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => onNavigate('temperature')}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition duration-200"
                    >
                      Go to Temperature Converter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Sections */}
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900 mb-3">📚 Frequently Asked Questions</h2>
            
            <div className="space-y-3">
              {faqSections.map((section, sectionIndex) => (
                <div key={sectionIndex} id={`section-${sectionIndex}`} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {/* Section Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 border-l-4 border-blue-500">
                    <h3 className="text-lg font-bold text-slate-900">
                      {section.icon} {section.title}
                    </h3>
                  </div>

                  {/* FAQ Items */}
                  <div className="divide-y divide-slate-200">
                    {section.questions.map((faq, faqIndex) => {
                      const globalIndex = sectionIndex * 100 + faqIndex;
                      const isExpanded = expandedFaq === globalIndex;

                      return (
                        <div key={faqIndex} className="p-3">
                          {/* Question */}
                          <button
                            onClick={() => toggleFaq(globalIndex)}
                            className="w-full flex items-start justify-between gap-2 text-left hover:text-blue-600 transition duration-200"
                          >
                            <h4 className="font-semibold text-slate-900 flex-1 text-sm">
                              {faq.q}
                            </h4>
                            <span className={`flex-shrink-0 text-2xl transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                              📖
                            </span>
                          </button>

                          {/* Answer */}
                          {isExpanded && (
                            <div className="mt-2 pt-2 border-t border-slate-200">
                              <p className="text-slate-700 leading-relaxed text-sm">
                                {faq.a}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">✨ Calculators Features</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>✓ Auto-save calculations</li>
                <li>✓ Email-based history</li>
                <li>✓ CSV export</li>
                <li>✓ Multiple loan types</li>
                <li>✓ Detailed schedules</li>
                <li>✓ Visual charts</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-lg p-6 border-l-4 border-green-600">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">🔄 Converters Features</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>✓ Real-time conversion</li>
                <li>✓ Multiple units</li>
                <li>✓ Bidirectional</li>
                <li>✓ High precision</li>
                <li>✓ Quick reference</li>
                <li>✓ No sign-up needed</li>
              </ul>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3">💡 Tips & Tricks</h2>
            <ul className="space-y-3 text-slate-700 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-sm flex-shrink-0 font-bold">✓</span>
                <span>Click on any FAQ section header above to quickly navigate to that section</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sm flex-shrink-0 font-bold">✓</span>
                <span>All calculations are saved automatically - bookmark your results easily</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sm flex-shrink-0 font-bold">✓</span>
                <span>Use keyboard for faster navigation on scientific calculator</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sm flex-shrink-0 font-bold">✓</span>
                <span>Converters support real-time conversion as you type</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sm flex-shrink-0 font-bold">✓</span>
                <span>Try different scenarios to find the best option for your needs</span>
              </li>
            </ul>
          </div>

          {/* Contact Support */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg p-4 border-l-4 border-blue-500">
            <h2 className="text-lg font-bold text-slate-900 mb-3">📞 Need More Help?</h2>
            <p className="text-slate-700 mb-3 text-sm">If you have questions or need further assistance, please refer to the FAQ sections above or contact our support team.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">📧 Email</h4>
                <p className="text-slate-600 text-xs">support@universal.com</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">💬 Chat</h4>
                <p className="text-slate-600 text-xs">Live chat available 24/7</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">📱 Phone</h4>
                <p className="text-slate-600 text-xs">+91 XXXX XXX XXX</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-4">Version 1.0 | Universal Calculators & Converters © 2024</p>
          </div>
        </div>
      </div>
    </>
  );
}
