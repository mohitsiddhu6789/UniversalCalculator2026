import React, { useState } from 'react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import LoanForm from '../components/LoanForm';

export default function Home({ onNavigate }) {
  return (
    <>
      <SEO
        title="EMI Calculator - Calculate Loan EMI, Interest & Repayment Schedule | Universal"
        description="Free online EMI calculator. Calculate monthly EMI, total interest, and repayment schedule for personal loans, home loans, auto loans. Get instant results."
        keywords="EMI calculator, loan calculator, monthly EMI, personal loan calculator, home loan EMI, auto loan calculator, interest rate calculator, loan repayment schedule"
        canonical="https://universalemi.com"
        ogTitle="EMI Calculator - Calculate Your Loan Repayment"
        ogDescription="Use our free EMI calculator to calculate monthly payments, total interest, and loan schedules instantly"
      />
      
      {/* Header */}
      <Header onNavigate={onNavigate} />

      {/* Main Content */}
      <LoanForm onNavigate={onNavigate} />

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-12 mt-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">❓ Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-slate-900 mb-2">What is EMI?</h3>
              <p className="text-slate-700">
                EMI (Equated Monthly Installment) is the fixed amount you pay every month to repay your loan. It includes both principal and interest components.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-slate-900 mb-2">How is EMI calculated?</h3>
              <p className="text-slate-700">
                EMI is calculated using the formula: EMI = [P x R x (1+R)^N] / [(1+R)^N-1], where P is principal, R is monthly interest rate, and N is number of months.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-slate-900 mb-2">What is the difference between Part Payment and Part Prepayment?</h3>
              <p className="text-slate-700">
                Part payment is making an additional payment towards your loan principal before maturity. This reduces your total interest and tenure. Some banks charge a prepayment penalty.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Can I use this calculator for all loan types?</h3>
              <p className="text-slate-700">
                Yes, Universal EMI Calculator supports personal loans, home loans, car loans, education loans, business loans, and more. Select your loan type to get accurate calculations.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Is my data saved securely?</h3>
              <p className="text-slate-700">
                Yes, all your calculation data is saved securely in our database. You can view your calculation history anytime from your email in the Admin section.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-slate-900 mb-2">How accurate are the calculations?</h3>
              <p className="text-slate-700">
                Our EMI calculator is highly accurate based on standard banking formulas. However, actual EMI may vary slightly based on bank policies, processing fees, and other charges.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
