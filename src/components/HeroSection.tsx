
import React from 'react';
import { Button } from "@/components/ui/button";
import TypewriterText from './TypewriterText';

interface HeroSectionProps {
  onLoadExample: () => void;
}

const HeroSection = ({ onLoadExample }: HeroSectionProps) => {
  return (
    <div className="text-center mb-20">
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
          🧠 Tu Kit IA personalizado<br />
          para <TypewriterText />
        </h1>
      </div>

      {/* Botón de ejemplo */}
      <div className="mb-16">
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

      {/* CTA principal simplificado */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 max-w-xl mx-auto">
        <p className="text-emerald-600 font-bold text-xl mb-3">
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
