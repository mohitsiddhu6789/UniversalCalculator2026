import React from 'react';
import { goToPartPayment } from '../utils/navigationUtils';

export default function Header({ onNavigate, latestEmiData }) {
  const handlePartPaymentClick = () => {
    // Use shared navigation function
    goToPartPayment(onNavigate, latestEmiData);
  };

  const handleHelpClick = () => {
    // Navigate to help page
    onNavigate('help');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo/Title */}
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">💰 Universal</h1>
          </div>

          {/* Center - Email Display */}
          <div className="hidden md:flex items-center">
            {latestEmiData && latestEmiData.email ? (
              <div className="flex items-center gap-2 bg-blue-500 bg-opacity-50 px-4 py-2 rounded-lg border border-blue-300">
                <span className="text-sm">📧 Email:</span>
                <span className="font-semibold text-white">{latestEmiData.email}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 text-blue-200 text-sm">
                <span>📧</span>
                <span>No calculation yet</span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-blue-200 transition font-medium"
            >
              Home
            </button>
            <button
              onClick={handlePartPaymentClick}
              className="hover:text-blue-200 transition font-medium"
            >
              💰 Part Payment
            </button>
            <button
              onClick={handleHelpClick}
              className="hover:text-blue-200 transition font-medium"
            >
              ❓ Help
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white font-bold">☰</button>
        </div>

        {/* Mobile Email Display */}
        <div className="md:hidden mt-3 flex items-center justify-center">
          {latestEmiData && latestEmiData.email ? (
            <div className="flex items-center gap-2 bg-blue-500 bg-opacity-50 px-3 py-1 rounded border border-blue-300 text-sm w-full justify-center">
              <span>📧</span>
              <span className="font-semibold truncate">{latestEmiData.email}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-blue-200 text-sm">
              <span>📧</span>
              <span>No calculation yet</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
