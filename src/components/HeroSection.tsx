
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
      <div className="bg-gradient-to-br from-blue-50 to-emerald-50 border border-blue-200 rounded-2xl p-8 mb-12 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          🚀 Transforma tu negocio en una máquina de generar contenido
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-emerald-200 rounded-xl p-6">
            <div className="text-emerald-600 text-3xl mb-3">📱</div>
            <h3 className="font-bold text-gray-900 mb-2">Contenido Viral</h3>
            <p className="text-gray-700 text-sm">Posts, reels, stories y series educativas que capturan y convierten</p>
          </div>
          
          <div className="bg-white border border-blue-200 rounded-xl p-6">
            <div className="text-blue-600 text-3xl mb-3">💰</div>
            <h3 className="font-bold text-gray-900 mb-2">Estrategias de Venta</h3>
            <p className="text-gray-700 text-sm">Emails, guiones de venta y embudos que generan ingresos automáticos</p>
          </div>
          
          <div className="bg-white border border-purple-200 rounded-xl p-6">
            <div className="text-purple-600 text-3xl mb-3">🌐</div>
            <h3 className="font-bold text-gray-900 mb-2">Sitio Web Pro</h3>
            <p className="text-gray-700 text-sm">Tu sitio profesional funcionando + propuesta de mejoras personalizadas</p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6">
          <p className="text-yellow-800 font-bold text-lg">
            ⚡ Valor total: +$2,000 USD • Tu inversión hoy: <span className="text-2xl">$0</span>
          </p>
        </div>
      </div>

      {/* CTA urgencia */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-8 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-red-800 mb-4">
          🔥 Tu competencia ya está usando IA para escalar
        </h3>
        <p className="text-red-700 text-lg mb-6">
          Mientras ellos capturan TUS clientes con contenido estratégico y presencia digital profesional, 
          ¿vas a seguir esperando o empezarás HOY?
        </p>
        <Button 
          onClick={onLoadExample}
          className="bg-red-600 hover:bg-red-700 text-white text-lg py-6 px-8 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          ⚡ Ver ejemplo del formulario
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
