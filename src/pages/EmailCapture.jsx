import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function EmailCapture({ onEmailSubmit }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email.trim()) {
      setError('Please enter your email address for accessing all types of Calculators and Converters and enjoy!');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address for accessing all types of Calculators and Converters and enjoy!');
      return;
    }

    setIsLoading(true);
    try {
      await onEmailSubmit(email);
    } catch (err) {
      console.error('Error submitting email:', err);
      setError('Failed to save email. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Universal - Email Verification</title>
        <meta name="description" content="Enter your email to access all calculators and converters" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div className="bg-white rounded-xl shadow-2xl p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">💰 Universal</h1>
              <p className="text-lg text-slate-600">All-in-One Calculator & Converter Suite</p>
            </div>

            {/* Welcome Message */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
              <p className="text-slate-700 text-sm">
                <strong>Welcome! 👋</strong><br />
                Enter your email address to access all our powerful calculators and converters.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                  📧 Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="you@example.com"
                  disabled={isLoading}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-slate-900 font-medium transition duration-200 disabled:bg-slate-100"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <p className="text-red-800 text-sm font-medium">
                    ❌ {error}
                  </p>
                </div>
              )}

              {/* OK Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-500 text-white font-bold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg mt-6"
              >
                {isLoading ? (
                  <>
                    <span className="inline-block animate-spin">⏳</span>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>OK</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            {/* Features Preview */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-600 uppercase mb-4">What You Get Access To:</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <span>🧮</span>
                  <span>EMI Calculator</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <span>💰</span>
                  <span>Part Payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <span>📊</span>
                  <span>SWP Calculator</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <span>🧮</span>
                  <span>Scientific Calc</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <span>📏</span>
                  <span>Unit Converter</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <span>🌡️</span>
                  <span>Temp Converter</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-xs text-slate-500">
              <p>Your email helps us save your calculations and provide personalized experience.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
