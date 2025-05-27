
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Sparkles, Target, Globe, MessageSquare, Clock, Star, Zap, TrendingUp, Heart } from "lucide-react";

interface HeroSectionProps {
  onLoadExample: () => void;
  onGetStarted: () => void;
}

const HeroSection = ({ onLoadExample, onGetStarted }: HeroSectionProps) => {
  return (
    <>
      {/* Header optimizado para Instagram */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-purple-400 to-blue-400 p-4 rounded-2xl shadow-2xl">
            <Brain className="w-12 h-12 text-white" />
          </div>
        </div>
        
        {/* Hook inmediato */}
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
          Kit IA de Esteban
        </h1>
        <h2 className="text-2xl md:text-4xl text-white mb-6 font-bold">
          🚀 Tu negocio digital en 5 minutos
        </h2>
        
        {/* Promesa clara */}
        <p className="text-lg md:text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed mb-6 font-medium">
          <strong className="text-yellow-200">¿Vienes de Instagram y necesitas contenido + web YA?</strong> 
          <br />
          Este kit te da exactamente lo que usan las marcas exitosas para generar clientes todos los días.
          <br />
          <span className="text-green-200">✨ Sin conocimientos técnicos. Sin complicaciones.</span>
        </p>
        
        {/* Urgency mejorada */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-300/30 backdrop-blur-lg rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-red-300 animate-pulse" />
              <h3 className="text-white text-xl font-bold">🔥 Precio de lanzamiento limitado</h3>
            </div>
            <p className="text-red-100 font-medium text-center">
              Valor real con una agencia: <span className="line-through text-red-300">$1,500+ USD</span>
              <br />
              <strong className="text-yellow-200 text-lg">Tu precio de lanzamiento: $197 USD</strong>
            </p>
          </div>
        </div>

        {/* Beneficios visuales para móvil */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-white text-xl font-bold mb-6 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              ✅ Recibes inmediatamente:
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg border border-green-300/30">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-6 h-6 text-green-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-yellow-200 font-bold mb-1">15 días de contenido listo</h4>
                    <p className="text-green-100 text-sm">Posts estratégicos para Instagram que generan ventas reales</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-lg border border-blue-300/30">
                <div className="flex items-start gap-3">
                  <Brain className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-yellow-200 font-bold mb-1">Tu asistente IA 24/7</h4>
                    <p className="text-blue-100 text-sm">Prompt de ChatGPT que te ayuda siempre con marketing</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg border border-purple-300/30">
                <div className="flex items-start gap-3">
                  <Globe className="w-6 h-6 text-purple-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-yellow-200 font-bold mb-1">Web profesional en 2 min</h4>
                    <p className="text-purple-100 text-sm">Código completo para Lovable - tu sitio listo ya</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-pink-500/20 to-rose-500/20 p-4 rounded-lg border border-pink-300/30">
                <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-pink-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-yellow-200 font-bold mb-1">Copy que convierte</h4>
                    <p className="text-pink-100 text-sm">Textos persuasivos para todas tus redes sociales</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/20 text-center">
              <p className="text-yellow-200 font-bold text-lg">
                🎁 <strong>Solo $197 USD</strong> por tiempo limitado
              </p>
            </div>
          </div>
        </div>

        {/* CTA principal */}
        <div className="max-w-2xl mx-auto mb-6">
          <Button 
            onClick={onGetStarted}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xl px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transform transition-all duration-200 mb-4"
          >
            🧠 Obtener Kit IA por $197
          </Button>
          <p className="text-green-200 text-sm">
            💚 Garantía de reembolso 30 días
          </p>
        </div>

        {/* Credibilidad personal */}
        <p className="text-purple-300 text-sm mb-8">
          Creado por <span className="font-semibold text-purple-200">Esteban Montenegro</span> - Especialista en IA y Marketing Digital
        </p>
      </div>

      {/* CTA para ver ejemplo */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <Button 
          onClick={onLoadExample}
          variant="outline"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm mb-4 text-lg px-8 py-3"
        >
          <Zap className="w-5 h-5 mr-2" />
          👀 Ver ejemplo completo (recomendado)
        </Button>
        <p className="text-purple-200 text-sm">
          <strong>👆 IMPORTANTE:</strong> Mira el ejemplo para entender la calidad que recibirás
          <br />
          <span className="text-green-200">💡 Te ayudará a llenar mejor el formulario</span>
        </p>
      </div>
    </>
  );
};

export default HeroSection;
