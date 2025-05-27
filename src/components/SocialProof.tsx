
import React, { useState, useEffect } from 'react';
import { Star, Zap, TrendingUp, Clock } from 'lucide-react';

const SocialProof = () => {
  const testimonials = [
    {
      name: "Carolina M.",
      business: "Coach de Vida",
      text: "En minutos tenía mi web y contenido para 15 días. ¡Increíble!",
      avatar: "C"
    },
    {
      name: "Miguel R.",
      business: "Consultor Marketing",
      text: "El sitio web se generó automáticamente. Me ahorré semanas de trabajo.",
      avatar: "M"
    },
    {
      name: "Sofia L.",
      business: "Terapeuta",
      text: "Mis clientes no pueden creer lo profesional que se ve todo.",
      avatar: "S"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Testimonial rotativo */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 rounded-xl p-6 backdrop-blur-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {testimonials[currentTestimonial].avatar}
          </div>
          <div className="flex-1">
            <blockquote className="text-white text-lg italic mb-2">
              "{testimonials[currentTestimonial].text}"
            </blockquote>
            <div className="text-purple-200">
              <span className="font-semibold">{testimonials[currentTestimonial].name}</span>
              <span className="text-sm"> • {testimonials[currentTestimonial].business}</span>
            </div>
          </div>
        </div>
        
        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? 'bg-purple-400' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Urgencia/Escasez */}
      <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-300/30 rounded-xl p-4 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-red-400 animate-pulse" />
          <div>
            <p className="text-white font-semibold">🔥 Oferta gratuita limitada</p>
            <p className="text-red-200 text-sm">Esta herramienta premium será de pago pronto. ¡Aprovecha ahora!</p>
          </div>
        </div>
      </div>

      {/* Beneficios clave */}
      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-300/30 rounded-xl p-4 backdrop-blur-lg">
        <div className="flex items-center gap-3 mb-3">
          <Zap className="w-5 h-5 text-yellow-400" />
          <p className="text-white font-semibold">✅ Resultados garantizados en minutos</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2 text-green-200">
            <Clock className="w-4 h-4" />
            <span>Contenido listo</span>
          </div>
          <div className="flex items-center gap-2 text-blue-200">
            <Star className="w-4 h-4" />
            <span>Web profesional</span>
          </div>
          <div className="flex items-center gap-2 text-purple-200">
            <Zap className="w-4 h-4" />
            <span>IA personalizada</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
