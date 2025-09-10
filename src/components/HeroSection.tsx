import React from 'react';
import TypewriterText from './TypewriterText';
interface HeroSectionProps {
  onLoadExample: () => void;
}
const HeroSection = ({
  onLoadExample
}: HeroSectionProps) => {
  return <div className="text-center mb-16">
      {/* Header con logo y navegación */}
      <div className="flex items-center justify-between mb-12 px-4">
        <div className="flex items-center">
          <img src="/lovable-uploads/d5a1d369-f067-4b34-8454-e4ea330bfa99.png" alt="Crealo con IA" className="w-16 h-16 object-contain hover:scale-105 transition-transform duration-300" />
          <div className="ml-3 text-left">
            
            
          </div>
        </div>
        <div className="hidden md:block">
          
        </div>
      </div>

      {/* Contenido principal - Promesa directa */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4 leading-tight">
          Tu web profesional<br />
          <span className="text-blue-600">lista en 4 horas</span>
        </h1>
        
        <div className="max-w-2xl mx-auto mb-8">
          <p className="text-2xl md:text-3xl text-gray-700 font-bold mb-4">
            Gratis para empezar
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Solo pagas <strong>$197.000 CLP</strong> si decides publicarla
          </p>
        </div>
        
        {/* CTA inmediato - Solo necesitamos 2 datos */}
        <div className="max-w-md mx-auto bg-white border-2 border-blue-200 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Solo necesitamos 2 datos para empezar
          </h3>
        </div>
      </div>
    </div>;
};
export default HeroSection;