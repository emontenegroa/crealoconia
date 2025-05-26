
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, MessageSquare, Rocket, Brain, Check, TrendingUp } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface FormData {
  marca: string;
  quien_eres: string;
  problemas: string;
  preguntas_frecuentes: string;
  estilo: string;
  producto: string;
}

interface ResultsDisplayProps {
  formData: FormData;
  onReset: () => void;
}

const ResultsDisplay = ({ formData, onReset }: ResultsDisplayProps) => {
  const [copiedContent, setCopiedContent] = useState<string | null>(null);

  const copyToClipboard = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopiedContent(type);
    toast({
      title: "¡Copiado!",
      description: `${type} copiado al portapapeles`,
    });
    setTimeout(() => setCopiedContent(null), 2000);
  };

  // Generate content based on form data
  const socialMediaContent = `🌟 CONTENIDO PARA REDES SOCIALES - ${formData.marca}

📱 REEL PRESENTACIÓN (15-30 segundos):
"¡Hola! Soy parte de ${formData.marca} 👋
${formData.quien_eres}

Mi misión es ayudarte con: ${formData.problemas}

¿Te resuena? ¡Sígueme para más contenido! 💫"

📝 POST EDUCATIVO:
"💡 ¿Sabías que...?
${formData.preguntas_frecuentes}

En ${formData.marca}, creemos que siempre hay una solución 🚀
${formData.problemas}

¿Qué opinas? Cuéntame en comentarios 👇"

🎯 REEL DE PRODUCTO (30-60 segundos):
"¿Listo para transformar tu vida?
Te presento: ${formData.producto}

✨ Diseñado especialmente para quienes:
${formData.problemas}

¡Envíame DM para más información! 📩"

📊 POST DE VALOR:
"🔥 3 señales de que necesitas ${formData.producto}:
1. ${formData.problemas}
2. Te sientes estancado/a en tu crecimiento
3. Buscas resultados reales y duraderos

¿Te identificas? Escríbeme 'ME INTERESA' 👇"

#${formData.marca.replace(/\s+/g, '')} #transformacion #crecimiento #${formData.estilo.toLowerCase()}`;

  const lovablePrompt = `Crea una página web profesional para "${formData.marca}" con las siguientes especificaciones:

MARCA Y PERSONALIDAD:
- Nombre: ${formData.marca}
- Estilo de comunicación: ${formData.estilo}
- Descripción: ${formData.quien_eres}

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
7. Footer con formulario de contacto y redes sociales

DISEÑO Y EXPERIENCIA:
- Estilo moderno, profesional y ${formData.estilo.toLowerCase()}
- Paleta de colores que refleje la personalidad de la marca
- Gradientes sutiles y elementos visuales atractivos
- Animaciones suaves y transiciones elegantes
- Diseño completamente responsive
- Botones de llamada a la acción estratégicamente ubicados
- Secciones con testimonios reales y casos de éxito

FUNCIONALIDADES ESPECÍFICAS:
- Formulario de contacto funcional con validación
- Navegación suave entre secciones (smooth scroll)
- Efectos hover en botones, tarjetas e imágenes
- Modal para testimonios expandidos
- Sección de preguntas frecuentes interactiva
- Optimizado para conversión y generación de leads
- Integración con redes sociales

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

  const chatGPTPrompt = `Eres un experto en marketing digital y creación de contenido para "${formData.marca}".

CONTEXTO DE LA MARCA:
- Nombre: ${formData.marca}
- Quién soy: ${formData.quien_eres}
- Problema que resuelvo: ${formData.problemas}
- Preguntas que me hacen: ${formData.preguntas_frecuentes}
- Estilo de comunicación: ${formData.estilo}
- Producto principal: ${formData.producto}

INSTRUCCIONES PRINCIPALES:
1. Siempre responde en un tono ${formData.estilo.toLowerCase()} y auténtico
2. Enfócate en resolver este problema específico: ${formData.problemas}
3. Usa ejemplos y casos relacionados con mi experiencia
4. Menciona "${formData.producto}" cuando sea relevante para la conversación
5. Crea contenido que genere engagement, confianza y conversiones
6. Adapta el mensaje según la plataforma (Instagram, LinkedIn, Facebook, etc.)

ESPECIALIDADES EN LAS QUE PUEDES AYUDARME:
📱 CONTENIDO PARA REDES SOCIALES:
- Posts para Instagram, Facebook, LinkedIn, TikTok
- Ideas para Reels y videos cortos
- Carruseles educativos
- Stories interactivos
- Captions que generen engagement

📧 MARKETING DIRECTO:
- Emails de nurturing
- Secuencias de follow-up
- Newsletters semanales
- Mensajes para WhatsApp Business

