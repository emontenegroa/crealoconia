import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight, Clock, CheckCircle, Star } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>
      
      {/* Gradientes sutiles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header con logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-2xl tracking-tight">Crealoconia</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-md border border-white/20">
            <CardContent className="p-8 text-center">
              {/* Mensaje principal */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  ¡Crea tu página web profesional en minutos!
                </h1>
                <p className="text-xl text-slate-300 mb-6 max-w-2xl mx-auto">
                  Responde estas 10 preguntas y tendrás un sitio <span className="text-blue-300 font-semibold">claro, simple y listo</span> para mostrar tu negocio.
                </p>
              </div>

              {/* Características destacadas */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-medium">Solo 10 minutos</span>
                  <span className="text-slate-400 text-sm">Proceso rápido y simple</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-medium">100% Profesional</span>
                  <span className="text-slate-400 text-sm">Diseño moderno y funcional</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-medium">Con IA</span>
                  <span className="text-slate-400 text-sm">Tecnología inteligente</span>
                </div>
              </div>

              {/* Testimonio breve */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 italic mb-3">
                  "En pocos días teníamos una web de alto nivel, moderna, funcional y con todo lo que necesitábamos para operar como agencia."
                </p>
                <p className="text-blue-300 font-medium">- Marketéate Lab, Agencia de Marketing 360</p>
              </div>

              {/* CTA Principal */}
              <Button 
                onClick={onStart}
                size="lg"
                className="h-16 px-12 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <Sparkles className="w-6 h-6 mr-3" />
                Comenzar ahora
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>

              {/* Ejemplo visual */}
              <div className="mt-8 text-center">
                <p className="text-slate-400 text-sm mb-4">Ejemplo de sitio creado con Crealoconia:</p>
                <div className="relative max-w-md mx-auto">
                  <img
                    src="/ejemplos/emontenegroa.png"
                    alt="Ejemplo de sitio web creado con Crealoconia"
                    className="w-full rounded-lg shadow-xl border border-white/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-slate-400 text-sm">
            <a href="mailto:somos@crealoconia.com" className="hover:text-white transition-colors">
              📧 somos@crealoconia.com
            </a>
            <a href="https://instagram.com/crealocon.ia" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              📱 @crealocon.ia
            </a>
            <span className="hover:text-white transition-colors cursor-pointer">
              🔒 Política de privacidad
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;