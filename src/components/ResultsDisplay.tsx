
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Calendar, MessageSquare, Globe, Sparkles, ArrowLeft, Copy, Check, Mail, Phone } from "lucide-react";

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

interface ResultsDisplayProps {
  formData: FormData;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ formData, onReset }) => {
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  // Generate contact info section
  const contactInfo = () => {
    let contact = '';
    if (formData.email) contact += `📧 Email: ${formData.email}\n`;
    if (formData.whatsapp) contact += `📱 WhatsApp: +${formData.whatsapp}\n`;
    if (formData.website) contact += `🌐 Website: ${formData.website}\n`;
    if (formData.instagram) contact += `📱 Instagram: @${formData.instagram}\n`;
    return contact ? `${contact}` : '';
  };

  // Generate all Kit IA content
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
- Programa tus publicaciones para consistencia
${contactInfo()}`;

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

#${formData.marca.replace(/\s+/g, '')} #transformacion #crecimiento #${formData.estilo.toLowerCase()}
${contactInfo()}`;

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

  const chatGPTPrompt = `Eres un experto en marketing digital y creación de contenido para "${formData.marca}".

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
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-400 to-blue-400 p-4 rounded-2xl shadow-2xl">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
            Kit IA de Esteban
          </h1>
          <h2 className="text-2xl md:text-3xl text-white mb-6 font-semibold">
            ¡Tu Kit IA está listo!
          </h2>
          <p className="text-lg text-purple-100 max-w-4xl mx-auto leading-relaxed mb-6">
            Aquí tienes todo el contenido que necesitas para tu marca. ¡Úsalo con sabiduría!
          </p>
          <Button onClick={onReset} variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al formulario
          </Button>
        </div>

        <Card className="max-w-6xl mx-auto bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-white flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              ¡Tu Kit IA está listo! 🎉
            </CardTitle>
            <p className="text-purple-200 mt-4">
              Hemos generado contenido personalizado para <strong>{formData.marca}</strong>
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <Tabs defaultValue="plan" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white/10 mb-10 h-auto">
                <TabsTrigger 
                  value="plan" 
                  className="data-[state=active]:bg-white/20 text-white text-xs sm:text-sm px-2 py-3 h-auto whitespace-normal text-center"
                >
                  <div className="flex flex-col items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Plan 15 días</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="social" 
                  className="data-[state=active]:bg-white/20 text-white text-xs sm:text-sm px-2 py-3 h-auto whitespace-normal text-center"
                >
                  <div className="flex flex-col items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>Info redes</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="lovable" 
                  className="data-[state=active]:bg-white/20 text-white text-xs sm:text-sm px-2 py-3 h-auto whitespace-normal text-center"
                >
                  <div className="flex flex-col items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <span>Lovable.dev</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="chatgpt" 
                  className="data-[state=active]:bg-white/20 text-white text-xs sm:text-sm px-2 py-3 h-auto whitespace-normal text-center"
                >
                  <div className="flex flex-col items-center gap-1">
                    <Brain className="w-4 h-4" />
                    <span>ChatGPT Prompt</span>
                  </div>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="plan" className="space-y-4">
                <div className="bg-white/5 rounded-md p-4 text-white shadow-md backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Plan de Contenido para 15 Días
                    </h3>
                    <Button variant="secondary" size="sm" onClick={() => copyToClipboard(contentPlan, 'plan')} disabled={copiedStates['plan']}>
                      {copiedStates['plan'] ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copiedStates['plan'] ? 'Copiado!' : 'Copiar'}
                    </Button>
                  </div>
                  <div className="bg-gray-800/80 rounded-md p-4 font-mono text-sm whitespace-pre-wrap break-words overflow-x-auto">
                    {contentPlan}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                <div className="bg-white/5 rounded-md p-4 text-white shadow-md backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Contenido para Redes Sociales
                    </h3>
                    <Button variant="secondary" size="sm" onClick={() => copyToClipboard(socialMediaContent, 'social')} disabled={copiedStates['social']}>
                      {copiedStates['social'] ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copiedStates['social'] ? 'Copiado!' : 'Copiar'}
                    </Button>
                  </div>
                  <div className="bg-gray-800/80 rounded-md p-4 font-mono text-sm whitespace-pre-wrap break-words overflow-x-auto">
                    {socialMediaContent}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="lovable" className="space-y-4">
                <div className="bg-white/5 rounded-md p-4 text-white shadow-md backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Prompt para Lovable.dev (Web Automática)
                    </h3>
                    <Button variant="secondary" size="sm" onClick={() => copyToClipboard(lovablePrompt, 'lovable')} disabled={copiedStates['lovable']}>
                      {copiedStates['lovable'] ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copiedStates['lovable'] ? 'Copiado!' : 'Copiar'}
                    </Button>
                  </div>
                  <div className="bg-gray-800/80 rounded-md p-4 font-mono text-sm whitespace-pre-wrap break-words overflow-x-auto">
                    {lovablePrompt}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="chatgpt" className="space-y-4">
                <div className="bg-white/5 rounded-md p-4 text-white shadow-md backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      Prompt para ChatGPT (Asistente IA)
                    </h3>
                    <Button variant="secondary" size="sm" onClick={() => copyToClipboard(chatGPTPrompt, 'chatgpt')} disabled={copiedStates['chatgpt']}>
                      {copiedStates['chatgpt'] ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copiedStates['chatgpt'] ? 'Copiado!' : 'Copiar'}
                    </Button>
                  </div>
                  <div className="bg-gray-800/80 rounded-md p-4 font-mono text-sm whitespace-pre-wrap break-words overflow-x-auto">
                    {chatGPTPrompt}
                  </div>
                </div>
              </TabsContent>

            </Tabs>

            <div className="max-w-3xl mx-auto text-center text-purple-200 mt-12">
              <h3 className="text-xl font-semibold mb-4">¿Necesitas ayuda para implementar tu Kit IA?</h3>
              <p className="mb-6">Contáctame y te ayudaré a sacarle el máximo provecho a tu contenido.</p>
              <div className="flex items-center justify-center gap-4">
                <a href={`mailto:esteban.montenegro@gmail.com?subject=Ayuda con mi Kit IA de ${formData.marca}`} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded shadow-lg transition-colors duration-300 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contactar por Email
                </a>
                <a href="https://wa.me/56945487423?text=Hola%20Esteban,%20necesito%20ayuda%20con%20mi%20Kit%20IA" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded shadow-lg transition-colors duration-300 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contactar por WhatsApp
                </a>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultsDisplay;
