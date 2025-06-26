
import React from 'react';
import TypewriterText from './TypewriterText';

interface HeroSectionProps {
  onLoadExample: () => void;
}

const HeroSection = ({ onLoadExample }: HeroSectionProps) => {
  return (
    <div className="text-center mb-16 relative">
      {/* Logo sutil en la esquina superior derecha */}
      <div className="absolute top-0 right-0 opacity-30 hover:opacity-60 transition-opacity duration-300">
        <img 
          src="/lovable-uploads/d5a1d369-f067-4b34-8454-e4ea330bfa99.png" 
          alt="Crealo con IA" 
          className="w-20 h-20 object-contain"
        />
      </div>

      <div className="mb-12">
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
