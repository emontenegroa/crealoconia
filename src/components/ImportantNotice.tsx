
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Brain } from "lucide-react";

const ImportantNotice = () => {
  return (
    <Card className="max-w-4xl mx-auto mb-8 bg-white/95 border-emerald-200 shadow-xl">
      <CardContent className="p-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Brain className="w-6 h-6 text-emerald-600" />
          <h3 className="text-xl font-semibold text-gray-800">⚠️ Importante: Sé específico en tus respuestas</h3>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          <strong>La calidad de tu Kit IA depende 100% de qué tan detalladas sean tus respuestas.</strong>
          <br />
          Entre más específico seas sobre tu negocio, mejor será el contenido que generes. 
          <span className="text-emerald-600 font-semibold">
            ¡No te apures, tómate el tiempo necesario!
          </span>
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-amber-800 font-medium">
            🧠 <strong>Nueva función IA:</strong> Desde la pregunta 6 puedes mejorar tus respuestas con inteligencia artificial
            <br />
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImportantNotice;
