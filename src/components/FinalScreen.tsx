import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Sparkles, Mail, Clock, Users } from "lucide-react";

interface FinalScreenProps {
  formData: any;
}

const FinalScreen = ({ formData }: FinalScreenProps) => {
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
              {/* Mensaje de éxito */}
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  ¡Listo! Tu sitio web está en proceso
                </h1>
                
                <p className="text-xl text-slate-300 mb-6 max-w-2xl mx-auto">
                  Con tus respuestas hemos creado el borrador de tu página. En unos minutos recibirás tu <span className="text-blue-300 font-semibold">Super Prompt gratuito</span> y nuestro equipo te contactará para mostrarte tu sitio y afinar detalles.
                </p>
              </div>

              {/* Información de entrega */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center justify-center">
                  <Mail className="w-5 h-5 mr-2 text-blue-400" />
                  Qué recibirás en tu email
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="w-5 h-5 text-blue-400 mr-2" />
                      <span className="text-white font-medium">Inmediato</span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      📧 <strong>Email #1:</strong> Super Prompt para generar contenido para tu marca
                    </p>
                  </div>
                  
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-center mb-2">
                      <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
                      <span className="text-white font-medium">En minutos</span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      🌐 <strong>Email #2:</strong> Tu sitio web personalizado para <strong>{formData.marca}</strong>
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <p className="text-emerald-300 font-medium">
                    📧 Enviado a: {formData.email}
                  </p>
                </div>
              </div>

              {/* Próximos pasos */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center justify-center">
                  <Users className="w-5 h-5 mr-2 text-purple-400" />
                  Próximos pasos
                </h3>
                
                <div className="space-y-3 text-left max-w-md mx-auto">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <p className="text-slate-300">Recibirás tu Super Prompt en tu email para generar contenido</p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <p className="text-slate-300">Te enviaremos el borrador de tu sitio web personalizado</p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <p className="text-slate-300">Nuestro equipo te contactará para afinar detalles y publicar tu sitio</p>
                  </div>
                </div>
              </div>

              {/* Ejemplo visual */}
              <div className="text-center">
                <p className="text-slate-400 text-sm mb-4">Ejemplo de sitio similar al tuyo:</p>
                <div className="relative max-w-md mx-auto">
                  <img
                    src="/ejemplos/emontenegroa.png"
                    alt="Ejemplo de sitio web profesional"
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
            <a href="mailto:esteban@crealoconia.com" className="hover:text-white transition-colors">
              📧 esteban@crealoconia.com
            </a>
            <a href="https://instagram.com/crealocon.ia" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              📱 @crealocon.ia
            </a>
            <span className="hover:text-white transition-colors cursor-pointer">
              🔒 Política de privacidad
            </span>
          </div>
          <div className="mt-4">
            <p className="text-slate-500 text-xs">
              Creado con ❤️ en <a href="https://crealoconia.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">crealoconia.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalScreen;