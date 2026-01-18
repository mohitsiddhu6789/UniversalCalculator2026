import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { LoanContext } from '../context/LoanContext';
import LoanForm from '../components/LoanForm';
import EmiResult from '../components/EmiResult';
import EmiTable from '../components/EmiTable';
import Charts from '../components/Charts';
import { calculateEMI, calculateFlatRateEMI, generateEmiSchedule, generateFlatRateEmiSchedule } from '../utils/emiCalculator';
import { saveEmiCalculation, upsertUser } from '../services/supabaseApi';
import { goToPartPayment, getEmiDataForPartPayment } from '../utils/navigationUtils';

const FAQ_DATA = [
  {
    category: 'Personal Loan',
    icon: '👤',
    faqs: [
      {
        question: 'What is the typical interest rate range for personal loans?',
        answer: 'Personal loan interest rates typically range from 8% to 18% per annum, depending on your credit score, income, and repayment capacity. Banks offer better rates to customers with good credit history.'
      },
      {
        question: 'What is the maximum tenure for a personal loan?',
        answer: 'Most banks offer personal loans with a tenure of 12 to 84 months (1-7 years). You can choose a tenure based on your monthly budget and repayment capacity.'
      },
      {
        question: 'Is there a prepayment penalty for personal loans?',
        answer: 'Most banks allow prepayment of personal loans without any penalty. However, some banks may charge 1-3% prepayment penalty. Always check with your bank before making a part payment.'
      }
    ]
  },
  {
    category: 'Home Loan',
    icon: '🏠',
    faqs: [
      {
        question: 'What is the average home loan interest rate?',
        answer: 'Home loan interest rates typically range from 6.5% to 9.5% per annum. Rates vary based on the loan amount, tenure, credit score, and current market conditions. Fixed rates offer stability while floating rates may decrease over time.'
      },
      {
        question: 'What is the maximum tenure for a home loan?',
        answer: 'Home loans typically have a tenure of 5 to 30 years. Longer tenures result in lower EMI but higher total interest. Most people choose 15-20 year tenures for an optimal balance.'
      },
      {
        question: 'Can I make part payments on my home loan?',
        answer: 'Yes, most banks allow part payments on home loans. Making part payments can significantly reduce your total interest and tenure. Some banks charge 0-2% prepayment penalty, so check the terms.'
      }
    ]
  },
  {
    category: 'Auto Loan',
    icon: '🚗',
    faqs: [
      {
        question: 'What is the typical interest rate for auto loans?',
        answer: 'Auto loan interest rates range from 7% to 14% per annum, depending on the vehicle type, loan amount, tenure, and your credit profile. New car loans often have lower rates than used car loans.'
      },
      {
        question: 'What is the maximum tenure for an auto loan?',
        answer: 'Auto loans typically have tenures ranging from 12 to 84 months (1-7 years). Most auto loans are taken for 36-60 months. Longer tenures result in lower monthly EMI but higher total interest.'
      },
      {
        question: 'What are the key charges associated with auto loans?',
        answer: 'Besides interest, auto loans may include processing fees (0.5-1.5%), insurance, GST on interest, and prepayment charges. Always calculate the total cost before finalizing the loan.'
      }
    ]
  },
  {
    category: 'Education Loan',
    icon: '🎓',
    faqs: [
      {
        question: 'What is the interest rate for education loans?',
        answer: 'Education loan interest rates typically range from 6% to 12% per annum. Government schemes may offer subsidized rates. Some loans offer lower rates during studies with interest accrual after graduation.'
      },
      {
        question: 'What is the repayment tenure for education loans?',
        answer: 'Education loans have a moratorium period (usually 6-12 months after graduation) before repayment starts. The total tenure is typically 5-15 years from the start of repayment, depending on the loan amount.'
      },
      {
        question: 'Are education loans eligible for tax deduction?',
        answer: 'Yes, education loan interest is eligible for tax deduction under Section 80E of the Income Tax Act. You can claim deduction for interest paid during the financial year, with no maximum limit.'
      }
    ]
  },
  {
    category: 'Business Loan',
    icon: '💼',
    faqs: [
      {
        question: 'What is the interest rate for business loans?',
        answer: 'Business loan interest rates range from 8% to 16% per annum, depending on the loan amount, business tenure, turnover, credit score, and loan type (term loan, working capital, etc.).'
      },
      {
        question: 'What is the maximum tenure for a business loan?',
        answer: 'Business loan tenures typically range from 1 to 10 years. Short-term business loans (12 months) are available for working capital needs, while long-term loans suit fixed asset purchases.'
      },
      {
        question: 'What documents are required for a business loan?',
        answer: 'Typically required documents include business registration, GST certificate, last 2 years ITR, bank statements (6-12 months), balance sheet, profit & loss statement, and personal identification proof.'
      }
    ]
  },
  {
    category: 'EMI Calculator',
    icon: '🧮',
    faqs: [
      {
        question: 'What is the difference between Reducing Balance and Flat Rate EMI?',
        answer: 'Reducing Balance: Interest is calculated on the outstanding balance each month. You pay less interest over time. Flat Rate: Interest is calculated on the original principal for all months. Total interest remains constant.'
      },
      {
        question: 'How is EMI calculated?',
        answer: 'For Reducing Balance: EMI = P × R × (1+R)^N / ((1+R)^N − 1), where P = Principal, R = Monthly Rate, N = Months. For Flat Rate: EMI = (Principal + Total Interest) / Number of Months.'
      },
      {
        question: 'What factors affect my EMI amount?',
        answer: 'EMI depends on: (1) Loan Amount - Higher amount = Higher EMI, (2) Interest Rate - Higher rate = Higher EMI, (3) Tenure - Longer tenure = Lower EMI but higher total interest.'
      }
    ]
  }
];

