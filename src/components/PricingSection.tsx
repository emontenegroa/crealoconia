
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, Zap, DollarSign } from 'lucide-react';

interface PricingSectionProps {
  onPurchase: () => void;
}

const PricingSection = ({ onPurchase }: PricingSectionProps) => {
  return (
    <div className="max-w-4xl mx-auto my-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Invierte en tu éxito digital
        </h2>
        <p className="text-purple-200 text-lg">
          Todo lo que necesitas para lanzar tu presencia digital profesional
        </p>
      </div>

      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8 relative overflow-hidden">
        {/* Badge de oferta */}
        <div className="absolute top-4 right-4">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Precio de Lanzamiento
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Precio y valor */}
          <div className="text-center md:text-left">
            <div className="mb-6">
              <p className="text-purple-200 text-lg mb-2">Valor real en el mercado:</p>
              <p className="text-gray-400 line-through text-2xl mb-2">$1,500+ USD</p>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <DollarSign className="w-8 h-8 text-green-400" />
                <span className="text-5xl font-black text-white">197</span>
                <span className="text-2xl text-green-400 font-semibold">USD</span>
              </div>
              <p className="text-green-300 text-sm mt-2">
                Solo para los primeros 100 usuarios
              </p>
            </div>

            <Button 
              onClick={onPurchase}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-lg px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transform transition-all duration-200 w-full md:w-auto"
            >
              🧠 Obtener Kit IA por $197
            </Button>

            <p className="text-purple-200 text-sm mt-4">
              💚 Garantía de reembolso 30 días
            </p>
          </div>

          {/* Lo que incluye */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">
              Lo que obtienes inmediatamente:
            </h3>
            <div className="space-y-3">
              {[
                "15 días de contenido personalizado para redes",
                "Textos completos para tu sitio web profesional",
                "Prompt para generar tu web automáticamente",
                "Estrategia de comunicación personalizada",
                "Guía paso a paso de implementación",
                "Acceso inmediato (entrega en 5 minutos)"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-purple-100">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Urgencia */}
        <div className="mt-8 p-4 bg-red-500/20 border border-red-300/30 rounded-lg text-center">
          <p className="text-red-200 font-semibold">
            ⚡ Solo quedan <span className="text-yellow-300">23 cupos</span> al precio de lanzamiento
          </p>
          <p className="text-red-300 text-sm mt-1">
            Después sube a $497 USD (precio real de mercado)
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
