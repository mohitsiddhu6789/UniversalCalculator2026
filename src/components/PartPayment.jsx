import React, { useState } from 'react';
import { calculateWithPartPayment } from '../utils/emiCalculator';

const COUNTRY_DEFAULTS = {
  IN: { name: '🇮🇳 India', defaultPenalty: 1.5 }
 /* US: { name: '🇺🇸 United States', defaultPenalty: 2 },
  GB: { name: '🇬🇧 United Kingdom', defaultPenalty: 3 },
  AU: { name: '🇦🇺 Australia', defaultPenalty: 2 },
  CA: { name: '🇨🇦 Canada', defaultPenalty: 1.5 },
  OTHER: { name: '🌍 Other', defaultPenalty: 2 },*/
};

export default function PartPayment({ originalResult }) {
  const [partPayments, setPartPayments] = useState([]);
  const [country, setCountry] = useState('IN');
  const [currentPayment, setCurrentPayment] = useState({
    month: '',
    amount: '',
    chargePercent: COUNTRY_DEFAULTS['IN'].defaultPenalty,
  });
  const [result, setResult] = useState(null);

  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    setCountry(newCountry);
    setCurrentPayment({
      ...currentPayment,
      chargePercent: COUNTRY_DEFAULTS[newCountry].defaultPenalty,
    });
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

    // Calculate new result
    const newResult = calculateWithPartPayment(
      originalResult.principal,
      originalResult.interestRate,
      originalResult.tenure,
      updated
    );
    setResult(newResult);

    // Reset form
    setCurrentPayment({ 
      month: '', 
      amount: '', 
      chargePercent: COUNTRY_DEFAULTS[country].defaultPenalty 
    });
  };

  const handleRemovePayment = (index) => {
    const updated = partPayments.filter((_, i) => i !== index);
    setPartPayments(updated);

    if (updated.length > 0) {
      const newResult = calculateWithPartPayment(
        originalResult.principal,
        originalResult.interestRate,
        originalResult.tenure,
        updated
      );
      setResult(newResult);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-slate-900 mb-4">💰 Part Payment Analysis</h3>

      {/* Country Selection */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-slate-900 mb-3">📍 Select Your Country</h4>
        <p className="text-sm text-slate-600 mb-3">
          This helps us apply the correct prepayment penalty rates for your region
        </p>
        <select
          value={country}
          onChange={handleCountryChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
        >
          {Object.entries(COUNTRY_DEFAULTS).map(([code, info]) => (
            <option key={code} value={code}>
              {info.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add Part Payment */}
      <div className="mb-6 p-4 bg-slate-50 rounded-lg">
        <h4 className="font-semibold text-slate-900 mb-4">Add Part Payment</h4>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Month</label>
            <input
              type="number"
              min="1"
              max={originalResult.tenure}
              value={currentPayment.month}
              onChange={(e) => setCurrentPayment({ ...currentPayment, month: e.target.value })}
              placeholder="6"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Amount (₹)</label>
            <input
              type="number"
              value={currentPayment.amount}
              onChange={(e) => setCurrentPayment({ ...currentPayment, amount: e.target.value })}
              placeholder="50000"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Penalty %</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={currentPayment.chargePercent}
              onChange={(e) =>
                setCurrentPayment({ ...currentPayment, chargePercent: e.target.value })
              }
              placeholder={COUNTRY_DEFAULTS[country].defaultPenalty}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-slate-500 mt-1">Default: {COUNTRY_DEFAULTS[country].defaultPenalty}%</p>
          </div>
        </div>
        <button
          onClick={handleAddPayment}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-200"
        >
          Add Payment
        </button>
      </div>

      {/* Part Payments List */}
      {partPayments.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-slate-900 mb-3">Added Payments</h4>
          <div className="space-y-2">
            {partPayments.map((payment, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-200"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    Month {payment.month}: ₹{payment.amount.toLocaleString('en-IN')}
                  </p>
                  <p className="text-sm text-slate-600">
                    Charge: {payment.chargePercent}%
                  </p>
                </div>
                <button
                  onClick={() => handleRemovePayment(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comparison Results */}
      {result && (
        <div className="border-t pt-6">
          <h4 className="font-semibold text-slate-900 mb-4">📊 Savings & Comparison Analysis</h4>
          
          {/* Main Metrics */}
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
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-xs font-semibold text-orange-600 uppercase mb-2">
                Original Total Interest
              </p>
              <p className="text-2xl font-bold text-orange-600">
                ₹{result.totalInterestOriginal.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
              <p className="text-xs font-semibold text-green-600 uppercase mb-2">
                Interest Saved
              </p>
              <p className="text-2xl font-bold text-green-600">
                ₹{result.interestSaved.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          {/* Part Payment Summary */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
            <h5 className="font-semibold text-slate-900 mb-3">Part Payment Details</h5>
            <div className="space-y-2 text-sm text-slate-700">
              {partPayments.map((payment, idx) => {
                const penalty = (payment.amount * payment.chargePercent) / 100;
                return (
                  <div key={idx} className="flex justify-between items-center">
                    <span>Month {payment.month}: ₹{payment.amount.toLocaleString('en-IN')}</span>
                    <span className="text-orange-600">Penalty: ₹{penalty.toLocaleString('en-IN')} ({payment.chargePercent}%)</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Savings Summary Card */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 p-6 rounded-lg">
            <h5 className="font-bold text-green-900 mb-4 text-lg">🎉 Your Savings Summary</h5>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Total Interest Saved:</span>
                <span className="text-2xl font-bold text-green-600">
                  ₹{result.interestSaved.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Total Penalty Paid:</span>
                <span className="text-lg font-semibold text-orange-600">
                  ₹{(partPayments.reduce((sum, p) => sum + (p.amount * p.chargePercent / 100), 0)).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="border-t-2 border-green-300 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-900 font-bold">Net Savings (After Penalty):</span>
                  <span className="text-3xl font-bold text-green-700">
                    ₹{(result.interestSaved - partPayments.reduce((sum, p) => sum + (p.amount * p.chargePercent / 100), 0)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mt-6">
            <h5 className="font-semibold text-slate-900 mb-3">Full Payment Comparison</h5>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-slate-300">
                    <th className="text-left px-3 py-2">Metric</th>
                    <th className="text-right px-3 py-2">Without Part Payment</th>
                    <th className="text-right px-3 py-2">With Part Payment</th>
                    <th className="text-right px-3 py-2">Difference</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="px-3 py-2 text-slate-700">Monthly EMI</td>
                    <td className="text-right px-3 py-2 font-medium">₹{result.originalEMI.toLocaleString('en-IN')}</td>
                    <td className="text-right px-3 py-2 font-medium text-green-600">₹{result.newEMI.toLocaleString('en-IN')}</td>
                    <td className="text-right px-3 py-2 font-medium text-green-600">↓ ₹{(result.originalEMI - result.newEMI).toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-3 py-2 text-slate-700">Total Interest</td>
                    <td className="text-right px-3 py-2 font-medium">₹{result.totalInterestOriginal.toLocaleString('en-IN')}</td>
                    <td className="text-right px-3 py-2 font-medium text-green-600">₹{(result.totalInterestOriginal - result.interestSaved).toLocaleString('en-IN')}</td>
                    <td className="text-right px-3 py-2 font-medium text-green-600">↓ ₹{result.interestSaved.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-semibold text-slate-900">Total Cost</td>
                    <td className="text-right px-3 py-2 font-bold">₹{(originalResult.principal + result.totalInterestOriginal).toLocaleString('en-IN')}</td>
                    <td className="text-right px-3 py-2 font-bold text-green-700">₹{(originalResult.principal + result.totalInterestOriginal - result.interestSaved).toLocaleString('en-IN')}</td>
                    <td className="text-right px-3 py-2 font-bold text-green-700">↓ ₹{result.interestSaved.toLocaleString('en-IN')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
