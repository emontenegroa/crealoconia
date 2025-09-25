import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Globe, Palette, Code, Rocket } from 'lucide-react';

interface LoadingSpinnerEnhancedProps {
  formData?: any;
}

const LoadingSpinnerEnhanced = ({ formData }: LoadingSpinnerEnhancedProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dots, setDots] = useState('');

  const loadingSteps = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Analizando tu información",
      description: "🧠 Procesando tu perfil empresarial...",
      emoji: "🔍"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Generando diseño personalizado",
      description: "🎨 Creando paleta de colores y estilo...",
      emoji: "🎨"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Construyendo tu sitio web",
      description: "⚡ Programando componentes y páginas...",
      emoji: "💻"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Optimizando para el éxito",
      description: "🚀 Configurando SEO y velocidad...",
      emoji: "📈"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "¡Casi listo!",
      description: "✨ Finalizando detalles...",
      emoji: "🎯"
    }
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % loadingSteps.length);
    }, 3000);

    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      clearInterval(stepInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 z-50 flex items-center justify-center">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>
      
      {/* Gradientes animados */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 text-center max-w-md mx-auto px-4">
        {/* Header con logo */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-2xl tracking-tight">Crealoconia</span>
          </div>
        </div>

        {/* Spinner principal */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto relative">
            {/* Anillo exterior */}
            <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
            
            {/* Anillo animado */}
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
            
            {/* Centro con emoji */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>
                {loadingSteps[currentStep].emoji}
              </span>
            </div>
          </div>
        </div>

        {/* Mensaje principal */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
            <span className="mr-3 text-blue-400">
              {loadingSteps[currentStep].icon}
            </span>
            Creando tu sitio web{dots}
          </h1>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">
              {loadingSteps[currentStep].title}
            </h2>
            <p className="text-slate-300">
              {loadingSteps[currentStep].description}
            </p>
          </div>
          
          {formData?.marca && (
            <p className="text-lg text-slate-300 mb-6">
              Personalizando para <span className="text-blue-300 font-semibold">{formData.marca}</span>
            </p>
          )}
        </div>

        {/* Progreso */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {loadingSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index <= currentStep 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-110' 
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
          
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${((currentStep + 1) / loadingSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
          <p className="text-emerald-300 font-medium mb-2">
            📧 Te enviaremos todo a: {formData?.email}
          </p>
          <p className="text-slate-400 text-sm">
            ⏱️ Tiempo estimado: 2-3 minutos
          </p>
        </div>

        {/* Animación de partículas flotantes */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-ping"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinnerEnhanced;