/**
 * Save Part Payment Calculator email address
 * Stores user email when they access the Part Payment Calculator
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
    const { email, partPaymentData } = req.body;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from('loan_calculations')
      .insert([
        {
          email,
          loan_type: partPaymentData?.loanType || 'part_payment',
          principal: partPaymentData?.principal,
          interest_rate: partPaymentData?.interestRate,
          tenure_months: partPaymentData?.tenureMonths,
          emi: partPaymentData?.emi,
          total_interest: partPaymentData?.totalInterest,
          total_payment: partPaymentData?.totalPayment,
          calculation_type: 'part_payment',
        },
      ])
      .select();

    if (error) throw error;

    console.log(`Part Payment Calculator accessed by: ${email}`);

    return res.status(200).json({
      success: true,
      message: 'Email and data recorded successfully',
      timestamp: new Date().toISOString(),
      data,
    });
  } catch (error) {
    console.error('Error saving email:', error);
    return res.status(500).json({ error: error.message });
  }
};
