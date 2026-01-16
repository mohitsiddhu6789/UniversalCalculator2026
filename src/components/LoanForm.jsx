import React, { useState } from 'react';
import { calculateEMI, generateEmiSchedule, validateLoanInput } from '../utils/emiCalculator';
import { LOAN_TYPES, validateAgainstRules } from '../utils/loanRules';
import EmiResult from './EmiResult';
import EmiTable from './EmiTable';

export default function LoanForm({ onNavigate }) {
  const [formData, setFormData] = useState({
    email: '',
    loanType: LOAN_TYPES.PERSONAL,
    principal: '',
    interestRate: '',
    tenure: '',
    tenureType: 'months', // 'months' or 'years'
  });

  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    // Validate email
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors(['Please enter a valid email address']);
      setLoading(false);
      return;
    }

    // Convert tenure to months if in years
    const tenureMonths =
      formData.tenureType === 'years'
        ? parseInt(formData.tenure) * 12
        : parseInt(formData.tenure);

    const principal = parseFloat(formData.principal);
    const interestRate = parseFloat(formData.interestRate);

    // Validate input
    const validation = validateLoanInput({
      principal,
      interestRate,
      tenure: tenureMonths,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      setLoading(false);
      return;
    }

    // Validate against loan rules
    const ruleValidation = validateAgainstRules(
      formData.loanType,
      principal,
      interestRate,
      tenureMonths
    );

    if (!ruleValidation.isValid) {
      setErrors(ruleValidation.errors);
      setLoading(false);
      return;
    }

    // Calculate EMI
    const emi = calculateEMI(principal, interestRate, tenureMonths);
    const schedule = generateEmiSchedule(principal, interestRate, tenureMonths);
    const totalInterest = emi * tenureMonths - principal;
    const totalPayment = principal + totalInterest;

    setResult({
      email: formData.email,
      loanType: formData.loanType,
      principal,
      interestRate,
      tenure: tenureMonths,
      emi: Math.round(emi * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      schedule,
    });

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Loan EMI</h1>
              <p className="text-slate-600 mb-8">Calculate your monthly installment</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {/* Loan Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Loan Type *
                  </label>
                  <select
                    name="loanType"
                    value={formData.loanType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={LOAN_TYPES.PERSONAL}>Personal Loan</option>
                    <option value={LOAN_TYPES.HOME}>Home Loan</option>
                    <option value={LOAN_TYPES.CAR}>Car Loan</option>
                    <option value={LOAN_TYPES.EDUCATION}>Education Loan</option>
                    <option value={LOAN_TYPES.BUSINESS}>Business Loan</option>
                    <option value={LOAN_TYPES.OVERDRAFT}>Overdraft (OD)</option>
                    <option value={LOAN_TYPES.CUSTOM}>Custom Loan</option>
                  </select>
                </div>

                {/* Principal Amount */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Loan Amount (₹) *
                  </label>
                  <input
                    type="number"
                    name="principal"
                    value={formData.principal}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1,00,000"
                    required
                  />
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Annual Interest Rate (%) *
                  </label>
                  <input
                    type="number"
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10.5"
                    required
                  />
                </div>

                {/* Tenure */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Tenure *
                    </label>
                    <input
                      type="number"
                      name="tenure"
                      value={formData.tenure}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="60"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Type
                    </label>
                    <select
                      name="tenureType"
                      value={formData.tenureType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="months">Months</option>
                      <option value="years">Years</option>
                    </select>
                  </div>
                </div>

                {/* Error Messages */}
                {errors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    {errors.map((error, index) => (
                      <p key={index} className="text-sm text-red-700">
                        • {error}
                      </p>
                    ))}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold py-3 rounded-lg transition duration-200"
                >
                  {loading ? 'Calculating...' : 'Calculate EMI'}
                </button>
              </form>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="lg:col-span-3">
              <EmiResult result={result} />
              <EmiTable schedule={result.schedule} />
              
              {/* Part Payment Calculator Link */}
              {onNavigate && (
                <div className="mt-8 bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-300 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">💰 Want to Reduce Your Interest?</h3>
                  <p className="text-slate-700 mb-4">
                    Use our Part Payment Calculator to analyze how prepayment can save you money with your current loan
                  </p>
                  <button
                    onClick={() => onNavigate('part-payment')}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
                  >
                    📊 Go to Part Payment Calculator
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
