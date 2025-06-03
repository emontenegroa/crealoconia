
import React from 'react';
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, Target, Globe, MessageSquare, Clock, Star, Zap, TrendingUp, Heart } from "lucide-react";

interface HeroSectionProps {
  onLoadExample: () => void;
}

const HeroSection = ({ onLoadExample }: HeroSectionProps) => {
  return (
    <>
      {/* Header optimizado */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-purple-400 to-blue-400 p-4 rounded-2xl shadow-2xl">
            <Brain className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
          Kit IA de Esteban
        </h1>
        <h2 className="text-2xl md:text-4xl text-white mb-6 font-bold">
          🚀 Tu sitio web profesional sin el estrés de crearlo
        </h2>
        
        {/* Problema real que resolvemos */}
        <p className="text-lg md:text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed mb-6 font-medium">
          <strong className="text-red-300">¿Cansado de buscar entre miles de plantillas, escribir textos y lidiar con la tecnología?</strong> 
          <br />
          <span className="text-yellow-200">¡Se acabó el estrés!</span> Solo respondes unas preguntas y nosotros creamos tu sitio web completo.
          <br />
          <span className="text-green-200">✨ Sin plantillas genéricas. Sin tecnicismos. Sin contratar agencias.</span>
        </p>
        
        {/* Valor central */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-300/30 backdrop-blur-lg rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-green-300" />
              <h3 className="text-white text-xl font-bold">💚 Resolvemos tu dolor principal</h3>
            </div>
            <p className="text-green-100 font-medium text-center">
              <strong className="text-green-200">De 10 preguntas a sitio web funcionando</strong>
              <br />
              <span className="text-yellow-200">95% terminado automáticamente + reunión para dejarlo 100% operativo</span>
            </p>
          </div>
        </div>

        {/* Lo que recibes paso a paso */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-white text-xl font-bold mb-6 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              ✅ Esto es lo que recibes (sin complicaciones):
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 text-left mb-6">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg border border-green-300/30">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-6 h-6 text-green-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-yellow-200 font-bold mb-1">📧 1. Kit IA inmediato</h4>
                    <p className="text-green-100 text-sm">Contenido para redes + copy persuasivo listo para usar</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-lg border border-blue-300/30">
                <div className="flex items-start gap-3">
                  <Brain className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-yellow-200 font-bold mb-1">🤖 2. Asistente IA personal</h4>
                    <p className="text-blue-100 text-sm">Para seguir creando contenido ilimitado</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg border border-purple-300/30">
                <div className="flex items-start gap-3">
                  <Globe className="w-6 h-6 text-purple-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-yellow-200 font-bold mb-1">🌐 3. Tu sitio web funcionando</h4>
                    <p className="text-purple-100 text-sm">URL real que podrás revisar antes de publicar</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-pink-500/20 to-rose-500/20 p-4 rounded-lg border border-pink-300/30">
                <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-pink-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-yellow-200 font-bold mb-1">🎯 4. Reunión de ajustes</h4>
                    <p className="text-pink-100 text-sm">Para dejar tu sitio 100% operativo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Proceso simplificado */}
            <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-300/30 rounded-lg p-4">
              <h4 className="text-indigo-200 font-bold mb-3 text-center">📋 Sin estrés, sin complicaciones:</h4>
              <div className="space-y-2 text-indigo-100 text-sm">
                <p><strong>Paso 1:</strong> Respondes 10 preguntas (5 minutos) ⏱️</p>
                <p><strong>Paso 2:</strong> Recibes tu Kit IA por email (inmediato) 📧</p>
                <p><strong>Paso 3:</strong> Te enviamos la URL de tu sitio web (24-48h) 🌐</p>
                <p><strong>Paso 4:</strong> Reunión para dejarlo operativo (opcional) 🎨</p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/20 text-center">
              <p className="text-yellow-200 font-bold text-lg">
                🎯 <strong>Todo pensado específicamente para tu negocio</strong>
              </p>
              <p className="text-green-300 text-sm mt-2">
                ⚡ No buscas plantillas. No escribes textos. No subes nada.
              </p>
            </div>
          </div>
        </div>

        {/* Credibilidad */}
        <p className="text-purple-300 text-sm mb-8">
          Creado por <span className="font-semibold text-purple-200">Esteban Montenegro</span> - Especialista en automatización con IA
        </p>
      </div>
    </>
  );
};

export default HeroSection;
