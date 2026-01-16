import React, { useState } from 'react';
import { saveCalculation } from '../services/api';
import Charts from './Charts';
import PartPayment from './PartPayment';

export default function EmiResult({ result }) {
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  const [showPartPayment, setShowPartPayment] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const calculationData = {
        email: result.email,
        loan_type: result.loanType,
        principal: result.principal,
        interest_rate: result.interestRate,
        tenure_months: result.tenure,
        emi: result.emi,
        total_interest: result.totalInterest,
        total_payment: result.totalPayment,
      };

      await saveCalculation(calculationData);
      setSavedMessage('✓ Calculation saved successfully!');
      setTimeout(() => setSavedMessage(''), 3000);
    } catch (error) {
      setSavedMessage('Error saving calculation. Please try again.');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-slate-600 text-sm font-medium mb-2">Monthly EMI</p>
          <p className="text-4xl font-bold text-blue-600">₹{result.emi.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-slate-600 text-sm font-medium mb-2">Total Interest</p>
          <p className="text-4xl font-bold text-orange-600">
            ₹{result.totalInterest.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-slate-600 text-sm font-medium mb-2">Total Payment</p>
          <p className="text-2xl font-bold text-slate-900">
            ₹{result.totalPayment.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-slate-600 text-sm font-medium mb-2">Tenure</p>
          <p className="text-2xl font-bold text-slate-900">
            {Math.floor(result.tenure / 12)}Y {result.tenure % 12}M
          </p>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Loan Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-slate-600 text-sm">Loan Amount</p>
            <p className="text-lg font-semibold text-slate-900">
              ₹{result.principal.toLocaleString('en-IN')}
            </p>
          </div>
          <div>
            <p className="text-slate-600 text-sm">Interest Rate</p>
            <p className="text-lg font-semibold text-slate-900">{result.interestRate}% p.a.</p>
          </div>
          <div>
            <p className="text-slate-600 text-sm">Interest Amount</p>
            <p className="text-lg font-semibold text-orange-600">
              ₹{result.totalInterest.toLocaleString('en-IN')}
            </p>
          </div>
          <div>
            <p className="text-slate-600 text-sm">Total Payable</p>
            <p className="text-lg font-semibold text-slate-900">
              ₹{result.totalPayment.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <Charts result={result} />

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white font-bold py-3 rounded-lg transition duration-200"
        >
          {saving ? 'Saving...' : '💾 Save Calculation'}
        </button>
        {/*<button
          onClick={() => setShowPartPayment(!showPartPayment)}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-200"
        >
          {showPartPayment ? 'Hide' : '📊 Part Payment'} Analysis
        </button>*/}
      </div>

      {/* Save Message */}
      {savedMessage && (
        <div
          className={`p-4 rounded-lg text-center font-medium ${
            savedMessage.includes('successfully')
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {savedMessage}
        </div>
      )}

      {/* Part Payment Section */}
      {showPartPayment && <PartPayment originalResult={result} />}
    </div>
  );
}
