'use client';

import dynamic from 'next/dynamic';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import Documentation from '../components/Documentation';

const SimulatorForm = dynamic(() => import('../components/SimulatorForm'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

export default function Home() {
  const scrollToSimulator = () => {
    const element = document.getElementById('simulator');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-24">
          <div className="animate-pulse-slow absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl md:text-7xl mb-8">
                EV Charging Station
                <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"> Simulator</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Plan and optimize your EV charging infrastructure with advanced simulation and real-time analytics
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  onClick={scrollToSimulator}
                  className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                >
                  Start Simulation
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section id="features" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Multiple Charging Points
                </h3>
                <p className="text-gray-600">
                  Configure different types of charging points (11kW, 22kW, 50kW) with varying quantities
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Real-time Analytics
                </h3>
                <p className="text-gray-600">
                  Monitor power consumption, peak demands, and charging events with interactive charts
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Usage Patterns
                </h3>
                <p className="text-gray-600">
                  Analyze charging patterns and optimize your infrastructure based on usage data
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Simulator Section */}
        <section id="simulator" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Configure Your Simulation
            </h2>
            <SimulatorForm />
          </div>
        </section>

        {/* Documentation Section */}
        <section id="documentation" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Documentation
            </h2>
            <Documentation />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 