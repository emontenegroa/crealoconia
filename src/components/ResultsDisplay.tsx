
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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-xl">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kit IA de Esteban
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-800 mb-6 font-semibold">
            ✅ ¡Perfecto! Ya estamos creando tu sitio web
          </h2>
          <Button onClick={onReset} variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Crear otro sitio web
          </Button>
        </div>

        <Card className="max-w-4xl mx-auto bg-white border-gray-200 shadow-xl">
          <CardHeader className="text-center pb-6 bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-2xl text-gray-900 flex items-center justify-center gap-3">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
              Tu sitio web está en proceso de creación
            </CardTitle>
            <p className="text-gray-700 mt-4">
              Procesamos tus respuestas para <strong>{formData.marca}</strong> y el trabajo ya comenzó
            </p>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="text-gray-900 space-y-6">
              
              {/* Paso 1: Kit IA inmediato */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-xl font-bold text-emerald-800">📧 Paso 1: Kit IA enviado a tu email</h3>
                </div>
                <p className="text-emerald-800 text-lg mb-4 text-center">
                  En minutos recibirás en <strong>{formData.email}</strong>:
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-left">
                  <div className="bg-white border border-emerald-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      <span className="font-semibold text-emerald-800">Contenido para redes</span>
                    </div>
                    <p className="text-sm text-emerald-700">Posts, stories y reels listos</p>
                  </div>
                  <div className="bg-white border border-emerald-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">Asistente IA personal</span>
                    </div>
                    <p className="text-sm text-blue-700">Para contenido ilimitado</p>
                  </div>
                  <div className="bg-white border border-emerald-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-5 h-5 text-teal-600" />
                      <span className="font-semibold text-teal-800">Textos del sitio</span>
                    </div>
                    <p className="text-sm text-teal-700">Copy completo generado</p>
                  </div>
                </div>
              </div>

              {/* Paso 2: Sitio web en creación */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-blue-600 animate-pulse" />
                  <h3 className="text-xl font-bold text-blue-800">🌐 Paso 2: Creando tu sitio web (95% automatizado)</h3>
                </div>
                <div className="text-blue-800 space-y-3">
                  <p className="text-lg font-semibold text-center">
                    Nuestro sistema ya está generando tu sitio web personalizado.
                  </p>
                  <p className="text-base text-center">
                    <strong>Dentro de máximo 4 horas recibirás:</strong>
                  </p>
                  <div className="bg-white border border-blue-200 rounded-lg p-4 text-left space-y-2 text-sm">
                    <p>🌐 URL de tu sitio web funcionando</p>
                    <p>👀 Acceso para revisar todo el contenido</p>
                    <p>📱 Sitio optimizado para móviles y escritorio</p>
                    <p>🎯 Listo para recibir clientes</p>
                  </div>
                </div>
              </div>

              {/* Diferenciador */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-gray-600" />
                  <h3 className="text-xl font-bold text-gray-800">⚡ Sin estrés, sin complicaciones</h3>
                </div>
                <div className="text-gray-700 space-y-3 text-left">
                  <p>• <strong>Sin buscar plantillas:</strong> Tu sitio se crea específicamente para {formData.marca}</p>
                  <p>• <strong>Sin escribir textos:</strong> Todo el copy se genera automáticamente</p>
                  <p>• <strong>Sin tecnología:</strong> Solo revisas y apruebas el resultado</p>
                  <p>• <strong>Reunión opcional:</strong> Para ajustes finales si los necesitas</p>
                </div>
              </div>

              {/* Mientras tanto */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">🎯 Mientras esperás tu sitio web:</h3>
                <div className="space-y-2 text-gray-700 text-left">
                  <p>📧 Revisa tu Kit IA en el email</p>
                  <p>📱 Empieza a usar el contenido en redes sociales</p>
                  <p>🤖 Prueba tu asistente IA en ChatGPT</p>
                  <p>⏳ Estate atento al email con la URL de tu sitio</p>
                </div>
              </div>

              {/* Contacto */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">💬 ¿Preguntas sobre el proceso?</h3>
                <p className="text-gray-700 mb-6 text-center">Estoy aquí para asegurarme de que tengas la mejor experiencia.</p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <a 
                    href={`mailto:esteban.montenegro@gmail.com?subject=Consulta sobre mi sitio web - ${formData.marca}`} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-300 flex items-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Escribir por Email
                  </a>
                  <a 
                    href={`https://wa.me/56945487423?text=Hola%20Esteban,%20completé%20el%20formulario%20para%20${encodeURIComponent(formData.marca)}%20y%20tengo%20consultas`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-300 flex items-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    WhatsApp directo
                  </a>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  <strong className="text-blue-600">Kit IA + Sitio Web</strong> - Tu presencia digital sin complicaciones
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
