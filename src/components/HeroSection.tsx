
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
          Crea tu web profesional<br/>en minutos
        </h1>
        
        <div className="text-2xl md:text-4xl font-bold text-blue-600 mb-8 h-16 flex items-center justify-center">
          <TypewriterText />
        </div>
        
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-6">
            <span className="text-blue-600 font-bold">Solo 10 preguntas.</span> Una web que <span className="text-emerald-600 font-bold">trabaja por ti las 24 horas</span> atrayendo clientes ideales.
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-xl p-6 inline-block">
            <p className="text-lg font-bold text-blue-800 mb-2">
              ⚡ Sin diseñadores, sin programadores, sin dolores de cabeza
            </p>
            <p className="text-blue-700 font-medium">
              Respondes → Recibes tu web → Empiezas a vender hoy mismo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
