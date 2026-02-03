import React, { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { LoanProvider } from './context/LoanContext';
import Header from './components/Header';
import { upsertUser } from './services/supabaseApi';
import './App.css';
import Home from './pages/Home';
import PartPaymentCalculator from './pages/PartPaymentCalculator';
import SWPCalculator from './pages/SWPCalculator';
import ScientificCalculator from './pages/ScientificCalculator';
import UnitConverter from './pages/UnitConverter';
import TemperatureConverter from './pages/TemperatureConverter';
import Admin from './pages/Admin';
import Help from './pages/Help';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [latestEmiData, setLatestEmiData] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isMobileApp, setIsMobileApp] = useState(false);
  const [showPartPaymentEmailModal, setShowPartPaymentEmailModal] = useState(false);
  const [partPaymentEmail, setPartPaymentEmail] = useState('');
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
  const [changeEmail, setChangeEmail] = useState('');
  const [pendingNavigation, setPendingNavigation] = useState(null);

  // Initialize from session storage on mount
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }

    // Check URL for target page
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    if (page && ['home', 'part-payment', 'swp', 'scientific', 'units', 'temperature', 'admin', 'help'].includes(page)) {
      setCurrentPage(page);
    }

    // Detect if running in Capacitor mobile app
    const detectMobileApp = async () => {
      try {
        // Check if we're in a Capacitor app
        if (window.cordova || window.capacitor) {
          setIsMobileApp(true);
          return;
        }
        
        // Check user agent for mobile app indicators
        const userAgent = navigator.userAgent;
        if (userAgent.includes('Capacitor') || userAgent.includes('Android') && !userAgent.includes('Chrome')) {
          setIsMobileApp(true);
          return;
        }
      } catch (error) {
        // Not in a Capacitor app, continue as web version
        setIsMobileApp(false);
      }
    };

    detectMobileApp();
  }, []);

  const handleNavigate = (page, data = null) => {
    // Store latest EMI data if provided
    if (data) {
      setLatestEmiData(data);
    }

    // Update URL
    window.history.pushState({ page }, '', `?page=${page}`);

    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handlePartPaymentFromNav = () => {
    if (!latestEmiData) {
      alert('❌ Please calculate EMI first before proceeding to Part Payment Calculator');
      return;
    }
    
    // If email already exists, go directly to part payment
    if (userEmail) {
      handleNavigate('part-payment');
      return;
    }
    
    // Show email modal
    setPartPaymentEmail(userEmail || '');
    setShowPartPaymentEmailModal(true);
    setPendingNavigation('part-payment');
  };

  const handleChangeEmailClick = () => {
    setChangeEmail(userEmail || '');
    setShowChangeEmailModal(true);
  };

  return (
    <HelmetProvider>
      <LoanProvider>
        <div className="min-h-screen">
          {/* Header with user email and mobile menu - Always show for menu access */}
          <Header onNavigate={handleNavigate} latestEmiData={latestEmiData} userEmail={userEmail} onPartPaymentClick={handlePartPaymentFromNav} onChangeEmail={handleChangeEmailClick} />

          {/* Navigation Bar - Hidden in mobile app */}
          {!isMobileApp && (
            <nav className="sticky top-11 z-40 bg-slate-900 border-b-2 border-blue-600 shadow-lg">
              <div className="container mx-auto px-4 py-0.5">
                <div className="flex items-center justify-between gap-1.5 flex-wrap">
                  <button
                    onClick={() => handleNavigate('home')}
                    className={`text-sm font-bold px-3 py-1 rounded-lg transition duration-200 ${
                      currentPage === 'home'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    🏠 EMI Calculator
                  </button>
                  <button
                    onClick={handlePartPaymentFromNav}
                    className={`text-sm font-bold px-3 py-1 rounded-lg transition duration-200 ${
                      currentPage === 'part-payment'
                        ? 'bg-orange-600 text-white'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    💰 Part Payment
                  </button>
                  <button
                    onClick={() => handleNavigate('swp')}
                    className={`text-sm font-bold px-3 py-1 rounded-lg transition duration-200 ${
                      currentPage === 'swp'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    📊 SWP
                  </button>
                  <button
                    onClick={() => handleNavigate('scientific')}
                    className={`text-sm font-bold px-3 py-1 rounded-lg transition duration-200 ${
                      currentPage === 'scientific'
                        ? 'bg-cyan-600 text-white'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    🧮 Scientific
                  </button>
                  <button
                    onClick={() => handleNavigate('units')}
                    className={`text-sm font-bold px-3 py-1 rounded-lg transition duration-200 ${
                      currentPage === 'units'
                        ? 'bg-green-600 text-white'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    📏 Units
                  </button>
                  <button
                    onClick={() => handleNavigate('temperature')}
                    className={`text-sm font-bold px-3 py-1 rounded-lg transition duration-200 ${
                      currentPage === 'temperature'
                        ? 'bg-red-600 text-white'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    🌡️ Temp
                  </button>
                  <button
                    onClick={() => handleNavigate('help')}
                    className={`text-sm font-bold px-3 py-1 rounded-lg transition duration-200 ${
                      currentPage === 'help'
                        ? 'bg-purple-600 text-white'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    ❓ Help
                  </button>
                </div>
              </div>
            </nav>
          )}

          {/* Page Content */}
          <div>
            {currentPage === 'home' && <Home onNavigate={handleNavigate} onEmiCalculated={setLatestEmiData} userEmail={userEmail} latestEmiData={latestEmiData} />}
            {currentPage === 'part-payment' && <PartPaymentCalculator onNavigate={handleNavigate} latestEmiData={latestEmiData} />}
            {currentPage === 'swp' && <SWPCalculator onNavigate={handleNavigate} />}
            {currentPage === 'scientific' && <ScientificCalculator onNavigate={handleNavigate} />}
            {currentPage === 'units' && <UnitConverter onNavigate={handleNavigate} />}
            {currentPage === 'temperature' && <TemperatureConverter onNavigate={handleNavigate} />}
            {currentPage === 'help' && <Help onNavigate={handleNavigate} />}
            {currentPage === 'admin' && <Admin onNavigate={handleNavigate} />}
          </div>

          {/* Part Payment Email Modal (from Header navigation) */}
          {showPartPaymentEmailModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📧 Email Address Required</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Please provide your email address to proceed to the Part Payment Calculator.
                </p>
                
                <input
                  type="email"
                  value={partPaymentEmail}
                  onChange={(e) => setPartPaymentEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 mb-4"
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowPartPaymentEmailModal(false);
                      handleNavigate('home');
                    }}
                    className="flex-1 px-4 py-2 bg-slate-300 hover:bg-slate-400 text-slate-900 font-bold rounded-lg transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      if (!partPaymentEmail || !partPaymentEmail.trim()) {
                        alert('❌ Please enter an email address');
                        return;
                      }
                      
                      try {
                        const emailToSave = partPaymentEmail.toLowerCase();
                        await upsertUser({
                          email: emailToSave,
                          fullName: 'User',
                          phone: null,
                          isAdmin: false,
                        });
                        
                        // Update userEmail state and sessionStorage
                        setUserEmail(emailToSave);
                        sessionStorage.setItem('userEmail', emailToSave);
                        
                        setShowPartPaymentEmailModal(false);
                        handleNavigate('part-payment');
                      } catch (error) {
                        console.error('Error saving email:', error);
                        alert('❌ Error: Could not save email. Please try again.');
                      }
                    }}
                    className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition duration-200"
                  >
                    Go to Part Payment
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Change Email Modal */}
          {showChangeEmailModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full">
                <h3 className="text-lg font-bold text-slate-900 mb-4">🔄 Change Email Address</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Enter your new email address.
                </p>
                
                <input
                  type="email"
                  value={changeEmail}
                  onChange={(e) => setChangeEmail(e.target.value)}
                  placeholder="Enter your new email"
                  className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 mb-4"
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowChangeEmailModal(false);
                    }}
                    className="flex-1 px-4 py-2 bg-slate-300 hover:bg-slate-400 text-slate-900 font-bold rounded-lg transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      if (!changeEmail || !changeEmail.trim()) {
                        alert('❌ Please enter an email address');
                        return;
                      }
                      
                      try {
                        const emailToSave = changeEmail.toLowerCase();
                        await upsertUser({
                          email: emailToSave,
                          fullName: 'User',
                          phone: null,
                          isAdmin: false,
                        });
                        
                        // Update userEmail state and sessionStorage
                        setUserEmail(emailToSave);
                        sessionStorage.setItem('userEmail', emailToSave);
                        
                        setShowChangeEmailModal(false);
                      } catch (error) {
                        console.error('Error saving email:', error);
                        alert('❌ Error: Could not save email. Please try again.');
                      }
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200"
                  >
                    Update Email
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </LoanProvider>
    </HelmetProvider>
  );
}