🎯 ESTRATEGIA DE VENTAS:
- Scripts para videollamadas
- Páginas de venta (copy)
- Secuencias de lanzamiento
- Manejo de objeciones comunes
- Funnels de marketing

📝 CONTENIDO EDUCATIVO:
- Blog posts
- Guías descargables
- Webinars y talleres
- Podcast episodes

🔥 PROMOCIÓN Y LANZAMIENTOS:
- Campañas de lanzamiento
- Promociones especiales
- Colaboraciones con otros creadores
- Estrategias de remarketing

CONTEXTO ADICIONAL:
Mi audiencia ideal son personas que: ${formData.problemas}
Frecuentemente me preguntan: ${formData.preguntas_frecuentes}
Mi estilo es: ${formData.estilo}

¿En qué área específica te gustaría que te ayude hoy con el contenido de ${formData.marca}?`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-green-500/20 text-green-200 border-green-400/50 px-4 py-2 text-lg">
            ✅ ¡SuperPrompt Generado!
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tu contenido está listo
          </h1>
          <p className="text-purple-100 text-lg mb-6 max-w-2xl mx-auto">
            Aquí tienes todo el contenido personalizado para <strong className="text-white">{formData.marca}</strong>
          </p>
          <Button 
            onClick={onReset}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Crear otro SuperPrompt
          </Button>
        </div>

        {/* Results Tabs */}
        <Card className="max-w-6xl mx-auto bg-white/10 border-white/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <Tabs defaultValue="social" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-lg">
                <TabsTrigger value="social" className="flex items-center gap-2 data-[state=active]:bg-purple-500/50 text-white">
                  <MessageSquare className="w-4 h-4" />
                  Redes Sociales
                </TabsTrigger>
                <TabsTrigger value="lovable" className="flex items-center gap-2 data-[state=active]:bg-purple-500/50 text-white">
                  <Rocket className="w-4 h-4" />
                  Prompt Lovable
                </TabsTrigger>
                <TabsTrigger value="chatgpt" className="flex items-center gap-2 data-[state=active]:bg-purple-500/50 text-white">
                  <Brain className="w-4 h-4" />
                  Prompt ChatGPT
                </TabsTrigger>
              </TabsList>

              <TabsContent value="social" className="mt-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <MessageSquare className="w-6 h-6" />
                        Contenido para Redes Sociales
                      </span>
                      <Button
                        onClick={() => copyToClipboard(socialMediaContent, "Contenido de Redes Sociales")}
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        {copiedContent === "Contenido de Redes Sociales" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-gray-100 whitespace-pre-wrap text-sm bg-black/20 p-4 rounded-lg overflow-auto max-h-96">
                      {socialMediaContent}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lovable" className="mt-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Rocket className="w-6 h-6" />
                        Prompt para Lovable
                      </span>
                      <Button
                        onClick={() => copyToClipboard(lovablePrompt, "Prompt para Lovable")}
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        {copiedContent === "Prompt para Lovable" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-gray-100 whitespace-pre-wrap text-sm bg-black/20 p-4 rounded-lg overflow-auto max-h-96">
                      {lovablePrompt}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chatgpt" className="mt-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Brain className="w-6 h-6" />
                        Prompt para ChatGPT
                      </span>
                      <Button
                        onClick={() => copyToClipboard(chatGPTPrompt, "Prompt para ChatGPT")}
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        {copiedContent === "Prompt para ChatGPT" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-gray-100 whitespace-pre-wrap text-sm bg-black/20 p-4 rounded-lg overflow-auto max-h-96">
                      {chatGPTPrompt}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="max-w-4xl mx-auto mt-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white text-center flex items-center justify-center gap-2">
              <TrendingUp className="w-6 h-6" />
              🎉 ¡Próximos pasos!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-green-100 text-lg">
              Ahora tienes todo lo necesario para potenciar tu presencia digital:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  📱 Redes Sociales
                </h4>
                <p className="text-gray-200 text-sm">Copia y adapta el contenido para tus reels y posts</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  🌐 Tu Página Web
                </h4>
                <p className="text-gray-200 text-sm">Usa el prompt de Lovable para crear tu sitio profesional</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
              <p className="text-blue-100 text-sm">
                <strong>Tip:</strong> Guarda estos prompts y úsalos para generar contenido constantemente. 
                ¡Tu marca ahora tiene una voz consistente y profesional!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Creator signature */}
        <div className="text-center mt-8">
          <p className="text-purple-300 text-sm">
            Diseñado y desarrollado por <span className="font-semibold text-purple-200">Esteban Montenegro</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
