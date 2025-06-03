
import React from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Clock } from "lucide-react";

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
        <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-4xl mx-auto leading-relaxed">
          <strong>Contesta 10 preguntas y recibe:</strong>
          <br />
          ✅ Kit IA con contenido listo para usar
          <br />
          🌐 Tu sitio web creado automáticamente
        </p>
      </div>

      {/* Proceso simplificado */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-300/30 backdrop-blur-lg rounded-xl p-6 mb-8 max-w-4xl mx-auto">
        <h3 className="text-white text-xl font-bold mb-4">
          🎯 Proceso ultra-simple:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="bg-blue-500/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">1</span>
            </div>
            <p className="text-blue-200 font-semibold">Respondes 10 preguntas</p>
            <p className="text-blue-300 text-sm">Sobre tu marca y negocio</p>
          </div>
          <div className="space-y-2">
            <div className="bg-purple-500/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">2</span>
            </div>
            <p className="text-purple-200 font-semibold">Recibes tu Kit IA</p>
            <p className="text-purple-300 text-sm">Al instante en tu email</p>
          </div>
          <div className="space-y-2">
            <div className="bg-green-500/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">3</span>
            </div>
            <p className="text-green-200 font-semibold">Tu sitio web listo</p>
            <p className="text-green-300 text-sm">95% terminado automáticamente</p>
          </div>
        </div>
      </div>

      {/* Beneficios principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-300/30 backdrop-blur-lg rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-green-400" />
            <span className="text-white font-semibold">Sin perder tiempo</span>
          </div>
          <p className="text-green-200 text-sm">No busques plantillas ni escribas textos</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 backdrop-blur-lg rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-white font-semibold">Sin estrés técnico</span>
          </div>
          <p className="text-purple-200 text-sm">No lidies con tecnología complicada</p>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-300/30 backdrop-blur-lg rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-semibold">Sin agencias</span>
          </div>
          <p className="text-yellow-200 text-sm">Proceso directo y personal</p>
        </div>
      </div>

      {/* Botón de ejemplo */}
      <div className="mb-8">
        <Button
          onClick={onLoadExample}
          variant="outline"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 mb-4"
        >
          📝 Ver ejemplo completo del formulario
        </Button>
        <p className="text-purple-300 text-sm">
          Carga datos de ejemplo para ver cómo funciona
        </p>
      </div>

      {/* CTA principal */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-300/30 backdrop-blur-lg rounded-xl p-6 max-w-2xl mx-auto">
        <p className="text-yellow-200 font-bold text-lg mb-2">
          🎁 Empieza ahora y obtén tu sitio web funcionando
        </p>
        <p className="text-orange-200">
          Solo 10 preguntas te separan de tener tu presencia digital completa
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
