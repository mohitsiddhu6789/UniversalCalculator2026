import React, { useState } from 'react';
import { validateLoanInput } from '../utils/emiCalculator';

const LOAN_TYPES = [
  { value: 'Personal Loan', label: '👤 Personal Loan' },
  { value: 'Home Loan', label: '🏠 Home Loan' },
  { value: 'Auto Loan', label: '🚗 Auto Loan' },
  { value: 'Education Loan', label: '🎓 Education Loan' },
  { value: 'Business Loan', label: '💼 Business Loan' },
];

const EMI_TYPES = [
  { value: 'reducing', label: '📉 Reducing Balance', description: 'Interest calculated on remaining balance (Most Common)' },
  { value: 'flat', label: '📊 Flat Rate', description: 'Interest calculated on principal throughout tenure' },
];

export default function LoanForm({ onCalculate, isLoading = false }) {
  const [formData, setFormData] = useState({
    email: '',
    loanType: 'Personal Loan',
    emiType: 'reducing',
    principal: '',
    interestRate: '',
    tenure: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePrincipal = (principal) => {
    // Check if empty
    if (!principal || principal.trim() === '') {
      return 'Principal amount is required';
    }

    const principalNum = parseFloat(principal);

    // Check if valid number
    if (isNaN(principalNum)) {
      return 'Principal amount must be a valid number';
    }

    // Check if positive
    if (principalNum <= 0) {
      return 'Principal amount must be a positive number';
    }

    return '';
  };

  const validateInterestRate = (rate) => {
    if (!rate && rate !== 0) {
      return 'Interest rate is required';
    }

    const rateNum = parseFloat(rate);

    if (isNaN(rateNum)) {
      return 'Interest rate must be a valid number';
    }

    if (rateNum < 0) {
      return 'Interest rate cannot be negative';
    }

    return '';
  };

  const validateTenure = (tenure) => {
    if (!tenure) {
      return 'Tenure is required';
    }

    const tenureNum = parseInt(tenure);

    if (isNaN(tenureNum)) {
      return 'Tenure must be a valid number';
    }

    if (tenureNum <= 0) {
      return 'Tenure must be greater than 0';
    }

    return '';
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate principal
    const principalError = validatePrincipal(formData.principal);
    if (principalError) {
      newErrors.principal = principalError;
    }

    // Validate interest rate
    const rateError = validateInterestRate(formData.interestRate);
    if (rateError) {
      newErrors.interestRate = rateError;
    }

    // Validate tenure
    const tenureError = validateTenure(formData.tenure);
    if (tenureError) {
      newErrors.tenure = tenureError;
    }

    setErrors(newErrors);

    // If no errors, proceed with calculation
    if (Object.keys(newErrors).length === 0) {
      onCalculate({
        email: formData.email.trim(),
        principal: parseFloat(formData.principal),
        interestRate: parseFloat(formData.interestRate),
        tenure: parseInt(formData.tenure),
        loanType: formData.loanType,
        emiType: formData.emiType,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">💳 Loan Details</h3>

      <form onSubmit={handleCalculate} className="space-y-4">
        {/* Email Address */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Email Address <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400 ${
              errors.email ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">❌ {errors.email}</p>
          )}
          <p className="text-xs text-slate-500 mt-1">We'll use this to save your calculations</p>
        </div>

        {/* Loan Type */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Loan Type
          </label>
          <select
            name="loanType"
            value={formData.loanType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900"
          >
            {LOAN_TYPES.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* EMI Type */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            EMI Calculation Type
          </label>
          <div className="space-y-2">
            {EMI_TYPES.map(type => (
              <label key={type.value} className="flex items-start cursor-pointer p-3 border-2 border-slate-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition duration-150">
                <input
                  type="radio"
                  name="emiType"
                  value={type.value}
                  checked={formData.emiType === type.value}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-blue-600"
                />
                <div className="ml-3 flex-1">
                  <p className="font-semibold text-slate-900">{type.label}</p>
                  <p className="text-xs text-slate-600">{type.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Principal Amount - SIMPLIFIED VALIDATION */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Principal Amount (₹) <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            name="principal"
            value={formData.principal}
            onChange={handleChange}
            placeholder="500000"
            step="0.01"
            min="0"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400 ${
              errors.principal ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {errors.principal && (
            <p className="text-sm text-red-600 mt-1">❌ {errors.principal}</p>
          )}
          <p className="text-xs text-slate-500 mt-1">Enter any loan amount</p>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Annual Interest Rate (%) <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleChange}
            placeholder="10"
            step="0.01"
            min="0"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400 ${
              errors.interestRate ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {errors.interestRate && (
            <p className="text-sm text-red-600 mt-1">❌ {errors.interestRate}</p>
          )}
          <p className="text-xs text-slate-500 mt-1">Example: 10, 10.5, 12.75</p>
        </div>

        {/* Tenure */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Tenure (Months) <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            name="tenure"
            value={formData.tenure}
            onChange={handleChange}
            placeholder="60"
            min="1"
            step="1"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400 ${
              errors.tenure ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {errors.tenure && (
            <p className="text-sm text-red-600 mt-1">❌ {errors.tenure}</p>
          )}
          <p className="text-xs text-slate-500 mt-1">Loan duration in months</p>
        </div>

        {/* Calculate Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md mt-6 ${
            isLoading
              ? 'bg-slate-400 text-slate-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
          }`}
        >
          {isLoading ? '⏳ Calculating...' : '🧮 Calculate EMI'}
        </button>
      </form>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-900">
          <strong>💡 Tip:</strong> The EMI calculator uses the standard formula to compute your monthly installment based on principal, interest rate, and tenure.
        </p>
      </div>
    </div>
  );
}
