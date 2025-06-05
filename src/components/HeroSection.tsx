
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
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8 max-w-4xl mx-auto mb-12">
        <p className="text-blue-600 font-bold text-2xl mb-4">
          🎁 Recibes GRATIS al completar el formulario:
        </p>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="bg-white border border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-blue-800 text-lg mb-3 flex items-center gap-2">
              🤖 Tu Asistente IA Personal
            </h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Genera contenido viral para redes sociales</li>
              <li>• Crea emails de venta persuasivos</li>
              <li>• Desarrolla estrategias de marketing</li>
              <li>• Responde objeciones de clientes</li>
              <li>• <strong>Contenido ilimitado y personalizado</strong></li>
            </ul>
          </div>
          <div className="bg-white border border-purple-200 rounded-xl p-6">
            <h3 className="font-bold text-purple-800 text-lg mb-3 flex items-center gap-2">
              🌐 Tu Sitio Web Profesional
            </h3>
            <ul className="text-gray-700 space-y-2">
              <li>• URL funcionando lista para promocionar</li>
              <li>• Optimizado para atraer clientes</li>
              <li>• Textos de ventas ya escritos</li>
              <li>• Diseño responsive profesional</li>
              <li>• <strong>Listo en 24-48 horas máximo</strong></li>
            </ul>
          </div>
        </div>
        <div className="mt-6 bg-emerald-100 border border-emerald-300 rounded-lg p-4">
          <p className="text-emerald-800 font-semibold text-lg">
            💰 Valor real: $2,500 USD - <span className="text-emerald-600">Tuyo GRATIS</span>
          </p>
          <p className="text-emerald-700 text-sm mt-1">
            Solo necesitas 5 minutos para completar 10 preguntas estratégicas
          </p>
        </div>
      </div>

      {/* CTA urgencia */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-2xl mx-auto">
        <p className="text-red-700 font-bold text-lg mb-2">
          ⏰ No posterges más tu presencia digital
        </p>
        <p className="text-red-600">
          Cada día sin sitio web profesional y contenido estratégico es una oportunidad de negocio perdida
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
