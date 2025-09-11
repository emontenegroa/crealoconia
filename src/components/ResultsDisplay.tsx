import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ArrowLeft, Mail, Phone, CheckCircle, Clock, Globe, Gift, Sparkles, Trophy, Zap } from "lucide-react";
import confetti from 'canvas-confetti';
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
const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  formData,
  onReset
}) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    const triggerMegaConfetti = () => {
      // Multiple confetti bursts for celebration
      const colors = ['#3B82F6', '#7C3AED', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4'];

      // First burst - center
      confetti({
        particleCount: 150,
        spread: 70,
        origin: {
          y: 0.6
        },
        colors: colors
      });

      // Second burst - left
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 60,
          origin: {
            x: 0.2,
            y: 0.7
          },
          colors: colors
        });
      }, 300);

      // Third burst - right
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 60,
          origin: {
            x: 0.8,
            y: 0.7
          },
          colors: colors
        });
      }, 600);

      // Final golden shower
      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 100,
          origin: {
            y: 0.5
          },
          colors: ['#FFD700', '#FFA500', '#FF6347']
        });
      }, 1000);
    };
    triggerMegaConfetti();

    // Repeat celebration after 3 seconds
    setTimeout(triggerMegaConfetti, 3000);
  }, []);
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
      <div className="container mx-auto px-4 py-12">
        
        {/* Celebration Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            🎉 ¡Felicitaciones!
          </h1>
          
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-800 mb-8">
            <p className="font-medium">
              Acabas de dar el paso hacia tu web fácil, rápida y profesional.
            </p>
            
            <p>
              Nuestra IA ya está trabajando en tu sitio.<br />
              En pocos minutos recibirás un diseño moderno, funcional y listo para mostrar quién eres.
            </p>
            
            <p className="font-medium">
              Una web pensada para trabajar por ti 24/7 y ayudarte a conseguir clientes sin perder tiempo.
            </p>
          </div>

          <Button onClick={onReset} variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Crear otro Kit IA
          </Button>
        </div>

        {/* Main Content */}
        <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur shadow-lg border border-gray-200">
          <CardContent className="p-8">
            <div className="space-y-10">
              
              {/* Email Section */}
              <div className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  📧 Revisa tu bandeja de entrada
                </h2>
                <div className="space-y-3 text-gray-800">
                  <p>Ahí encontrarás las instrucciones importantes para el siguiente paso.</p>
                  <p>Ese correo te dirá cómo revisar tu web y cómo avanzar en la publicación si decides hacerlo.</p>
                  <p className="font-semibold">👉 Es fundamental que lo leas para no perder tu proyecto.</p>
                </div>
              </div>

              {/* Important Section */}
              <div className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  🎯 Importante
                </h2>
                <div className="space-y-3 text-gray-800">
                  <p>En Crealoconia no generamos sitios para todos los formularios.</p>
                  <p>Seleccionamos algunos proyectos y les creamos una propuesta 100% funcional, lista para revisar y evaluar sin compromiso.</p>
                  <p className="font-semibold">👉 Si tu sitio te convence y quieres publicarlo, avanzaremos con una sesión de ajuste y actualización para dejarlo afinado a tus necesidades y publicarlo en tu propio dominio.</p>
                </div>
              </div>

              {/* Bonus Section */}
              <div className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  🎁 Bonus de regalo
                </h2>
                <div className="space-y-3 text-gray-800">
                  <p>Además de tu web, recibirás un Super Prompt exclusivo para ChatGPT.</p>
                  <p>Con él podrás crear:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Contenido para redes sociales</li>
                    <li>Emails de captación y venta</li>
                    <li>Textos de alta conversión para tu negocio</li>
                  </ul>
                  <p>Este bonus llegará también a tu correo junto con tu web.</p>
                </div>
              </div>

              {/* Next Steps Section */}
              <div className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  🚀 Tus próximos pasos
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-gray-900">1.</span>
                    <div>
                      <span className="font-semibold text-gray-900">📧 Abre tu correo:</span>
                      <span className="text-gray-800"> revisa las instrucciones.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-gray-900">2.</span>
                    <div>
                      <span className="font-semibold text-gray-900">🌐 Recibe tu web:</span>
                      <span className="text-gray-800"> analiza el diseño funcional que hemos creado para ti.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-gray-900">3.</span>
                    <div>
                      <span className="font-semibold text-gray-900">🎁 Usa tu Super Prompt:</span>
                      <span className="text-gray-800"> potencia tu comunicación digital.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  💬 ¿Necesitas ayuda en el camino?
                </h2>
                <p className="text-gray-800 mb-4">Estamos disponibles para ti:</p>
                <div className="flex items-center justify-center gap-4">
                  <a 
                    href={`mailto:esteban@crealoconia.com?subject=Consulta sobre mi proyecto ${formData.marca}`} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    📧 Email
                  </a>
                  <a 
                    href={`https://wa.me/56962791772?text=Hola%2C%20completé%20el%20formulario%20para%20${encodeURIComponent(formData.marca)}%20y%20tengo%20una%20consulta`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    💬 WhatsApp
                  </a>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="bg-white/80 backdrop-blur rounded-xl p-6 max-w-md mx-auto">
            <p className="text-gray-600 font-medium">
              <strong className="text-blue-600 text-lg">Crealoconia.com</strong>
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Tu presencia digital sin complicaciones ✨
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default ResultsDisplay;