
import React from 'react';
import { Button } from "@/components/ui/button";
import TypewriterText from './TypewriterText';

interface HeroSectionProps {
  onLoadExample: () => void;
}

const HeroSection = ({ onLoadExample }: HeroSectionProps) => {
  return (
    <div className="text-center mb-16">
      <div className="mb-12">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
          🧠 Tu <span className="text-blue-600">Kit IA</span> personalizado
          <br />
          para crear tu sitio web
        </h1>
        <TypewriterText />
      </div>

      {/* Proceso simplificado */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-12 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-3">
            <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-lg">1</span>
            </div>
            <p className="text-gray-900 font-semibold text-lg">10 preguntas</p>
            <p className="text-gray-600">Sobre tu marca</p>
          </div>
          <div className="space-y-3">
            <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-lg">2</span>
            </div>
            <p className="text-gray-900 font-semibold text-lg">Kit IA al instante</p>
            <p className="text-gray-600">En tu email</p>
          </div>
          <div className="space-y-3">
            <div className="bg-purple-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-lg">3</span>
            </div>
            <p className="text-gray-900 font-semibold text-lg">Web lista</p>
            <p className="text-gray-600">95% terminada</p>
          </div>
        </div>
      </div>

      {/* Botón de ejemplo */}
      <div className="mb-12">
        <Button
          onClick={onLoadExample}
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-50 mb-4 px-6 py-3"
        >
          📝 Ver ejemplo del formulario
        </Button>
        <p className="text-gray-500 text-sm">
          Prueba con datos de ejemplo
        </p>
      </div>

      {/* CTA principal */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 max-w-xl mx-auto">
        <p className="text-blue-600 font-bold text-xl mb-3">
          🎁 Gratis
        </p>
        <p className="text-gray-700 text-lg">
          Sin agencias. Sin plantillas. Tu web única.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
