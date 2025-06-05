
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Code } from "lucide-react";

interface StrategicContentDisplayProps {
  content: string;
  marca: string;
}

const StrategicContentDisplay = ({ content, marca }: StrategicContentDisplayProps) => {
  // Si no hay contenido, mostrar mensaje de error
  if (!content || content.trim() === '') {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            🧠 Kit IA para {marca}
          </h2>
          <p className="text-red-600">
            Hubo un problema al generar el contenido. Por favor, intenta nuevamente.
          </p>
        </div>
      </div>
    );
  }

  // Dividir el contenido en las dos secciones principales
  const sections = content.split('**PROMPT PARA').filter(section => section.trim());
  
  const renderSection = (section: string, index: number) => {
    const lines = section.split('\n').filter(line => line.trim());
    const title = lines[0]?.replace(/\*+/g, '').trim() || `Prompt ${index + 1}`;
    const sectionContent = lines.slice(1).join('\n');

    let icon;
    let borderColor;
    if (title.includes('CHATGPT')) {
      icon = <Brain className="w-5 h-5" />;
      borderColor = 'border-l-green-500';
    } else if (title.includes('LOVABLE')) {
      icon = <Code className="w-5 h-5" />;
      borderColor = 'border-l-purple-500';
    } else {
      icon = <Brain className="w-5 h-5" />;
      borderColor = 'border-l-blue-500';
    }

    return (
      <Card key={index} className={`border-l-4 ${borderColor}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-700">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-gray-50 p-4 rounded-lg border">
            {sectionContent}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🧠 Kit IA Personalizado para {marca}
        </h2>
        <p className="text-gray-600">
          Tus prompts personalizados están listos. Copia y usa estos prompts en ChatGPT y Lovable.
        </p>
      </div>
      
      {sections.length > 0 ? (
        sections.map((section, index) => renderSection(section, index))
      ) : (
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-gray-50 p-4 rounded-lg border">
              {content}
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
        <p className="text-green-800 font-medium text-center">
          📧 <strong>Este contenido también ha sido enviado a tu correo electrónico</strong>
        </p>
        <p className="text-green-700 text-sm text-center mt-2">
          Guárdalo en una carpeta especial para futuras referencias
        </p>
      </div>
    </div>
  );
};

export default StrategicContentDisplay;
