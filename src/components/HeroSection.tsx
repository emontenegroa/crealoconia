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
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight text-center">
          🧠 Tu Kit IA personalizado<br />
          para <span className="inline-block min-h-[1.2em] align-top"><TypewriterText /></span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
          <strong>10 preguntas.</strong> <strong>Tu asistente IA personal.</strong> <strong>Tu sitio web funcionando.</strong>
          <br />
          Todo automatizado para que tengas presencia digital profesional sin complicaciones.
        </p>
      </div>

      {/* Propuesta de valor principal */}
      

      {/* CTA urgencia */}
      
    </div>;
};
export default HeroSection;