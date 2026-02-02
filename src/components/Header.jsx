import React, { useState } from 'react';
import { goToPartPayment } from '../utils/navigationUtils';
import logoIcon from '../icon/icon3.png';

export default function Header({ onNavigate, latestEmiData, userEmail, onPartPaymentClick, onChangeEmail }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePartPaymentClick = () => {
    // Call the handler from parent (App) to show email modal
    if (onPartPaymentClick) {
      onPartPaymentClick();
    }
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleNavigateAndClose = (page) => {
    onNavigate(page);
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (openDropdown) {
      setOpenDropdown(null);
    }
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
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo/Title */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-900 px-3 py-1 rounded">
            <img src={logoIcon} alt="Universal Calculator Logo" className="w-12 h-12" />
            <div className="flex flex-col">
              <h4 className="text-xs font-bold cursor-pointer hover:text-blue-200 transition leading-tight" onClick={() => handleNavigateAndClose('home')}>
                Universal
              </h4>
              <p className="text-xs font-semibold cursor-pointer hover:text-blue-200 transition leading-tight" onClick={() => handleNavigateAndClose('home')}>
                Calculators & Convertors
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 flex-shrink-0">
            {/* Email Display */}
            {userEmail && (
              <div className="flex items-center gap-2 bg-blue-500 bg-opacity-50 px-3 py-1 rounded border border-blue-300 text-xs">
                <span>📧 Email:</span>
                <span className="font-semibold text-white">{userEmail}</span>
                <button
                  onClick={() => onChangeEmail && onChangeEmail()}
                  className="ml-1 px-2 py-0.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded transition duration-200"
                >
                  Change
                </button>
              </div>
            )}

            {/* Calculators Dropdown */}
            <div className="relative group">
              <button
                className="hover:text-blue-200 transition font-bold py-1 px-2.5 rounded text-sm hover:bg-blue-500 hover:bg-opacity-30 whitespace-nowrap"
              >
                🧮 Calculators
                <span className="ml-0.5 text-sm">▼</span>
              </button>
              <div className="absolute left-0 mt-0 w-44 bg-white text-slate-900 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-0.5 z-50">
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
                    className="w-full text-left px-2.5 py-1 hover:bg-blue-100 transition duration-150 flex items-center gap-1.5 text-xs"
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
                className="hover:text-blue-200 transition font-bold py-1 px-2.5 rounded text-sm hover:bg-blue-500 hover:bg-opacity-30 whitespace-nowrap"
              >
                🔄 Unit Converters
                <span className="ml-0.5 text-sm">▼</span>
              </button>
              <div className="absolute left-0 mt-0 w-44 bg-white text-slate-900 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-0.5 z-50">
                {converters.map((converter, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavigateAndClose(converter.page)}
                    className="w-full text-left px-2.5 py-1 hover:bg-blue-100 transition duration-150 flex items-center gap-1.5 text-xs"
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
              className="hover:text-blue-200 transition font-bold py-1 px-2.5 rounded text-sm hover:bg-blue-500 hover:bg-opacity-30 whitespace-nowrap"
            >
              ❓ Help
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-white font-semibold text-sm bg-blue-500 hover:bg-blue-600 p-2 rounded-lg transition duration-200"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Vertical Navigation Sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed left-0 top-20 bottom-0 w-64 bg-gradient-to-b from-blue-700 to-blue-800 shadow-lg overflow-y-auto z-40">
          {/* Mobile Email Display */}
          <div className="p-2 border-b border-blue-600">
            {userEmail ? (
              <div className="flex items-center justify-between gap-2 bg-blue-600 px-2 py-1 rounded border border-blue-400 text-xs mb-1">
                <div className="flex items-center gap-1">
                  <span>📧</span>
                  <span className="font-semibold truncate">{userEmail}</span>
                </div>
                <button
                  onClick={() => {
                    onChangeEmail && onChangeEmail();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-2 py-0.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded transition duration-200 whitespace-nowrap"
                >
                  Change
                </button>
              </div>
            ) : null}
          </div>

          {/* Mobile Navigation Items */}
          <nav className="p-2 space-y-1">
            {/* Calculators Section */}
            <div>
              <button
                onClick={() => toggleDropdown('mobile-calc')}
                className="w-full text-left px-3 py-2 hover:bg-blue-600 rounded transition duration-150 font-medium flex items-center justify-between bg-blue-600 mb-0.5"
              >
                <span>🧮 Calculators</span>
                <span className={`text-xs transition-transform ${openDropdown === 'mobile-calc' ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openDropdown === 'mobile-calc' && (
                <div className="space-y-0.5 mb-2">
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
                      className="w-full text-left px-3 py-1.5 hover:bg-blue-500 rounded transition duration-150 flex items-center gap-2 text-sm"
                    >
                      <span>{calc.icon}</span>
                      <span>{calc.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Converters Section */}
            <div>
              <button
                onClick={() => toggleDropdown('mobile-conv')}
                className="w-full text-left px-3 py-2 hover:bg-blue-600 rounded transition duration-150 font-medium flex items-center justify-between bg-blue-600 mb-0.5"
              >
                <span>🔄 Unit Converters</span>
                <span className={`text-xs transition-transform ${openDropdown === 'mobile-conv' ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openDropdown === 'mobile-conv' && (
                <div className="space-y-0.5 mb-2">
                  {converters.map((converter, index) => (
                    <button
                      key={index}
                      onClick={() => handleNavigateAndClose(converter.page)}
                      className="w-full text-left px-3 py-1.5 hover:bg-blue-500 rounded transition duration-150 flex items-center gap-2 text-sm"
                    >
                      <span>{converter.icon}</span>
                      <span>{converter.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Help Link */}
            <button
              onClick={() => handleNavigateAndClose('help')}
              className="w-full text-left px-3 py-2 hover:bg-blue-600 rounded transition duration-150 font-medium flex items-center gap-2 bg-blue-600"
            >
              <span>❓</span>
              <span>Help</span>
            </button>
          </nav>
        </div>
      )}

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-30 z-30 top-20"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </header>
  );
}
