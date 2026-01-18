import React, { useState } from 'react';
import { goToPartPayment } from '../utils/navigationUtils';

export default function Header({ onNavigate, latestEmiData, userEmail }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handlePartPaymentClick = () => {
    // Use shared navigation function
    goToPartPayment(onNavigate, latestEmiData);
    setOpenDropdown(null);
  };

  const handleNavigateAndClose = (page) => {
    onNavigate(page);
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userEmail');
    window.location.reload();
  };

  const calculators = [
    { label: 'EMI Calculator', page: 'home', icon: '🏠' },
    { label: 'Part Payment', page: 'part-payment', icon: '💰', requiresEmi: true },
    { label: 'SWP Calculator', page: 'swp', icon: '📊' },
    { label: 'Scientific Calculator', page: 'scientific', icon: '🧮' },
  ];

  const converters = [
    { label: 'Unit Converter', page: 'units', icon: '📏' },
    { label: 'Temperature Converter', page: 'temperature', icon: '🌡️' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo/Title */}
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold cursor-pointer hover:text-blue-200 transition" onClick={() => handleNavigateAndClose('home')}>
              💰 Universal
            </h1>
          </div>

          {/* Center - Email Display */}
          <div className="hidden md:flex items-center gap-4">
            {userEmail ? (
              <div className="flex items-center gap-2 bg-blue-500 bg-opacity-50 px-4 py-2 rounded-lg border border-blue-300">
                <span className="text-sm">📧 Email:</span>
                <span className="font-semibold text-white">{userEmail}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 text-blue-200 text-sm">
                <span>📧</span>
                <span>Loading...</span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="text-xs bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg transition duration-200 font-medium"
              title="Logout and change email"
            >
              🔄 Change
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {/* Calculators Dropdown */}
            <div className="relative group">
              <button
                className="hover:text-blue-200 transition font-medium py-2 px-4 rounded-lg hover:bg-blue-500 hover:bg-opacity-30"
              >
                🧮 Calculators
                <span className="ml-1 text-xs">▼</span>
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-white text-slate-900 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                {calculators.map((calc, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (calc.requiresEmi && !latestEmiData) {
                        alert('❌ Please calculate EMI first');
                        return;
                      }
                      if (calc.page === 'part-payment') {
                        handlePartPaymentClick();
                      } else {
                        handleNavigateAndClose(calc.page);
                      }
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-blue-100 transition duration-150 flex items-center gap-2"
                  >
                    <span>{calc.icon}</span>
                    <span>{calc.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Unit Converters Dropdown */}
            <div className="relative group">
              <button
                className="hover:text-blue-200 transition font-medium py-2 px-4 rounded-lg hover:bg-blue-500 hover:bg-opacity-30"
              >
                🔄 Unit Converters
                <span className="ml-1 text-xs">▼</span>
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-white text-slate-900 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                {converters.map((converter, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavigateAndClose(converter.page)}
                    className="w-full text-left px-4 py-2 hover:bg-blue-100 transition duration-150 flex items-center gap-2"
                  >
                    <span>{converter.icon}</span>
                    <span>{converter.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Help Link */}
            <button
              onClick={() => handleNavigateAndClose('help')}
              className="hover:text-blue-200 transition font-medium py-2 px-4 rounded-lg hover:bg-blue-500 hover:bg-opacity-30"
            >
              ❓ Help
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => toggleDropdown('mobile')}
            className="md:hidden text-white font-bold text-xl bg-blue-500 hover:bg-blue-600 p-2 rounded-lg transition duration-200"
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {openDropdown === 'mobile' && (
          <div className="md:hidden mt-4 bg-blue-700 rounded-lg overflow-hidden">
            {/* Mobile Calculators Section */}
            <div>
              <button
                onClick={() => toggleDropdown('mobile-calc')}
                className="w-full text-left px-4 py-3 hover:bg-blue-600 transition duration-150 font-medium flex items-center justify-between border-b border-blue-600"
              >
                <span>🧮 Calculators</span>
                <span className={`text-xs transition-transform ${openDropdown === 'mobile-calc' ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openDropdown === 'mobile-calc' && (
                <div className="bg-blue-600 py-2">
                  {calculators.map((calc, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (calc.requiresEmi && !latestEmiData) {
                          alert('❌ Please calculate EMI first');
                          return;
                        }
                        if (calc.page === 'part-payment') {
                          handlePartPaymentClick();
                        } else {
                          handleNavigateAndClose(calc.page);
                        }
                      }}
                      className="w-full text-left px-6 py-2 hover:bg-blue-500 transition duration-150 flex items-center gap-2"
                    >
                      <span>{calc.icon}</span>
                      <span>{calc.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Converters Section */}
            <div>
              <button
                onClick={() => toggleDropdown('mobile-conv')}
                className="w-full text-left px-4 py-3 hover:bg-blue-600 transition duration-150 font-medium flex items-center justify-between border-b border-blue-600"
              >
                <span>🔄 Unit Converters</span>
                <span className={`text-xs transition-transform ${openDropdown === 'mobile-conv' ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openDropdown === 'mobile-conv' && (
                <div className="bg-blue-600 py-2">
                  {converters.map((converter, index) => (
                    <button
                      key={index}
                      onClick={() => handleNavigateAndClose(converter.page)}
                      className="w-full text-left px-6 py-2 hover:bg-blue-500 transition duration-150 flex items-center gap-2"
                    >
                      <span>{converter.icon}</span>
                      <span>{converter.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Help Link */}
            <button
              onClick={() => handleNavigateAndClose('help')}
              className="w-full text-left px-4 py-3 hover:bg-blue-600 transition duration-150 font-medium flex items-center gap-2"
            >
              <span>❓</span>
              <span>Help</span>
            </button>
          </div>
        )}

        {/* Mobile Email Display */}
        <div className="md:hidden mt-3 flex items-center justify-between">
          {userEmail ? (
            <div className="flex items-center gap-2 bg-blue-500 bg-opacity-50 px-3 py-1 rounded border border-blue-300 text-sm flex-1">
              <span>📧</span>
              <span className="font-semibold truncate">{userEmail}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-blue-200 text-sm">
              <span>📧</span>
              <span>Loading...</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="text-xs bg-red-500 hover:bg-red-600 px-2 py-1 rounded ml-2 transition duration-200 font-medium"
          >
            🔄
          </button>
        </div>
      </div>
    </header>
  );
}
