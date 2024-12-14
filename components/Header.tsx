'use client';

import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900">EV Simulator</span>
          </div>
          
          <div className="flex gap-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('simulator')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Simulator
            </button>
            <button
              onClick={() => scrollToSection('documentation')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Documentation
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
} 