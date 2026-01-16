import React, { useState, useEffect } from 'react';

export default function PartPaymentEmailTable() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch emails from localStorage (since we're using local storage for demo)
    const savedEmails = localStorage.getItem('partPaymentEmails');
    if (savedEmails) {
      try {
        setEmails(JSON.parse(savedEmails));
      } catch (err) {
        console.error('Error parsing emails:', err);
      }
    }
  }, []);

  const deleteEmail = (index) => {
    const updatedEmails = emails.filter((_, i) => i !== index);
    setEmails(updatedEmails);
    localStorage.setItem('partPaymentEmails', JSON.stringify(updatedEmails));
  };

  const exportToCSV = () => {
    if (emails.length === 0) {
      alert('No emails to export');
      return;
    }

    let csv = 'Email Address,Accessed Date\n';
    emails.forEach((item) => {
      csv += `"${item.email}","${item.timestamp}"\n`;
    });

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', `part-payment-emails-${new Date().toISOString().split('T')[0]}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">📧 Part Payment Calculator Emails</h3>
          <p className="text-slate-600 text-sm mt-1">Track all users who access the Part Payment Calculator</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportToCSV}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            disabled={emails.length === 0}
          >
            📥 Export CSV
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-slate-600 text-sm font-semibold">Total Accesses</p>
          <p className="text-3xl font-bold text-blue-600">{emails.length}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <p className="text-slate-600 text-sm font-semibold">Unique Emails</p>
          <p className="text-3xl font-bold text-purple-600">
            {new Set(emails.map((e) => e.email)).size}
          </p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <p className="text-slate-600 text-sm font-semibold">Last Access</p>
          <p className="text-lg font-bold text-orange-600">
            {emails.length > 0
              ? new Date(emails[emails.length - 1].timestamp).toLocaleDateString()
              : 'N/A'}
          </p>
        </div>
      </div>

      {/* Table */}
      {emails.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-300">
                <th className="text-left px-4 py-3 font-bold text-slate-900">#</th>
                <th className="text-left px-4 py-3 font-bold text-slate-900">Email Address</th>
                <th className="text-left px-4 py-3 font-bold text-slate-900">Date & Time</th>
                <th className="text-center px-4 py-3 font-bold text-slate-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((item, index) => (
                <tr key={index} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-700 font-medium">{index + 1}</td>
                  <td className="px-4 py-3 text-slate-700">{item.email}</td>
                  <td className="px-4 py-3 text-slate-600 text-sm">
                    {new Date(item.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => deleteEmail(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-slate-500 text-lg">No email records yet</p>
          <p className="text-slate-400 text-sm">Emails will appear here when users access the Part Payment Calculator</p>
        </div>
      )}
    </div>
  );
}
