
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Mail, Globe, Instagram, Loader2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import ResultsDisplay from "@/components/ResultsDisplay";

interface FormData {
  marca: string;
  quien_eres: string;
  problemas: string;
  preguntas_frecuentes: string;
  estilo: string;
  producto: string;
  email: string;
  website: string;
  instagram: string;
}

const Index = () => {
  const [formData, setFormData] = useState<FormData>({
    marca: '',
    quien_eres: '',
    problemas: '',
    preguntas_frecuentes: '',
    estilo: '',
    producto: '',
    email: '',
    website: '',
    instagram: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateKitContent = (data: FormData) => {
    const contactInfo = () => {
      let contact = '';
      if (data.email) contact += `📧 Email: ${data.email}\n`;
      if (data.website) contact += `🌐 Website: ${data.website}\n`;
      if (data.instagram) contact += `📱 Instagram: @${data.instagram}\n`;
      return contact ? `\n\nINFORMACIÓN DE CONTACTO:\n${contact}` : '';
    };

    const contentPlan = `📅 PLAN DE CONTENIDO 15 DÍAS - ${data.marca}

🎯 SEMANA 1: PRESENTACIÓN Y CONEXIÓN

DÍA 1 - REEL PRESENTACIÓN:
"¡Hola! Soy parte de ${data.marca} 👋
${data.quien_eres.slice(0, 100)}...
¿Te resuena? ¡Sígueme para más contenido! 💫"

DÍA 2 - POST EDUCATIVO:
"💡 Mito vs Realidad sobre [tu área]:
${data.preguntas_frecuentes.slice(0, 120)}...
¿Qué opinas? Cuéntame en comentarios 👇"

DÍA 3 - HISTORIA PERSONAL:
"Mi historia: Por qué decidí ayudar con ${data.problemas.slice(0, 80)}...
Todo empezó cuando..."

DÍA 4 - CONSEJO RÁPIDO:
"⚡ Tip del día: Si sientes que ${data.problemas.slice(0, 60)}...
Prueba esto: [consejo específico]"

DÍA 5 - REEL EDUCATIVO:
"🔥 3 señales de que necesitas ${data.producto.slice(0, 50)}...
1. [Señal relacionada con el problema]
2. [Segunda señal]
3. [Tercera señal]"

🎯 SEMANA 2: VALOR Y AUTORIDAD

DÍA 6 - POST REFLEXIVO:
"¿Sabías que...? ${data.preguntas_frecuentes.slice(0, 100)}...
Mi experiencia me ha enseñado que..."

DÍA 7 - CONTENIDO DETRÁS DE CÁMARAS:
"Un día en mi vida trabajando en ${data.marca}
Así es como ayudo a [tu audiencia]..."

DÍA 8 - REEL MOTIVACIONAL:
"Para ti que sientes ${data.problemas.slice(0, 80)}...
Recuerda: [mensaje motivacional específico]"

DÍA 9 - FAQ INTERACTIVO:
"Pregúntame cualquier cosa sobre [tu área]
Las 3 preguntas más frecuentes que recibo..."

DÍA 10 - CASO DE ÉXITO:
"Historia de transformación: Cuando [cliente] llegó con ${data.problemas.slice(0, 60)}...
Así fue su proceso..."

🎯 SEMANA 3: PROMOCIÓN SUAVE

DÍA 11 - REEL DE PROCESO:
"¿Cómo funciona ${data.producto.slice(0, 50)}?
Te muestro paso a paso..."

DÍA 12 - TESTIMONIAL:
"Lo que dicen sobre trabajar conmigo:
[Crear testimonial basado en el problema que resuelves]"

DÍA 13 - POST DE VALOR:
"🎁 Recurso gratuito: Descarga mi guía sobre 
'Cómo [solucionar problema específico]'"

DÍA 14 - REEL LLAMADA A LA ACCIÓN:
"¿Lista/o para transformar ${data.problemas.slice(0, 50)}?
Escríbeme 'ME INTERESA' para más info 📩"

DÍA 15 - AGRADECIMIENTO Y CIERRE:
"Gracias por acompañarme estas 2 semanas
¿Cuál fue tu contenido favorito?
Seguimos creando valor juntos 💫"

📝 NOTAS IMPORTANTES:
- Adapta cada post a tu estilo: ${data.estilo}
- Incluye siempre un call-to-action
- Usa hashtags relevantes a tu nicho
- Programa tus publicaciones para consistencia${contactInfo()}`;

    const socialMediaContent = `🌟 CONTENIDO PARA REDES SOCIALES - ${data.marca}

📱 REEL PRESENTACIÓN (15-30 segundos):
"¡Hola! Soy parte de ${data.marca} 👋
${data.quien_eres}

Mi misión es ayudarte con: ${data.problemas}

¿Te resuena? ¡Sígueme para más contenido! 💫"${data.instagram ? `\n\n📍 Sígueme en Instagram: @${data.instagram}` : ''}

📝 POST EDUCATIVO:
"💡 ¿Sabías que...?
${data.preguntas_frecuentes}

En ${data.marca}, creemos que siempre hay una solución 🚀
${data.problemas}

¿Qué opinas? Cuéntame en comentarios 👇"

🎯 REEL DE PRODUCTO (30-60 segundos):
"¿Listo para transformar tu vida?
Te presento: ${data.producto}

✨ Diseñado especialmente para quienes:
${data.problemas}

¡Envíame DM para más información! 📩"${data.website ? `\nMás info en: ${data.website}` : ''}

📊 POST DE VALOR:
"🔥 3 señales de que necesitas ${data.producto}:
1. ${data.problemas}
2. Te sientes estancado/a en tu crecimiento
3. Buscas resultados reales y duraderos

¿Te identificas? Escríbeme 'ME INTERESA' 👇"

#${data.marca.replace(/\s+/g, '')} #transformacion #crecimiento #${data.estilo.toLowerCase()}${contactInfo()}`;

    const lovablePrompt = `Crea una página web profesional para "${data.marca}" con las siguientes especificaciones:

MARCA Y PERSONALIDAD:
- Nombre: ${data.marca}
- Estilo de comunicación: ${data.estilo}
- Descripción: ${data.quien_eres}${contactInfo()}

CONTENIDO PRINCIPAL:
- Problema que resuelve: ${data.problemas}
- Preguntas frecuentes: ${data.preguntas_frecuentes}
- Producto/servicio principal: ${data.producto}

ESTRUCTURA REQUERIDA:
1. Header con navegación y llamada a la acción prominente
2. Sección hero con propuesta de valor clara y emotiva
3. Sección "Sobre mí/nosotros" con historia personal
4. Sección de servicios/productos con beneficios claros
5. Testimonios (crear 3-4 ejemplos realistas y específicos)
6. FAQ basada en las preguntas frecuentes mencionadas
7. Footer con formulario de contacto y redes sociales${data.email || data.website || data.instagram ? `\n   - Incluir enlaces a: ${data.email ? `Email (${data.email})` : ''}${data.website ? `, Website (${data.website})` : ''}${data.instagram ? `, Instagram (@${data.instagram})` : ''}` : ''}

DISEÑO Y EXPERIENCIA:
- Estilo moderno, profesional y ${data.estilo.toLowerCase()}
- Paleta de colores que refleje la personalidad de la marca
- Gradientes sutiles y elementos visuales atractivos
- Animaciones suaves y transiciones elegantes
- Diseño completamente responsive
- Botones de llamada a la acción estratégicamente ubicados
- Secciones con testimonios reales y casos de éxito

FUNCIONALIDADES ESPECÍFICAS:
- Formulario de contacto funcional con validación${data.email ? ` (enviar a ${data.email})` : ''}
- Navegación suave entre secciones (smooth scroll)
- Efectos hover en botones, tarjetas e imágenes
- Modal para testimonios expandidos
- Sección de preguntas frecuentes interactiva
- Optimizado para conversión y generación de leads
- Integración con redes sociales${data.instagram ? ` (especialmente Instagram @${data.instagram})` : ''}

CONTENIDO PERSONALIZADO:
- Textos que reflejen el problema: "${data.problemas}"
- FAQ que responda: "${data.preguntas_frecuentes}"
- CTA enfocados en: "${data.producto}"
- Tono de comunicación: ${data.estilo}

COMPONENTES TÉCNICOS:
- Usa componentes de shadcn/ui para consistencia
- Implementa Tailwind CSS para el diseño
- Añade animaciones con framer-motion si es necesario
- Crea componentes reutilizables y modulares
- Optimiza para SEO básico (meta tags, estructura)

El objetivo es crear una experiencia web que genere confianza, eduque al visitante sobre el problema que resuelves, y los motive a contactarte o comprar tu producto/servicio.`;

    const chatGPTPrompt = `Eres un experto en marketing digital y creación de contenido para "${data.marca}".

CONTEXTO DE LA MARCA:
- Nombre: ${data.marca}
- Quién soy: ${data.quien_eres}
- Problema que resuelvo: ${data.problemas}
- Preguntas que me hacen: ${data.preguntas_frecuentes}
- Estilo de comunicación: ${data.estilo}
- Producto principal: ${data.producto}${contactInfo()}

INSTRUCCIONES PRINCIPALES:
1. Siempre responde en un tono ${data.estilo.toLowerCase()} y auténtico
2. Enfócate en resolver este problema específico: ${data.problemas}
3. Usa ejemplos y casos relacionados con mi experiencia
4. Menciona "${data.producto}" cuando sea relevante para la conversación
5. Crea contenido que genere engagement, confianza y conversiones
6. Adapta el mensaje según la plataforma (Instagram, LinkedIn, Facebook, etc.)${data.instagram ? `\n7. Cuando sea apropiado, menciona mi Instagram @${data.instagram}` : ''}${data.website ? `\n8. Dirige tráfico a mi website ${data.website} cuando sea relevante` : ''}

ESPECIALIDADES EN LAS QUE PUEDES AYUDARME:
📱 CONTENIDO PARA REDES SOCIALES:
- Posts para Instagram, Facebook, LinkedIn, TikTok
- Ideas para Reels y videos cortos
- Carruseles educativos
- Stories interactivos
- Captions que generen engagement

📧 MARKETING DIRECTO:
- Emails de nurturing${data.email ? ` (desde ${data.email})` : ''}
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
Mi audiencia ideal son personas que: ${data.problemas}
Frecuentemente me preguntan: ${data.preguntas_frecuentes}
Mi estilo es: ${data.estilo}

¿En qué área específica te gustaría que te ayude hoy con el contenido de ${data.marca}?`;

    return {
      contentPlan,
      socialMediaContent,
      lovablePrompt,
      chatGPTPrompt
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.marca || !formData.quien_eres || !formData.problemas || 
        !formData.preguntas_frecuentes || !formData.estilo || !formData.producto) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("🚀 Iniciando envío del formulario con datos:", formData);

    try {
      // Generar contenido del kit
      const kitContent = generateKitContent(formData);
      
      // Crear el enlace dinámico con codificación correcta
      const dataToEncode = { formData };
      const encodedData = btoa(encodeURIComponent(JSON.stringify(dataToEncode)));
      const currentUrl = window.location.origin;
      const kitUrl = `${currentUrl}/kit/${encodedData}`;
      
      console.log("📧 URL del kit generada:", kitUrl);

      // Crear archivos de texto para adjuntos
      const attachments = [
        {
          filename: `${formData.marca}_Plan_Contenido_15_Dias.txt`,
          content: Buffer.from(kitContent.contentPlan, 'utf8').toString('base64')
        },
        {
          filename: `${formData.marca}_Contenido_Redes_Sociales.txt`,
          content: Buffer.from(kitContent.socialMediaContent, 'utf8').toString('base64')
        },
        {
          filename: `${formData.marca}_Prompt_Lovable.txt`,
          content: Buffer.from(kitContent.lovablePrompt, 'utf8').toString('base64')
        },
        {
          filename: `${formData.marca}_Prompt_ChatGPT.txt`,
          content: Buffer.from(kitContent.chatGPTPrompt, 'utf8').toString('base64')
        }
      ];

      // Preparar datos para el correo
      const emailData = {
        to: [
          { email: formData.email, name: formData.marca },
          { email: "esteban.montenegro@gmail.com", name: "Esteban Montenegro" }
        ],
        from: { email: "esteban.montenegro@gmail.com", name: "Kit IA Generator" },
        subject: `🎉 Tu Kit IA está listo - ${formData.marca}`,
        htmlContent: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tu Kit IA está listo - ${formData.marca}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; margin-top: 20px; margin-bottom: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🎉 ¡Tu Kit IA está listo!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Kit personalizado para ${formData.marca}</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
            <h2 style="color: #333; margin-top: 0; font-size: 22px;">¡Hola! Tu contenido personalizado está listo 🚀</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
                Hemos generado tu Kit IA completo basado en la información de <strong>${formData.marca}</strong>. 
                Encontrarás todo el contenido que necesitas para potenciar tu presencia digital.
            </p>

            <!-- Brand Details -->
            <div style="background: #f8f9ff; border-radius: 12px; padding: 20px; margin-bottom: 25px; border-left: 4px solid #667eea;">
                <h3 style="color: #333; margin-top: 0; font-size: 18px;">📋 Resumen de tu marca:</h3>
                <ul style="color: #666; line-height: 1.6; margin: 0; padding-left: 20px;">
                    <li><strong>Marca:</strong> ${formData.marca}</li>
                    <li><strong>Estilo:</strong> ${formData.estilo}</li>
                    <li><strong>Problema que resuelves:</strong> ${formData.problemas.slice(0, 80)}...</li>
                    <li><strong>Producto principal:</strong> ${formData.producto.slice(0, 80)}...</li>
                </ul>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="${kitUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: transform 0.2s;">
                    🎯 Ver mi Kit IA Completo
                </a>
            </div>

            <!-- What's Included -->
            <h3 style="color: #333; font-size: 18px; margin-bottom: 15px;">📦 Tu kit incluye:</h3>
            <div style="background: #f8f9ff; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
                <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                    <span style="color: #667eea; font-size: 18px; margin-right: 10px;">📅</span>
                    <div>
                        <strong style="color: #333;">Plan de Contenido 15 Días</strong>
                        <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Contenido estructurado listo para publicar en redes sociales</p>
                    </div>
                </div>
                <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                    <span style="color: #667eea; font-size: 18px; margin-right: 10px;">📱</span>
                    <div>
                        <strong style="color: #333;">Contenido para Redes Sociales</strong>
                        <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Posts, reels y captions personalizados para tu marca</p>
                    </div>
                </div>
                <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                    <span style="color: #667eea; font-size: 18px; margin-right: 10px;">🌐</span>
                    <div>
                        <strong style="color: #333;">Prompt para tu Página Web</strong>
                        <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Usa Lovable.dev para crear tu sitio web profesional</p>
                    </div>
                </div>
                <div style="display: flex; align-items: flex-start;">
                    <span style="color: #667eea; font-size: 18px; margin-right: 10px;">🤖</span>
                    <div>
                        <strong style="color: #333;">Asistente ChatGPT Personalizado</strong>
                        <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Tu experto en marketing personalizado disponible 24/7</p>
                    </div>
                </div>
            </div>

            <!-- Files Attached -->
            <div style="background: #e8f4f8; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
                <h4 style="color: #333; margin-top: 0; font-size: 16px;">📎 Archivos adjuntos en este correo:</h4>
                <ul style="color: #666; margin: 0; padding-left: 20px; font-size: 14px;">
                    <li>Plan de Contenido 15 Días (.txt)</li>
                    <li>Contenido para Redes Sociales (.txt)</li>
                    <li>Prompt para Lovable (.txt)</li>
                    <li>Prompt para ChatGPT (.txt)</li>
                </ul>
            </div>

            <!-- Instructions -->
            <div style="background: #fff3cd; border-radius: 12px; padding: 20px; margin-bottom: 25px; border-left: 4px solid #ffc107;">
                <h4 style="color: #856404; margin-top: 0; font-size: 16px;">💡 Cómo usar tu Kit IA:</h4>
                <ol style="color: #856404; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
                    <li>Haz clic en el botón azul para acceder a tu kit online</li>
                    <li>Descarga los archivos adjuntos para tener todo offline</li>
                    <li>Usa el contenido del plan de 15 días para tus redes sociales</li>
                    <li>Copia el prompt de Lovable para crear tu página web</li>
                    <li>Usa el prompt de ChatGPT para generar más contenido</li>
                </ol>
            </div>

            <!-- Value -->
            <div style="text-align: center; background: #d1ecf1; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
                <h4 style="color: #0c5460; margin: 0; font-size: 16px;">🎁 Valor de tu Kit IA: <span style="font-size: 20px;">USD $50</span></h4>
                <p style="color: #0c5460; margin: 10px 0 0 0; font-size: 14px;">¡Guárdalo y úsalo para crear contenido constantemente!</p>
            </div>

            <p style="color: #666; line-height: 1.6; margin-bottom: 0;">
                ¡Esperamos que este kit te ayude a potenciar tu marca y generar más engagement con tu audiencia!
            </p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="color: #6c757d; margin: 0; font-size: 14px;">
                Kit IA diseñado por <strong>Esteban Montenegro</strong><br>
                ¿Tienes preguntas? Responde a este correo.
            </p>
        </div>
    </div>
</body>
</html>`,
        attachments: attachments
      };

      console.log("📧 Enviando correos a:", emailData.to.map(t => t.email));

      const promises = emailData.to.map(async (recipient) => {
        const individualEmailData = {
          ...emailData,
          to: [recipient]
        };

        console.log(`📤 Enviando correo a: ${recipient.email}`);
        
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': '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'
          },
          body: JSON.stringify(individualEmailData)
        });

        const result = await response.json();
        console.log(`✅ Respuesta para ${recipient.email}:`, result);

        if (!response.ok) {
          console.error(`❌ Error enviando a ${recipient.email}:`, result);
          throw new Error(`Error al enviar correo a ${recipient.email}: ${result.message || response.statusText}`);
        }

        return { email: recipient.email, success: true, result };
      });

      const results = await Promise.allSettled(promises);
      
      const successful = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;

      console.log(`📊 Resumen de envíos: ${successful} exitosos, ${failed} fallidos`);

      if (successful > 0) {
        toast({
          title: "🎉 ¡Kit IA generado exitosamente!",
          description: `Correos enviados (${successful}/${results.length}). Revisa tu bandeja de entrada.`,
        });
        setShowResults(true);
      } else {
        throw new Error("No se pudo enviar ningún correo");
      }

    } catch (error) {
      console.error('❌ Error general:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al generar tu Kit IA. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setShowResults(false);
    setFormData({
      marca: '',
      quien_eres: '',
      problemas: '',
      preguntas_frecuentes: '',
      estilo: '',
      producto: '',
      email: '',
      website: '',
      instagram: ''
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (showResults) {
    return <ResultsDisplay formData={formData} onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-green-800">AI</span>
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Crea tu Kit IA<br />
            <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              Personalizado
            </span>
          </h1>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Genera contenido profesional para 15 días, prompts personalizados y tu página web 
            con inteligencia artificial en menos de 2 minutos
          </p>
        </div>

        {/* Form */}
        <Card className="max-w-4xl mx-auto bg-white/10 border-white/20 backdrop-blur-xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl text-white mb-4">
              🚀 Generador de Kit IA
            </CardTitle>
            <p className="text-purple-200">
              Completa el formulario y recibe tu kit personalizado por correo
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Grid Layout for better organization */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="marca" className="text-white font-medium">
                      Nombre de tu marca o negocio *
                    </Label>
                    <Input
                      id="marca"
                      value={formData.marca}
                      onChange={(e) => handleInputChange('marca', e.target.value)}
                      placeholder="Ej: Coaching Transformacional"
                      className="bg-white/90 border-gray-300 text-gray-800 placeholder-gray-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="problemas" className="text-white font-medium">
                      ¿Qué problema resuelves? *
                    </Label>
                    <Textarea
                      id="problemas"
                      value={formData.problemas}
                      onChange={(e) => handleInputChange('problemas', e.target.value)}
                      placeholder="Ej: Ayudo a mujeres emprendedoras que se sienten bloqueadas y no saben cómo hacer crecer su negocio..."
                      className="bg-white/90 border-gray-300 text-gray-800 placeholder-gray-500 min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estilo" className="text-white font-medium">
                      ¿Cuál es tu estilo de comunicación? *
                    </Label>
                    <Select value={formData.estilo} onValueChange={(value) => handleInputChange('estilo', value)}>
                      <SelectTrigger className="bg-white/90 border-gray-300 text-gray-800">
                        <SelectValue placeholder="Selecciona tu estilo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Profesional">Profesional</SelectItem>
                        <SelectItem value="Cercano y amigable">Cercano y amigable</SelectItem>
                        <SelectItem value="Motivacional">Motivacional</SelectItem>
                        <SelectItem value="Directo">Directo</SelectItem>
                        <SelectItem value="Divertido">Divertido</SelectItem>
                        <SelectItem value="Inspiracional">Inspiracional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="quien_eres" className="text-white font-medium">
                      ¿Quién eres y qué haces? *
                    </Label>
                    <Textarea
                      id="quien_eres"
                      value={formData.quien_eres}
                      onChange={(e) => handleInputChange('quien_eres', e.target.value)}
                      placeholder="Ej: Soy María González, coach certificada con 5 años de experiencia ayudando a mujeres a superar sus miedos..."
                      className="bg-white/90 border-gray-300 text-gray-800 placeholder-gray-500 min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preguntas_frecuentes" className="text-white font-medium">
                      ¿Qué te preguntan más seguido? *
                    </Label>
                    <Textarea
                      id="preguntas_frecuentes"
                      value={formData.preguntas_frecuentes}
                      onChange={(e) => handleInputChange('preguntas_frecuentes', e.target.value)}
                      placeholder="Ej: ¿Cómo puedo superar el miedo al fracaso? ¿Cuánto tiempo toma ver resultados? ¿Funciona para cualquier edad?"
                      className="bg-white/90 border-gray-300 text-gray-800 placeholder-gray-500 min-h-[120px]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Full Width Fields */}
              <div className="space-y-2">
                <Label htmlFor="producto" className="text-white font-medium">
                  ¿Cuál es tu producto o servicio principal? *
                </Label>
                <Textarea
                  id="producto"
                  value={formData.producto}
                  onChange={(e) => handleInputChange('producto', e.target.value)}
                  placeholder="Ej: Programa de coaching 1:1 de 3 meses para transformar creencias limitantes y crear un plan de acción claro..."
                  className="bg-white/90 border-gray-300 text-gray-800 placeholder-gray-500"
                  required
                />
              </div>

              {/* Contact Information */}
              <div className="bg-white/5 rounded-lg p-6 space-y-4">
                <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Información de Contacto
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="tu@email.com"
                      className="bg-white/90 border-gray-300 text-gray-800 placeholder-gray-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-white font-medium flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Website (opcional)
                    </Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="www.tusitio.com"
                      className="bg-white/90 border-gray-300 text-gray-800 placeholder-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="text-white font-medium flex items-center gap-2">
                      <Instagram className="w-4 h-4" />
                      Instagram (opcional)
                    </Label>
                    <Input
                      id="instagram"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange('instagram', e.target.value)}
                      placeholder="tuusuario"
                      className="bg-white/90 border-gray-300 text-gray-800 placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 text-white font-bold py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generando tu Kit IA...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    🚀 Generar mi Kit IA
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">Contenido 15 Días</h3>
              <p className="text-purple-200 text-sm">Posts, reels y contenido estructurado listo para publicar</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-green-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">Tu Página Web</h3>
              <p className="text-purple-200 text-sm">Prompt personalizado para crear tu sitio con Lovable</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">ChatGPT Personalizado</h3>
              <p className="text-purple-200 text-sm">Tu asistente de marketing personalizado 24/7</p>
            </CardContent>
          </Card>
        </div>

        {/* Creator signature */}
        <div className="text-center mt-12">
          <p className="text-purple-300 text-sm">
            Creado con ❤️ por <span className="font-semibold text-purple-200">Esteban Montenegro</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
