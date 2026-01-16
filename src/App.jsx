import React, { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import Home from './pages/Home';
import PartPaymentCalculator from './pages/PartPaymentCalculator';
import Admin from './pages/Admin';
import Help from './pages/Help';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-slate-900 border-b-2 border-blue-600 shadow-lg">
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
                onClick={() => handleNavigate('part-payment')}
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
             {/* <button
                onClick={() => handleNavigate('admin')}
                className={`text-lg font-bold px-6 py-2 rounded-lg transition duration-200 ${
                  currentPage === 'admin'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                📊 Admin
              </button>*/}
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div>
          {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
          {currentPage === 'part-payment' && <PartPaymentCalculator onNavigate={handleNavigate} />}
          {currentPage === 'help' && <Help onNavigate={handleNavigate} />}
          {currentPage === 'admin' && <Admin onNavigate={handleNavigate} />}
        </div>
      </div>
    </HelmetProvider>
  );
}
