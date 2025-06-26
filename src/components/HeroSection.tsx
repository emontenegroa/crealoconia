
import React from 'react';
import TypewriterText from './TypewriterText';

interface HeroSectionProps {
  onLoadExample: () => void;
}

const HeroSection = ({ onLoadExample }: HeroSectionProps) => {
  return (
    <div className="text-center mb-16">
      {/* Header con logo y navegación */}
      <div className="flex items-center justify-between mb-12 px-4">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/d5a1d369-f067-4b34-8454-e4ea330bfa99.png" 
            alt="Crealo con IA" 
            className="w-16 h-16 object-contain hover:scale-105 transition-transform duration-300"
          />
          <div className="ml-3 text-left">
            <h2 className="text-lg font-bold text-gray-900 leading-tight">Créalo con IA</h2>
            <p className="text-sm text-gray-600">Web profesional en minutos</p>
          </div>
        </div>
        <div className="hidden md:block">
          <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
            ✨ 100% Gratis
          </span>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Crea tu web profesional<br />
          en minutos para
        </h1>
        
        <div className="text-4xl md:text-6xl font-bold text-blue-600 mb-8 h-20 flex items-center justify-center">
          <TypewriterText />
        </div>
        
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-6">
            <span className="text-blue-600 font-bold">Estás haciendo algo valioso.</span> Es hora de mostrarlo con <span className="text-emerald-600 font-bold">claridad, confianza y presencia profesional.</span><br />
            Tu web no puede seguir siendo un pendiente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
