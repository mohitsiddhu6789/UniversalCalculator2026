import React, { createContext, useState, useCallback } from 'react';

export const LoanContext = createContext();

export function LoanProvider({ children }) {
  const [loanData, setLoanData] = useState({
    principal: null,
    interestRate: null,
    tenure: null,
    loanType: 'Personal Loan',
  });

  const [calculationResult, setCalculationResult] = useState(null);

  const updateLoanData = useCallback((newData) => {
    console.log('Updating loan data:', newData);
    setLoanData(prev => {
      const updated = { ...prev, ...newData };
      console.log('Loan data updated to:', updated);
      return updated;
    });
  }, []);

  const saveLoanCalculation = useCallback((result) => {
    console.log('Saving calculation result:', result);
    setCalculationResult(result);
  }, []);

  const clearLoanData = useCallback(() => {
    console.log('Clearing loan data');
    setLoanData({
      principal: null,
      interestRate: null,
      tenure: null,
      loanType: 'Personal Loan',
    });
    setCalculationResult(null);
  }, []);

  const value = {
    loanData,
    calculationResult,
    updateLoanData,
    saveLoanCalculation,
    clearLoanData,
  };

  console.log('LoanContext value:', value);

  return (
    <LoanContext.Provider value={value}>
      {children}
    </LoanContext.Provider>
  );
}
