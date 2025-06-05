
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FormData {
  marca: string;
  quien_eres: string;
  problemas: string;
  preguntas_frecuentes: string;
  estilo: string;
  producto: string;
  email: string;
  whatsapp: string;
  website: string;
  instagram: string;
  generatedPrompts?: {
    superPrompt: string;
  };
}

interface StrategicContentDisplayProps {
  formData: FormData;
  onReset: () => void;
}

const StrategicContentDisplay = ({ formData, onReset }: StrategicContentDisplayProps) => {
  const prompts = formData.generatedPrompts;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "¡Copiado!",
      description: `${label} copiado al portapapeles`,
    });
  };

  const downloadAsText = (text: string, filename: string) => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "¡Descargado!",
      description: `Archivo ${filename} descargado exitosamente`,
    });
  };

  if (!prompts) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Error al generar contenido
            </h1>
            <Button onClick={onReset}>Volver al formulario</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Button 
            onClick={onReset}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al formulario
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🚀 Tu Super Prompt está listo, {formData.marca}
          </h1>
          <p className="text-gray-600 text-lg">
            Aquí tienes tu asistente personalizado de marketing y contenido para ChatGPT
          </p>
        </div>

        <div className="space-y-6">
          {/* Super Prompt */}
          <Card className="border-purple-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="text-purple-800 flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                Tu Super Prompt para ChatGPT
              </CardTitle>
              <p className="text-purple-600 text-sm mt-2">
                Copia este prompt completo y úsalo en ChatGPT para crear contenido estratégico, campañas de marketing y contenido viral para tu marca
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-white p-4 rounded-lg border mb-4 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                  {prompts.superPrompt}
                </pre>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => copyToClipboard(prompts.superPrompt, "Super Prompt")}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Super Prompt
                </Button>
                <Button 
                  onClick={() => downloadAsText(prompts.superPrompt, `${formData.marca}_SuperPrompt_ChatGPT.txt`)}
                  variant="outline"
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Instrucciones de uso */}
          <Card className="border-green-200 shadow-lg">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-800">
                🎯 Cómo usar tu Super Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">1. Copia el prompt completo:</h3>
                  <p className="text-gray-600">Pega todo el contenido en ChatGPT para configurar tu asistente personalizado.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">2. Pide contenido específico:</h3>
                  <p className="text-gray-600">Ejemplos: "Crea 10 posts para Instagram sobre productividad", "Escribe una secuencia de 5 emails para vender mi programa", "Dame ideas para Reels virales".</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">3. Personaliza según tu estrategia:</h3>
                  <p className="text-gray-600">El prompt se adapta a diferentes formatos: posts, reels, stories, emails, webinars y más.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">4. Mejora continuamente:</h3>
                  <p className="text-gray-600">Si detectaste vacíos de información en el prompt, completa esos datos para obtener mejores resultados.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Valor entregado */}
          <Card className="border-blue-200 shadow-lg">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-800">
                💎 Lo que incluye tu Super Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Contenido para redes:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Posts virales para Instagram</li>
                    <li>• Reels y Shorts de alto alcance</li>
                    <li>• Stories engagement</li>
                    <li>• Contenido para LinkedIn</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Marketing y ventas:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Secuencias de email marketing</li>
                    <li>• Scripts de venta persuasivos</li>
                    <li>• Lanzamientos digitales</li>
                    <li>• Manejo de objeciones</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StrategicContentDisplay;
