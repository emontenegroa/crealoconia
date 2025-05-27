
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Sparkles, Target, Globe, MessageSquare, Clock, Star, Zap } from "lucide-react";

interface HeroSectionProps {
  onLoadExample: () => void;
}

const HeroSection = ({ onLoadExample }: HeroSectionProps) => {
  return (
    <>
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-purple-400 to-blue-400 p-4 rounded-2xl shadow-2xl">
            <Brain className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
          Kit IA de Esteban
        </h1>
        <h2 className="text-2xl md:text-3xl text-white mb-6 font-semibold">
          Transforma tu negocio en 5 minutos con inteligencia artificial
        </h2>
        <p className="text-lg text-purple-100 max-w-4xl mx-auto leading-relaxed mb-6">
          <strong>¿Te has preguntado cómo otros emprendedores generan tanto contenido de calidad?</strong> 
          <br />La respuesta está aquí. Este kit te dará la misma estrategia que usan las marcas más exitosas para crear contenido profesional y conseguir clientes todos los días.
        </p>
        
        {/* Urgency and scarcity elements */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-300/30 backdrop-blur-lg rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-red-300" />
              <h3 className="text-white text-xl font-semibold">⏰ Por tiempo limitado completamente gratis</h3>
            </div>
            <p className="text-red-100 font-medium">
              Normalmente esto te costaría <span className="line-through text-red-300">$500 USD</span> con una agencia de marketing.
              <br />
              <strong className="text-yellow-200">Por tiempo limitado es 100% gratis porque estoy validando esta herramienta.</strong>
            </p>
          </div>
        </div>

        {/* Value proposition */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-white text-xl font-semibold mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              ✅ En menos de 5 minutos recibirás:
            </h3>
            <div className="text-purple-100 text-left space-y-3">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" />
                <p className="font-medium"><span className="text-yellow-200">Estrategia completa de contenido para 15 días</span> - Posts listos para copiar y pegar que generan engagement y ventas</p>
              </div>
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-blue-300 mt-1 flex-shrink-0" />
                <p className="font-medium"><span className="text-yellow-200">Tu asistente de marketing IA personalizado</span> - Un prompt profesional para ChatGPT que te ayudará siempre</p>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-purple-300 mt-1 flex-shrink-0" />
                <p className="font-medium"><span className="text-yellow-200">Página web automática y profesional</span> - Código completo para crear tu sitio en Lovable.dev en 2 minutos</p>
              </div>
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-pink-300 mt-1 flex-shrink-0" />
                <p className="font-medium"><span className="text-yellow-200">Textos persuasivos para todas tus redes</span> - Copys que convierten visitantes en clientes</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20">
              <p className="text-yellow-200 font-medium text-lg">
                🎁 <strong>Valor real: $500 USD</strong> - Tuyo gratis hoy porque quiero que pruebes la calidad de mi trabajo.
              </p>
            </div>
          </div>
        </div>

        {/* Social proof */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="bg-green-500/10 border border-green-300/30 backdrop-blur-lg rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
            </div>
            <p className="text-green-100 font-medium">
              "En 2 días ya tenía mi web funcionando y contenido para todo el mes. ¡Increíble!" - Carolina M., Coach
            </p>
          </div>
        </div>

        <p className="text-purple-300 text-sm">
          Creado por <span className="font-semibold text-purple-200">Esteban Montenegro</span> - Especialista en IA y Marketing Digital
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-8 text-center">
        <Button 
          onClick={onLoadExample}
          variant="outline"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm mb-4"
        >
          <Zap className="w-4 h-4 mr-2" />
          Ver ejemplo completo (recomendado)
        </Button>
        <p className="text-purple-200 text-sm">
          👆 Recomendado: Mira primero el ejemplo para entender la calidad de respuestas que necesitas
        </p>
      </div>
    </>
  );
};

export default HeroSection;
