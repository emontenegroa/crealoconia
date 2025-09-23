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
          Genera tu sitio web listo para vender<br />
          <span className="text-blue-600">en menos de 4 horas</span>
        </h1>
        
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-6">
            Responde 10 preguntas y recibe tu <span className="text-blue-600 font-bold">super prompt de IA optimizado</span> y tu <span className="text-emerald-600 font-bold">página web profesional funcionando</span>
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-xl p-6 mb-6">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-2">1</div>
                <h3 className="font-bold text-blue-800 mb-1">Completas 10 preguntas</h3>
                <p className="text-blue-700 text-sm">5 minutos máximo</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-2">2</div>
                <h3 className="font-bold text-emerald-800 mb-1">Recibes tu Super Prompt IA</h3>
                <p className="text-emerald-700 text-sm">Email inmediato</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-2">3</div>
                <h3 className="font-bold text-purple-800 mb-1">Tu sitio web listo</h3>
                <p className="text-purple-700 text-sm">Máximo 4 horas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default HeroSection;