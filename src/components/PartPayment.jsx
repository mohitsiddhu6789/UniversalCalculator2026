import React, { useState } from 'react';
import { calculatePartPaymentStrategy } from '../utils/emiCalculator';

const COUNTRY_DEFAULTS = {
  IN: { name: '🇮🇳 India', defaultPenalty: 1.5 }
};

const STRATEGIES = {
  emi: {
    label: 'Reduce Tenure',
    description: 'Keep EMI same, finish loan faster',
    icon: '⏱️',
    benefit: 'Faster loan completion'
  },
  tenure: {
    label: 'Reduce EMI',
    description: 'Keep tenure same, lower monthly payment',
    icon: '💵',
    benefit: 'Lower monthly burden'
  },
  principal: {
    label: 'Balanced',
    description: 'Reduce both EMI and tenure proportionally',
    icon: '⚖️',
    benefit: 'Best of both worlds'
  }
};



export default function PartPayment({ originalResult }) {
  const [partPayments, setPartPayments] = useState([]);
  const [strategy, setStrategy] = useState('tenure');
  const defaultPenalty = COUNTRY_DEFAULTS['IN'].defaultPenalty;
  const [currentPayment, setCurrentPayment] = useState({
    month: '',
    amount: '',
    chargePercent: defaultPenalty,
  });
  const [result, setResult] = useState(null);

  const handleStrategyChange = (newStrategy) => {
    setStrategy(newStrategy);
    // Recalculate with new strategy
    if (partPayments.length > 0) {
      const newResult = calculatePartPaymentStrategy(
        originalResult.principal,
        originalResult.interestRate,
        originalResult.tenure,
        partPayments,
        newStrategy
      );
      setResult(newResult);
    }
  };

  const handleAddPayment = () => {
    if (!currentPayment.month || !currentPayment.amount) {
      alert('Please fill all fields');
      return;
    }

    const newPayment = {
      month: parseInt(currentPayment.month),
      amount: parseFloat(currentPayment.amount),
      chargePercent: parseFloat(currentPayment.chargePercent) || 0,
    };

    const updated = [...partPayments, newPayment].sort((a, b) => a.month - b.month);
    setPartPayments(updated);

    // Calculate new result with selected strategy
    const newResult = calculatePartPaymentStrategy(
      originalResult.principal,
      originalResult.interestRate,
      originalResult.tenure,
      updated,
      strategy
    );
    setResult(newResult);

    // Reset form
    setCurrentPayment({ 
      month: '', 
      amount: '', 
      chargePercent: defaultPenalty 
    });
  };

  const handleRemovePayment = (index) => {
    const updated = partPayments.filter((_, i) => i !== index);
    setPartPayments(updated);

    if (updated.length > 0) {
      const newResult = calculatePartPaymentStrategy(
        originalResult.principal,
        originalResult.interestRate,
        originalResult.tenure,
        updated,
        strategy
      );
      setResult(newResult);
    } else {
      setResult(null);
    }
  };

  // Add validation for originalResult
  if (!originalResult || !originalResult.principal || !originalResult.interestRate || !originalResult.tenure) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center p-8">
          <p className="text-red-600 font-semibold mb-4">⚠️ Invalid loan data</p>
          <p className="text-slate-700">Please go back to the EMI calculator and complete your calculation</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main Calculation Section */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-bold text-slate-900 mb-3">💰 Part Payment Analysis</h3>

        {/* Add Part Payment */}
        <div className="mb-3 p-3 bg-slate-50 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-3">Add Part Payment</h4>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Month</label>
              <input
                type="number"
                min="1"
                max={originalResult.tenure}
                value={currentPayment.month}
                onChange={(e) => setCurrentPayment({ ...currentPayment, month: e.target.value })}
                placeholder="6"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Amount (₹)</label>
              <input
                type="number"
                value={currentPayment.amount}
                onChange={(e) => setCurrentPayment({ ...currentPayment, amount: e.target.value })}
                placeholder="50000"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Penalty %</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={currentPayment.chargePercent}
                onChange={(e) =>
                  setCurrentPayment({ ...currentPayment, chargePercent: e.target.value })
                }
                placeholder={defaultPenalty}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
              <p className="text-xs text-slate-500 mt-0.5">Default: {defaultPenalty}%</p>
            </div>
          </div>
          <button
            onClick={handleAddPayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 rounded-lg transition duration-200"
          >
            Add Payment
          </button>
        </div>

        {/* Part Payments List */}
        {partPayments.length > 0 && (
          <div className="mb-3">
            <h4 className="font-semibold text-slate-900 mb-2">Added Payments</h4>
            <div className="space-y-1">
              {partPayments.map((payment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-blue-50 p-2 rounded-lg border border-blue-200"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      Month {payment.month}: ₹{payment.amount.toLocaleString('en-IN')}
                    </p>
                    <p className="text-sm text-slate-600">
                      Penalty: {payment.chargePercent}%
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemovePayment(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-0.5 rounded transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strategy Selection */}
        {partPayments.length > 0 && (
          <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-slate-900 mb-4">🎯 How Should Part Payment Affect Your Loan?</h4>
            <div className="space-y-3">
              {Object.entries(STRATEGIES).map(([key, value]) => (
                <label key={key} className="flex items-start cursor-pointer p-3 rounded-lg hover:bg-purple-100 transition duration-150">
                  <input
                    type="radio"
                    name="strategy"
                    value={key}
                    checked={strategy === key}
                    onChange={() => handleStrategyChange(key)}
                    className="mt-1 w-4 h-4 text-purple-600 focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="ml-3 flex-1">
                    <p className="font-semibold text-slate-900">{value.icon} {value.label}</p>
                    <p className="text-sm text-slate-600">{value.description}</p>
                    <p className="text-xs font-medium text-purple-600 mt-1">✓ {value.benefit}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Results */}
        {result && (
          <div className="border-t pt-6">
            <h4 className="font-semibold text-slate-900 mb-4">📊 Savings & Comparison Analysis</h4>
            
            {/* Strategy Indicator */}
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border-l-4 border-purple-600">
              <p className="text-sm font-semibold text-purple-900">
                {STRATEGIES[strategy].icon} Active Strategy: <span className="text-lg">{STRATEGIES[strategy].label}</span>
              </p>
              <p className="text-xs text-purple-700 mt-1">{STRATEGIES[strategy].description}</p>
            </div>

            {/* Main Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-xs font-semibold text-slate-600 uppercase mb-2">Original EMI</p>
                <p className="text-2xl font-bold text-slate-900">
                  ₹{result.originalEMI.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                <p className="text-xs font-semibold text-green-600 uppercase mb-2">New EMI</p>
                <p className="text-2xl font-bold text-green-600">
                  ₹{result.newEMI.toLocaleString('en-IN')}
                </p>
                {result.emiReduction !== undefined && result.emiReduction > 0 && (
                  <p className="text-xs text-green-600 mt-1">↓ ₹{result.emiReduction.toLocaleString('en-IN')} saved/month</p>
                )}
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-xs font-semibold text-orange-600 uppercase mb-2">Original Tenure</p>
                <p className="text-lg font-bold text-orange-600">
                  {result.originalTenure} months
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <p className="text-xs font-semibold text-blue-600 uppercase mb-2">New Tenure</p>
                <p className="text-lg font-bold text-blue-600">
                  {result.newTenure} months
                </p>
                {result.tenureReduction !== undefined && result.tenureReduction > 0 && (
                  <p className="text-xs text-blue-600 mt-1">⏱️ {result.tenureReduction} months faster</p>
                )}
              </div>
            </div>

            {/* Interest Comparison */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-xs font-semibold text-red-600 uppercase mb-2">Original Total Interest</p>
                <p className="text-xl font-bold text-red-600">
                  ₹{result.totalInterestOriginal.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                <p className="text-xs font-semibold text-green-600 uppercase mb-2">Interest After Part Payment</p>
                <p className="text-xl font-bold text-green-600">
                  ₹{result.totalInterestNew.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* Part Payment Summary */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
              <h5 className="font-semibold text-slate-900 mb-3">Part Payment Details</h5>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span>Total Part Payment Amount:</span>
                  <span className="font-bold text-blue-600">₹{result.totalPartPaymentAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Penalty Charges:</span>
                  <span className="font-bold text-orange-600">₹{result.totalPartPaymentCharges.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-blue-200 pt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total Part Payment Cost:</span>
                    <span className="font-bold text-orange-700">
                      ₹{(result.totalPartPaymentAmount + result.totalPartPaymentCharges).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Savings Summary Card */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 p-6 rounded-lg">
              <h5 className="font-bold text-green-900 mb-4 text-sm">🎉 Your Savings Summary</h5>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Interest Saved:</span>
                  <span className="text-lg font-bold text-green-600">
                    ₹{result.interestSaved.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Penalty Paid:</span>
                  <span className="text-lg font-semibold text-orange-600">
                    -₹{result.totalPartPaymentCharges.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="border-t-2 border-green-300 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-900 font-bold">Net Savings (After Penalty):</span>
                    <span className="text-xl font-bold text-green-700">
                      ₹{Math.max(0, result.interestSaved - result.totalPartPaymentCharges).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
        <p className="text-slate-700">
          <strong>💡 Tip:</strong> Use our Part Payment Calculator to explore different scenarios. Try adding multiple part payments at different times to see which strategy saves you the most money. Visit the Help page for comprehensive information about all calculators.
        </p>
      </div>
    </div>
  );
}
