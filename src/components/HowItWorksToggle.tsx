
import React, { useState } from 'react';
import HowItWorks from './HowItWorks';
import BehindTheScenes from './BehindTheScenes';

const HowItWorksToggle = () => {
  const [activeSection, setActiveSection] = useState<'how-it-works' | 'behind-scenes'>('how-it-works');

  return (
    <div className="max-w-3xl mx-auto mb-20">
      {/* Botones de alternancia */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-full p-1 flex">
          <button
            onClick={() => setActiveSection('how-it-works')}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
              activeSection === 'how-it-works'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Cómo funciona
          </button>
          <button
            onClick={() => setActiveSection('behind-scenes')}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
              activeSection === 'behind-scenes'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Cómo lo hacemos
          </button>
        </div>
      </div>

      {/* Contenido que cambia */}
      <div className="transition-all duration-300 ease-in-out">
        {activeSection === 'how-it-works' ? (
          <HowItWorks />
        ) : (
          <BehindTheScenes />
        )}
      </div>
    </div>
  );
};

export default HowItWorksToggle;
