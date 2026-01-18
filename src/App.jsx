import React, { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { LoanProvider } from './context/LoanContext';
import Header from './components/Header';
import EmailCapture from './pages/EmailCapture';
import './App.css';
import Home from './pages/Home';
import PartPaymentCalculator from './pages/PartPaymentCalculator';
import SWPCalculator from './pages/SWPCalculator';
import ScientificCalculator from './pages/ScientificCalculator';
import UnitConverter from './pages/UnitConverter';
import TemperatureConverter from './pages/TemperatureConverter';
import Admin from './pages/Admin';
import Help from './pages/Help';
import { upsertUser } from './services/supabaseApi';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [latestEmiData, setLatestEmiData] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isEmailCaptured, setIsEmailCaptured] = useState(false);
  const [targetPage, setTargetPage] = useState(null);

  // Initialize from session storage on mount
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
      setIsEmailCaptured(true);

      // Check URL for target page
      const urlParams = new URLSearchParams(window.location.search);
      const page = urlParams.get('page');
      if (page && ['home', 'part-payment', 'swp', 'scientific', 'units', 'temperature', 'admin', 'help'].includes(page)) {
        setCurrentPage(page);
      }
    }
  }, []);

  const handleEmailSubmit = async (email) => {
    try {
      // Save to database
      await upsertUser({
        email: email.toLowerCase(),
        fullName: 'User',
        phone: null,
        isAdmin: false,
      });

      // Save to session storage
      sessionStorage.setItem('userEmail', email.toLowerCase());
      setUserEmail(email.toLowerCase());
      setIsEmailCaptured(true);

      // Navigate to target page or home
      const urlParams = new URLSearchParams(window.location.search);
      const targetPageFromUrl = urlParams.get('page');
      
      if (targetPageFromUrl && ['home', 'part-payment', 'swp', 'scientific', 'units', 'temperature', 'admin', 'help'].includes(targetPageFromUrl)) {
        setCurrentPage(targetPageFromUrl);
      } else {
        setCurrentPage('home');
      }
    } catch (error) {
      console.error('Error saving email:', error);
      throw error;
    }
  };

  const handleNavigate = (page, data = null) => {
    // Check if email is captured
    if (!isEmailCaptured && page !== 'home') {
      setTargetPage(page);
      // Email capture will be shown instead
      return;
    }

    // Store latest EMI data if provided
    if (data) {
      setLatestEmiData(data);
    }

    // Update URL
    window.history.pushState({ page }, '', `?page=${page}`);

    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Show email capture page if not captured
  if (!isEmailCaptured) {
    return (
      <HelmetProvider>
        <EmailCapture onEmailSubmit={handleEmailSubmit} />
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <LoanProvider>
        <div className="min-h-screen">
          {/* Header with user email */}
          <Header onNavigate={handleNavigate} latestEmiData={latestEmiData} userEmail={userEmail} />

          {/* Navigation Bar */}
          <nav className="sticky top-14 z-40 bg-slate-900 border-b-2 border-blue-600 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <button
                  onClick={() => handleNavigate('home')}
                  className={`text-lg font-bold px-6 py-2 rounded-lg transition duration-200 ${
                    currentPage === 'home'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  🏠 EMI Calculator
                </button>
                <button
                  onClick={() => {
                    if (!latestEmiData) {
                      alert('❌ Please calculate EMI first before proceeding to Part Payment Calculator');
                      return;
                    }
                    handleNavigate('part-payment');
                  }}
                  className={`text-lg font-bold px-6 py-2 rounded-lg transition duration-200 ${
                    currentPage === 'part-payment'
                      ? 'bg-orange-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  💰 Part Payment
                </button>
                <button
                  onClick={() => handleNavigate('swp')}
                  className={`text-lg font-bold px-6 py-2 rounded-lg transition duration-200 ${
                    currentPage === 'swp'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  📊 SWP
                </button>
                <button
                  onClick={() => handleNavigate('scientific')}
                  className={`text-lg font-bold px-6 py-2 rounded-lg transition duration-200 ${
                    currentPage === 'scientific'
                      ? 'bg-cyan-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  🧮 Scientific
                </button>
                <button
                  onClick={() => handleNavigate('units')}
                  className={`text-lg font-bold px-6 py-2 rounded-lg transition duration-200 ${
                    currentPage === 'units'
                      ? 'bg-green-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  📏 Units
                </button>
                <button
                  onClick={() => handleNavigate('temperature')}
                  className={`text-lg font-bold px-6 py-2 rounded-lg transition duration-200 ${
                    currentPage === 'temperature'
                      ? 'bg-red-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  🌡️ Temp
                </button>
                <button
                  onClick={() => handleNavigate('help')}
                  className={`text-lg font-bold px-6 py-2 rounded-lg transition duration-200 ${
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

          {/* Page Content */}
          <div>
            {currentPage === 'home' && <Home onNavigate={handleNavigate} onEmiCalculated={setLatestEmiData} userEmail={userEmail} />}
            {currentPage === 'part-payment' && <PartPaymentCalculator onNavigate={handleNavigate} latestEmiData={latestEmiData} />}
            {currentPage === 'swp' && <SWPCalculator onNavigate={handleNavigate} />}
            {currentPage === 'scientific' && <ScientificCalculator onNavigate={handleNavigate} />}
            {currentPage === 'units' && <UnitConverter onNavigate={handleNavigate} />}
            {currentPage === 'temperature' && <TemperatureConverter onNavigate={handleNavigate} />}
            {currentPage === 'help' && <Help onNavigate={handleNavigate} />}
            {currentPage === 'admin' && <Admin onNavigate={handleNavigate} />}
          </div>
        </div>
      </LoanProvider>
    </HelmetProvider>
  );
}
