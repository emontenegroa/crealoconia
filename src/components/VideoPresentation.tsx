import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, ArrowRight, Sparkles, Check, Clock, Zap, Users, Star } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface Slide {
  id: number;
  type: 'hook' | 'problem' | 'solution' | 'process' | 'testimonial' | 'stats' | 'cta';
  title?: string;
  subtitle?: string;
  content?: string[];
  highlight?: string;
  gradient: string;
  duration: number;
}

const slides: Slide[] = [
  {
    id: 1,
    type: 'hook',
    title: "Tu negocio merece",
    subtitle: "más visibilidad",
    highlight: "¿Cansado de que tu presencia digital no refleje tu verdadero valor?",
    gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
    duration: 4000
  },
  {
    id: 2,
    type: 'problem',
    title: "El problema",
    content: [
      "Procesos engorrosos y frustrantes",
      "Tiempo perdido sin resultados",
      "Falta de conocimientos técnicos",
      "Inversión sin retorno"
    ],
    gradient: "from-rose-600 via-red-600 to-orange-600",
    duration: 5000
  },
  {
    id: 3,
    type: 'solution',
    title: "CreaLoconIA",
    subtitle: "La solución integral",
    content: [
      "Sitio web creado con IA en minutos",
      "Asistente de contenido personalizado",
      "Mentoría 1:1 para implementación",
      "Sin conocimientos técnicos"
    ],
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    duration: 5000
  },
  {
    id: 4,
    type: 'process',
    title: "Así funciona",
    content: [
      "1. Completa un formulario simple",
      "2. La IA crea tu sitio web",
      "3. Revisamos juntos en mentoría",
      "4. Tu web lista en 24 horas"
    ],
    gradient: "from-blue-600 via-indigo-600 to-violet-600",
    duration: 5000
  },
  {
    id: 5,
    type: 'testimonial',
    title: "Casos de éxito",
    subtitle: "Cami - Fundadora de Hampi.cl",
    highlight: "\"Quedé muy impresionada de ver todo lo que construyeron con solo responder 10 preguntas 👏🏻\"",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    duration: 5000
  },
  {
    id: 6,
    type: 'stats',
    title: "Resultados reales",
    content: [
      "50+ páginas web creadas",
      "24 horas tiempo de entrega",
      "100% potenciado con IA",
      "$197.000 CLP inversión única"
    ],
    gradient: "from-cyan-600 via-blue-600 to-purple-600",
    duration: 4000
  },
  {
    id: 7,
    type: 'cta',
    title: "Ve tu sitio web",
    subtitle: "antes de pagar",
    highlight: "Completa el formulario y descubre cómo queda tu web hoy mismo. Sin compromiso.",
    gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
    duration: 6000
  }
];

const VideoPresentation = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);

  const totalDuration = slides.reduce((acc, slide) => acc + slide.duration, 0);

  const goToNextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
      setSlideProgress(0);
    } else {
      setIsPlaying(false);
    }
  }, [currentSlide]);

  const restart = () => {
    setCurrentSlide(0);
    setProgress(0);
    setSlideProgress(0);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSlideProgress(prev => {
        const newProgress = prev + 50;
        if (newProgress >= slides[currentSlide].duration) {
          goToNextSlide();
          return 0;
        }
        return newProgress;
      });

      // Update overall progress
      const completedDuration = slides.slice(0, currentSlide).reduce((acc, s) => acc + s.duration, 0);
      const currentProgress = ((completedDuration + slideProgress) / totalDuration) * 100;
      setProgress(currentProgress);
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, currentSlide, slideProgress, goToNextSlide, totalDuration]);

  const slide = slides[currentSlide];

  const handleCTA = () => {
    navigate('/');
  };

  const renderSlideContent = () => {
    switch (slide.type) {
      case 'hook':
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {slide.title}
              <span className="block bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
                {slide.subtitle}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light">
              {slide.highlight}
            </p>
          </div>
        );

      case 'problem':
        return (
          <div className="text-center space-y-8 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white">{slide.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {slide.content?.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 animate-scale-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <span className="text-lg text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'solution':
        return (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-5xl md:text-6xl font-bold text-white">{slide.title}</h2>
              <p className="text-2xl text-white/80">{slide.subtitle}</p>
            </div>
            <div className="space-y-3 max-w-xl mx-auto">
              {slide.content?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 animate-scale-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <Check className="w-6 h-6 text-emerald-300 flex-shrink-0" />
                  <span className="text-lg text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'process':
        return (
          <div className="text-center space-y-8 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white">{slide.title}</h2>
            <div className="space-y-4 max-w-lg mx-auto">
              {slide.content?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 animate-scale-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl border border-white/30">
                    {index + 1}
                  </div>
                  <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-4 text-left border border-white/20">
                    <span className="text-lg text-white/90">{item.substring(3)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'testimonial':
        return (
          <div className="text-center space-y-8 animate-fade-in max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white">{slide.title}</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl text-white/90 italic mb-6">
                {slide.highlight}
              </blockquote>
              <p className="text-lg text-white/70 font-medium">{slide.subtitle}</p>
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="text-center space-y-8 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white">{slide.title}</h2>
            <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
              {[
                { icon: Users, value: "50+", label: "Páginas creadas" },
                { icon: Clock, value: "24h", label: "Tiempo entrega" },
                { icon: Zap, value: "100%", label: "Con IA" },
                { icon: Sparkles, value: "$197K", label: "Inversión CLP" }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-scale-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <stat.icon className="w-8 h-8 text-white/80 mx-auto mb-2" />
                  <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="text-center space-y-8 animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              {slide.title}
              <span className="block text-yellow-300">{slide.subtitle}</span>
            </h2>
            <p className="text-xl text-white/90 max-w-xl mx-auto">
              {slide.highlight}
            </p>
            <Button
              onClick={handleCTA}
              size="lg"
              className="bg-white text-purple-700 hover:bg-white/90 font-bold text-lg px-8 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Empezar ahora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <div className="flex items-center justify-center gap-4 text-white/70 text-sm">
              <span>✓ SuperPrompt incluido</span>
              <span>✓ Bonus exclusivos</span>
              <span>✓ Sin compromiso</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Video Container */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl aspect-video relative rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-all duration-1000`}>
            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center p-6 md:p-12">
            {renderSlideContent()}
          </div>

          {/* Slide indicator dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setSlideProgress(0);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white w-8' 
                    : index < currentSlide 
                    ? 'bg-white/70' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 md:px-8 pb-2">
        <div className="max-w-5xl mx-auto">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden flex gap-0.5">
            {slides.map((s, index) => {
              const slideWidth = (s.duration / totalDuration) * 100;
              let fillPercent = 0;
              
              if (index < currentSlide) {
                fillPercent = 100;
              } else if (index === currentSlide) {
                fillPercent = (slideProgress / s.duration) * 100;
              }
              
              return (
                <div
                  key={index}
                  className="h-full bg-white/20 rounded-full overflow-hidden"
                  style={{ width: `${slideWidth}%` }}
                >
                  <div
                    className={`h-full bg-gradient-to-r ${s.gradient} transition-all duration-100`}
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 md:px-8 pb-6">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={restart}
            className="text-white/70 hover:text-white hover:bg-white/10 rounded-full w-12 h-12"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
          
          <Button
            onClick={togglePlay}
            className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white rounded-full w-14 h-14 shadow-lg"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </Button>

          <Button
            variant="ghost"
            onClick={handleCTA}
            className="text-white/70 hover:text-white hover:bg-white/10 rounded-full px-4"
          >
            Ir al formulario
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoPresentation;
