import React, { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { LoanProvider } from './context/LoanContext';
import Header from './components/Header';
import './App.css';
import Home from './pages/Home';
import PartPaymentCalculator from './pages/PartPaymentCalculator';
import Admin from './pages/Admin';
import Help from './pages/Help';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [latestEmiData, setLatestEmiData] = useState(null);

  // Initialize page from URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    
    if (page && ['home', 'part-payment', 'admin', 'help'].includes(page)) {
      console.log('Setting page from URL:', page);
      setCurrentPage(page);
    } else {
      // Check hash-based routing as fallback
      const hash = window.location.hash.slice(1);
      if (hash && ['home', 'part-payment', 'admin', 'help'].includes(hash)) {
        console.log('Setting page from hash:', hash);
        setCurrentPage(hash);
      }
    }
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

  return (
    <HelmetProvider>
      <LoanProvider>
        <div className="min-h-screen">
          {/* Header with latest EMI data */}
          <Header onNavigate={handleNavigate} latestEmiData={latestEmiData} />

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
                  🏠 Calculator
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
                  onClick={() => handleNavigate('help')}
                  className={`text-lg font-bold px-6 py-2 rounded-lg transition duration-200 ${
                    currentPage === 'help'
                      ? 'bg-green-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  ❓ Help
                </button>
                {/* Admin button is hidden as per the change request */}
                {/* <button
                  onClick={() => handleNavigate('admin')}
                  className={`text-lg font-bold px-6 py-2 rounded-lg transition duration-200 ${
                    currentPage === 'admin'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  📊 Admin
                </button> */}
              </div>
            </div>
          </nav>

          {/* Page Content */}
          <div>
            {currentPage === 'home' && <Home onNavigate={handleNavigate} onEmiCalculated={setLatestEmiData} />}
            {currentPage === 'part-payment' && <PartPaymentCalculator onNavigate={handleNavigate} latestEmiData={latestEmiData} />}
            {currentPage === 'help' && <Help onNavigate={handleNavigate} />}
            {currentPage === 'admin' && <Admin onNavigate={handleNavigate} />}
          </div>
        </div>
      </LoanProvider>
    </HelmetProvider>
  );
}
