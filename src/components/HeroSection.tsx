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

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Tu web profesional<br />
          <span className="text-blue-600">lista en 48 horas</span>
        </h1>
        
        <div className="max-w-3xl mx-auto mb-8">
          <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-6">
            <span className="text-blue-600 font-bold">Completa el formulario</span> y recibe una propuesta 100% funcional de tu sitio web <span className="text-emerald-600 font-bold">sin compromiso</span>
          </p>
          <p className="text-lg text-gray-600 mb-4">
            ✅ Solo pagas si decides publicarlo: <strong>$197.000 CLP</strong>
          </p>
        </div>
      </div>
    </div>;
};
export default HeroSection;