
import React, { useState, useEffect } from 'react';
import { Users, Sparkles, TrendingUp, Clock } from 'lucide-react';

const SocialProof = () => {
  const [stats, setStats] = useState({
    todayUsers: 47,
    totalKits: 1203,
    avgTime: 3.2
  });

  useEffect(() => {
    // Simular actualización en tiempo real
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        todayUsers: prev.todayUsers + Math.floor(Math.random() * 2),
        totalKits: prev.totalKits + Math.floor(Math.random() * 3)
      }));
    }, 30000); // Actualizar cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Carolina M.",
      business: "Coach de Vida",
      text: "En 3 minutos tenía contenido para todo el mes. ¡Increíble!",
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
      {/* Estadísticas en tiempo real */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-center border border-white/20">
          <Users className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{stats.todayUsers}</div>
          <div className="text-xs text-green-300">Kits generados hoy</div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-center border border-white/20">
          <Sparkles className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{stats.totalKits.toLocaleString()}</div>
          <div className="text-xs text-purple-300">Kits totales</div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-center border border-white/20">
          <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{stats.avgTime}</div>
          <div className="text-xs text-blue-300">min promedio</div>
        </div>
      </div>

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
    </div>
  );
};

export default SocialProof;
