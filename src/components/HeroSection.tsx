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
          🌐 Tu web lista para <span className="inline-block min-h-[1.2em] align-top"><TypewriterText /></span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
          <strong>10 preguntas.</strong> <strong>Tu sitio web funcionando.</strong> <strong>Si te gusta, lo mejoramos y publicamos.</strong>
          <br />
          La forma más rápida y profesional de tener presencia digital que convierte.
        </p>
      </div>

      {/* Propuesta de valor principal */}
      <div className="bg-gradient-to-br from-blue-50 to-emerald-50 border border-blue-200 rounded-2xl p-8 mb-12 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          🚀 De cero a sitio web profesional en minutos
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-emerald-200 rounded-xl p-6">
            <div className="text-emerald-600 text-3xl mb-3">⚡</div>
            <h3 className="font-bold text-gray-900 mb-2">Generación Instantánea</h3>
            <p className="text-gray-700 text-sm">Tu sitio web personalizado y profesional listo para revisar en minutos</p>
          </div>
          
          <div className="bg-white border border-blue-200 rounded-xl p-6">
            <div className="text-blue-600 text-3xl mb-3">✨</div>
            <h3 className="font-bold text-gray-900 mb-2">100% Personalizado</h3>
            <p className="text-gray-700 text-sm">No usamos plantillas. Cada sitio es único según tu negocio y objetivos</p>
          </div>
          
          <div className="bg-white border border-purple-200 rounded-xl p-6">
            <div className="text-purple-600 text-3xl mb-3">💰</div>
            <h3 className="font-bold text-gray-900 mb-2">Diseñado para Vender</h3>
            <p className="text-gray-700 text-sm">Optimizado para encantar a tus clientes desde el primer día</p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6">
          <p className="text-yellow-800 font-bold text-lg">
            🎁 Bonus incluido: Super Prompt IA para generar contenido ilimitado
          </p>
        </div>
      </div>

      {/* CTA urgencia */}
      
    </div>;
};
export default HeroSection;