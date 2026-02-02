import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Charts({ result }) {
  if (!result) return null;

  // Pie chart data for Principal vs Interest
  const pieData = {
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        data: [result.principal, result.totalInterest],
        backgroundColor: ['#3b82f6', '#f97316'],
        borderColor: ['#1e40af', '#c2410c'],
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = '₹' + context.parsed.toLocaleString('en-IN');
            return label + ': ' + value;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6">📊 Loan Breakdown</h3>
      
      <div className="flex justify-center items-center">
        <div className="w-full max-w-sm h-80">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>

      {/* Summary below chart */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm text-slate-600">Principal Amount</p>
          <p className="text-lg font-bold text-blue-600">
            ₹{result.principal.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {((result.principal / result.totalPayment) * 100).toFixed(1)}% of total
          </p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
          <p className="text-sm text-slate-600">Total Interest</p>
          <p className="text-lg font-bold text-orange-600">
            ₹{result.totalInterest.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {((result.totalInterest / result.totalPayment) * 100).toFixed(1)}% of total
          </p>
        </div>
      </div>
    </div>
  );
}
