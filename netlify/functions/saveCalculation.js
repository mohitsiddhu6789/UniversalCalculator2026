/**
 * Netlify Function: Save Calculation to Supabase
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    // Validate required fields
    if (!data.email || !data.loanType || !data.principal) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Insert into database
    const { data: result, error } = await supabase
      .from('loan_calculations')
      .insert([
        {
          email: data.email,
          loan_type: data.loanType,
          principal: data.principal,
          interest_rate: data.interestRate,
          tenure_months: data.tenureMonths,
          emi: data.emi,
          total_interest: data.totalInterest,
          total_payment: data.totalPayment,
          calculation_type: data.calculationType || 'standard',
        },
      ])
      .select();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: 'Calculation saved successfully',
      data: result,
    });
  } catch (error) {
    console.log('Error Environment Variables:', {
      VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Exists' : 'Not Set',
    });
    console.error('Error saving calculation:', error);
    return res.status(500).json({ error: error.message });
  }
};
