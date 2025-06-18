
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
          Deja de perder clientes por <span className="inline-block min-h-[1.2em] align-top"><TypewriterText /></span>
        </h1>
        
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-6">
            <span className="text-red-600 font-bold">¿Cuántos clientes has perdido hoy</span> por no tener una web que <span className="text-emerald-600 font-bold">convierta visitantes en ventas?</span>
          </p>
          
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl p-6 inline-block">
            <p className="text-lg font-bold text-emerald-800 mb-2">
              🚀 Tu competencia ya tiene web. Tú puedes tener una mejor.
            </p>
            <p className="text-emerald-700 font-medium">
              10 minutos → Web profesional → Más clientes desde mañana
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
