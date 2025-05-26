
import React from 'react';
import { Brain, Sparkles, Zap } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-8">
      {/* Main spinner */}
      <div className="relative">
        <div className="w-24 h-24 border-4 border-purple-300/30 border-t-purple-400 rounded-full animate-spin"></div>
        <Brain className="w-12 h-12 text-purple-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>
      
      {/* Status text */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-semibold text-white flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
          Generando tu SuperPrompt
          <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
        </h3>
        <p className="text-purple-200 text-lg">Nuestro AI está creando contenido personalizado para ti...</p>
      </div>
      
      {/* Progress indicators */}
      <div className="space-y-3 w-full max-w-md">
        {[
          "Analizando tu marca personal...",
          "Generando contenido para redes sociales...",
          "Creando estructura de página web...",
          "Preparando prompts optimizados..."
        ].map((step, index) => (
          <div key={index} className="flex items-center gap-3 text-purple-200">
            <Zap className="w-4 h-4 text-yellow-300 animate-pulse" style={{ animationDelay: `${index * 500}ms` }} />
            <span className="text-sm">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
