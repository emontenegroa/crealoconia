import React from 'react';
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, Target, Globe, MessageSquare, Clock, Star, Zap, TrendingUp, Heart } from "lucide-react";
interface HeroSectionProps {
  onLoadExample: () => void;
}
const HeroSection = ({
  onLoadExample
}: HeroSectionProps) => {
  return <>
      {/* Header optimizado */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-purple-400 to-blue-400 p-4 rounded-2xl shadow-2xl">
            <Brain className="w-12 h-12 text-white" />
          </div>
        </div>
        
        {/* Hook emocional más fuerte */}
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
          Kit IA de Esteban
        </h1>
        <h2 className="text-2xl md:text-4xl text-white mb-6 font-bold">
          🚀 Tu negocio digital en 5 minutos
        </h2>
        
        {/* Hook emocional conectando con el dolor real */}
        <p className="text-lg md:text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed mb-6 font-medium">
          <strong className="text-red-300">¿Estás perdiendo clientes porque no tienes presencia digital profesional?</strong> 
          <br />
          <span className="text-yellow-200">¡Se acabó!</span> Este kit gratuito te da exactamente lo que usan las marcas exitosas para generar clientes todos los días.
          <br />
          <span className="text-green-200">✨ Sin conocimientos técnicos. Sin complicaciones. Sin excusas.</span>
        </p>
        
        {/* Urgencia mejorada */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-300/40 backdrop-blur-lg rounded-xl p-4 mb-4">
            <p className="text-orange-200 font-bold text-lg flex items-center justify-center gap-2">
              ⏰ <strong>Disponible solo para algunas personas</strong>
            </p>
            <p className="text-red-200 text-sm mt-1">asi que te pido </p>
          </div>
        </div>
        
        {/* Valor que reciben - más específico */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-300/30 backdrop-blur-lg rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-green-300" />
              <h3 className="text-white text-xl font-bold">💚 Completamente GRATIS</h3>
            </div>
            <p className="text-green-100 font-medium text-center">
              Valor real de este kit: <span className="text-yellow-200 text-lg font-bold">$197 USD</span>
              <br />
              <strong className="text-green-200">Tu precio hoy: $0 - Solo completa el formulario</strong>
            </p>
          </div>
        </div>

        {/* Beneficios específicos mejorados */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-white text-xl font-bold mb-6 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              ✅ Recibes en tu email en los próximos 5 minutos:
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg border border-green-300/30">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-6 h-6 text-green-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-yellow-200 font-bold mb-1">15 posts virales probados</h4>
                    <p className="text-green-100 text-sm">+ 30 stories + 5 reels que generan ventas reales para Instagram</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-lg border border-blue-300/30">
                <div className="flex items-start gap-3">
                  <Brain className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-yellow-200 font-bold mb-1">Tu asistente de marketing 24/7</h4>
                    <p className="text-blue-100 text-sm">Especialista IA que crea contenido ilimitado para tu negocio</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg border border-purple-300/30">
                <div className="flex items-start gap-3">
                  <Globe className="w-6 h-6 text-purple-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-yellow-200 font-bold mb-1">Tu web profesional automática</h4>
                    <p className="text-purple-100 text-sm">Código completo listo para usar y generar tu sitio profesional en minutos con IA</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-pink-500/20 to-rose-500/20 p-4 rounded-lg border border-pink-300/30">
                <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-pink-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-yellow-200 font-bold mb-1">Textos que venden por ti</h4>
                    <p className="text-pink-100 text-sm">Copy persuasivo para bio, posts y todas tus redes sociales</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/20 text-center">
              <p className="text-yellow-200 font-bold text-lg">
                📧 <strong>Todo llega a tu email automáticamente</strong>
              </p>
              <p className="text-green-300 text-sm mt-2">
                ⚡ Listo para usar inmediatamente - Sin esperas, sin complicaciones
              </p>
            </div>
          </div>
        </div>

        {/* Credibilidad personal */}
        <p className="text-purple-300 text-sm mb-8">
          Creado por <span className="font-semibold text-purple-200">Esteban Montenegro</span> - Especialista en IA y Marketing Digital
        </p>
      </div>

      {/* CTA para ver ejemplo */}
      
    </>;
};
export default HeroSection;