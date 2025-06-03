
import React from 'react';
import { Button } from "@/components/ui/button";
import TypewriterText from './TypewriterText';
interface HeroSectionProps {
  onLoadExample: () => void;
}
const HeroSection = ({
  onLoadExample
}: HeroSectionProps) => {
  return <div className="text-center mb-20">
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
          🧠 Tu Kit IA personalizado<br />
          para <TypewriterText />
        </h1>
      </div>

      {/* Botón de ejemplo */}
      

      {/* CTA principal actualizado */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 max-w-xl mx-auto">
        <p className="text-emerald-600 font-bold text-xl mb-3">
          🎁 Genera tu Kit IA sin costo
        </p>
        <p className="text-gray-700 text-lg">
          Definimos tu contenido, estructura y base de tu web profesional.
          Luego podrás decidir si deseas publicarla y personalizarla.
        </p>
      </div>
    </div>;
};
export default HeroSection;
