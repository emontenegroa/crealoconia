
import React from 'react';
import TypewriterText from './TypewriterText';

interface HeroSectionProps {
  onLoadExample: () => void;
}

const HeroSection = ({
  onLoadExample
}: HeroSectionProps) => {
  return (
    <div className="text-center mb-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Tu web lista en <span className="inline-block min-h-[1.2em] align-top"><TypewriterText /></span>
        </h1>
        
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-6">
            <span className="text-blue-600">Responde 10 preguntas.</span> <span className="text-emerald-600">Recibe tu sitio web funcionando.</span>
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-xl p-6 inline-block">
            <p className="text-lg font-bold text-blue-800 mb-2">
              ⚡ Sin programar. Sin diseñar. Sin complicaciones.
            </p>
            <p className="text-blue-700">
              Solo respondes → Nosotros creamos → Tú publicas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
