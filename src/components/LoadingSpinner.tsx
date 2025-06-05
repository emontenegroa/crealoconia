
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Sparkles } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <Card className="max-w-2xl mx-auto bg-white border-gray-200 shadow-xl" id="loading-section">
      <CardHeader className="text-center pb-6 bg-blue-50 border-b border-blue-200">
        <CardTitle className="text-2xl text-gray-900 flex items-center justify-center gap-3">
          <Brain className="w-8 h-8 text-blue-600 animate-pulse" />
          Generando tu contenido...
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 text-center">
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
          
          <div className="space-y-4 text-gray-700">
            <div className="flex items-center justify-center gap-2 text-lg">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>Procesando tus respuestas...</span>
            </div>
            
            <p className="text-base">
              Estamos creando tu contenido personalizado y la primera versión de tu sitio web.
            </p>
            
            <p className="text-sm text-gray-600">
              <strong>Esto toma solo unos segundos.</strong>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingSpinner;
