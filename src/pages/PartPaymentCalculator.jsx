import React, { useState } from 'react';
import SEO from '../components/SEO';
import PartPayment from '../components/PartPayment';
import { calculateEMI, calculateTotalInterest, generateEmiSchedule } from '../utils/emiCalculator';

export default function PartPaymentCalculator({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);
  
  const [loanDetails, setLoanDetails] = useState({
    principal: 1000000,
    rate: 8,
    tenure: 120,
  });

  const [step, setStep] = useState(1);
  
  // Calculate EMI and related values
  const emi = calculateEMI(loanDetails.principal, loanDetails.rate, loanDetails.tenure);
  const totalInterest = calculateTotalInterest(emi, loanDetails.tenure, loanDetails.principal);
  const schedule = generateEmiSchedule(loanDetails.principal, loanDetails.rate, loanDetails.tenure);
  
  const result = {
    principal: loanDetails.principal,
    interestRate: loanDetails.rate,
    tenure: loanDetails.tenure,
    emi: emi,
    totalInterest: totalInterest,
    totalInterestOriginal: totalInterest,
    schedule: schedule,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoanDetails({
      ...loanDetails,
      [name]: parseFloat(value) || 0,
    });
  };

  const validateEmail = async (e) => {
    e.preventDefault();
    setEmailError('');

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    /*try {
      // Save email to Netlify function
      /*const response = await fetch('/.netlify/functions/savePartPaymentEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed to save email');*/
      
      setShowCalculator(true);
   /* } catch (error) {
      console.error('Error saving email:', error);
      setEmailError('Failed to save email. Please try again.');
    }*/
  };

  return (
    <>
      <SEO
        title="Part Payment Calculator - Calculate Loan Prepayment Savings | Universal"
        description="Calculate savings from part payment or prepayment of your loan. See interest saved, penalties, and new EMI after part payment."
        keywords="part payment calculator, prepayment calculator, loan prepayment savings, part payment interest calculator, loan closure calculator"
        canonical="https://universalemi.com/part-payment"
        ogTitle="Part Payment Calculator - Know Your Savings"
        ogDescription="Calculate exact savings and penalties for your loan part payment strategy"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 shadow-lg">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Part Payment Calculator</h1>
            <p className="text-blue-100 text-lg mt-2">
              Calculate your savings with part/prepayment strategy
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-8">
          <div className="container mx-auto px-4 max-w-6xl">
            
            {/* Email Form - Before Calculator */}
            {!showCalculator ? (
              <div className="max-w-md mx-auto mb-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome</h2>
                  <p className="text-slate-600 mb-6">
                    Please enter your email address to access the Part Payment Calculator
                  </p>

                  <form onSubmit={validateEmail}>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError('');
                        }}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
                      />
                      {emailError && (
                        <p className="text-red-600 text-sm mt-2">• {emailError}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200"
                    >
                      Continue to Calculator
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Loan Details Input */}
                <div>
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">📋 Loan Details</h2>

                  {/* Loan Amount */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Loan Amount (₹)
                    </label>
                    <input
                      type="number"
                      name="principal"
                      value={loanDetails.principal}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
                    />
                    <div className="mt-2 text-right text-blue-600 font-semibold">
                      ₹{loanDetails.principal.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Interest Rate (% p.a.)
                    </label>
                    <input
                      type="number"
                      name="rate"
                      value={loanDetails.rate}
                      onChange={handleInputChange}
                      step="0.1"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
                    />
                    <div className="mt-2 text-right text-blue-600 font-semibold">
                      {loanDetails.rate}%
                    </div>
                  </div>

                  {/* Tenure */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Tenure (Months)
                    </label>
                    <input
                      type="number"
                      name="tenure"
                      value={loanDetails.tenure}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
                    />
                    <div className="mt-2 text-right text-blue-600 font-semibold">
                      {loanDetails.tenure} months ({(loanDetails.tenure / 12).toFixed(1)} years)
                    </div>
                  </div>

                  {/* Original Loan Summary */}
                  <div className="border-t-2 border-slate-200 pt-6">
                    <h3 className="font-bold text-slate-900 mb-4">Original Loan Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-blue-50 p-3 rounded">
                        <span className="text-slate-700">Monthly EMI</span>
                        <span className="text-xl font-bold text-blue-600">
                          ₹{result.emi.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between items-center bg-orange-50 p-3 rounded">
                        <span className="text-slate-700">Total Interest</span>
                        <span className="text-xl font-bold text-orange-600">
                          ₹{result.totalInterest.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-100 p-3 rounded">
                        <span className="text-slate-700 font-semibold">Total Amount Paid</span>
                        <span className="text-xl font-bold text-slate-900">
                          ₹{(loanDetails.principal + result.totalInterest).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Part Payment Analysis */}
              <div>
                <PartPayment originalResult={result} />
              </div>
            </div>
            )}

            {/* Detailed Breakdown Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">📊 Detailed Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Loan Amount Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-600 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">💰</span>
                    <h3 className="font-bold text-slate-900">Loan Amount</h3>
                  </div>
                  <p className="text-3xl font-bold text-blue-600 mb-2">
                    ₹{loanDetails.principal.toLocaleString('en-IN')}
                  </p>
                  <p className="text-sm text-slate-600">Principal amount borrowed</p>
                </div>

                {/* EMI Amount Card */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-600 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">📅</span>
                    <h3 className="font-bold text-slate-900">Monthly EMI</h3>
                  </div>
                  <p className="text-3xl font-bold text-green-600 mb-2">
                    ₹{result.emi.toLocaleString('en-IN')}
                  </p>
                  <p className="text-sm text-slate-600">Equated Monthly Installment</p>
                </div>

                {/* Total Amount Paid Card */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-600 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">💸</span>
                    <h3 className="font-bold text-slate-900">Total Paid</h3>
                  </div>
                  <p className="text-3xl font-bold text-purple-600 mb-2">
                    ₹{(loanDetails.principal + result.totalInterest).toLocaleString('en-IN')}
                  </p>
                  <p className="text-sm text-slate-600">Principal + Total Interest</p>
                </div>

                {/* Penalty Card */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-orange-600 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">⚠️</span>
                    <h3 className="font-bold text-slate-900">Customer Penalty</h3>
                  </div>
                  <p className="text-3xl font-bold text-orange-600 mb-2">
                    Applied During<br/>Part Payment
                  </p>
                  <p className="text-sm text-slate-600">% of prepayment amount</p>
                </div>

                {/* Interest Breakdown Card */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-600 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">📈</span>
                    <h3 className="font-bold text-slate-900">Total Interest</h3>
                  </div>
                  <p className="text-3xl font-bold text-red-600 mb-2">
                    ₹{result.totalInterest.toLocaleString('en-IN')}
                  </p>
                  <p className="text-sm text-slate-600">Payable over loan tenure</p>
                </div>

                {/* Duration Card */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-l-4 border-indigo-600 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">⏳</span>
                    <h3 className="font-bold text-slate-900">Loan Duration</h3>
                  </div>
                  <p className="text-3xl font-bold text-indigo-600 mb-2">
                    {loanDetails.tenure} Months
                  </p>
                  <p className="text-sm text-slate-600">
                    ({(loanDetails.tenure / 12).toFixed(1)} Years)
                  </p>
                </div>
              </div>
            </div>
            

            {/* How It Works Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">❓ How Part Payment Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-bold text-slate-900 mb-2">1️⃣ Loan Amount</h3>
                  <p className="text-slate-600">
                    Enter the principal loan amount you borrowed. This is the base amount on which interest is calculated.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-bold text-slate-900 mb-2">2️⃣ EMI (Monthly Payment)</h3>
                  <p className="text-slate-600">
                    Your monthly equated installment is calculated based on loan amount, interest rate, and tenure.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-bold text-slate-900 mb-2">3️⃣ Total Amount Paid</h3>
                  <p className="text-slate-600">
                    Sum of loan amount and total interest. This is the complete amount you'll pay by loan end date.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-bold text-slate-900 mb-2">4️⃣ Customer Penalty</h3>
                  <p className="text-slate-600">
                    When you make a part payment, banks charge a penalty as % of prepayment. This varies by country and loan type.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-bold text-slate-900 mb-2">5️⃣ Add Part Payments</h3>
                  <p className="text-slate-600">
                    In the calculator, add your planned part payments with month and amount to see instant savings.
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-bold text-slate-900 mb-2">6️⃣ See Your Savings</h3>
                  <p className="text-slate-600">
                    View interest saved, net savings after penalty, new EMI, and detailed comparison analysis.
                  </p>
                </div>
              </div>
            </div>
              </div>
            
         
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 text-center py-6 mt-12 border-t border-slate-700">
          <div className="container mx-auto px-4">
            <p className="mb-4">
              © 2026 Universal Emi Calculator - Part Payment Analysis Tool
            </p>
            {onNavigate && (
              <button
                onClick={() => onNavigate('home')}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
              >
                ← Back to Calculator
              </button>
            )}
          </div>
        </footer>
      </div>
    </>
  );
}
