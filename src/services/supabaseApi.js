import { supabase } from './supabase';

/**
 * =====================================================
 * EMI CALCULATIONS TABLE OPERATIONS
 * =====================================================
 */

/**
 * Save EMI calculation to Supabase
 * Only inserts if calculation parameters are different from latest record
 * @param {Object} calculationData - Calculation data to save
 * @returns {Promise} Response with saved data
 */
export const saveEmiCalculation = async (calculationData) => {
  try {
    console.log('Saving EMI calculation to Supabase:', calculationData);

    // First, check if user exists
    const userCheckResult = await supabase
      .from('users')
      .select('id, email')
      .eq('email', calculationData.email)
      .maybeSingle();

    if (userCheckResult.error && userCheckResult.error.code !== 'PGRST116') {
      throw userCheckResult.error;
    }

    // If user doesn't exist, create one
    if (!userCheckResult.data) {
      console.log('Creating new user:', calculationData.email);
      const { error: userError } = await supabase
        .from('users')
        .insert([
          {
            email: calculationData.email,
            is_admin: false,
          }
        ]);

      if (userError) {
        console.warn('User creation warning:', userError.message);
      }
    } else {
      console.log('User already exists:', calculationData.email);
    }

    // Get the latest calculation for this email
    const { data: latestCalc, error: fetchError } = await supabase
      .from('emi_calculations')
      .select('*')
      .eq('email', calculationData.email)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    // Compare with latest record
    if (latestCalc) {
      const isSameCalculation = 
        latestCalc.email === calculationData.email &&
        latestCalc.loan_type === calculationData.loanType &&
        latestCalc.emi_type === calculationData.emiType &&
        latestCalc.principal === calculationData.principal &&
        latestCalc.interest_rate === calculationData.interestRate &&
        latestCalc.tenure_months === calculationData.tenure;

      if (isSameCalculation) {
        console.log('Calculation already exists with same parameters. Skipping insert.');
        return {
          success: true,
          message: '✅ Calculation already saved (no changes detected)',
          data: latestCalc,
          isDuplicate: true,
        };
      }
    }

    // Parameters are different or no previous record exists, so insert new record
    console.log('Calculation parameters changed or new. Inserting new record.');
    const { data, error } = await supabase
      .from('emi_calculations')
      .insert([
        {
          email: calculationData.email,
          loan_type: calculationData.loanType,
          emi_type: calculationData.emiType,
          principal: calculationData.principal,
          interest_rate: calculationData.interestRate,
          tenure_months: calculationData.tenure,
          monthly_emi: calculationData.emi,
          total_interest: calculationData.totalInterest,
          total_payment: calculationData.totalPayment,
        }
      ])
      .select();

    if (error) {
      throw error;
    }

    console.log('Calculation saved successfully:', data);
    return {
      success: true,
      message: '✅ Calculation saved successfully!',
      data: data[0],
      isDuplicate: false,
    };
  } catch (error) {
    console.error('Error saving calculation:', error);
    return {
      success: false,
      message: '❌ Failed to save calculation',
      error: error.message,
    };
  }
};

/**
 * Get user's EMI calculations
 * Returns all calculations for a given email (no duplicates due to DB structure)
 * @param {string} email - User email
 * @returns {Promise} Array of calculations
 */
export const getUserEmiCalculations = async (email) => {
  try {
    console.log('Fetching calculations for:', email);

    const { data, error } = await supabase
      .from('emi_calculations')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    console.log('Calculations fetched:', data);
    return {
      success: true,
      data: data || [],
    };
  } catch (error) {
    console.error('Error fetching calculations:', error);
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
};

/**
 * Get all EMI calculations (Admin)
 * No duplicate emails - each calculation is a separate record
 * @returns {Promise} All calculations
 */
export const getAllEmiCalculations = async () => {
  try {
    console.log('Fetching all calculations');

    const { data, error } = await supabase
      .from('emi_calculations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    console.log('All calculations fetched:', data);
    return {
      success: true,
      data: data || [],
    };
  } catch (error) {
    console.error('Error fetching all calculations:', error);
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
};

/**
 * Get unique users count
 * Get count of unique email addresses
 * @returns {Promise} Count of unique users
 */
export const getUniqueUsersCount = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true });

    if (error) {
      throw error;
    }

    return {
      success: true,
      count: data?.length || 0,
    };
  } catch (error) {
    console.error('Error fetching users count:', error);
    return {
      success: false,
      error: error.message,
      count: 0,
    };
  }
};

