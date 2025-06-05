
import React from 'react';
import { Brain, Sparkles, Zap } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center py-16 space-y-8">
          {/* Main spinner */}
          <div className="relative">
            <div className="w-24 h-24 border-4 border-blue-300/30 border-t-blue-600 rounded-full animate-spin"></div>
            <Brain className="w-12 h-12 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          
          {/* Status text */}
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-emerald-500 animate-pulse" />
              Generando tu Kit IA personalizado
              <Sparkles className="w-8 h-8 text-emerald-500 animate-pulse" />
            </h3>
            <p className="text-gray-700 text-xl">Nuestro AI está creando contenido personalizado para ti...</p>
          </div>
          
          {/* Progress indicators */}
          <div className="space-y-4 w-full max-w-md">
            {[
              "Analizando tu marca personal...",
              "Generando contenido para redes sociales...", 
              "Creando estructura de página web...",
              "Preparando prompts optimizados..."
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-3 text-gray-700 bg-gray-50 p-4 rounded-lg">
                <Zap className="w-5 h-5 text-blue-500 animate-pulse" style={{ animationDelay: `${index * 500}ms` }} />
                <span className="text-base font-medium">{step}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-2xl">
            <p className="text-blue-800 text-center font-medium text-lg">
              🎯 Estamos generando contenido único para tu marca
            </p>
            <p className="text-blue-700 text-center mt-2">
              En unos segundos recibirás todo en tu email
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
