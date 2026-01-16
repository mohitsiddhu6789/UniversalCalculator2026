/**
 * Netlify Function: Delete Calculation from Supabase
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async (req, res) => {
  // Only allow DELETE requests
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.body;

    // Validate required fields
    if (!id) {
      return res.status(400).json({ error: 'Missing calculation ID' });
    }

    // Delete from database
    const { error } = await supabase
      .from('loan_calculations')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: 'Calculation deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting calculation:', error);
    return res.status(500).json({ error: error.message });
  }
};
