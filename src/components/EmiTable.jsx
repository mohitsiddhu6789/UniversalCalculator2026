import React from 'react';

export default function EmiTable({ schedule }) {
  const [expanded, setExpanded] = React.useState(false);

  // Show first 12 rows by default, or all if expanded
  const displayedSchedule = expanded ? schedule : schedule.slice(0, 12);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h3 className="text-xl font-bold text-slate-900 mb-4">📋 EMI Schedule</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 border-b-2 border-slate-300">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Month</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-900">EMI</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-900">Principal</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-900">Interest</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-900">Balance</th>
            </tr>
          </thead>
          <tbody>
            {displayedSchedule.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
              >
                <td className="px-4 py-3 text-slate-900 font-medium">{row.month}</td>
                <td className="px-4 py-3 text-right text-slate-900">
                  ₹{row.emi.toLocaleString('en-IN')}
                </td>
                <td className="px-4 py-3 text-right text-green-600">
                  ₹{row.principal.toLocaleString('en-IN')}
                </td>
                <td className="px-4 py-3 text-right text-orange-600">
                  ₹{row.interest.toLocaleString('en-IN')}
                </td>
                <td className="px-4 py-3 text-right text-slate-900 font-medium">
                  ₹{row.balance.toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {schedule.length > 12 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 w-full bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-2 rounded-lg transition duration-200"
        >
          {expanded ? '▲ Show Less' : '▼ Show All ' + schedule.length + ' Months'}
        </button>
      )}

      {/* Summary at bottom */}
      <div className="mt-6 pt-6 border-t-2 border-slate-200">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Total EMI</p>
            <p className="text-lg font-bold text-slate-900">
              ₹{(schedule.reduce((sum, row) => sum + row.emi, 0)).toLocaleString('en-IN')}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Total Principal</p>
            <p className="text-lg font-bold text-green-600">
              ₹{(schedule.reduce((sum, row) => sum + row.principal, 0)).toLocaleString('en-IN')}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Total Interest</p>
            <p className="text-lg font-bold text-orange-600">
              ₹{(schedule.reduce((sum, row) => sum + row.interest, 0)).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
