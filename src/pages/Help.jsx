import React from 'react';
import SEO from '../components/SEO';

export default function Help({ onNavigate }) {
  return (
    <>
      <SEO
        title="Help & FAQ - Universal EMI Calculator"
        description="Get help with EMI calculator, learn how to calculate loans, understand part payment benefits, and find answers to common questions."
        keywords="help, FAQ, EMI calculator help, loan calculator guide, how to calculate EMI"
        canonical="https://universalemi.com/help"
        ogTitle="Help & FAQ - Universal"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Header */}
        <header className="bg-gradient-to-r from-green-600 to-green-800 text-white py-6 shadow-lg">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">❓ Help & FAQ</h1>
            <p className="text-green-100 text-lg mt-2">
              Find answers to common questions about our EMI calculator
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* FAQ Section */}
            <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>

              <div className="space-y-6">
                {/* Q1 */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">What is EMI?</h3>
                  <p className="text-slate-700">
                    EMI (Equated Monthly Installment) is the fixed amount you pay every month to repay your loan. 
                    It includes both principal and interest components. For example, if you take a ₹10,00,000 home 
                    loan at 8% interest for 20 years, your monthly EMI would be around ₹9,365.
                  </p>
                </div>

                {/* Q2 */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">How is EMI calculated?</h3>
                  <p className="text-slate-700 mb-2">
                    EMI is calculated using the formula:
                  </p>
                  <div className="bg-slate-100 p-4 rounded-lg font-mono text-sm mb-2">
                    EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
                  </div>
                  <p className="text-slate-700">
                    Where: P = Principal (loan amount), R = Monthly interest rate, N = Number of months
                  </p>
                </div>

                {/* Q3 */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">What is Part Payment/Prepayment?</h3>
                  <p className="text-slate-700">
                    Part payment (also called prepayment) is when you make an additional lump sum payment towards your 
                    loan principal before the scheduled maturity date. This reduces the outstanding principal, which 
                    directly reduces the total interest payable and can shorten your loan tenure.
                  </p>
                </div>

                {/* Q4 */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">How much can I save with part payment?</h3>
                  <p className="text-slate-700">
                    The savings depend on when you make the part payment and the amount. Our Part Payment Calculator 
                    helps you see exactly how much interest you'll save, accounting for any prepayment penalties your 
                    bank may charge.
                  </p>
                </div>

                {/* Q5 */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">What loan types does Universal support?</h3>
                  <p className="text-slate-700">
                    Universal supports the following loan types:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-slate-700 space-y-1">
                    <li>Personal Loans</li>
                    <li>Home Loans</li>
                    <li>Car/Auto Loans</li>
                    <li>Education Loans</li>
                    <li>Business Loans</li>
                    <li>Overdraft (OD)</li>
                    <li>Custom Loans</li>
                  </ul>
                </div>

                {/* Q6 */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Is my data safe?</h3>
                  <p className="text-slate-700">
                    Yes, all your calculation data is saved securely in our encrypted Supabase database. We do not share 
                    your personal information with any third parties. You can view your calculation history anytime by 
                    entering your email in the Admin section.
                  </p>
                </div>

                {/* Q7 */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">How accurate are the calculations?</h3>
                  <p className="text-slate-700">
                    Our EMI calculator is highly accurate and uses standard banking formulas. However, actual EMI may 
                    vary slightly based on individual bank policies, processing fees, GST on interest, and other charges. 
                    Always confirm with your bank before finalizing any loan.
                  </p>
                </div>

                {/* Q8 */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">What if I made a calculation error?</h3>
                  <p className="text-slate-700">
                    You can recalculate with correct values anytime. Simply enter the correct details and click 
                    "Calculate EMI" again. Your previous calculations are stored with the email you used, so you can 
                    compare different scenarios.
                  </p>
                </div>

                {/* Q9 */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Can I export my calculations?</h3>
                  <p className="text-slate-700">
                    Yes! You can export all your calculations as a CSV file from the Admin Dashboard. This is useful 
                    for keeping records or sharing with your financial advisor.
                  </p>
                </div>

                {/* Q10 */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Is Universal free to use?</h3>
                  <p className="text-slate-700">
                    Yes, Universal is completely free! There are no hidden charges or premium features. All calculations 
                    and tools are available to all users at no cost.
                  </p>
                </div>
              </div>
            </section>

            {/* Tips Section */}
            <section className="bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">💡 Tips for Using Universal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">📊 EMI Calculator</h3>
                  <p className="text-slate-700 text-sm">
                    Enter your loan details to get an instant breakdown of your monthly payment, total interest, 
                    and complete amortization schedule.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">📈 Part Payment Analysis</h3>
                  <p className="text-slate-700 text-sm">
                    Use this tool to analyze different part payment scenarios and see exactly how much you can save 
                    by making prepayments.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">💾 Save Calculations</h3>
                  <p className="text-slate-700 text-sm">
                    Save your calculations to keep a record. You can retrieve them anytime using your email address 
                    from the Admin section.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">📋 View History</h3>
                  <p className="text-slate-700 text-sm">
                    Visit the Admin Dashboard to see all your previous calculations, filter by loan type, and export 
                    as CSV.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">📞 Still Need Help?</h2>
              <p className="text-slate-700 mb-6">
                If you couldn't find the answer to your question, feel free to reach out to us. We're here to help!
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-slate-700">
                  <strong>Email:</strong> support@universalemi.com
                </p>
                <p className="text-slate-700 mt-2">
                  <strong>Response Time:</strong> Within 24 hours
                </p>
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 text-center py-6 mt-12 border-t border-slate-700">
          <div className="container mx-auto px-4">
            <p className="mb-4">
              © 2026 Universal - Free EMI & Loan Calculator
            </p>
            {onNavigate && (
              <button
                onClick={() => onNavigate('home')}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
              >
                ← Back to Calculator
              </button>
            )}
          </div>
        </footer>
      </div>
    </>
  );
}
