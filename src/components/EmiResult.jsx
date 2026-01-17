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

  if (!result) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">📊 Calculation Results</h3>

        {/* Main EMI Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg p-6 mb-6">
          <p className="text-sm font-semibold text-blue-700 uppercase mb-2">Monthly EMI</p>
          <p className="text-4xl font-bold text-blue-900">
            ₹{Math.round(result.emi).toLocaleString('en-IN')}
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-green-500">
            <p className="text-xs font-semibold text-slate-600 uppercase mb-2">Principal Amount</p>
            <p className="text-2xl font-bold text-slate-900">
              ₹{result.principal.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-orange-500">
            <p className="text-xs font-semibold text-slate-600 uppercase mb-2">Total Interest</p>
            <p className="text-2xl font-bold text-orange-600">
              ₹{Math.round(result.totalInterest).toLocaleString('en-IN')}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-purple-500">
            <p className="text-xs font-semibold text-slate-600 uppercase mb-2">Total Payment</p>
            <p className="text-2xl font-bold text-purple-600">
              ₹{Math.round(result.totalPayment).toLocaleString('en-IN')}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-xs font-semibold text-slate-600 uppercase mb-2">Tenure</p>
            <p className="text-2xl font-bold text-cyan-600">{result.tenure} months</p>
          </div>
        </div>

        {/* Loan Type */}
        <div className="mt-4 p-3 bg-slate-100 rounded-lg">
          <p className="text-sm text-slate-700">
            <strong>Loan Type:</strong> {result.loanType}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <Charts result={result} />

      {/* Action Buttons */}
      <div className="flex gap-3">
        {/*<button
          onClick={handleSave}
          disabled={saving}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white font-bold py-3 rounded-lg transition duration-200"
        >
          {saving ? 'Saving...' : '💾 Save Calculation'}
        </button>*/}
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
