import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ArrowLeft, Mail, Phone, CheckCircle, Clock, Globe, Gift } from "lucide-react";
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
    const triggerConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          y: 0.6
        },
        colors: ['#3B82F6', '#7C3AED', '#10B981', '#F59E0B', '#EF4444']
      });
    };
    triggerConfetti();
    setTimeout(triggerConfetti, 1000);
  }, []);
  return <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-xl">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¡Todo salio perfecto! </h1>
          <p className="text-xl text-gray-600 mb-8">
            Revisa tu email <strong>{formData.email}</strong> ahora mismo
          </p>
          <Button onClick={onReset} variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Crear otro Kit IA
          </Button>
        </div>

        {/* Main Content */}
        <Card className="max-w-3xl mx-auto bg-white shadow-lg">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl text-gray-900 flex items-center justify-center gap-3">
              <Gift className="w-6 h-6 text-blue-600" />
              Lo que acabas de recibir
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="space-y-8">
              
              {/* Email 1: Super Prompt */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-lg font-semibold text-emerald-800">✅ Super Prompt enviado</h3>
                </div>
                <p className="text-emerald-700 mb-4">
                  Tu asistente IA personalizado ya está en tu email. Cópialo y pégalo en ChatGPT para empezar a crear contenido profesional al instante.
                </p>
                <div className="bg-white border border-emerald-200 rounded-lg p-4">
                  <p className="text-emerald-800 font-medium text-center">
                    📧 Revisa <strong>{formData.email}</strong> ahora
                  </p>
                </div>
              </div>

              {/* Email 2: Website */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-blue-600 animate-pulse" />
                  <h3 className="text-lg font-semibold text-blue-800">🚧 Sitio web en proceso</h3>
                </div>
                <p className="text-blue-700 mb-4">
                  Estamos creando tu sitio web profesional con IA. En unos minutos recibirás un segundo email con la URL de tu página.
                </p>
                <div className="bg-white border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-medium text-center">
                    ⏰ Mantente atento a tu email
                  </p>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">🎯 Mientras tanto</h3>
                <div className="space-y-3 text-gray-700">
                  <p>1. <strong>Ve a tu email</strong> y busca tu Super Prompt</p>
                  <p>2. <strong>Ábrelo en ChatGPT</strong> y empieza a crear contenido</p>
                  <p>3. <strong>Espera el segundo email</strong> con tu sitio web</p>
                </div>
              </div>

              {/* Contact */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">¿Necesitas ayuda?</h3>
                <div className="flex items-center justify-center gap-4">
                  <a href={`mailto:esteban.montenegro@gmail.com?subject=Consulta sobre mi Kit IA - ${formData.marca}`} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                  <a href={`https://wa.me/56945487423?text=Hola%20Esteban,%20completé%20el%20formulario%20para%20${encodeURIComponent(formData.marca)}%20y%20tengo%20consultas`} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            <strong className="text-blue-600">Crealoconia.com</strong> - Tu presencia digital sin complicaciones
          </p>
        </div>
      </div>
    </div>;
};
export default ResultsDisplay;