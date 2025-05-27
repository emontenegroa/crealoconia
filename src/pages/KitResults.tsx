
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Calendar, MessageSquare, Rocket, Brain, ExternalLink, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useState } from 'react';

const KitResults = () => {
  const { id } = useParams();
  const [copiedContent, setCopiedContent] = useState<string | null>(null);

  // Decodificar los datos del URL
  const decodedData = React.useMemo(() => {
    try {
      if (!id) return null;
      const decoded = atob(id);
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Error decodificando datos:', error);
      return null;
    }
  }, [id]);

  const copyToClipboard = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopiedContent(type);
    toast({
      title: "¡Copiado!",
      description: `${type} copiado al portapapeles`,
    });
    setTimeout(() => setCopiedContent(null), 2000);
  };

  if (!decodedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-white/10 border-white/20 backdrop-blur-xl">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Kit IA no encontrado</h1>
            <p className="text-purple-200">El enlace no es válido o ha expirado.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { formData } = decodedData;

  // Generate contact info section for prompts
  const contactInfo = () => {
    let contact = '';
    if (formData.email) contact += `📧 Email: ${formData.email}\n`;
    if (formData.website) contact += `🌐 Website: ${formData.website}\n`;
    if (formData.instagram) contact += `📱 Instagram: @${formData.instagram}\n`;
    return contact ? `\n\nINFORMACIÓN DE CONTACTO:\n${contact}` : '';
  };

  const contentPlan = `📅 PLAN DE CONTENIDO 15 DÍAS - ${formData.marca}

🎯 SEMANA 1: PRESENTACIÓN Y CONEXIÓN

DÍA 1 - REEL PRESENTACIÓN:
"¡Hola! Soy parte de ${formData.marca} 👋
${formData.quien_eres.slice(0, 100)}...
¿Te resuena? ¡Sígueme para más contenido! 💫"

DÍA 2 - POST EDUCATIVO:
"💡 Mito vs Realidad sobre [tu área]:
${formData.preguntas_frecuentes.slice(0, 120)}...
¿Qué opinas? Cuéntame en comentarios 👇"

DÍA 3 - HISTORIA PERSONAL:
"Mi historia: Por qué decidí ayudar con ${formData.problemas.slice(0, 80)}...
Todo empezó cuando..."

DÍA 4 - CONSEJO RÁPIDO:
"⚡ Tip del día: Si sientes que ${formData.problemas.slice(0, 60)}...
Prueba esto: [consejo específico]"

DÍA 5 - REEL EDUCATIVO:
"🔥 3 señales de que necesitas ${formData.producto.slice(0, 50)}...
1. [Señal relacionada con el problema]
2. [Segunda señal]
3. [Tercera señal]"

🎯 SEMANA 2: VALOR Y AUTORIDAD

DÍA 6 - POST REFLEXIVO:
"¿Sabías que...? ${formData.preguntas_frecuentes.slice(0, 100)}...
Mi experiencia me ha enseñado que..."

DÍA 7 - CONTENIDO DETRÁS DE CÁMARAS:
"Un día en mi vida trabajando en ${formData.marca}
Así es como ayudo a [tu audiencia]..."

DÍA 8 - REEL MOTIVACIONAL:
"Para ti que sientes ${formData.problemas.slice(0, 80)}...
Recuerda: [mensaje motivacional específico]"

DÍA 9 - FAQ INTERACTIVO:
"Pregúntame cualquier cosa sobre [tu área]
Las 3 preguntas más frecuentes que recibo..."

DÍA 10 - CASO DE ÉXITO:
"Historia de transformación: Cuando [cliente] llegó con ${formData.problemas.slice(0, 60)}...
Así fue su proceso..."

🎯 SEMANA 3: PROMOCIÓN SUAVE

DÍA 11 - REEL DE PROCESO:
"¿Cómo funciona ${formData.producto.slice(0, 50)}?
Te muestro paso a paso..."

DÍA 12 - TESTIMONIAL:
"Lo que dicen sobre trabajar conmigo:
[Crear testimonial basado en el problema que resuelves]"

DÍA 13 - POST DE VALOR:
"🎁 Recurso gratuito: Descarga mi guía sobre 
'Cómo [solucionar problema específico]'"

DÍA 14 - REEL LLAMADA A LA ACCIÓN:
"¿Lista/o para transformar ${formData.problemas.slice(0, 50)}?
Escríbeme 'ME INTERESA' para más info 📩"

DÍA 15 - AGRADECIMIENTO Y CIERRE:
"Gracias por acompañarme estas 2 semanas
¿Cuál fue tu contenido favorito?
Seguimos creando valor juntos 💫"

📝 NOTAS IMPORTANTES:
- Adapta cada post a tu estilo: ${formData.estilo}
- Incluye siempre un call-to-action
- Usa hashtags relevantes a tu nicho
- Programa tus publicaciones para consistencia${contactInfo()}`;

  const socialMediaContent = `🌟 CONTENIDO PARA REDES SOCIALES - ${formData.marca}

📱 REEL PRESENTACIÓN (15-30 segundos):
"¡Hola! Soy parte de ${formData.marca} 👋
${formData.quien_eres}

Mi misión es ayudarte con: ${formData.problemas}

¿Te resuena? ¡Sígueme para más contenido! 💫"${formData.instagram ? `\n\n📍 Sígueme en Instagram: @${formData.instagram}` : ''}

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

¡Envíame DM para más información! 📩"${formData.website ? `\nMás info en: ${formData.website}` : ''}

📊 POST DE VALOR:
"🔥 3 señales de que necesitas ${formData.producto}:
1. ${formData.problemas}
2. Te sientes estancado/a en tu crecimiento
3. Buscas resultados reales y duraderos

¿Te identificas? Escríbeme 'ME INTERESA' 👇"

#${formData.marca.replace(/\s+/g, '')} #transformacion #crecimiento #${formData.estilo.toLowerCase()}${contactInfo()}`;

  const lovablePrompt = `Crea una página web profesional para "${formData.marca}" con las siguientes especificaciones:

MARCA Y PERSONALIDAD:
- Nombre: ${formData.marca}
- Estilo de comunicación: ${formData.estilo}
- Descripción: ${formData.quien_eres}${contactInfo()}

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
7. Footer con formulario de contacto y redes sociales${formData.email || formData.website || formData.instagram ? `\n   - Incluir enlaces a: ${formData.email ? `Email (${formData.email})` : ''}${formData.website ? `, Website (${formData.website})` : ''}${formData.instagram ? `, Instagram (@${formData.instagram})` : ''}` : ''}

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
- Integración con redes sociales${formData.instagram ? ` (especialmente Instagram @${formData.instagram})` : ''}

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
- Producto principal: ${formData.producto}${contactInfo()}

INSTRUCCIONES PRINCIPALES:
1. Siempre responde en un tono ${formData.estilo.toLowerCase()} y auténtico
2. Enfócate en resolver este problema específico: ${formData.problemas}
3. Usa ejemplos y casos relacionados con mi experiencia
4. Menciona "${formData.producto}" cuando sea relevante para la conversación
5. Crea contenido que genere engagement, confianza y conversiones
6. Adapta el mensaje según la plataforma (Instagram, LinkedIn, Facebook, etc.)${formData.instagram ? `\n7. Cuando sea apropiado, menciona mi Instagram @${formData.instagram}` : ''}${formData.website ? `\n8. Dirige tráfico a mi website ${formData.website} cuando sea relevante` : ''}

ESPECIALIDADES EN LAS QUE PUEDES AYUDARME:
📱 CONTENIDO PARA REDES SOCIALES:
- Posts para Instagram, Facebook, LinkedIn, TikTok
- Ideas para Reels y videos cortos
- Carruseles educativos
- Stories interactivos
- Captions que generen engagement

📧 MARKETING DIRECTO:
- Emails de nurturing${formData.email ? ` (desde ${formData.email})` : ''}
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

      <div className="relative z-10 container mx-auto px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Badge className="mb-4 bg-green-500/20 text-green-200 border-green-400/50 px-3 py-2 text-sm sm:text-lg">
            ✅ Kit IA de {formData.marca}
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Tu Kit IA Personalizado
          </h1>
          <p className="text-purple-100 text-base sm:text-lg mb-4 sm:mb-6 max-w-2xl mx-auto px-4">
            Aquí tienes todo el contenido personalizado para <strong className="text-white">{formData.marca}</strong>
          </p>
        </div>

        {/* Results Tabs */}
        <Card className="max-w-6xl mx-auto bg-white/10 border-white/20 backdrop-blur-xl">
          <CardContent className="p-3 sm:p-6">
            <Tabs defaultValue="content-plan" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white/10 backdrop-blur-lg gap-1 p-1">
                <TabsTrigger 
                  value="content-plan" 
                  className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 data-[state=active]:bg-purple-500/50 text-white text-xs sm:text-sm px-2 py-3 min-h-[50px] sm:min-h-[44px]"
                >
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span className="text-center leading-tight">Plan 15 Días</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="social" 
                  className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 data-[state=active]:bg-purple-500/50 text-white text-xs sm:text-sm px-2 py-3 min-h-[50px] sm:min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  <span className="text-center leading-tight">Redes Sociales</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="lovable" 
                  className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 data-[state=active]:bg-purple-500/50 text-white text-xs sm:text-sm px-2 py-3 min-h-[50px] sm:min-h-[44px]"
                >
                  <Rocket className="w-4 h-4 flex-shrink-0" />
                  <span className="text-center leading-tight">Web Lovable</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="chatgpt" 
                  className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 data-[state=active]:bg-purple-500/50 text-white text-xs sm:text-sm px-2 py-3 min-h-[50px] sm:min-h-[44px]"
                >
                  <Brain className="w-4 h-4 flex-shrink-0" />
                  <span className="text-center leading-tight">ChatGPT</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content-plan" className="mt-4 sm:mt-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-base sm:text-lg">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                        Plan de Contenido 15 Días
                      </span>
                      <Button
                        onClick={() => copyToClipboard(contentPlan, "Plan de Contenido 15 Días")}
                        variant="outline"
                        size="sm"
                        className="bg-white/90 border-gray-300 text-gray-800 hover:bg-white hover:text-gray-900 w-full sm:w-auto text-xs sm:text-sm px-3 py-2"
                      >
                        {copiedContent === "Plan de Contenido 15 Días" ? (
                          <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                          <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                        <span className="ml-1 sm:ml-2">Copiar Todo</span>
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <pre className="text-gray-100 whitespace-pre-wrap text-xs sm:text-sm bg-black/20 p-3 sm:p-4 rounded-lg overflow-auto max-h-60 sm:max-h-96">
                      {contentPlan}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="social" className="mt-4 sm:mt-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-base sm:text-lg">
                        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                        Contenido para Redes Sociales
                      </span>
                      <Button
                        onClick={() => copyToClipboard(socialMediaContent, "Contenido de Redes Sociales")}
                        variant="outline"
                        size="sm"
                        className="bg-white/90 border-gray-300 text-gray-800 hover:bg-white hover:text-gray-900 w-full sm:w-auto text-xs sm:text-sm px-3 py-2"
                      >
                        {copiedContent === "Contenido de Redes Sociales" ? (
                          <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                          <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                        <span className="ml-1 sm:ml-2">Copiar Todo</span>
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <pre className="text-gray-100 whitespace-pre-wrap text-xs sm:text-sm bg-black/20 p-3 sm:p-4 rounded-lg overflow-auto max-h-60 sm:max-h-96">
                      {socialMediaContent}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lovable" className="mt-4 sm:mt-6">
                <Card className="bg-blue-500/20 border-blue-400/30 mb-4 sm:mb-6">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-white flex items-center gap-2 text-base sm:text-lg">
                      <Info className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      🚀 Cómo usar este prompt en Lovable
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <div className="text-blue-100 space-y-2 text-sm sm:text-base">
                      <p><strong className="text-white">Paso 1:</strong> Ve a <span className="bg-blue-600/50 px-2 py-1 rounded text-blue-200">lovable.dev</span> y crea un nuevo proyecto</p>
                      <p><strong className="text-white">Paso 2:</strong> En el chat de la izquierda, pega todo el prompt de abajo</p>
                      <p><strong className="text-white">Paso 3:</strong> Espera a que Lovable genere tu página web completa</p>
                      <p><strong className="text-white">Paso 4:</strong> Publica tu sitio con un solo clic</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-3">
                      <Button
                        onClick={() => window.open('https://lovable.dev', '_blank')}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-3 py-2 w-full sm:w-auto"
                      >
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                        Ir a Lovable
                      </Button>
                      <span className="text-blue-200 text-xs sm:text-sm">↗️ Se abre en nueva pestaña</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-base sm:text-lg">
                        <Rocket className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                        Prompt para Lovable
                      </span>
                      <Button
                        onClick={() => copyToClipboard(lovablePrompt, "Prompt para Lovable")}
                        variant="outline"
                        size="sm"
                        className="bg-white/90 border-gray-300 text-gray-800 hover:bg-white hover:text-gray-900 w-full sm:w-auto text-xs sm:text-sm px-3 py-2"
                      >
                        {copiedContent === "Prompt para Lovable" ? (
                          <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                          <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                        <span className="ml-1 sm:ml-2">Copiar Todo</span>
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <pre className="text-gray-100 whitespace-pre-wrap text-xs sm:text-sm bg-black/20 p-3 sm:p-4 rounded-lg overflow-auto max-h-60 sm:max-h-96">
                      {lovablePrompt}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chatgpt" className="mt-4 sm:mt-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-base sm:text-lg">
                        <Brain className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                        Prompt para ChatGPT
                      </span>
                      <Button
                        onClick={() => copyToClipboard(chatGPTPrompt, "Prompt para ChatGPT")}
                        variant="outline"
                        size="sm"
                        className="bg-white/90 border-gray-300 text-gray-800 hover:bg-white hover:text-gray-900 w-full sm:w-auto text-xs sm:text-sm px-3 py-2"
                      >
                        {copiedContent === "Prompt para ChatGPT" ? (
                          <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                          <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                        <span className="ml-1 sm:ml-2">Copiar Todo</span>
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <pre className="text-gray-100 whitespace-pre-wrap text-xs sm:text-sm bg-black/20 p-3 sm:p-4 rounded-lg overflow-auto max-h-60 sm:max-h-96">
                      {chatGPTPrompt}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KitResults;
