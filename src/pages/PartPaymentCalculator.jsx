import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PartPayment from '../components/PartPayment';
import { LoanContext } from '../context/LoanContext';

export default function PartPaymentCalculator({ onNavigate, latestEmiData }) {
  const { loanData, calculationResult } = useContext(LoanContext);
  const [displayResult, setDisplayResult] = useState(null);

  useEffect(() => {
    console.log('PartPaymentCalculator - latestEmiData:', latestEmiData);
    console.log('PartPaymentCalculator - loanData:', loanData);
    console.log('PartPaymentCalculator - calculationResult:', calculationResult);

    // Use latestEmiData if available, otherwise use context data
    const dataToUse = latestEmiData || calculationResult;

    if (!dataToUse || !dataToUse.principal || !dataToUse.interestRate || !dataToUse.tenure) {
      console.warn('No valid EMI data available');
      setDisplayResult(null);
    } else {
      console.log('Using EMI data:', dataToUse);
      setDisplayResult(dataToUse);
    }
  }, [latestEmiData, loanData, calculationResult]);

  const handleBackToCalculator = () => {
    onNavigate('home');
  };

  return (
    <>
      <Helmet>
        <title>Part Payment Calculator</title>
        <meta name="description" content="Analyze part payments and their impact on your loan EMI, tenure, and interest savings" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-4 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2 flex-wrap gap-4">
              <h4 className="text-2xl font-bold text-slate-900">💰 Part Payment Calculator</h4>
              {displayResult && (
                <button
                  onClick={handleBackToCalculator}
                  className="bg-slate-600 hover:bg-slate-700 text-white px-3 py-1 rounded-lg transition duration-200 text-sm font-bold"
                >
                  ← Back to EMI Calculator
                </button>
              )}
            </div>
            <p className="text-sm text-slate-700">
              Analyze how part payments can reduce your interest and adjust your EMI schedule
            </p>
          </div>

          {/* Loan Summary (if data available) */}
          {displayResult && (
            <div className="mb-3 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white p-3 rounded-lg shadow border-l-4 border-blue-500">
                <p className="text-xs font-semibold text-slate-600 uppercase mb-0.5">Principal</p>
                <p className="text-lg font-bold text-slate-900">
                  ₹{displayResult.principal.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow border-l-4 border-green-500">
                <p className="text-xs font-semibold text-slate-600 uppercase mb-0.5">Interest Rate</p>
                <p className="text-lg font-bold text-slate-900">{displayResult.interestRate}%</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow border-l-4 border-orange-500">
                <p className="text-xs font-semibold text-slate-600 uppercase mb-0.5">Tenure</p>
                <p className="text-lg font-bold text-slate-900">{displayResult.tenure} months</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow border-l-4 border-purple-500">
                <p className="text-xs font-semibold text-slate-600 uppercase mb-0.5">Monthly EMI</p>
                <p className="text-lg font-bold text-blue-600">
                  ₹{Math.round(displayResult.emi).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {!displayResult && (
            <div className="mb-3 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div className="flex-1">
                  <h3 className="font-bold text-red-900 mb-1">Complete EMI Calculation First</h3>
                  <p className="text-red-800 mb-2">❌ Please complete the EMI calculation first before using Part Payment Calculator</p>
                  <button
                    onClick={handleBackToCalculator}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition duration-200 text-sm font-bold"
                  >
                    Go to EMI Calculator
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Part Payment Component */}
          {displayResult && (
            <PartPayment originalResult={displayResult} />
          )}
        </div>
      </div>
    </>
  );
}
