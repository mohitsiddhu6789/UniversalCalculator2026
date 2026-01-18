import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getAllEmiCalculations, getAllUsers, deleteEmiCalculation, exportCalculationsAsCSV, downloadCSV, deleteUser } from '../services/supabaseApi';

export default function Admin({ onNavigate }) {
  const [calculations, setCalculations] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredCalculations, setFilteredCalculations] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'email', direction: 'asc' });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentUserPage, setCurrentUserPage] = useState(1);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load calculations
      const calcResponse = await getAllEmiCalculations();
      if (calcResponse.success) {
        setCalculations(calcResponse.data);
        setFilteredCalculations(calcResponse.data);
        setCurrentPage(1);
      }

      // Load users
      const usersResponse = await getAllUsers();
      if (usersResponse.success) {
        setUsers(usersResponse.data);
        setFilteredUsers(usersResponse.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setMessage({
        type: 'error',
        text: 'Failed to load data',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (email) => {
    setSearchEmail(email);
    setCurrentPage(1);
    if (email.trim() === '') {
      setFilteredCalculations(calculations);
    } else {
      const filtered = calculations.filter(calc =>
        calc.email.toLowerCase().includes(email.toLowerCase())
      );
      setFilteredCalculations(filtered);
    }
  };

  const handleSearchUsers = (email) => {
    setSearchEmail(email);
    setCurrentUserPage(1);
    if (email.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.email.toLowerCase().includes(email.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...filteredCalculations].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (typeof aValue === 'string') {
        return direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return direction === 'asc' ? aValue - bValue : bValue - aValue;
    });

    setSortConfig({ key, direction });
    setFilteredCalculations(sorted);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this calculation?')) {
      return;
    }

    try {
      const response = await deleteEmiCalculation(id);
      if (response.success) {
        setCalculations(calculations.filter(calc => calc.id !== id));
        setFilteredCalculations(filteredCalculations.filter(calc => calc.id !== id));
        setMessage({
          type: 'success',
          text: 'Calculation deleted successfully',
        });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      console.error('Error deleting calculation:', error);
      setMessage({
        type: 'error',
        text: 'Failed to delete calculation',
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await deleteUser(userId);
      if (response.success) {
        setUsers(users.filter(user => user.id !== userId));
        setFilteredUsers(filteredUsers.filter(user => user.id !== userId));
        setMessage({
          type: 'success',
          text: 'User deleted successfully',
        });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage({
        type: 'error',
        text: 'Failed to delete user',
      });
    }
  };

  const handleExport = () => {
    try {
      const csv = exportCalculationsAsCSV(filteredCalculations);
      if (csv) {
        downloadCSV(csv, `calculations_${new Date().toISOString().split('T')[0]}.csv`);
        setMessage({
          type: 'success',
          text: 'Data exported successfully',
        });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({
          type: 'error',
          text: 'No data to export',
        });
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      setMessage({
        type: 'error',
        text: 'Failed to export data',
      });
    }
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return ' ↕️';
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredCalculations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCalculations = filteredCalculations.slice(startIndex, endIndex);

  // Pagination users
  const totalUserPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const userStartIndex = (currentUserPage - 1) * itemsPerPage;
  const userEndIndex = userStartIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(userStartIndex, userEndIndex);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin dashboard for managing loan calculations" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">📊 Admin Dashboard</h1>
            <p className="text-lg text-slate-700">
              Manage and view all saved loan calculations and user data
            </p>
          </div>

          {/* Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg border-l-4 ${
              message.type === 'success'
                ? 'bg-green-50 border-green-500'
                : 'bg-red-50 border-red-500'
            }`}>
              <p className={`font-semibold ${
                message.type === 'success'
                  ? 'text-green-900'
                  : 'text-red-900'
              }`}>
                {message.text}
              </p>
            </div>
          )}

          {/* Controls */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Search by Email
                </label>
                <input
                  type="email"
                  value={searchEmail}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
              </div>
              <div className="flex items-end gap-2">
                <button
                  onClick={handleExport}
                  disabled={filteredCalculations.length === 0}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                >
                  📥 Export to CSV
                </button>
              </div>
              <div className="flex items-end gap-2">
                <button
                  onClick={loadData}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                >
                  🔄 Refresh
                </button>
              </div>
            </div>
            <div className="flex gap-4 text-sm text-slate-600 flex-wrap">
              <p>
                <strong>Total Calculations:</strong> {filteredCalculations.length}
              </p>
              <p>
                <strong>Total Users:</strong> {users.length}
              </p>
              <p>
                <strong>Showing:</strong> {startIndex + 1}-{Math.min(endIndex, filteredCalculations.length)} of {filteredCalculations.length}
              </p>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-lg text-slate-700">Loading data...</p>
            </div>
          )}

          {/* EMI Calculations Table */}
          {!isLoading && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">📋 EMI Calculations</h2>
                {filteredCalculations.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <p className="text-lg text-slate-700">No calculations found</p>
                  </div>
                ) : (
                  <>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-slate-100 border-b-2 border-slate-300">
                              <th 
                                className="text-left px-6 py-3 cursor-pointer hover:bg-slate-200"
                                onClick={() => handleSort('email')}
                              >
                                Email {getSortIndicator('email')}
                              </th>
                              <th 
                                className="text-left px-6 py-3 cursor-pointer hover:bg-slate-200"
                                onClick={() => handleSort('loan_type')}
                              >
                                Loan Type {getSortIndicator('loan_type')}
                              </th>
                              <th className="text-left px-6 py-3">EMI Type</th>
                              <th className="text-right px-6 py-3">Principal (₹)</th>
                              <th className="text-right px-6 py-3">Interest Rate (%)</th>
                              <th className="text-right px-6 py-3">Tenure (Months)</th>
                              <th className="text-center px-6 py-3">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedCalculations.map((calc) => (
                              <tr key={calc.id} className="border-b border-slate-200 hover:bg-slate-50">
                                <td className="px-6 py-3 text-slate-700 font-medium">{calc.email}</td>
                                <td className="px-6 py-3 text-slate-700">{calc.loan_type}</td>
                                <td className="px-6 py-3 text-slate-700">
                                  {calc.emi_type === 'flat' ? 'Flat Rate' : 'Reducing Balance'}
                                </td>
                                <td className="text-right px-6 py-3 text-slate-700">
                                  ₹{calc.principal.toLocaleString('en-IN')}
                                </td>
                                <td className="text-right px-6 py-3 text-slate-700">
                                  {calc.interest_rate}%
                                </td>
                                <td className="text-right px-6 py-3 text-slate-700">
                                  {calc.tenure_months} months
                                </td>
                                <td className="text-center px-6 py-3">
                                  <button
                                    onClick={() => handleDelete(calc.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition duration-200 text-xs font-bold"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* PAGINATION CONTROLS - ENHANCED VISIBILITY */}
                    {totalPages > 1 && (
                      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                          
                          {/* Items Per Page Selector */}
                          <div className="flex items-center gap-3">
                            <label className="text-sm font-semibold text-slate-900">
                              Items per page:
                            </label>
                            <select
                              value={itemsPerPage}
                              onChange={(e) => {
                                setItemsPerPage(parseInt(e.target.value));
                                setCurrentPage(1);
                              }}
                              className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-900 bg-white"
                            >
                              <option value="5">5 items</option>
                              <option value="10">10 items</option>
                              <option value="25">25 items</option>
                              <option value="50">50 items</option>
                              <option value="100">100 items</option>
                            </select>
                          </div>

                          {/* Page Navigation */}
                          <div className="flex items-center gap-2 flex-wrap justify-center">
                            {/* Previous Button */}
                            <button
                              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                              disabled={currentPage === 1}
                              className="px-6 py-2 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg transition duration-200 font-bold text-sm"
                            >
                              ← Previous
                            </button>

                            {/* Page Number Buttons */}
                            <div className="flex items-center gap-1">
                              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                  key={page}
                                  onClick={() => setCurrentPage(page)}
                                  className={`px-3 py-2 rounded-lg font-bold transition duration-200 text-sm ${
                                    currentPage === page
                                      ? 'bg-blue-600 text-white border-2 border-blue-700'
                                      : 'bg-slate-200 text-slate-900 hover:bg-slate-300 border-2 border-slate-300'
                                  }`}
                                >
                                  {page}
                                </button>
                              ))}
                            </div>

                            {/* Next Button */}
                            <button
                              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                              disabled={currentPage === totalPages}
                              className="px-6 py-2 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg transition duration-200 font-bold text-sm"
                            >
                              Next →
                            </button>
                          </div>

                          {/* Page Info */}
                          <div className="text-sm font-semibold text-slate-700 bg-blue-50 px-4 py-2 rounded-lg border-2 border-blue-200">
                            Page <span className="text-blue-600 text-lg">{currentPage}</span> of <span className="text-blue-600 text-lg">{totalPages}</span>
                          </div>
                        </div>

                        {/* Row Info */}
                        <div className="mt-4 text-center text-sm text-slate-600">
                          Showing rows <strong>{startIndex + 1}</strong>-<strong>{Math.min(endIndex, filteredCalculations.length)}</strong> of <strong>{filteredCalculations.length}</strong> total records
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Users Table */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">👥 Users</h2>
                {users.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <p className="text-lg text-slate-700">No users found</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-100 border-b-2 border-slate-300">
                            <th className="text-left px-6 py-3">Email</th>
                            <th className="text-left px-6 py-3">Full Name</th>
                            <th className="text-left px-6 py-3">Phone</th>
                            <th className="text-left px-6 py-3">Created At</th>
                            <th className="text-center px-6 py-3">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedUsers.map((user) => (
                            <tr key={user.id} className="border-b border-slate-200 hover:bg-slate-50">
                              <td className="px-6 py-3 text-slate-700 font-medium">{user.email}</td>
                              <td className="px-6 py-3 text-slate-700">
                                {user.full_name || '-'}
                              </td>
                              <td className="px-6 py-3 text-slate-700">
                                {user.phone || '-'}
                              </td>
                              <td className="px-6 py-3 text-slate-700">
                                {new Date(user.created_at).toLocaleDateString('en-IN')}
                              </td>
                              <td className="text-center px-6 py-3">
                                <button
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition duration-200 text-xs font-bold"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
