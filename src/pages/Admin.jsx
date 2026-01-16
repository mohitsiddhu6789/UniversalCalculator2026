import React, { useState, useEffect } from 'react';
import { getAllCalculations, deleteCalculation, exportAsCSV, downloadCSV } from '../services/api';
import PartPaymentEmailTable from '../components/PartPaymentEmailTable';
import SEO from '../components/SEO';

export default function Admin() {
  const [calculations, setCalculations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    email: '',
    loanType: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadCalculations();
  }, []);

  const loadCalculations = async () => {
    setLoading(true);
    try {
      const data = await getAllCalculations(filters);
      setCalculations(data);
    } catch (error) {
      setMessage('Error loading calculations');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this calculation?')) {
      try {
        await deleteCalculation(id);
        setCalculations(calculations.filter((calc) => calc.id !== id));
        setMessage('Calculation deleted successfully');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error deleting calculation');
        console.error(error);
      }
    }
  };

  const handleExport = () => {
    const csv = exportAsCSV(calculations);
    downloadCSV(csv, `loan_calculations_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    loadCalculations();
  };

  return (
    <>
      <SEO
        title="Admin Dashboard - OpenLoanCalc Calculator Reports"
        description="View and manage all loan calculations. Access admin dashboard to filter calculations by email or loan type."
        keywords="admin dashboard, loan calculations, calculator reports, user data"
        canonical="https://openloancalc.com/admin"
        robots="noindex, follow"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Header */}
        <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-6 shadow-lg">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-purple-100 text-lg mt-2">View and manage all loan calculations</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-8">
          <div className="container mx-auto px-4">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">🔍 Filters</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={filters.email}
                    onChange={handleFilterChange}
                    placeholder="user@example.com"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Loan Type</label>
                  <select
                    name="loanType"
                    value={filters.loanType}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">All Types</option>
                    <option value="personal">Personal Loan</option>
                    <option value="home">Home Loan</option>
                    <option value="car">Car Loan</option>
                    <option value="education">Education Loan</option>
                    <option value="business">Business Loan</option>
                    <option value="overdraft">Overdraft</option>
                    <option value="custom">Custom Loan</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleApplyFilters}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg transition duration-200"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-lg text-center font-medium ${
                  message.includes('successfully')
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {message}
              </div>
            )}

            {/* Export Button */}
            {calculations.length > 0 && (
              <div className="mb-6">
                <button
                  onClick={handleExport}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
                >
                  📥 Export as CSV
                </button>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <p className="text-white text-lg">Loading calculations...</p>
              </div>
            )}

            {/* Calculations Table */}
            {!loading && calculations.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100 border-b-2 border-slate-300">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Email</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Loan Type</th>
                        <th className="px-6 py-4 text-right font-semibold text-slate-900">Principal</th>
                        <th className="px-6 py-4 text-right font-semibold text-slate-900">Rate %</th>
                        <th className="px-6 py-4 text-right font-semibold text-slate-900">EMI</th>
                        <th className="px-6 py-4 text-right font-semibold text-slate-900">Total Interest</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Date</th>
                        <th className="px-6 py-4 text-center font-semibold text-slate-900">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculations.map((calc, index) => (
                        <tr
                          key={calc.id}
                          className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                        >
                          <td className="px-6 py-4 text-slate-900">{calc.email}</td>
                          <td className="px-6 py-4 text-slate-900 capitalize">{calc.loan_type}</td>
                          <td className="px-6 py-4 text-right text-slate-900">
                            ₹{calc.principal.toLocaleString('en-IN')}
                          </td>
                          <td className="px-6 py-4 text-right text-slate-900">{calc.interest_rate}%</td>
                          <td className="px-6 py-4 text-right text-blue-600 font-semibold">
                            ₹{calc.emi.toLocaleString('en-IN')}
                          </td>
                          <td className="px-6 py-4 text-right text-orange-600 font-semibold">
                            ₹{calc.total_interest.toLocaleString('en-IN')}
                          </td>
                          <td className="px-6 py-4 text-slate-600 text-sm">
                            {new Date(calc.created_at).toLocaleString('en-IN')}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleDelete(calc.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition duration-200"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
                  <p className="text-sm text-slate-600">
                    Total Records: <span className="font-bold text-slate-900">{calculations.length}</span>
                  </p>
                </div>
              </div>
            )}

            {/* No Data State */}
            {!loading && calculations.length === 0 && (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <p className="text-slate-900 text-lg mb-4">No calculations found</p>
                <p className="text-slate-600">Try adjusting your filters or check back later</p>
              </div>
            )}

            {/* Part Payment Calculator Emails Table */}
            <div className="mt-12">
              <PartPaymentEmailTable />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 text-center py-6 mt-12 border-t border-slate-700">
          <p>© 2026 Universal Emi Calculator - Admin Dashboard</p>
        </footer>
      </div>
    </>
  );
}
