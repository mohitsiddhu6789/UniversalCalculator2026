import * as supabaseApi from './supabaseApi';

const USE_SUPABASE = import.meta.env.VITE_SUPABASE_URL ? true : false;

/**
 * API Service for EMI Calculator
 * Handles all API calls to save and retrieve calculations
 */

/**
 * Save EMI calculation to backend
 * @param {Object} calculationData - The calculation data to save
 * @returns {Promise} Response from the server
 */
export const saveCalculation = async (calculationData) => {
  if (USE_SUPABASE) {
    return await supabaseApi.saveEmiCalculation(calculationData);
  } else {
    // Fallback to localStorage
    return saveCalculationLocal(calculationData);
  }
};

/**
 * Get all calculations for a user
 * @param {string} email - User email
 * @returns {Promise} Array of calculations
 */
export const getCalculations = async (email) => {
  if (USE_SUPABASE) {
    return await supabaseApi.getUserEmiCalculations(email);
  } else {
    return getCalculationsLocal(email);
  }
};

/**
 * Get all calculations (for admin)
 * @returns {Promise} Array of all calculations
 */
export const getAllCalculations = async () => {
  if (USE_SUPABASE) {
    return await supabaseApi.getAllEmiCalculations();
  } else {
    return getAllCalculationsLocal();
  }
};

/**
 * Delete a calculation
 * @param {number} calculationId - ID of calculation to delete
 * @returns {Promise} Success status
 */
export const deleteCalculation = async (calculationId) => {
  if (USE_SUPABASE) {
    return await supabaseApi.deleteEmiCalculation(calculationId);
  } else {
    return deleteCalculationLocal(calculationId);
  }
};

/**
 * Export calculations as CSV
 * @param {Array} calculations - Array of calculations to export
 * @returns {string} CSV content
 */
export const exportAsCSV = (calculations) => {
  return supabaseApi.exportCalculationsAsCSV(calculations);
};

/**
 * Download CSV file
 * @param {string} csvContent - CSV content
 * @param {string} fileName - Name of file to download
 */
export const downloadCSV = (csvContent, fileName) => {
  return supabaseApi.downloadCSV(csvContent, fileName);
};

// ...existing localStorage functions...
function saveCalculationLocal(calculationData) {
  try {
    const existingCalculations = JSON.parse(localStorage.getItem('emiCalculations')) || [];
    const newCalculation = {
      id: Date.now(),
      ...calculationData,
      savedAt: new Date().toISOString(),
    };
    existingCalculations.push(newCalculation);
    localStorage.setItem('emiCalculations', JSON.stringify(existingCalculations));
    return {
      success: true,
      message: '✅ Calculation saved successfully!',
      data: newCalculation,
    };
  } catch (error) {
    return {
      success: false,
      message: '❌ Failed to save calculation',
      error: error.message,
    };
  }
}

function getCalculationsLocal(email) {
  try {
    const allCalculations = JSON.parse(localStorage.getItem('emiCalculations')) || [];
    const userCalculations = allCalculations.filter(calc => calc.email === email);
    return {
      success: true,
      data: userCalculations,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
}

function getAllCalculationsLocal() {
  try {
    const allCalculations = JSON.parse(localStorage.getItem('emiCalculations')) || [];
    return {
      success: true,
      data: allCalculations,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
}

function deleteCalculationLocal(calculationId) {
  try {
    const allCalculations = JSON.parse(localStorage.getItem('emiCalculations')) || [];
    const filtered = allCalculations.filter(calc => calc.id !== calculationId);
    localStorage.setItem('emiCalculations', JSON.stringify(filtered));
    return {
      success: true,
      message: 'Calculation deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
