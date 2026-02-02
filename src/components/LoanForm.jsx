import React, { useState } from 'react';

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

export default function LoanForm({ onCalculate, isLoading = false, onLoanTypeChange }) {
  const [formData, setFormData] = useState({
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
    // Notify parent component of loan type change
    if (name === 'loanType') {
      // Notify parent component of loan type change
      if (onLoanTypeChange) {
        onLoanTypeChange(value);
      }
    }
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
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
        principal: parseFloat(formData.principal),
        interestRate: parseFloat(formData.interestRate),
        tenure: parseInt(formData.tenure),
        loanType: formData.loanType,
        emiType: formData.emiType,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sticky top-20">

      <form onSubmit={handleCalculate} className="space-y-2">
        {/* Loan Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">
            Loan Type
          </label>
          <select
            name="loanType"
            value={formData.loanType}
            onChange={handleChange}
            className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900"
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
          <label className="block text-xs font-semibold text-slate-900 mb-1">
            EMI Calculation Type
          </label>
          <div className="space-y-0.5">
            {EMI_TYPES.map(type => (
              <label key={type.value} className="flex items-start cursor-pointer p-1.5 border border-slate-200 rounded hover:bg-blue-50 hover:border-blue-300 transition duration-150">
                <input
                  type="radio"
                  name="emiType"
                  value={type.value}
                  checked={formData.emiType === type.value}
                  onChange={handleChange}
                  className="mt-0.5 w-3 h-3 text-blue-600"
                />
                <div className="ml-3 flex-1">
                  <p className="font-semibold text-slate-900 text-xs">{type.label}</p>
                  <p className="text-xs text-slate-600">{type.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Principal Amount - SIMPLIFIED VALIDATION */}
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">
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
            className={`w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400 ${
              errors.principal ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {errors.principal && (
            <p className="text-xs text-red-600 mt-0.5">❌ {errors.principal}</p>
          )}
          <p className="text-xs text-slate-500 mt-0.5">Enter any loan amount</p>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">
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
            className={`w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400 ${
              errors.interestRate ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {errors.interestRate && (
            <p className="text-xs text-red-600 mt-0.5">❌ {errors.interestRate}</p>
          )}
          <p className="text-xs text-slate-500 mt-0.5">Example: 10, 10.5, 12.75</p>
        </div>

        {/* Tenure */}
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">
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
            className={`w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400 ${
              errors.tenure ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {errors.tenure && (
            <p className="text-xs text-red-600 mt-0.5">❌ {errors.tenure}</p>
          )}
          <p className="text-xs text-slate-500 mt-0.5">Loan duration in months</p>
        </div>

        {/* Calculate Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full font-bold py-2 px-4 rounded-lg transition duration-200 shadow-md mt-2 ${
            isLoading
              ? 'bg-slate-400 text-slate-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
          }`}
        >
          {isLoading ? '⏳ Calculating...' : '🧮 Calculate EMI'}
        </button>
      </form>

      {/* Info Box */}
      <div className="mt-1 p-2 bg-blue-50 rounded border border-blue-200">
        <p className="text-xs text-blue-900">
          <strong>💡 Tip:</strong> The EMI calculator uses the standard formula to compute your monthly installment based on principal, interest rate, and tenure.
        </p>
      </div>
    </div>
  );
}
