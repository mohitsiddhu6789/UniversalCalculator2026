import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function SWPCalculator({ onNavigate }) {
  const [formData, setFormData] = useState({
    investedAmount: 500000,
    monthlyWithdrawal: 50000,
    expectedReturns: 19,
    duration: 19,
  });

  const [result, setResult] = useState(null);

  const handleInputChange = (field, value) => {
    const newData = { ...formData, [field]: parseFloat(value) || 0 };
    setFormData(newData);
    calculateSWP(newData);
  };

  const calculateSWP = (data) => {
    const {
      investedAmount,
      monthlyWithdrawal,
      expectedReturns,
      duration,
    } = data;

    if (!investedAmount || !monthlyWithdrawal || !expectedReturns || !duration) {
      setResult(null);
      return;
    }

    // Monthly return rate
    const monthlyRate = expectedReturns / 100 / 12;
    let balance = investedAmount;
    let totalWithdrawn = 0;
    let withdrawalHistory = [];

    // Calculate for each month
    for (let month = 1; month <= duration * 12; month++) {
      // Apply return on remaining balance
      const interestEarned = balance * monthlyRate;
      balance += interestEarned;

      // Withdraw monthly amount
      if (balance >= monthlyWithdrawal) {
        balance -= monthlyWithdrawal;
        totalWithdrawn += monthlyWithdrawal;
      } else {
        // Final withdrawal
        totalWithdrawn += balance;
        balance = 0;
        break;
      }
    }

    const finalValue = Math.max(0, balance);
    const totalReturnsEarned = totalWithdrawn + finalValue - investedAmount;

    setResult({
      investedAmount: Math.round(investedAmount * 100) / 100,
      totalWithdrawn: Math.round(totalWithdrawn * 100) / 100,
      finalValue: Math.round(finalValue * 100) / 100,
      totalReturnsEarned: Math.round(totalReturnsEarned * 100) / 100,
      months: Math.floor((totalWithdrawn / monthlyWithdrawal) || 0),
    });
  };

  return (
    <>
      <Helmet>
        <title>SWP Calculator</title>
        <meta name="description" content="Calculate your Systematic Withdrawal Plan returns" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">📊 SWP Calculator</h1>
            <p className="text-lg text-slate-700">
              Calculate your Systematic Withdrawal Plan and projected returns
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">💰 Investment Details</h2>

              {/* Total Investment */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Total Investment
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">₹</span>
                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="100000"
                    value={formData.investedAmount}
                    onChange={(e) => handleInputChange('investedAmount', e.target.value)}
                    className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <span className="text-sm font-semibold text-blue-600 min-w-fit">
                    {(formData.investedAmount / 100000).toFixed(1)}L
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>₹10L</span>
                  <span>₹1Cr</span>
                </div>
              </div>

              {/* Monthly Withdrawal */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Monthly Withdrawal
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">₹</span>
                  <input
                    type="range"
                    min="500"
                    max="500000"
                    step="500"
                    value={formData.monthlyWithdrawal}
                    onChange={(e) => handleInputChange('monthlyWithdrawal', e.target.value)}
                    className="flex-1 h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <span className="text-sm font-semibold text-green-600 min-w-fit">
                    {formData.monthlyWithdrawal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>₹500</span>
                  <span>₹50K</span>
                </div>
              </div>

              {/* Expected Returns */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Expected Returns (%)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.5"
                    value={formData.expectedReturns}
                    onChange={(e) => handleInputChange('expectedReturns', e.target.value)}
                    className="flex-1 h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <span className="text-sm font-semibold text-purple-600 min-w-fit">
                    {formData.expectedReturns}%
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Duration (Years)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="flex-1 h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                  <span className="text-sm font-semibold text-orange-600 min-w-fit">
                    {formData.duration} Yrs
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>1Yr</span>
                  <span>30 Yrs</span>
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              {result ? (
                <>
                  {/* Main Results */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">📈 Results</h2>

                    <div className="space-y-4">
                      {/* Invested Amount */}
                      <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
                        <p className="text-sm text-slate-600 mb-1">Invested Amount</p>
                        <p className="text-3xl font-bold text-slate-900">
                          ₹{result.investedAmount.toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Total Withdrawal */}
                      <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                        <p className="text-sm text-slate-600 mb-1">Total Withdrawal</p>
                        <p className="text-3xl font-bold text-green-600">
                          ₹{result.totalWithdrawn.toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Final Value */}
                      <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                        <p className="text-sm text-slate-600 mb-1">Final Value</p>
                        <p className="text-3xl font-bold text-purple-600">
                          ₹{result.finalValue.toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Total Returns */}
                      <div className={`p-4 rounded-lg border-l-4 ${
                        result.totalReturnsEarned >= 0
                          ? 'bg-green-50 border-green-600'
                          : 'bg-red-50 border-red-600'
                      }`}>
                        <p className="text-sm text-slate-600 mb-1">Total Returns Earned</p>
                        <p className={`text-3xl font-bold ${
                          result.totalReturnsEarned >= 0
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}>
                          {result.totalReturnsEarned >= 0 ? '+' : ''}₹{result.totalReturnsEarned.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6 border-2 border-blue-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">📊 Summary</h3>
                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="flex justify-between">
                        <span>Withdrawal Period:</span>
                        <span className="font-semibold">{result.months} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Withdrawal:</span>
                        <span className="font-semibold">₹{formData.monthlyWithdrawal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Return Rate:</span>
                        <span className="font-semibold">{formData.expectedReturns}%</span>
                      </div>
                      <div className="border-t border-blue-200 pt-3 mt-3">
                        <div className="flex justify-between font-semibold">
                          <span>Total Value Generated:</span>
                          <span className="text-green-600">
                            ₹{(result.totalWithdrawn + result.finalValue).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                  <div className="text-6xl mb-4">💼</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Adjust Parameters</h3>
                  <p className="text-slate-600">
                    Use the sliders on the left to calculate your SWP returns
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">📚 About SWP</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-slate-900 mb-2">💡 What is SWP?</h3>
                <p className="text-slate-700 text-sm">
                  Systematic Withdrawal Plan (SWP) is a strategy where you withdraw a fixed amount regularly from your investments while the remaining balance continues to earn returns.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-bold text-slate-900 mb-2">✅ Benefits</h3>
                <p className="text-slate-700 text-sm">
                  Provides regular income, maintains wealth growth, reduces tax burden, and helps manage systematic investments effectively during retirement.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-bold text-slate-900 mb-2">🎯 Best For</h3>
                <p className="text-slate-700 text-sm">
                  Retirement planning, supplementary income generation, and managing lump sum investments with regular withdrawal needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
