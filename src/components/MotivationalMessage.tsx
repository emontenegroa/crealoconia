import React from 'react';
import { CheckCircle, Sparkles, Target } from "lucide-react";

interface MotivationalMessageProps {
  step: number;
}

const MotivationalMessage = ({ step }: MotivationalMessageProps) => {
  const messages = [
    {
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
      text: "¡Perfecto! Con estas respuestas ya tenemos la base para tu web profesional",
      bgColor: "bg-emerald-500/10 border-emerald-500/20"
    },
    {
      icon: <Sparkles className="w-5 h-5 text-blue-400" />,
      text: "Excelente progreso. Tu sitio web está tomando forma con cada respuesta",
      bgColor: "bg-blue-500/10 border-blue-500/20"
    },
    {
      icon: <Target className="w-5 h-5 text-purple-400" />,
      text: "¡Casi listo! Solo faltan los datos de contacto para completar tu página",
      bgColor: "bg-purple-500/10 border-purple-500/20"
    }
  ];

  // Mostrar mensaje en los pasos 2, 5 y 8 (después de cada 2-3 preguntas)
  const shouldShow = step === 2 || step === 5 || step === 8;
  
  if (!shouldShow) return null;

  const messageIndex = step === 2 ? 0 : step === 5 ? 1 : 2;
  const message = messages[messageIndex];

  return (
    <div className={`${message.bgColor} border rounded-xl p-4 mb-6 backdrop-blur-sm`}>
      <div className="flex items-center space-x-3">
        {message.icon}
        <p className="text-white font-medium flex-1">
          {message.text}
        </p>
      </div>
    </div>
  );
};

export default MotivationalMessage;