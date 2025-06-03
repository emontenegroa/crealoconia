
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Sparkles, ArrowLeft, Mail, Phone, CheckCircle, Clock, Globe, Zap } from "lucide-react";

interface FormData {
  marca: string;
  quien_eres: string;
  problemas: string;
  preguntas_frecuentes: string;
  estilo: string;
  producto: string;
  email: string;
  whatsapp: string;
  website: string;
  instagram: string;
}

interface ResultsDisplayProps {
  formData: FormData;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ formData, onReset }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
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
            ✅ ¡Perfecto! Tu Kit IA está procesado
          </h2>
          <Button onClick={onReset} variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Generar otro Kit IA
          </Button>
        </div>

        <Card className="max-w-4xl mx-auto bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-white flex items-center justify-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-300" />
              Tu Kit IA personalizado está listo
            </CardTitle>
            <p className="text-purple-200 mt-4">
              Hemos procesado tus respuestas para <strong>{formData.marca}</strong> y ya está todo en marcha
            </p>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="text-center text-white space-y-6">
              
              {/* Paso 1: Email inmediato */}
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-300/30 backdrop-blur-lg rounded-xl p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-green-300" />
                  <h3 className="text-xl font-bold text-green-200">📧 Paso 1: Kit IA enviado</h3>
                </div>
                <p className="text-green-100 text-lg mb-4">
                  En los próximos minutos recibirás un email en <strong>{formData.email}</strong> con:
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-left">
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                      <span className="font-semibold text-yellow-200">15 días contenido</span>
                    </div>
                    <p className="text-sm text-yellow-100">Posts, stories y reels listos</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-5 h-5 text-purple-300" />
                      <span className="font-semibold text-purple-200">Asistente IA</span>
                    </div>
                    <p className="text-sm text-purple-100">Tu prompt personalizado</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-5 h-5 text-blue-300" />
                      <span className="font-semibold text-blue-200">Textos web</span>
                    </div>
                    <p className="text-sm text-blue-100">Copy completo listo</p>
                  </div>
                </div>
              </div>

              {/* Paso 2: Sitio web en producción */}
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-300/30 backdrop-blur-lg rounded-xl p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-blue-300 animate-pulse" />
                  <h3 className="text-xl font-bold text-blue-200">🌐 Paso 2: Tu sitio web en producción</h3>
                </div>
                <div className="text-blue-100 space-y-3">
                  <p className="text-lg font-semibold">
                    Nuestro equipo ya está creando tu sitio web profesional personalizado.
                  </p>
                  <p className="text-base">
                    <strong>En las próximas 24-48 horas recibirás:</strong>
                  </p>
                  <div className="bg-white/10 rounded-lg p-4 text-left space-y-2 text-sm">
                    <p>🌐 La URL de tu sitio web funcionando</p>
                    <p>👀 Acceso para revisar todos los textos y diseño</p>
                    <p>🎨 Oportunidad de solicitar ajustes y personalizaciones</p>
                    <p>📱 Sitio responsive optimizado para móviles</p>
                  </div>
                </div>
              </div>

              {/* Diferenciador clave */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 backdrop-blur-lg rounded-xl p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-purple-300" />
                  <h3 className="text-xl font-bold text-purple-200">⚡ ¿Por qué es diferente?</h3>
                </div>
                <div className="text-purple-100 space-y-3 text-left">
                  <p>• <strong>No es una plantilla:</strong> Tu sitio se crea específicamente para {formData.marca}</p>
                  <p>• <strong>Contenido real:</strong> Basado en tus respuestas y tu mercado específico</p>
                  <p>• <strong>Funcional desde día 1:</strong> Listo para atraer y convertir clientes</p>
                  <p>• <strong>Optimizado para conversión:</strong> Cada elemento pensado para generar resultados</p>
                </div>
              </div>

              {/* Siguientes pasos */}
              <div className="bg-white/5 border border-white/20 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">🎯 Mientras tanto, puedes:</h3>
                <div className="space-y-2 text-white/90 text-left">
                  <p>📧 Revisar tu Kit IA que llegará a tu email</p>
                  <p>📱 Empezar a usar el contenido en tus redes sociales</p>
                  <p>🤖 Probar tu asistente IA personalizado en ChatGPT</p>
                  <p>⏳ Estar atento al email con la URL de tu sitio web</p>
                </div>
              </div>

              {/* CTA de contacto mejorado */}
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-300/30 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">💬 ¿Preguntas sobre tu Kit IA o sitio web?</h3>
                <p className="text-white/80 mb-6">Estoy aquí para ayudarte a sacar el máximo provecho de tu nueva presencia digital.</p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <a 
                    href={`mailto:esteban.montenegro@gmail.com?subject=Consulta sobre mi Kit IA - ${formData.marca}`} 
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-300 flex items-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Escribir por Email
                  </a>
                  <a 
                    href={`https://wa.me/56945487423?text=Hola%20Esteban,%20completé%20el%20Kit%20IA%20para%20${encodeURIComponent(formData.marca)}%20y%20tengo%20algunas%20preguntas`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-300 flex items-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    WhatsApp directo
                  </a>
                </div>
              </div>

              <div className="text-center">
                <p className="text-white/60 text-sm">
                  <strong className="text-purple-300">Kit IA + Sitio Web personalizado</strong> - El combo completo para tu presencia digital
                </p>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultsDisplay;
