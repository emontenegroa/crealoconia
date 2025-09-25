import React, { useEffect, useState } from 'react';
import { Brain, Sparkles, Zap, CheckCircle, Clock } from 'lucide-react';

interface LoadingSpinnerEnhancedProps {
  marca?: string;
}

const LoadingSpinnerEnhanced = ({ marca }: LoadingSpinnerEnhancedProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    "Analizando tu marca personal...",
    "Generando contenido para redes sociales...", 
    "Creando estructura de página web...",
    "Preparando prompts optimizados...",
    "Enviando tu Kit IA por email..."
  ];

  useEffect(() => {
    // Scroll to top immediately when loading starts
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Progress through steps
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 fixed inset-0 z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center py-16 space-y-8">
          {/* Main spinner */}
          <div className="relative">
            <div className="w-32 h-32 border-4 border-purple-300/20 border-t-purple-500 rounded-full animate-spin"></div>
            <div className="w-24 h-24 border-4 border-blue-300/20 border-t-blue-500 rounded-full animate-spin absolute top-1 left-1" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
            <Brain className="w-16 h-16 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          
          {/* Status text */}
          <div className="text-center space-y-4">
            <h3 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
              <Sparkles className="w-10 h-10 text-purple-400 animate-pulse" />
              Generando tu Kit IA personalizado
              <Sparkles className="w-10 h-10 text-purple-400 animate-pulse" />
            </h3>
            {marca && (
              <p className="text-purple-200 text-xl font-semibold">Para {marca}</p>
            )}
            <p className="text-slate-300 text-xl">Nuestro AI está creando contenido único para ti...</p>
          </div>
          
          {/* Progress indicators */}
          <div className="space-y-4 w-full max-w-md">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-500 ${
                  index <= currentStep 
                    ? 'bg-purple-600/20 border border-purple-400/30 text-white' 
                    : 'bg-slate-800/50 border border-slate-600/30 text-slate-400'
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : index === currentStep ? (
                  <Zap className="w-5 h-5 text-purple-400 animate-pulse" />
                ) : (
                  <Clock className="w-5 h-5 text-slate-500" />
                )}
                <span className="text-base font-medium">{step}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-400/30 rounded-xl p-6 max-w-2xl backdrop-blur-sm">
            <p className="text-white text-center font-medium text-lg">
              🎯 Estamos generando contenido único para tu marca
            </p>
            <p className="text-purple-200 text-center mt-2">
              En unos segundos recibirás todo en tu email y serás redirigido a la página de resultados
            </p>
          </div>

          {/* Fun animation */}
          <div className="flex space-x-2 mt-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinnerEnhanced;