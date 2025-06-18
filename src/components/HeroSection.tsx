
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
          Crea tu web profesional<br/>
          en minutos para
        </h1>
        
        <div className="text-4xl md:text-6xl font-bold text-blue-600 mb-8 h-20 flex items-center justify-center">
          <TypewriterText />
        </div>
        
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-6">
            <span className="text-blue-600 font-bold">Estás haciendo algo valioso.</span> Es hora de mostrarlo con <span className="text-emerald-600 font-bold">claridad, confianza y presencia profesional.</span><br/>
            Tu web no puede seguir siendo un pendiente.
          </p>
          
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 inline-block mb-4">
            <p className="text-lg font-bold text-red-800 mb-2">
              🚨 ¿Qué pasa si Instagram te suspende la cuenta mañana?
            </p>
            <p className="text-red-700 font-medium">
              Tu negocio desaparece. Todos tus seguidores, perdidos. Tu reputación, en el aire.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-xl p-6 inline-block">
            <p className="text-lg font-bold text-blue-800 mb-2">
              ✅ Con tu propia web: TÚ tienes el control total
            </p>
            <p className="text-blue-700 font-medium">
              Credibilidad profesional → Clientes que te toman en serio → Ventas automáticas 24/7
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