export default function Home({ onNavigate, onEmiCalculated, userEmail }) {
  const { updateLoanData, saveLoanCalculation } = useContext(LoanContext);
  const [formData, setFormData] = useState({
    email: userEmail || '',
    principal: '',
    interestRate: '',
    tenure: '',
    loanType: 'Personal Loan',
    emiType: 'reducing',
  });
  const [result, setResult] = useState(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

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
    console.log('Home: handleGoToPartPayment called');

    // Get EMI data
    const emiData = getEmiDataForPartPayment(result);

    // Use shared navigation function
    const success = goToPartPayment(onNavigate, emiData);

    if (success) {
      // Save data to context
      updateLoanData({
        email: formData.email,
        principal: formData.principal,
        interestRate: formData.interestRate,
        tenure: formData.tenure,
        loanType: formData.loanType,
        emiType: formData.emiType,
      });

      saveLoanCalculation(result);
    }
  };

  const toggleFaq = (index) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>EMI Calculator</title>
        <meta name="description" content="Calculate your loan EMI, total interest, and view amortization schedule" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">🧮 EMI Calculator</h1>
            <p className="text-lg text-slate-700">
              Calculate your loan EMI, total interest, and view month-wise payment schedule
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Form */}
            <div className="lg:col-span-1">
              <LoanForm onCalculate={handleCalculate} isLoading={isSaving} />
            </div>

            {/* Right Column - Results */}
            <div className="lg:col-span-2">
              {result ? (
                <div className="space-y-6">
                  {/* EMI Type Badge */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <strong>EMI Type:</strong> {result.emiType === 'flat' ? '📊 Flat Rate' : '📉 Reducing Balance'}
                    </p>
                  </div>

                  {/* EMI Result Card */}
                  <div>
                    <EmiResult result={result} />
                  </div>

                  {/* Go to Part Payment Button */}
                  <button
                    onClick={handleGoToPartPayment}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg text-lg"
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
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Enter Your Loan Details</h3>
                  <p className="text-slate-600">
                    Fill in the loan information on the left to see your EMI calculation, total interest, and payment schedule
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">❓ Frequently Asked Questions</h2>
              <p className="text-lg text-slate-700">
                Find answers to common questions about loans and EMI calculations
              </p>
            </div>

            {/* FAQ Categories */}
            <div className="space-y-8">
              {FAQ_DATA.map((faqCategory, categoryIndex) => (
                <div key={categoryIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {/* Category Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold text-slate-900">
                      {faqCategory.icon} {faqCategory.category}
                    </h3>
                  </div>

                  {/* FAQs */}
                  <div className="divide-y divide-slate-200">
                    {faqCategory.faqs.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex;
                      const isExpanded = expandedFaqIndex === globalIndex;

                      return (
                        <div key={faqIndex} className="p-6">
                          {/* Question */}
                          <button
                            onClick={() => toggleFaq(globalIndex)}
                            className="w-full flex items-start justify-between gap-4 text-left hover:text-blue-600 transition duration-200"
                          >
                            <h4 className="font-semibold text-slate-900 flex-1">
                              {faq.question}
                            </h4>
                            <span className={`flex-shrink-0 text-2xl transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                              📖
                            </span>
                          </button>

                          {/* Answer */}
                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-slate-200">
                              <p className="text-slate-700 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-16 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <p className="text-slate-700">
              <strong>💡 Tip:</strong> Use our EMI calculator to compare different loan options and make an informed decision. Visit the Part Payment Calculator to analyze how part payments can reduce your total interest and tenure.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}