/**
 * Delete EMI calculation
 * @param {number} calculationId - ID of calculation to delete
 * @returns {Promise} Success status
 */
export const deleteEmiCalculation = async (calculationId) => {
  try {
    console.log('Deleting calculation:', calculationId);

    const { error } = await supabase
      .from('emi_calculations')
      .delete()
      .eq('id', calculationId);

    if (error) {
      throw error;
    }

    console.log('Calculation deleted successfully');
    return {
      success: true,
      message: '✅ Calculation deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting calculation:', error);
    return {
      success: false,
      message: '❌ Failed to delete calculation',
      error: error.message,
    };
  }
};

/**
 * =====================================================
 * USERS TABLE OPERATIONS
 * =====================================================
 */

/**
 * Create or update user (UPSERT)
 * If email exists, updates user data
 * If email is new, creates new user record with default full_name "User"
 * @param {Object} userData - User data
 * @returns {Promise} Response
 */
export const upsertUser = async (userData) => {
  try {
    console.log('Upserting user:', userData.email);

    const { data, error } = await supabase
      .from('users')
      .upsert([
        {
          email: userData.email,
          full_name: userData.fullName || 'User',
          phone: userData.phone || null,
          is_admin: userData.isAdmin || false,
        }
      ], { onConflict: 'email' })
      .select();

    if (error) {
      throw error;
    }

    console.log('User upserted successfully:', data);
    return {
      success: true,
      message: '✅ User saved successfully!',
      data: data[0],
    };
  } catch (error) {
    console.error('Error upserting user:', error);
    return {
      success: false,
      message: '❌ Failed to save user',
      error: error.message,
    };
  }
};

/**
 * Get user by email
 * @param {string} email - User email
 * @returns {Promise} User data or null
 */
export const getUserByEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return {
      success: true,
      data: data || null,
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

/**
 * Get all users (Admin)
 * @returns {Promise} All users
 */
export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return {
      success: true,
      data: data || [],
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
};

/**
 * =====================================================
 * UTILITY FUNCTIONS
 * =====================================================
 */

/**
 * Export calculations as CSV
 * @param {Array} calculations - Calculations to export
 * @returns {string} CSV content
 */
export const exportCalculationsAsCSV = (calculations) => {
  if (!calculations || calculations.length === 0) {
    return '';
  }

  const headers = [
    'Date',
    'Email',
    'Loan Type',
    'EMI Type',
    'Principal',
    'Interest Rate',
    'Tenure (months)',
    'Monthly EMI',
    'Total Interest',
    'Total Payment',
  ];

  const rows = calculations.map(calc => [
    new Date(calc.created_at).toLocaleDateString(),
    calc.email,
    calc.loan_type,
    calc.emi_type === 'flat' ? 'Flat Rate' : 'Reducing Balance',
    calc.principal,
    calc.interest_rate,
    calc.tenure_months,
    Math.round(calc.monthly_emi),
    Math.round(calc.total_interest),
    Math.round(calc.total_payment),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\n');

  return csvContent;
};

/**
 * Download CSV file
 * @param {string} csvContent - CSV content
 * @param {string} fileName - File name
 */
export const downloadCSV = (csvContent, fileName = 'calculations.csv') => {
  try {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return {
      success: true,
      message: '✅ CSV downloaded successfully',
    };
  } catch (error) {
    console.error('Error downloading CSV:', error);
    return {
      success: false,
      message: '❌ Failed to download CSV',
      error: error.message,
    };
  }
};
