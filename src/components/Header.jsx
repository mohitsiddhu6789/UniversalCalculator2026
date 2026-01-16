import React from 'react';

export default function Header({ onNavigate }) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo/Title */}
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">💰 Universal</h1>
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
              onClick={() => onNavigate('part-payment')}
              className="hover:text-blue-200 transition font-medium"
            >
              Part Payment
            </button>
           {/* <button
              onClick={() => onNavigate('admin')}
              className="hover:text-blue-200 transition font-medium"
            >
              Admin
            </button>*/}
            <a
              href="#help"
              onClick={(e) => {
                e.preventDefault();
                handleHelpClick();
              }}
              className="hover:text-blue-200 transition font-medium"
            >
              ❓ Help
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white font-bold">☰</button>
        </div>
      </div>
    </header>
  );
}

function handleHelpClick() {
  // Scroll to FAQ section
  const faqSection = document.getElementById('faq');
  if (faqSection) {
    faqSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    // If no FAQ section, show alert
    alert('Help & FAQ section coming soon!');
  }
}
