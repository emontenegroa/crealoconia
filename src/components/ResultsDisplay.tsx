
import React, { useEffect } from 'react';
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
  useEffect(() => {
    // Scroll to top when results are displayed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white" id="results-section">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-xl">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hazlo con IA
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-800 mb-6 font-semibold">
            ✅ Tu sitio ya está en proceso
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
              🎯 Estamos creando la primera versión de tu sitio web profesional
            </CardTitle>
            <p className="text-gray-700 mt-4">
              Tu información para <strong>{formData.marca}</strong> fue recibida correctamente y el trabajo ya comenzó.
            </p>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="text-gray-900 space-y-8">
              
              {/* Paso 1: Contenido enviado */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-xl font-bold text-emerald-800">📧 Paso 1: Contenido enviado a tu email</h3>
                </div>
                <p className="text-emerald-800 text-lg mb-4 text-center">
                  En pocos minutos recibirás en <strong>{formData.email}</strong>:
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-left">
                  <div className="bg-white border border-emerald-200 p-4 rounded-lg">
                    <span className="font-semibold text-emerald-800">✅ Textos base para tu sitio web</span>
                  </div>
                  <div className="bg-white border border-emerald-200 p-4 rounded-lg">
                    <span className="font-semibold text-blue-800">✅ 15 días de contenido para tus redes</span>
                  </div>
                  <div className="bg-white border border-emerald-200 p-4 rounded-lg">
                    <span className="font-semibold text-teal-800">✅ Tu asistente IA personalizado</span>
                  </div>
                </div>
              </div>

              {/* Paso 2: Sitio web en proceso */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-blue-600 animate-pulse" />
                  <h3 className="text-xl font-bold text-blue-800">🌐 Paso 2: Generando tu sitio web</h3>
                </div>
                <div className="text-blue-800 space-y-3 text-center">
                  <p className="text-lg font-semibold">
                    Estamos construyendo la primera versión de tu sitio web.
                  </p>
                  <p className="text-base">
                    <strong>Normalmente está listo en minutos, máximo 4 horas.</strong>
                  </p>
                  <div className="bg-white border border-blue-200 rounded-lg p-4 text-left space-y-2 text-sm">
                    <p>🌐 URL de tu sitio web para revisión</p>
                    <p>📱 Optimizado para móviles y escritorio</p>
                    <p>🎯 Estructura lista para captar clientes</p>
                  </div>
                </div>
              </div>

              {/* Diferenciador */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-gray-600" />
                  <h3 className="text-xl font-bold text-gray-800">⚡ ¿Qué hace diferente este proceso?</h3>
                </div>
                <div className="text-gray-700 space-y-2 text-left">
                  <p>• <strong>🚫 Sin plantillas genéricas:</strong> específico para {formData.marca}</p>
                  <p>• <strong>🚫 Sin escribir desde cero:</strong> todo creado en base a tus respuestas</p>
                  <p>• <strong>🚫 Sin complicaciones técnicas:</strong> solo revisas y validas</p>
                  <p>• <strong>🗓️ Puedes agendar ajustes finales si lo deseas</strong></p>
                </div>
              </div>

              {/* Mientras tanto */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">🎯 Mientras esperamos:</h3>
                <div className="space-y-2 text-gray-700 text-left">
                  <p>✅ Revisa el contenido que recibiste por email</p>
                  <p>✅ Empieza a usar el contenido en tus redes</p>
                  <p>✅ Prueba tu asistente IA en ChatGPT</p>
                  <p>📬 Te avisaremos cuando tu sitio esté listo</p>
                </div>
              </div>

              {/* Contacto */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">💬 ¿Necesitas ayuda?</h3>
                <p className="text-gray-700 mb-6 text-center">Estamos aquí para acompañarte.</p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <a 
                    href={`mailto:esteban.montenegro@gmail.com?subject=Consulta sobre mi sitio web - ${formData.marca}`} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-300 flex items-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    👉 Escríbenos por Email
                  </a>
                  <a 
                    href={`https://wa.me/56945487423?text=Hola%20Esteban,%20completé%20el%20formulario%20para%20${encodeURIComponent(formData.marca)}%20y%20tengo%20consultas`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-300 flex items-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    👉 WhatsApp directo
                  </a>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  <strong className="text-blue-600">Hazlo con IA</strong> — Tu presencia digital sin complicaciones.
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
