
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
        origin: { y: 0.6 },
        colors: colors
      });

      // Second burst - left
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { x: 0.2, y: 0.7 },
          colors: colors
        });
      }, 300);

      // Third burst - right
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { x: 0.8, y: 0.7 },
          colors: colors
        });
      }, 600);

      // Final golden shower
      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#FFD700', '#FFA500', '#FF6347']
        });
      }, 1000);
    };

    triggerMegaConfetti();
    
    // Repeat celebration after 3 seconds
    setTimeout(triggerMegaConfetti, 3000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
      <div className="container mx-auto px-4 py-12">
        
        {/* Celebration Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-3xl shadow-2xl animate-pulse">
              <Trophy className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-4 leading-tight">
              ¡FELICITACIONES! 🎉
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-yellow-500 animate-bounce" />
              <p className="text-2xl md:text-3xl font-bold text-gray-800">
                ¡Acabas de dar el paso más importante!
              </p>
              <Sparkles className="w-8 h-8 text-yellow-500 animate-bounce" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-100 to-blue-100 border-2 border-emerald-300 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-emerald-600" />
              <p className="text-xl font-bold text-emerald-800">
                Tu transformación digital ha comenzado
              </p>
            </div>
            <p className="text-lg text-emerald-700 font-medium">
              En minutos tendrás todo lo necesario para <span className="font-bold">destacar online</span> y <span className="font-bold">atraer clientes ideales</span>
            </p>
          </div>

          <Button 
            onClick={onReset} 
            variant="outline" 
            className="border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Crear otro Kit IA
          </Button>
        </div>

        {/* Main Content */}
        <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur shadow-2xl border-0">
          <CardHeader className="text-center pb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-3">
              <Gift className="w-8 h-8" />
              Lo que acabas de recibir (y lo que viene)
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="space-y-8">
              
              {/* Email Success */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-300 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-emerald-600 p-3 rounded-full">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-800">
                    ✅ ¡Tu Super Prompt está esperándote!
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-lg text-emerald-700 font-medium">
                    🚀 <strong>¡Increíble!</strong> Tu asistente IA personalizado ya está en tu bandeja de entrada.
                  </p>
                  <p className="text-emerald-700">
                    En segundos podrás crear contenido profesional que conecte con tu audiencia ideal.
                  </p>
                  
                  <div className="bg-white border-2 border-emerald-300 rounded-xl p-6 text-center">
                    <Mail className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                    <p className="text-xl font-bold text-emerald-800 mb-2">
                      📧 ¡Ve AHORA a revisar!
                    </p>
                    <p className="text-lg font-bold text-emerald-600">
                      {formData.email}
                    </p>
                    <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                      <p className="text-emerald-700 font-medium text-sm">
                        💡 Cópialo, pégalo en ChatGPT y ¡empieza tu revolución digital!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Website in Progress */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-600 p-3 rounded-full">
                    <Globe className="w-8 h-8 text-white animate-spin" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-800">
                    🏗️ Tu web profesional se está creando
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-lg text-blue-700 font-medium">
                    ⚡ <strong>¡La magia está sucediendo!</strong> Nuestra IA está construyendo tu sitio web profesional.
                  </p>
                  <p className="text-blue-700">
                    En pocos minutos tendrás una web que trabaja 24/7 atrayendo a tus clientes ideales.
                  </p>
                  
                  <div className="bg-white border-2 border-blue-300 rounded-xl p-6 text-center">
                    <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3 animate-pulse" />
                    <p className="text-xl font-bold text-blue-800 mb-2">
                      ⏰ Mantente atento a tu email
                    </p>
                    <p className="text-blue-700 font-medium">
                      El segundo email con tu web llegará muy pronto
                    </p>
                  </div>
                </div>
              </div>

              {/* Motivation Section */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-purple-800 mb-6 text-center">
                  🎯 Mientras tanto, prepárate para el éxito
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-white rounded-xl shadow-md">
                    <div className="text-3xl mb-3">📧</div>
                    <p className="font-bold text-purple-800 mb-2">Paso 1</p>
                    <p className="text-purple-700 text-sm">Abre tu email y encuentra tu Super Prompt</p>
                  </div>
                  
                  <div className="text-center p-4 bg-white rounded-xl shadow-md">
                    <div className="text-3xl mb-3">🤖</div>
                    <p className="font-bold text-purple-800 mb-2">Paso 2</p>
                    <p className="text-purple-700 text-sm">Cópialo en ChatGPT y crea contenido increíble</p>
                  </div>
                  
                  <div className="text-center p-4 bg-white rounded-xl shadow-md">
                    <div className="text-3xl mb-3">🚀</div>
                    <p className="font-bold text-purple-800 mb-2">Paso 3</p>
                    <p className="text-purple-700 text-sm">Recibe tu web y empieza a atraer clientes</p>
                  </div>
                </div>
              </div>

              {/* Support Section */}
              <div className="border-t-2 border-gray-200 pt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                  💬 ¿Necesitas una mano? ¡Estamos aquí para ti!
                </h3>
                <div className="flex items-center justify-center gap-4">
                  <a 
                    href={`mailto:esteban.montenegro@gmail.com?subject=¡Hola! Completé mi Kit IA para ${formData.marca}`} 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </a>
                  <a 
                    href={`https://wa.me/56945487423?text=¡Hola%20Esteban!%20Completé%20mi%20Kit%20IA%20para%20${encodeURIComponent(formData.marca)}%20y%20estoy%20súper%20emocionado.%20¡Gracias!`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Phone className="w-5 h-5" />
                    WhatsApp
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
    </div>
  );
};

export default ResultsDisplay;
