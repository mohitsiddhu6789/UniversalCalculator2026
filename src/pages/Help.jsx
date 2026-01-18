import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Help({ onNavigate }) {
  return (
    <>
      <Helmet>
        <title>Help & Support</title>
        <meta name="description" content="Get help and support for using all calculators" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">❓ Help & Support</h1>
            <p className="text-lg text-slate-700">
              Find answers to common questions about all our calculators
            </p>
          </div>

          {/* Calculator Overview */}
          <div className="mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">🧮 Our Calculators</h2>
            
            {/* EMI Calculator */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🏠</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">EMI Calculator</h3>
                  <p className="text-slate-700 mb-3">
                    Calculate your loan EMI (Equated Monthly Installment) for any type of loan including personal, home, auto, education, and business loans.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 mb-3">
                    <div>✓ Multiple loan types</div>
                    <div>✓ Flexible tenure</div>
                    <div>✓ Month-wise schedule</div>
                    <div>✓ Visual charts</div>
                    <div>✓ Reducing/Flat rates</div>
                    <div>✓ Save calculations</div>
                  </div>
                  <button
                    onClick={() => onNavigate('home')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200"
                  >
                    Go to EMI Calculator
                  </button>
                </div>
              </div>
            </div>

            {/* Part Payment Calculator */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
              <div className="flex items-start gap-4">
                <span className="text-3xl">💰</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Part Payment Calculator</h3>
                  <p className="text-slate-700 mb-3">
                    Analyze the impact of part payments (prepayments) on your loan. See how much interest you can save and reduce your tenure.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 mb-3">
                    <div>✓ Multiple part payments</div>
                    <div>✓ Custom penalties</div>
                    <div>✓ 3 strategies</div>
                    <div>✓ Interest savings</div>
                    <div>✓ Tenure reduction</div>
                    <div>✓ Detailed comparison</div>
                  </div>
                  <button
                    onClick={() => onNavigate('part-payment')}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200"
                  >
                    Go to Part Payment
                  </button>
                </div>
              </div>
            </div>

            {/* SWP Calculator */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-500">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📊</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">SWP Calculator</h3>
                  <p className="text-slate-700 mb-3">
                    Systematic Withdrawal Plan (SWP) calculator for planning regular withdrawals from your investments while maintaining growth.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 mb-3">
                    <div>✓ Flexible investment amounts</div>
                    <div>✓ Custom withdrawal amounts</div>
                    <div>✓ Variable returns</div>
                    <div>✓ Duration planning</div>
                    <div>✓ Growth projections</div>
                    <div>✓ Retirement planning</div>
                  </div>
                  <button
                    onClick={() => onNavigate('swp')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200"
                  >
                    Go to SWP Calculator
                  </button>
                </div>
              </div>
            </div>

            {/* Scientific Calculator */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-cyan-500">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🧮</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Scientific Calculator</h3>
                  <p className="text-slate-700 mb-3">
                    Advanced scientific calculator for complex mathematical calculations including trigonometric, logarithmic, and power functions.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 mb-3">
                    <div>✓ Trigonometric functions</div>
                    <div>✓ Logarithmic functions</div>
                    <div>✓ Power operations</div>
                    <div>✓ Constants (π, e)</div>
                    <div>✓ RAD/DEG toggle</div>
                    <div>✓ Full precision</div>
                  </div>
                  <button
                    onClick={() => onNavigate('scientific')}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200"
                  >
                    Go to Scientific Calculator
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">🚀 Getting Started</h2>
            <div className="space-y-4 text-slate-700">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">1. Calculate Your EMI</h3>
                <p>Start with the EMI Calculator. Enter your loan details (principal, interest rate, tenure) and click "Calculate EMI". Your calculation will be automatically saved with your email.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">2. Analyze Part Payments</h3>
                <p>Use the Part Payment Calculator to explore how additional payments can reduce your interest and tenure. Add multiple part payments with custom penalties to see the impact.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">3. Plan Your Withdrawals</h3>
                <p>Use the SWP Calculator to plan systematic withdrawals from your investments. Adjust the investment amount, withdrawal amount, and expected returns.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">4. Advanced Calculations</h3>
                <p>Use the Scientific Calculator for complex mathematical calculations when needed for financial planning or analysis.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              {/* EMI FAQ */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">What's the difference between Reducing Balance and Flat Rate?</h3>
                <p className="text-slate-700">Reducing Balance: Interest is calculated on the outstanding balance each month (you pay less interest over time). Flat Rate: Interest is calculated on the original principal for all months (constant total interest).</p>
              </div>

              {/* Part Payment FAQ */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">How do the three Part Payment strategies differ?</h3>
                <p className="text-slate-700"><strong>Reduce Tenure:</strong> Keep EMI same, finish loan faster. <strong>Reduce EMI:</strong> Keep tenure same, lower monthly payment. <strong>Balanced:</strong> Reduce both EMI and tenure proportionally.</p>
              </div>

              {/* SWP FAQ */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">What is SWP (Systematic Withdrawal Plan)?</h3>
                <p className="text-slate-700">SWP is a strategy where you withdraw a fixed amount regularly from your investments while the remaining balance continues to earn returns. It's ideal for retirement planning and generating regular income.</p>
              </div>

              {/* Data Security */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Is my data secure?</h3>
                <p className="text-slate-700">Your calculations are stored securely in our database using your email as the identifier. You can view and manage your calculation history from the Admin Dashboard.</p>
              </div>

              {/* Export */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Can I export my calculations?</h3>
                <p className="text-slate-700">Yes! Go to the Admin Dashboard, search for your email, and click "Export to CSV" to download all your calculations in a spreadsheet format.</p>
              </div>

              {/* Penalties */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">What's the default penalty for part payments?</h3>
                <p className="text-slate-700">The default is 1.5% for India. You can customize this percentage for each part payment based on your loan agreement with your bank.</p>
              </div>
            </div>
          </div>

          {/* Tips & Best Practices */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Tips & Best Practices</h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-lg">✓</span>
                <span>Compare different loan options by calculating EMI for various combinations of principal, rate, and tenure</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">✓</span>
                <span>Use Part Payment Calculator to see how bonuses or extra income can reduce your loan burden</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">✓</span>
                <span>Export your calculations as CSV for use in spreadsheets or presentations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">✓</span>
                <span>Use SWP Calculator to plan for retirement and ensure your investments last</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">✓</span>
                <span>Check your bank's prepayment penalty policy before making part payments</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">✓</span>
                <span>Use Scientific Calculator for complex financial formulas and calculations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">✓</span>
                <span>All calculations are automatically saved - no need to save manually</span>
              </li>
            </ul>
          </div>

          {/* Key Features Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">✨ Key Features</h3>
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
              <h3 className="font-bold text-slate-900 mb-3 text-lg">🎯 Use Cases</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>✓ Loan comparison</li>
                <li>✓ EMI planning</li>
                <li>✓ Part payment analysis</li>
                <li>✓ Retirement planning</li>
                <li>✓ Investment analysis</li>
                <li>✓ Financial decisions</li>
              </ul>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">📞 Need More Help?</h2>
            <p className="text-slate-700 mb-4">If you have questions or need further assistance, please refer to the FAQ section above or contact our support team.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-bold text-slate-900 mb-2">📧 Email</h4>
                <p className="text-slate-600">support@universal.com</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">💬 Chat</h4>
                <p className="text-slate-600">Live chat available 24/7</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">📱 Phone</h4>
                <p className="text-slate-600">+91 XXXX XXX XXX</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-4">Version 1.0 | Universal Calculators © 2024</p>
          </div>
        </div>
      </div>
    </>
  );
}
