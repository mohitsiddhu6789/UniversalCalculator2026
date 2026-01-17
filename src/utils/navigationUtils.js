/**
 * Shared navigation utility for Part Payment Calculator
 * Ensures consistent behavior across all navigation points
 */

/**
 * Navigate to Part Payment with EMI data validation
 * @param {Function} onNavigate - Navigation callback from App
 * @param {Object} emiData - EMI calculation result
 * @returns {boolean} Success status
 */
export const goToPartPayment = (onNavigate, emiData) => {
  // Validate EMI data
  if (!emiData || !emiData.principal || !emiData.interestRate || !emiData.tenure) {
    alert('❌ Please calculate EMI first before proceeding to Part Payment Calculator');
    return false;
  }

  if (emiData.principal <= 0 || emiData.interestRate < 0 || emiData.tenure <= 0) {
    alert('❌ Invalid loan data. Please recalculate EMI.');
    return false;
  }

  if (!emiData.email) {
    alert('❌ Email is required. Please enter your email and recalculate.');
    return false;
  }

  // Navigate with EMI data
  console.log('Navigating to Part Payment with data:', emiData);
  onNavigate('part-payment');
  return true;
};

/**
 * Get latest EMI data from result state
 * @param {Object} result - Current calculation result
 * @returns {Object|null} Formatted EMI data or null
 */
export const getEmiDataForPartPayment = (result) => {
  if (!result) {
    return null;
  }

  return {
    email: result.email,
    principal: result.principal,
    interestRate: result.interestRate,
    tenure: result.tenure,
    loanType: result.loanType,
    emiType: result.emiType,
    emi: result.emi,
    totalInterest: result.totalInterest,
    totalPayment: result.totalPayment,
    schedule: result.schedule,
  };
};
