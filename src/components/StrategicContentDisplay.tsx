
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
            <Button onClick={onReset} variant="outline" className="bg-white border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400">Volver al formulario</Button>
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
            🎉 ¡Todo listo, {formData.marca}!
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Aquí tienes tus 2 prompts profesionales personalizados
          </p>
          <p className="text-gray-500 text-sm">
            ✅ Prompt para crear tu sitio web en Lovable &nbsp;|&nbsp; ✅ Super Prompt para contenido en ChatGPT
          </p>
        </div>

        <div className="space-y-6">
          {/* Prompt para Lovable - Sitio Web */}
          <Card className="border-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="text-blue-800 flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                Tu Prompt Profesional para Crear tu Sitio Web en Lovable
              </CardTitle>
              <p className="text-blue-600 text-sm mt-2">
                Copia este prompt completo y pégalo en <strong>Lovable.dev</strong> para generar tu sitio web profesional completo con diseño premium, copy persuasivo y optimización para conversión
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-white p-4 rounded-lg border mb-4 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                  {prompts.lovablePrompt}
                </pre>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => copyToClipboard(prompts.lovablePrompt, "Prompt de Lovable")}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Prompt para Lovable
                </Button>
                <Button 
                  onClick={() => downloadAsText(prompts.lovablePrompt, `${formData.marca}_Prompt_Lovable_Web.txt`)}
                  variant="outline"
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Super Prompt para ChatGPT */}
          <Card className="border-purple-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="text-purple-800 flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                Tu Super Prompt para ChatGPT (Marketing y Contenido)
              </CardTitle>
              <p className="text-purple-600 text-sm mt-2">
                Usa este prompt en ChatGPT para crear contenido estratégico, campañas de marketing y contenido viral para tu marca
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
                  onClick={() => copyToClipboard(prompts.superPrompt, "Super Prompt ChatGPT")}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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

          {/* Instrucciones de uso - Lovable */}
          <Card className="border-green-200 shadow-lg">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-800">
                🎯 Cómo usar tu Prompt de Lovable
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">1. Ve a Lovable.dev:</h3>
                  <p className="text-gray-600">Abre <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">lovable.dev</a> y crea un nuevo proyecto.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">2. Pega el prompt completo:</h3>
                  <p className="text-gray-600">Copia el "Prompt Profesional para Lovable" y pégalo en el chat de Lovable.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">3. Deja que Lovable genere tu sitio:</h3>
                  <p className="text-gray-600">En minutos tendrás un sitio web profesional, moderno y listo para publicar.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">4. Personaliza y mejora:</h3>
                  <p className="text-gray-600">Pide ajustes de diseño, colores, textos o cualquier cambio que necesites directamente en el chat.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">5. Publica tu sitio:</h3>
                  <p className="text-gray-600">Una vez satisfecho, publica tu web con un solo clic desde Lovable.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instrucciones de uso - ChatGPT */}
          <Card className="border-amber-200 shadow-lg">
            <CardHeader className="bg-amber-50">
              <CardTitle className="text-amber-800">
                🎯 Cómo usar tu Super Prompt de ChatGPT
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">1. Copia el Super Prompt:</h3>
                  <p className="text-gray-600">Pega todo el contenido en ChatGPT para configurar tu asistente personalizado.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">2. Pide contenido específico:</h3>
                  <p className="text-gray-600">Ejemplos: "Crea 10 posts para Instagram", "Escribe 5 emails de venta", "Dame ideas para Reels virales".</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">3. Personaliza según estrategia:</h3>
                  <p className="text-gray-600">El prompt se adapta a posts, reels, stories, emails, webinars y más.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Valor entregado */}
          <Card className="border-indigo-200 shadow-lg">
            <CardHeader className="bg-indigo-50">
              <CardTitle className="text-indigo-800">
                💎 Lo que recibes con estos prompts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-blue-600">🌐</span> Prompt de Lovable (Sitio Web):
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-1.5">
                    <li>• Sitio web completo y profesional</li>
                    <li>• Diseño premium y diferenciado</li>
                    <li>• 12 secciones estratégicas</li>
                    <li>• Copy persuasivo incluido</li>
                    <li>• Optimizado para conversión</li>
                    <li>• Responsive y moderno</li>
                    <li>• Testimonios y FAQs incluidos</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-purple-600">🚀</span> Super Prompt ChatGPT:
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-1.5">
                    <li>• Posts virales para redes</li>
                    <li>• Reels y Shorts de alto alcance</li>
                    <li>• Email marketing estratégico</li>
                    <li>• Scripts de venta persuasivos</li>
                    <li>• Lanzamientos digitales</li>
                    <li>• Contenido para LinkedIn</li>
                    <li>• Generación de imágenes con IA</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-indigo-200">
                <p className="text-center text-gray-700 font-medium">
                  🎁 Con estos dos prompts tienes todo lo necesario para lanzar tu presencia digital profesional
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StrategicContentDisplay;
