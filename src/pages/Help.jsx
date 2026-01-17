import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Help({ onNavigate }) {
  return (
    <>
      <Helmet>
        <title>Help & Support</title>
        <meta name="description" content="Get help and support for using the EMI calculator" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">❓ Help & Support</h1>
            <p className="text-lg text-slate-700">
              Find answers to common questions and get support
            </p>
          </div>

          {/* Help Content */}
          <div className="space-y-8">
            {/* Getting Started */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">🚀 Getting Started</h2>
              <div className="space-y-4 text-slate-700">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">1. Calculate Your EMI</h3>
                  <p>Go to the Calculator tab, enter your loan details (principal, interest rate, tenure), and click "Calculate EMI". Your calculation will be automatically saved.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">2. View Results</h3>
                  <p>See your monthly EMI, total interest payable, amortization schedule, and visual charts showing your loan breakdown.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">3. Analyze Part Payments</h3>
                  <p>Use the Part Payment Calculator to explore how additional payments can reduce your interest and tenure.</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">✨ Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h3 className="font-semibold text-slate-900 mb-2">📊 Multiple Loan Types</h3>
                  <p className="text-sm text-slate-700">Personal, Home, Auto, Education, and Business loans</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h3 className="font-semibold text-slate-900 mb-2">📈 Two EMI Methods</h3>
                  <p className="text-sm text-slate-700">Reducing Balance and Flat Rate calculations</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h3 className="font-semibold text-slate-900 mb-2">💾 Auto-Save</h3>
                  <p className="text-sm text-slate-700">All calculations automatically saved with email</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h3 className="font-semibold text-slate-900 mb-2">📋 Detailed Schedule</h3>
                  <p className="text-sm text-slate-700">Month-wise breakdown with charts and tables</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <h3 className="font-semibold text-slate-900 mb-2">💰 Part Payment Analysis</h3>
                  <p className="text-sm text-slate-700">Analyze impact of extra payments on interest savings</p>
                </div>
                <div className="p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-500">
                  <h3 className="font-semibold text-slate-900 mb-2">📊 Admin Dashboard</h3>
                  <p className="text-sm text-slate-700">View, search, and export all calculations</p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">❓ Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">What's the difference between Reducing Balance and Flat Rate?</h3>
                  <p className="text-slate-700">Reducing Balance calculates interest on the outstanding balance each month (you pay less interest over time). Flat Rate calculates interest on the original principal for all months (total interest remains constant).</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Is my data secure?</h3>
                  <p className="text-slate-700">Your calculations are stored securely in the browser's storage and are not shared with anyone. You can view and export your data anytime from the Admin dashboard.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Can I export my calculations?</h3>
                  <p className="text-slate-700">Yes! Go to the Admin dashboard, search for your email, and click "Export to CSV" to download all your calculations.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">How are part payments calculated?</h3>
                  <p className="text-slate-700">You can choose from three strategies: Reduce Tenure (lower duration, same EMI), Reduce EMI (same duration, lower payment), or Balanced (both reduced proportionally).</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">What's the default penalty for part payments?</h3>
                  <p className="text-slate-700">The default is 1.5% for India. You can customize this percentage for each part payment.</p>
                </div>
              </div>
            </div>

            {/* Tips & Tricks */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Tips & Tricks</h2>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-lg">✓</span>
                  <span>Compare different loan options by calculating EMI for various combinations of principal, rate, and tenure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">✓</span>
                  <span>Use the Part Payment Calculator to see how bonuses or extra income can reduce your loan burden</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">✓</span>
                  <span>Export your calculations as CSV for use in spreadsheets or presentations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">✓</span>
                  <span>Check the FAQ section on the home page for loan-specific information</span>
                </li>
              </ul>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">📞 Need More Help?</h2>
              <p className="text-slate-700 mb-4">If you have questions or need further assistance, please refer to the FAQ section on the Home page or contact our support team.</p>
              <p className="text-sm text-slate-600">Version 1.0 | EMI Calculator © 2024</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
