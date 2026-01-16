/**
 * API Service for frontend calls to Netlify Functions
 */

const API_URL = import.meta.env.VITE_API_URL || '/.netlify/functions';

export const saveCalculation = async (data) => {
  try {
    const response = await fetch(`${API_URL}/saveCalculation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving calculation:', error);
    throw error;
  }
};

export const savePartPaymentEmail = async (email, partPaymentData) => {
  try {
    const response = await fetch(`${API_URL}/savePartPaymentEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, partPaymentData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving part payment email:', error);
    throw error;
  }
};

export const getCalculations = async (email = null, loanType = null) => {
  try {
    let url = `${API_URL}/getCalculations`;
    const params = new URLSearchParams();

    if (email) params.append('email', email);
    if (loanType) params.append('loanType', loanType);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching calculations:', error);
    throw error;
  }
};

// Alias for Admin page compatibility
export const getAllCalculations = getCalculations;

export const deleteCalculation = async (id) => {
  try {
    const response = await fetch(`${API_URL}/deleteCalculation`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting calculation:', error);
    throw error;
  }
};

export const exportAsCSV = (data) => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return null;
  }

  const headers = [
    'Email',
    'Loan Type',
    'Principal',
    'Interest Rate',
    'Tenure (Months)',
    'EMI',
    'Total Interest',
    'Total Payment',
    'Created At',
  ];

  const rows = data.map((item) => [
    item.email,
    item.loan_type,
    item.principal,
    item.interest_rate,
    item.tenure_months,
    item.emi,
    item.total_interest,
    item.total_payment,
    new Date(item.created_at).toLocaleDateString(),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  return csvContent;
};

export const downloadCSV = (data, filename = 'calculations.csv') => {
  const csvContent = exportAsCSV(data);

  if (!csvContent) return;

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
