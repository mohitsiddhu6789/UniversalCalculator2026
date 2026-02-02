import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { LoanContext } from '../context/LoanContext';
import LoanForm from '../components/LoanForm';
import EmiResult from '../components/EmiResult';
import EmiTable from '../components/EmiTable';
import Charts from '../components/Charts';
import { calculateEMI, calculateFlatRateEMI, generateEmiSchedule, generateFlatRateEmiSchedule } from '../utils/emiCalculator';
import { saveEmiCalculation, upsertUser } from '../services/supabaseApi';
import { goToPartPayment, getEmiDataForPartPayment } from '../utils/navigationUtils';

export default function Home({ onNavigate, onEmiCalculated, userEmail, latestEmiData }) {
  const { updateLoanData, saveLoanCalculation } = useContext(LoanContext);
  const [formData, setFormData] = useState({
    email: userEmail || '',
    principal: latestEmiData?.principal || '',
    interestRate: latestEmiData?.interestRate || '',
    tenure: latestEmiData?.tenure || '',
    loanType: latestEmiData?.loanType || 'Personal Loan',
    emiType: latestEmiData?.emiType || 'reducing',
  });
  const [result, setResult] = useState(latestEmiData || null);
  const [isSaving, setIsSaving] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [modalEmail, setModalEmail] = useState(userEmail || '');
  const [showPartPaymentEmailModal, setShowPartPaymentEmailModal] = useState(false);
  const [partPaymentEmail, setPartPaymentEmail] = useState(userEmail || '');

  // Sync result and formData when latestEmiData changes (e.g., from navigation back to page)
  useEffect(() => {
    if (latestEmiData) {
      setResult(latestEmiData);
      setFormData(prev => ({
        ...prev,
        principal: latestEmiData.principal || '',
        interestRate: latestEmiData.interestRate || '',
        tenure: latestEmiData.tenure || '',
        loanType: latestEmiData.loanType || 'Personal Loan',
        emiType: latestEmiData.emiType || 'reducing',
      }));
    }
  }, [latestEmiData]);

  const handleCalculate = async (data) => {
    console.log('Home: handleCalculate called with:', data);
    // Use userEmail from state if not in form
    const emailToUse = userEmail || data.email;
    const updatedData = { ...data, email: emailToUse };
    
    setFormData(updatedData);
    setIsSaving(true);

    try {
      // Select calculation method based on EMI type
      const emi = data.emiType === 'flat' 
        ? calculateFlatRateEMI(data.principal, data.interestRate, data.tenure)
        : calculateEMI(data.principal, data.interestRate, data.tenure);
      
      const schedule = data.emiType === 'flat'
        ? generateFlatRateEmiSchedule(data.principal, data.interestRate, data.tenure)
        : generateEmiSchedule(data.principal, data.interestRate, data.tenure);
      
      const totalInterest = emi * data.tenure - data.principal;

      const calculationResult = {
        email: emailToUse,
        principal: data.principal,
        interestRate: data.interestRate,
        tenure: data.tenure,
        loanType: data.loanType,
        emiType: data.emiType,
        emi: emi,
        totalInterest: totalInterest,
        totalPayment: emi * data.tenure,
        schedule: schedule,
      };

      console.log('Home: Calculation result:', calculationResult);
      setResult(calculationResult);

      // Pass EMI data to App for header navigation
      if (onEmiCalculated) {
        onEmiCalculated(calculationResult);
      }

      // Save user details with default full name "User"
      console.log('Home: Saving user details for:', data.email);
      await upsertUser({
        email: data.email,
        fullName: 'User',
        phone: null,
        isAdmin: false,
      });

      // Save the calculation to Supabase (silently)
      await saveEmiCalculation(calculationResult);
      
    } catch (error) {
      console.error('Error during calculation/save:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleGoToPartPayment = () => {
    if (!result) return;
    
    // If email already exists, go directly to part payment
    if (userEmail) {
      const emiData = {
        ...getEmiDataForPartPayment(result),
        email: userEmail
      };
      const success = goToPartPayment(onNavigate, emiData);
      if (success) {
        updateLoanData({
          email: userEmail,
          principal: formData.principal,
          interestRate: formData.interestRate,
          tenure: formData.tenure,
          loanType: formData.loanType,
          emiType: formData.emiType,
        });
        saveLoanCalculation(result);
      }
      return;
    }
    
    // Show email modal first
    setShowPartPaymentEmailModal(true);
  };

  const handleProceedToPartPayment = async () => {
    if (!partPaymentEmail || !partPaymentEmail.trim()) {
      alert('❌ Please enter an email address');
      return;
    }

    try {
      const emailToSave = partPaymentEmail.toLowerCase();
      // Save/update user with email
      await upsertUser({
        email: emailToSave,
        fullName: 'User',
        phone: null,
        isAdmin: false,
      });

      // Store email in sessionStorage for persistence
      sessionStorage.setItem('userEmail', emailToSave);

      // Close modal
      setShowPartPaymentEmailModal(false);

      // Get EMI data and add email
      const emiData = {
        ...getEmiDataForPartPayment(result),
        email: partPaymentEmail
      };

      // Use shared navigation function
      const success = goToPartPayment(onNavigate, emiData);

      if (success) {
        // Save data to context
        updateLoanData({
          email: partPaymentEmail,
          principal: formData.principal,
          interestRate: formData.interestRate,
          tenure: formData.tenure,
          loanType: formData.loanType,
          emiType: formData.emiType,
        });

        saveLoanCalculation(result);
      }
    } catch (error) {
      console.error('Error saving email:', error);
      alert('❌ Error: Could not save email. Please try again.');
    }
  };

  const handleCancelPartPaymentEmail = () => {
    setShowPartPaymentEmailModal(false);
    setPartPaymentEmail(userEmail || '');
  };

  const handleDownloadDetails = () => {
    if (!result) return;
    // Show email modal first
    setShowEmailModal(true);
  };

  const handleDownloadWithEmail = async () => {
    if (!modalEmail || !modalEmail.trim()) {
      alert('❌ Please enter an email address');
      return;
    }

    try {
      // Save/update user with email
      await upsertUser({
        email: modalEmail.toLowerCase(),
        fullName: 'User',
        phone: null,
        isAdmin: false,
      });

      // Close modal
      setShowEmailModal(false);

      // Generate and download file
      const details = `
=================================================
        EMI CALCULATION DETAILS REPORT
=================================================

Calculation Date: ${new Date().toLocaleString()}
Email: ${modalEmail}

LOAN INFORMATION:
==================
Loan Type: ${result.loanType}
Principal Amount: ₹${result.principal.toLocaleString('en-IN')}
Annual Interest Rate: ${result.interestRate}%
Tenure: ${result.tenure} months (${Math.floor(result.tenure / 12)} years ${result.tenure % 12} months)
EMI Type: ${result.emiType === 'flat' ? 'Flat Rate' : 'Reducing Balance'}

CALCULATION RESULTS:
====================
Monthly EMI: ₹${result.emi.toFixed(2).toLocaleString('en-IN')}
Total Interest: ₹${result.totalInterest.toFixed(2).toLocaleString('en-IN')}
Total Payment: ₹${result.totalPayment.toFixed(2).toLocaleString('en-IN')}

AMORTIZATION SCHEDULE:
======================
Month | Outstanding Balance | EMI | Principal | Interest
${result.schedule.map((entry, index) => 
  `${(index + 1).toString().padStart(5)} | ₹${entry.balance.toFixed(2).padStart(18)} | ₹${entry.emi.toFixed(2).padStart(8)} | ₹${entry.principal.toFixed(2).padStart(9)} | ₹${entry.interest.toFixed(2).padStart(8)}`
).join('\n')}

=================================================
Generated by Universal Calculators
=================================================
      `.trim();

      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(details));
      element.setAttribute('download', `EMI_Details_${result.principal}_${new Date().toISOString().split('T')[0]}.txt`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      // Reset modal email
      setModalEmail(userEmail || '');
    } catch (error) {
      console.error('Error saving email or downloading:', error);
      alert('❌ Error: Could not save email. Please try again.');
    }
  };

  const handleLoanTypeChange = (loanType) => {
    setFormData(prev => ({
      ...prev,
      loanType: loanType,
    }));
  };

  return (
    <>
      <Helmet>
        <title>EMI Calculator</title>
        <meta name="description" content="Calculate your loan EMI, total interest, and view amortization schedule" />
      </Helmet>

      <div className="bg-gradient-to-br from-slate-50 to-slate-100 pt-2 pb-4 px-2">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-2">
            <h4 className="text-xl font-bold text-slate-900 mb-1">🧮 EMI Calculator</h4>
            <p className="text-xs text-slate-700">
              Calculate your loan EMI, total interest, and view month-wise payment schedule
            </p>
          </div>

          {/* Main Content - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 auto-rows-max">
            {/* Left Column - Calculator Form */}
            <div className="lg:col-span-1">
              <LoanForm onCalculate={handleCalculate} isLoading={isSaving} onLoanTypeChange={handleLoanTypeChange} />
            </div>

            {/* Right Column - Loan Details */}
            <div className="lg:col-span-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              {result ? (
                <div className="space-y-2">
                  {/* EMI Type Badge */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-2 rounded">
                    <p className="text-xs text-blue-900">
                      <strong>EMI Type:</strong> {result.emiType === 'flat' ? '📊 Flat Rate' : '📉 Reducing Balance'}
                    </p>
                  </div>

                  {/* Download Button */}
                  <button
                    onClick={handleDownloadDetails}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-1.5 px-3 rounded text-xs transition duration-200 flex items-center justify-center gap-2 shadow-lg"
                  >
                    ⬇️ Download Loan Details
                  </button>

                  {/* EMI Result Card */}
                  <div>
                    <EmiResult result={result} />
                  </div>

                  {/* Go to Part Payment Button */}
                  <button
                    onClick={handleGoToPartPayment}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2 px-4 rounded text-sm transition duration-200 flex items-center justify-center gap-2 shadow-lg"
                  >
                    💰 Go to Part Payment Calculator
                  </button>

                  {/* Charts Section */}
                  <div>
                    <Charts schedule={result.schedule} />
                  </div>

                  {/* EMI Table Section */}
                  <div>
                    <EmiTable schedule={result.schedule} />
                  </div>

                  {/* Download Full Details Section */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-3 rounded-lg shadow-md">
                    <h3 className="font-bold text-sm text-green-900 mb-2">📥 Export Your Calculation</h3>
                    <p className="text-xs text-green-800 mb-3">Download your complete loan calculation details including the full amortization schedule.</p>
                    <button
                      onClick={handleDownloadDetails}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-200 flex items-center justify-center gap-2 shadow-lg"
                    >
                      📊 Download Full Loan Schedule (TXT)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded shadow p-4 text-center h-auto flex flex-col items-center justify-center">
                  <div className="text-4xl mb-2">📊</div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Enter Your Loan Details</h3>
                  <p className="text-xs text-slate-600">
                    Fill in the calculator on the left to see your EMI calculation, total interest, and payment schedule
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-slate-900 mb-4">📧 Provide Email Address</h3>
            <p className="text-sm text-slate-600 mb-4">
              Please enter your email address to save and download your loan calculation details.
            </p>
            
            <input
              type="email"
              value={modalEmail}
              onChange={(e) => setModalEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowEmailModal(false);
                  setModalEmail(userEmail || '');
                }}
                className="flex-1 px-4 py-2 bg-slate-300 hover:bg-slate-400 text-slate-900 font-bold rounded-lg transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDownloadWithEmail}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition duration-200"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Part Payment Email Modal */}
      {showPartPaymentEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-slate-900 mb-4">📧 Email Address Required</h3>
            <p className="text-sm text-slate-600 mb-4">
              Please provide your email address to proceed to the Part Payment Calculator. Your EMI calculation results will remain visible here.
            </p>
            
            <input
              type="email"
              value={partPaymentEmail}
              onChange={(e) => setPartPaymentEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={handleCancelPartPaymentEmail}
                className="flex-1 px-4 py-2 bg-slate-300 hover:bg-slate-400 text-slate-900 font-bold rounded-lg transition duration-200"
              >
                Back to EMI
              </button>
              <button
                onClick={handleProceedToPartPayment}
                className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition duration-200"
              >
                Go to Part Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}