
import React from 'react';
import { Button } from "@/components/ui/button";
import TypewriterText from './TypewriterText';

interface HeroSectionProps {
  onLoadExample: () => void;
}

const HeroSection = ({ onLoadExample }: HeroSectionProps) => {
  return (
    <div className="text-center mb-12">
      <div className="mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          🧠 Tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Kit IA</span> personalizado
          <br />
          para crear tu sitio web
        </h1>
        <TypewriterText />
      </div>

      {/* Proceso simplificado */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-300/30 backdrop-blur-lg rounded-xl p-6 mb-8 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="bg-blue-500/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">1</span>
            </div>
            <p className="text-blue-200 font-semibold">10 preguntas</p>
            <p className="text-blue-300 text-sm">Sobre tu marca</p>
          </div>
          <div className="space-y-2">
            <div className="bg-purple-500/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">2</span>
            </div>
            <p className="text-purple-200 font-semibold">Kit IA al instante</p>
            <p className="text-purple-300 text-sm">En tu email</p>
          </div>
          <div className="space-y-2">
            <div className="bg-green-500/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">3</span>
            </div>
            <p className="text-green-200 font-semibold">Web lista</p>
            <p className="text-green-300 text-sm">95% terminada</p>
          </div>
        </div>
      </div>

      {/* Botón de ejemplo */}
      <div className="mb-8">
        <Button
          onClick={onLoadExample}
          variant="outline"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 mb-4"
        >
          📝 Ver ejemplo del formulario
        </Button>
        <p className="text-purple-300 text-sm">
          Prueba con datos de ejemplo
        </p>
      </div>

      {/* CTA principal */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-300/30 backdrop-blur-lg rounded-xl p-6 max-w-xl mx-auto">
        <p className="text-yellow-200 font-bold text-lg mb-2">
          🎁 Gratis
        </p>
        <p className="text-orange-200">
          Sin agencias. Sin plantillas. Tu web única.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
