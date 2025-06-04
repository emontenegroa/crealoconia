
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
            Hazlo con IA
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-800 mb-6 font-semibold">
            ✅ Hazlo con IA — Tu sitio ya está en proceso
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
            <div className="text-gray-900 space-y-6">
              
              {/* Paso 1: Kit IA inmediato */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-xl font-bold text-emerald-800">📧 Paso 1: Kit IA enviado a tu email</h3>
                </div>
                <p className="text-emerald-800 text-lg mb-4 text-center">
                  En pocos minutos recibirás en <strong>{formData.email}</strong>:
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-left">
                  <div className="bg-white border border-emerald-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      <span className="font-semibold text-emerald-800">✅ Textos base para tu sitio web</span>
                    </div>
                  </div>
                  <div className="bg-white border border-emerald-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">✅ 15 días de contenido inicial para tus redes (posts, stories y reels)</span>
                    </div>
                  </div>
                  <div className="bg-white border border-emerald-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-5 h-5 text-teal-600" />
                      <span className="font-semibold text-teal-800">✅ Tu asistente IA personalizado para seguir creando contenido en ChatGPT</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Separador */}
              <div className="border-b border-gray-200 w-32 mx-auto"></div>

              {/* Paso 2: Sitio web en creación */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-blue-600 animate-pulse" />
                  <h3 className="text-xl font-bold text-blue-800">🌐 Paso 2: Generando tu sitio web (proceso automatizado)</h3>
                </div>
                <div className="text-blue-800 space-y-3">
                  <p className="text-lg font-semibold text-center">
                    Nuestro sistema ya está construyendo la primera versión estructurada de tu sitio web.
                  </p>
                  <p className="text-base text-center">
                    <strong>Normalmente lo tenemos listo en minutos, aunque en algunos casos puede demorar hasta un máximo de 4 horas.</strong>
                  </p>
                  <p className="text-base text-center">
                    <strong>Cuando el sitio esté listo, recibirás:</strong>
                  </p>
                  <div className="bg-white border border-blue-200 rounded-lg p-4 text-left space-y-2 text-sm">
                    <p>🌐 URL de tu sitio web profesional para revisión</p>
                    <p>👀 Acceso completo a todo el contenido generado</p>
                    <p>📱 Sitio optimizado para dispositivos móviles y escritorio</p>
                    <p>🎯 Estructura lista para empezar a captar clientes</p>
                  </div>
                </div>
              </div>

              {/* Separador */}
              <div className="border-b border-gray-200 w-32 mx-auto"></div>

              {/* Diferenciador */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-gray-600" />
                  <h3 className="text-xl font-bold text-gray-800">⚡ ¿Qué hace diferente este proceso?</h3>
                </div>
                <div className="text-gray-700 space-y-3 text-left">
                  <p>• <strong>🚫 Sin buscar plantillas genéricas:</strong> el sitio se genera específicamente para {formData.marca}</p>
                  <p>• <strong>🚫 Sin escribir textos desde cero:</strong> el copy completo es creado en base a tus respuestas</p>
                  <p>• <strong>🚫 Sin enredos técnicos:</strong> tú solo revisas y validas el resultado</p>
                  <p>• <strong>🗓️ Podrás agendar una reunión opcional para realizar ajustes finales, si lo deseas.</strong></p>
                </div>
              </div>

              {/* Separador */}
              <div className="border-b border-gray-200 w-32 mx-auto"></div>

              {/* Mientras tanto */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">🎯 Mientras esperamos el sitio:</h3>
                <div className="space-y-2 text-gray-700 text-left">
                  <p>✅ Revisa el Kit IA que ya recibiste en tu email</p>
                  <p>✅ Empieza a utilizar el contenido generado en tus redes sociales</p>
                  <p>✅ Prueba tu asistente IA en ChatGPT para seguir creando publicaciones</p>
                  <p>📬 Te avisaremos por email apenas la URL de tu sitio esté disponible</p>
                </div>
              </div>

              {/* Separador */}
              <div className="border-b border-gray-200 w-32 mx-auto"></div>

              {/* Contacto */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">💬 ¿Dudas o necesitas asistencia?</h3>
                <p className="text-gray-700 mb-6 text-center">Estamos aquí para acompañarte en todo el proceso.</p>
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

              {/* Separador */}
              <div className="border-b border-gray-200 w-32 mx-auto"></div>

              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  <strong className="text-blue-600">Hazlo con IA</strong> — Tu presencia digital profesional sin complicaciones.
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
