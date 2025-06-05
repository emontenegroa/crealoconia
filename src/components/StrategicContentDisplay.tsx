
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, ArrowLeft } from "lucide-react";
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
    chatGPTPrompt: string;
    lovablePrompt: string;
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
            🎯 Tu Kit IA está listo, {formData.marca}
          </h1>
          <p className="text-gray-600 text-lg">
            Aquí tienes los dos prompts profesionales para impulsar tu presencia digital
          </p>
        </div>

        <div className="space-y-6">
          {/* Prompt ChatGPT */}
          <Card className="border-blue-200 shadow-lg">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-800 flex items-center gap-3">
                🧠 Tu Asistente Personal para ChatGPT
              </CardTitle>
              <p className="text-blue-600 text-sm mt-2">
                Copia este prompt y úsalo en ChatGPT para generar contenido personalizado para tu marca
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-white p-4 rounded-lg border mb-4 max-h-64 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-700">
                  {prompts.chatGPTPrompt}
                </pre>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => copyToClipboard(prompts.chatGPTPrompt, "Prompt ChatGPT")}
                  className="flex-1"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Prompt
                </Button>
                <Button 
                  onClick={() => downloadAsText(prompts.chatGPTPrompt, `${formData.marca}_ChatGPT_Prompt.txt`)}
                  variant="outline"
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Prompt Lovable */}
          <Card className="border-purple-200 shadow-lg">
            <CardHeader className="bg-purple-50">
              <CardTitle className="text-purple-800 flex items-center gap-3">
                🌐 Prompt para Crear tu Web en Lovable
              </CardTitle>
              <p className="text-purple-600 text-sm mt-2">
                Copia este prompt y úsalo en Lovable.dev para crear tu sitio web profesional automáticamente
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-white p-4 rounded-lg border mb-4 max-h-64 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-700">
                  {prompts.lovablePrompt}
                </pre>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => copyToClipboard(prompts.lovablePrompt, "Prompt Lovable")}
                  className="flex-1"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Prompt
                </Button>
                <Button 
                  onClick={() => downloadAsText(prompts.lovablePrompt, `${formData.marca}_Lovable_Prompt.txt`)}
                  variant="outline"
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Información adicional */}
          <Card className="border-green-200 shadow-lg">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-800">
                ✅ ¿Qué hacer ahora?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">1. Para generar contenido:</h3>
                  <p className="text-gray-600">Copia el primer prompt y úsalo en ChatGPT para generar contenido personalizado para redes sociales, marketing y ventas.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">2. Para tu sitio web:</h3>
                  <p className="text-gray-600">Copia el segundo prompt y úsalo en Lovable.dev para crear tu sitio web profesional automáticamente.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">3. Próximos pasos:</h3>
                  <p className="text-gray-600">Usa estos prompts tantas veces como necesites para generar contenido y mejorar tu presencia digital.</p>
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
