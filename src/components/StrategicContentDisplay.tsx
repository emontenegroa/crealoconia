
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
}

interface StrategicContentDisplayProps {
  formData: FormData;
  onReset: () => void;
}

const StrategicContentDisplay = ({ formData, onReset }: StrategicContentDisplayProps) => {
  const contactInfo = () => {
    let contact = '';
    if (formData.email) contact += `📧 Email: ${formData.email}\n`;
    if (formData.whatsapp) contact += `📱 WhatsApp: +${formData.whatsapp}\n`;
    if (formData.website) contact += `🌐 Website: ${formData.website}\n`;
    if (formData.instagram) contact += `📱 Instagram: @${formData.instagram}\n`;
    return contact;
  };

  const chatGPTPrompt = `🧠 TU ASISTENTE PERSONAL PARA CHATGPT - ${formData.marca}

Eres un experto en marketing digital y creación de contenido para "${formData.marca}".

CONTEXTO DE LA MARCA:
- Nombre: ${formData.marca}
- Quién soy: ${formData.quien_eres}
- Problema que resuelvo: ${formData.problemas}
- Preguntas que me hacen: ${formData.preguntas_frecuentes}
- Estilo de comunicación: ${formData.estilo}
- Producto principal: ${formData.producto}
${contactInfo()}

INSTRUCCIONES PRINCIPALES:
1. Siempre responde en un tono ${formData.estilo.toLowerCase()} y auténtico
2. Enfócate en resolver este problema específico: ${formData.problemas}
3. Usa ejemplos y casos relacionados con mi experiencia
4. Menciona "${formData.producto}" cuando sea relevante para la conversación
5. Crea contenido que genere engagement, confianza y conversiones
6. Adapta el mensaje según la plataforma (Instagram, LinkedIn, Facebook, etc.)${formData.instagram ? `\n7. Cuando sea apropiado, menciona mi Instagram @${formData.instagram}` : ''}${formData.website ? `\n8. Dirige tráfico a mi website ${formData.website} cuando sea relevante` : ''}${formData.whatsapp ? `\n9. Ofrece contacto directo por WhatsApp +${formData.whatsapp} cuando sea apropiado` : ''}

ESPECIALIDADES EN LAS QUE PUEDES AYUDARME:
📱 CONTENIDO PARA REDES SOCIALES
📧 MARKETING DIRECTO
🎯 ESTRATEGIA DE VENTAS
📝 CONTENIDO EDUCATIVO
🔥 PROMOCIÓN Y LANZAMIENTOS

CONTEXTO ADICIONAL:
Mi audiencia ideal son personas que: ${formData.problemas}
Frecuentemente me preguntan: ${formData.preguntas_frecuentes}
Mi estilo es: ${formData.estilo}

¿En qué área específica te gustaría que te ayude hoy con el contenido de ${formData.marca}?`;

  const lovablePrompt = `Crea una página web profesional para "${formData.marca}" con las siguientes especificaciones:

MARCA Y PERSONALIDAD:
- Nombre: ${formData.marca}
- Estilo de comunicación: ${formData.estilo}
- Descripción: ${formData.quien_eres}
${contactInfo()}

CONTENIDO PRINCIPAL:
- Problema que resuelve: ${formData.problemas}
- Preguntas frecuentes: ${formData.preguntas_frecuentes}
- Producto/servicio principal: ${formData.producto}

ESTRUCTURA REQUERIDA:
1. Header con navegación y llamada a la acción prominente
2. Sección hero con propuesta de valor clara y emotiva
3. Sección "Sobre mí/nosotros" con historia personal
4. Sección de servicios/productos con beneficios claros
5. Testimonios (crear 3-4 ejemplos realistas y específicos)
6. FAQ basada en las preguntas frecuentes mencionadas
7. Footer con formulario de contacto y redes sociales${formData.email || formData.whatsapp || formData.website || formData.instagram ? `\n   - Incluir enlaces a: ${formData.email ? `Email (${formData.email})` : ''}${formData.whatsapp ? `, WhatsApp (+${formData.whatsapp})` : ''}${formData.website ? `, Website (${formData.website})` : ''}${formData.instagram ? `, Instagram (@${formData.instagram})` : ''}` : ''}

DISEÑO Y EXPERIENCIA:
- Estilo moderno, profesional y ${formData.estilo.toLowerCase()}
- Paleta de colores que refleje la personalidad de la marca
- Gradientes sutiles y elementos visuales atractivos
- Animaciones suaves y transiciones elegantes
- Diseño completamente responsive
- Botones de llamada a la acción estratégicamente ubicados
- Secciones con testimonios reales y casos de éxito

FUNCIONALIDADES ESPECÍFICAS:
- Formulario de contacto funcional con validación${formData.email ? ` (enviar a ${formData.email})` : ''}
- Navegación suave entre secciones (smooth scroll)
- Efectos hover en botones, tarjetas e imágenes
- Modal para testimonios expandidos
- Sección de preguntas frecuentes interactiva
- Optimizado para conversión y generación de leads
- Integración con redes sociales${formData.instagram ? ` (especialmente Instagram @${formData.instagram})` : ''}${formData.whatsapp ? ` y WhatsApp (+${formData.whatsapp})` : ''}

CONTENIDO PERSONALIZADO:
- Textos que reflejen el problema: "${formData.problemas}"
- FAQ que responda: "${formData.preguntas_frecuentes}"
- CTA enfocados en: "${formData.producto}"
- Tono de comunicación: ${formData.estilo}

COMPONENTES TÉCNICOS:
- Usa componentes de shadcn/ui para consistencia
- Implementa Tailwind CSS para el diseño
- Añade animaciones con framer-motion si es necesario
- Crea componentes reutilizables y modulares
- Optimiza para SEO básico (meta tags, estructura)

El objetivo es crear una experiencia web que genere confianza, eduque al visitante sobre el problema que resuelves, y los motive a contactarte o comprar tu producto/servicio.`;

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
            Aquí tienes todo el contenido personalizado para impulsar tu presencia digital
          </p>
        </div>

        <div className="space-y-6">
          {/* Prompt ChatGPT */}
          <Card className="border-blue-200 shadow-lg">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-800 flex items-center gap-3">
                🧠 Tu Asistente Personal para ChatGPT
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-white p-4 rounded-lg border mb-4 max-h-64 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-700">
                  {chatGPTPrompt}
                </pre>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => copyToClipboard(chatGPTPrompt, "Prompt ChatGPT")}
                  className="flex-1"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Prompt
                </Button>
                <Button 
                  onClick={() => downloadAsText(chatGPTPrompt, `${formData.marca}_ChatGPT_Prompt.txt`)}
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
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-white p-4 rounded-lg border mb-4 max-h-64 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-700">
                  {lovablePrompt}
                </pre>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => copyToClipboard(lovablePrompt, "Prompt Lovable")}
                  className="flex-1"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Prompt
                </Button>
                <Button 
                  onClick={() => downloadAsText(lovablePrompt, `${formData.marca}_Lovable_Prompt.txt`)}
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
                  <h3 className="font-semibold text-gray-900 mb-2">1. Para ChatGPT:</h3>
                  <p className="text-gray-600">Copia el primer prompt y úsalo en ChatGPT para generar contenido personalizado para tu marca.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">2. Para tu sitio web:</h3>
                  <p className="text-gray-600">Copia el segundo prompt y úsalo en Lovable.dev para crear tu sitio web profesional automáticamente.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">3. Próximos pasos:</h3>
                  <p className="text-gray-600">En los próximos días recibirás contenido adicional y recursos para maximizar tu presencia digital.</p>
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
