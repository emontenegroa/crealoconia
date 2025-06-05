
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, FileText, Lightbulb, MessageSquare } from "lucide-react";

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

  // Dividir el contenido en secciones basándose en los bloques
  const sections = content.split('**BLOQUE').filter(section => section.trim());
  
  const renderSection = (section: string, index: number) => {
    const lines = section.split('\n').filter(line => line.trim());
    const title = lines[0]?.replace(/\*+/g, '').trim() || `Bloque ${index + 1}`;
    const sectionContent = lines.slice(1).join('\n');

    let icon;
    if (title.includes('DOCUMENTACIÓN')) icon = <FileText className="w-5 h-5" />;
    else if (title.includes('CONTENIDO')) icon = <Lightbulb className="w-5 h-5" />;
    else if (title.includes('ASISTENTE')) icon = <Brain className="w-5 h-5" />;
    else icon = <MessageSquare className="w-5 h-5" />;

    return (
      <Card key={index} className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-700">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
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
          Tu estrategia digital completa ha sido generada. Revisa cada sección y guarda este contenido.
        </p>
      </div>
      
      {sections.length > 0 ? (
        sections.map((section, index) => renderSection(section, index))
      ) : (
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
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
