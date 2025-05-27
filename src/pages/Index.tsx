import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Brain, Rocket, Users, MessageSquare, TrendingUp, Zap, Mail, Globe, Instagram, Phone, Clock, Target, Star, AlertCircle } from "lucide-react";
import FormField from '@/components/FormField';
import ResultsDisplay from '@/components/ResultsDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import { toast } from "@/hooks/use-toast";
import { useFormPersistence } from '@/hooks/useFormPersistence';

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

const Index = () => {
  const [formData, setFormData] = useState<FormData>({
    marca: '',
    quien_eres: '',
    problemas: '',
    preguntas_frecuentes: '',
    estilo: '',
    producto: '',
    email: '',
    whatsapp: '',
    website: '',
    instagram: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [noWebsite, setNoWebsite] = useState(false);
  const [noInstagram, setNoInstagram] = useState(false);
  const [showProgressDialog, setShowProgressDialog] = useState(false);
  const [previousProgress, setPreviousProgress] = useState<FormData | null>(null);

  const {
    sessionId,
    attemptCount,
    loadPreviousProgress,
    checkAttemptLimit,
    saveProgress,
    markAsCompleted,
  } = useFormPersistence();

  // Verificar progreso previo cuando se ingresa el email
  useEffect(() => {
    const checkPreviousProgress = async () => {
      if (formData.email && formData.email.includes('@') && !showProgressDialog) {
        const progress = await loadPreviousProgress(formData.email);
        if (progress && Object.values(progress).some(value => value.trim() !== '')) {
          setPreviousProgress(progress);
          setShowProgressDialog(true);
        }
      }
    };

    const timeoutId = setTimeout(checkPreviousProgress, 1000);
    return () => clearTimeout(timeoutId);
  }, [formData.email]);

  // Guardar progreso automáticamente cada 30 segundos
  useEffect(() => {
    if (formData.email && Object.values(formData).some(value => value.trim() !== '')) {
      const interval = setInterval(() => {
        saveProgress(formData);
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [formData]);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAIUsageUpdate = (fieldName: string, count: number) => {
    // Actualizar el estado local si es necesario
    console.log(`Campo ${fieldName} ha usado IA ${count} veces`);
  };

  const loadPreviousData = () => {
    if (previousProgress) {
      setFormData(previousProgress);
      setNoWebsite(!previousProgress.website);
      setNoInstagram(!previousProgress.instagram);
      setShowProgressDialog(false);
      toast({
        title: "Progreso cargado",
        description: "Hemos restaurado tu progreso anterior. Puedes continuar donde lo dejaste.",
      });
    }
  };

  const startFresh = () => {
    setShowProgressDialog(false);
    toast({
      title: "Nuevo formulario",
      description: "Comenzando un formulario nuevo desde cero.",
    });
  };

  const loadExampleData = () => {
    setFormData({
      marca: 'Luz Interior Coaching',
      email: 'carolina@luzinteriorcoaching.com',
      whatsapp: '56945487423',
      website: 'www.luzinteriorcoaching.com',
      instagram: 'luzinteriorcoaching',
      quien_eres: 'Soy Carolina, coach de vida certificada con 8 años de experiencia. Me apasiona acompañar a mujeres emprendedoras y profesionales que buscan reconectar con su propósito de vida y desarrollar todo su potencial. Disfruto profundamente crear espacios seguros donde mis clientas pueden explorar sus emociones, desbloquear sus miedos y diseñar la vida que realmente desean vivir.',
      problemas: 'Mis clientas suelen llegar a mí sintiéndose bloqueadas emocionalmente, con una sensación constante de estar viviendo en piloto automático sin conexión con lo que realmente las hace felices. Muchas experimentan el síndrome del impostor, miedo al fracaso y dificultades para tomar decisiones importantes. Yo las ayudo a través de un proceso de autoconocimiento profundo, técnicas de PNL y ejercicios prácticos que les permiten recuperar su claridad mental, confianza y dirección en la vida.',
      preguntas_frecuentes: 'Me preguntan constantemente si realmente es posible cambiar de vida después de los 35 o 40 años, especialmente cuando ya tienen responsabilidades familiares y económicas. También me consultan sobre cómo saber si están tomando la decisión correcta y cómo superar el miedo al juicio de otros. Me encanta explicar que la transformación es posible a cualquier edad y que el momento perfecto no existe, pero el momento presente sí.',
      estilo: 'Inspirador',
      producto: 'Mi programa insignia "Renace: Transforma tu Vida en 90 Días", un proceso de coaching integral que incluye 8 sesiones individuales, un workbook personalizado, meditaciones guiadas y acceso a mi comunidad privada de mujeres en transformación. El programa está diseñado para mujeres que quieren hacer cambios profundos y duraderos en su vida personal y profesional.'
    });
    setNoWebsite(false);
    setNoInstagram(false);
  };

  const sendEmailToAdmin = async (formData: FormData) => {
    const BREVO_API_KEY = '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';
    
    try {
      console.log('🚀 Enviando email a Esteban con datos del formulario...');
      
      const emailData = {
        sender: {
          name: "Kit IA de Esteban",
          email: "esteban.montenegro@gmail.com"
        },
        to: [
          {
            email: "esteban.montenegro@gmail.com",
            name: "Esteban Montenegro"
          }
        ],
        subject: `🚀 Nuevo Kit IA generado para: ${formData.marca}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
            <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h1 style="color: #7C3AED; text-align: center; margin-bottom: 30px; font-size: 28px;">🧠 Nuevo Kit IA Generado</h1>
              
              <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #374151; margin-top: 0; font-size: 20px;">📊 Información de la Marca</h2>
                <p style="margin: 8px 0;"><strong>Marca:</strong> ${formData.marca}</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> ${formData.email}</p>
                <p style="margin: 8px 0;"><strong>WhatsApp:</strong> ${formData.whatsapp || 'No proporcionado'}</p>
                <p style="margin: 8px 0;"><strong>Website:</strong> ${formData.website || 'No proporcionado'}</p>
                <p style="margin: 8px 0;"><strong>Instagram:</strong> ${formData.instagram ? '@' + formData.instagram : 'No proporcionado'}</p>
                <p style="margin: 8px 0;"><strong>Estilo:</strong> ${formData.estilo}</p>
              </div>

              <div style="background: #EFF6FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #1E40AF; margin-top: 0; font-size: 18px;">👤 Quién es</h2>
                <p style="line-height: 1.6;">${formData.quien_eres}</p>
              </div>

              <div style="background: #FEF3C7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #D97706; margin-top: 0; font-size: 18px;">🎯 Problemas que resuelve</h2>
                <p style="line-height: 1.6;">${formData.problemas}</p>
              </div>

              <div style="background: #ECFDF5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #059669; margin-top: 0; font-size: 18px;">❓ Preguntas frecuentes</h2>
                <p style="line-height: 1.6;">${formData.preguntas_frecuentes}</p>
              </div>

              <div style="background: #FDF2F8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #BE185D; margin-top: 0; font-size: 18px;">🚀 Producto principal</h2>
                <p style="line-height: 1.6;">${formData.producto}</p>
              </div>

              <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <p style="margin: 0; color: #6B7280; font-size: 14px;">
                  Kit IA generado el ${new Date().toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        `
      };

      console.log('📧 Enviando email a admin desde esteban.montenegro@gmail.com...');

      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      });

      console.log('📬 Respuesta del servidor (admin):', response.status, response.statusText);
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('✅ Email enviado exitosamente a Esteban:', responseData);
        return true;
      } else {
        const errorData = await response.text();
        console.error('❌ Error al enviar email a Esteban:', errorData);
        throw new Error(`Error ${response.status}: ${errorData}`);
      }
    } catch (error) {
      console.error('💥 Error en sendEmailToAdmin:', error);
      throw error;
    }
  };

  const sendConfirmationEmail = async (formData: FormData) => {
    const BREVO_API_KEY = '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';
    
    try {
      console.log('📨 Enviando email de confirmación al usuario:', formData.email);
      
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
${formData.quien_eres}...
¿Te resuena? ¡Sígueme para más contenido! 💫"

DÍA 2 - POST EDUCATIVO:
"💡 Mito vs Realidad sobre [tu área]:
${formData.preguntas_frecuentes}...
¿Qué opinas? Cuéntame en comentarios 👇"

DÍA 3 - HISTORIA PERSONAL:
"Mi historia: Por qué decidí ayudar con ${formData.problemas}...
Todo empezó cuando..."

DÍA 4 - CONSEJO RÁPIDO:
"⚡ Tip del día: Si sientes que ${formData.problemas}...
Prueba esto: [consejo específico]"

DÍA 5 - REEL EDUCATIVO:
"🔥 3 señales de que necesitas ${formData.producto}...
1. [Señal relacionada con el problema]
2. [Segunda señal]  
3. [Tercera señal]"

🎯 SEMANA 2: VALOR Y AUTORIDAD

DÍA 6 - POST REFLEXIVO:
"¿Sabías que...? ${formData.preguntas_frecuentes}...
Mi experiencia me ha enseñado que..."

DÍA 7 - CONTENIDO DETRÁS DE CÁMARAS:
"Un día en mi vida trabajando en ${formData.marca}
Así es como ayudo a [tu audiencia]..."

DÍA 8 - REEL MOTIVACIONAL:
"Para ti que sientes ${formData.problemas}...
Recuerda: [mensaje motivacional específico]"

DÍA 9 - FAQ INTERACTIVO:
"Pregúntame cualquier cosa sobre [tu área]
Las 3 preguntas más frecuentes que recibo..."

DÍA 10 - CASO DE ÉXITO:
"Historia de transformación: Cuando [cliente] llegó con ${formData.problemas}...
Así fue su proceso..."

🎯 SEMANA 3: PROMOCIÓN SUAVE

DÍA 11 - REEL DE PROCESO:
"¿Cómo funciona ${formData.producto}?
Te muestro paso a paso..."

DÍA 12 - TESTIMONIAL:
"Lo que dicen sobre trabajar conmigo:
[Crear testimonial basado en el problema que resuelves]"

DÍA 13 - POST DE VALOR:
"🎁 Recurso gratuito: Descarga mi guía sobre 
'Cómo [solucionar problema específico]'"

DÍA 14 - REEL LLAMADA A LA ACCIÓN:
"¿Lista/o para transformar ${formData.problemas}?
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
      
      const confirmationEmailData = {
        sender: {
          name: "Kit IA de Esteban",
          email: "esteban.montenegro@gmail.com"
        },
        to: [
          {
            email: formData.email,
            name: formData.marca
          }
        ],
        subject: `✅ Tu Kit IA está listo - ${formData.marca}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
            <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h1 style="color: #7C3AED; text-align: center; margin-bottom: 30px; font-size: 28px;">🎉 ¡Tu Kit IA está listo!</h1>
              
              <p style="font-size: 18px; color: #374151; margin-bottom: 20px;">Hola <strong>${formData.marca}</strong>,</p>
              
              <p style="font-size: 16px; color: #6B7280; line-height: 1.6; margin-bottom: 25px;">
                ¡Excelente! Hemos generado tu Kit IA personalizado con todo el contenido que necesitas para potenciar tu presencia digital.
              </p>

              <!-- Resumen de tu marca -->
              <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h2 style="color: #374151; margin-top: 0; font-size: 20px;">📊 Resumen de tu marca</h2>
                <p style="margin: 8px 0;"><strong>Marca:</strong> ${formData.marca}</p>
                <p style="margin: 8px 0;"><strong>Estilo:</strong> ${formData.estilo}</p>
                <p style="margin: 8px 0;"><strong>Contacto:</strong> ${formData.email}${formData.whatsapp ? ` | +${formData.whatsapp}` : ''}${formData.website ? ` | ${formData.website}` : ''}${formData.instagram ? ` | @${formData.instagram}` : ''}</p>
              </div>

              <!-- Instrucciones de uso -->
              <div style="background: #EFF6FF; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #3B82F6;">
                <h2 style="color: #1E40AF; margin-top: 0; font-size: 18px;">📋 Instrucciones de uso</h2>
                <p style="color: #1E40AF; margin-bottom: 10px;"><strong>Plan de 15 días:</strong> Úsalo tal como está, solo adapta las fechas.</p>
                <p style="color: #1E40AF; margin-bottom: 10px;"><strong>Contenido para redes:</strong> Copia y pega en tus publicaciones.</p>
                <p style="color: #1E40AF; margin-bottom: 10px;"><strong>Prompt para Lovable:</strong> Ve a lovable.dev, crea un proyecto y pega este prompt:</p>
                <div style="background: white; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 300px; overflow-y: auto;">${lovablePrompt}</div>
                <p style="color: #1E40AF; margin: 0;"><strong>Prompt para ChatGPT:</strong> Úsalo como tu asistente personal de marketing.</p>
              </div>

              <!-- Plan de Contenido 15 Días -->
              <div style="background: #FEF3C7; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h2 style="color: #D97706; margin-top: 0; font-size: 18px;">📅 Plan de Contenido 15 Días</h2>
                <div style="background: white; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 300px; overflow-y: auto;">${contentPlan}</div>
              </div>

              <!-- Contenido para Redes Sociales -->
              <div style="background: #ECFDF5; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h2 style="color: #059669; margin-top: 0; font-size: 18px;">📱 Contenido para Redes Sociales</h2>
                <div style="background: white; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 300px; overflow-y: auto;">${socialMediaContent}</div>
              </div>

              <!-- Prompt para Lovable -->
              <div style="background: #FDF2F8; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h2 style="color: #BE185D; margin-top: 0; font-size: 18px;">🚀 Prompt para crear tu web en Lovable</h2>
                <p style="color: #BE185D; font-size: 14px; margin-bottom: 10px;">Ve a <strong>lovable.dev</strong>, crea un nuevo proyecto y pega este prompt:</p>
                <div style="background: white; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 300px; overflow-y: auto;">${lovablePrompt}</div>
              </div>

              <!-- Prompt para ChatGPT -->
              <div style="background: #F0F9FF; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h2 style="color: #0369A1; margin-top: 0; font-size: 18px;">🧠 Tu Asistente Personal para ChatGPT</h2>
                <div style="background: white; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 300px; overflow-y: auto;">${chatGPTPrompt}</div>
              </div>

              <!-- CTA de contacto -->
              <div style="background: #F9FAFB; padding: 25px; border-radius: 8px; text-align: center; margin: 30px 0;">
                <h3 style="color: #374151; margin-top: 0; margin-bottom: 15px;">¿Necesitas ayuda implementando tu Kit IA?</h3>
                <p style="color: #6B7280; margin-bottom: 20px;">Estoy aquí para ayudarte a sacar el máximo provecho de tu contenido.</p>
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                  <a href="mailto:esteban.montenegro@gmail.com" style="background: #7C3AED; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">📧 Enviar Email</a>
                  <a href="https://wa.me/56945487423?text=Hola%20Esteban,%20necesito%20ayuda%20con%20mi%20Kit%20IA%20de%20${encodeURIComponent(formData.marca)}" style="background: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">📱 WhatsApp</a>
                </div>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #6B7280; font-size: 14px; margin: 0;">
                  Valor del kit: <strong style="color: #7C3AED;">USD $50</strong> - ¡Completamente gratis para ti!
                </p>
              </div>

              <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px;">
                <p style="margin: 0; color: #6B7280; font-size: 14px;">
                  Kit IA creado por <strong>Esteban Montenegro</strong><br>
                  ${new Date().toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        `
      };

      console.log('📧 Enviando email de confirmación desde esteban.montenegro@gmail.com...');

      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(confirmationEmailData)
      });

      console.log('📬 Respuesta del servidor (confirmación):', response.status, response.statusText);
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('✅ Email de confirmación enviado exitosamente:', responseData);
        return true;
      } else {
        const errorData = await response.text();
        console.error('❌ Error al enviar email de confirmación:', errorData);
        throw new Error(`Error ${response.status}: ${errorData}`);
      }
    } catch (error) {
      console.error('💥 Error en sendConfirmationEmail:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar límite de intentos
    const canProceed = await checkAttemptLimit(formData.email);
    if (!canProceed) {
      toast({
        title: "Límite alcanzado",
        description: "Has completado el formulario 3 veces con este email. Usa otro email si necesitas generar más kits.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      console.log('🔄 Iniciando proceso de generación de Kit IA...');
      
      // Simular proceso de generación
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log('📤 Enviando emails de notificación...');
      
      // Enviar ambos emails en paralelo para mayor velocidad
      const [adminResult, confirmationResult] = await Promise.allSettled([
        sendEmailToAdmin(formData),
        sendConfirmationEmail(formData)
      ]);
      
      console.log('📧 Resultado email admin:', adminResult);
      console.log('📧 Resultado email confirmación:', confirmationResult);
      
      // Verificar que al menos uno se haya enviado correctamente
      const emailsSent = [adminResult, confirmationResult].filter(
        result => result.status === 'fulfilled'
      ).length;
      
      if (emailsSent === 0) {
        throw new Error('No se pudo enviar ningún email');
      }
      
      console.log(`✅ ${emailsSent}/2 emails enviados correctamente`);
      
      // Marcar como completado
      await markAsCompleted(formData);
      
      setIsGenerating(false);
      setShowResults(true);
      
      toast({
        title: "¡Kit IA generado exitosamente!",
        description: `${emailsSent === 2 ? 'Ambos emails enviados' : 'Al menos un email enviado'}. Revisa las bandejas de entrada.`,
      });
      
    } catch (error) {
      console.error('💥 Error durante la generación del kit:', error);
      setIsGenerating(false);
      toast({
        title: "Error al procesar el formulario",
        description: `Problema detectado: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        variant: "destructive",
      });
    }
  };

  // Updated form validation to consider checkboxes
  const isFormValid = formData.marca.trim() !== '' && 
                     formData.quien_eres.trim() !== '' && 
                     formData.problemas.trim() !== '' && 
                     formData.preguntas_frecuentes.trim() !== '' && 
                     formData.estilo !== '' && 
                     formData.producto.trim() !== '' &&
                     formData.email.trim() !== '' &&
                     formData.whatsapp.trim() !== '' &&
                     (noWebsite || formData.website.trim() !== '') &&
                     (noInstagram || formData.instagram.trim() !== '');

  if (showResults) {
    return <ResultsDisplay formData={formData} onReset={() => {
      setShowResults(false);
      setFormData({
        marca: '',
        quien_eres: '',
        problemas: '',
        preguntas_frecuentes: '',
        estilo: '',
        producto: '',
        email: '',
        whatsapp: '',
        website: '',
        instagram: ''
      });
      setNoWebsite(false);
      setNoInstagram(false);
    }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Progress Dialog */}
        {showProgressDialog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full bg-white border-2 border-purple-300">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl text-gray-800 flex items-center justify-center gap-2">
                  <AlertCircle className="w-6 h-6 text-blue-600" />
                  ¿Continuar progreso anterior?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-center">
                  Encontramos un formulario incompleto con este email. 
                  <br />
                  <strong>Intento #{attemptCount} de 3 permitidos</strong>
                </p>
                <div className="flex gap-3">
                  <Button 
                    onClick={loadPreviousData}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    Continuar donde lo dejé
                  </Button>
                  <Button 
                    onClick={startFresh}
                    variant="outline"
                    className="flex-1"
                  >
                    Empezar de nuevo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

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
            Transforma tu negocio en 5 minutos con inteligencia artificial
          </h2>
          <p className="text-lg text-purple-100 max-w-4xl mx-auto leading-relaxed mb-6">
            <strong>¿Te has preguntado cómo otros emprendedores generan tanto contenido de calidad?</strong> 
            <br />La respuesta está aquí. Este kit te dará la misma estrategia que usan las marcas más exitosas para crear contenido profesional y conseguir clientes todos los días.
          </p>
          
          {/* Urgency and scarcity elements */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-300/30 backdrop-blur-lg rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-red-300" />
                <h3 className="text-white text-xl font-semibold">⏰ Por tiempo limitado completamente gratis</h3>
              </div>
              <p className="text-red-100 font-medium">
                Normalmente esto te costaría <span className="line-through text-red-300">$500 USD</span> con una agencia de marketing.
                <br />
                <strong className="text-yellow-200">Por tiempo limitado es 100% gratis porque estoy validando esta herramienta.</strong>
              </p>
            </div>
          </div>

          {/* Value proposition */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-white text-xl font-semibold mb-4 flex items-center justify-center gap-2">
                <Sparkles className="w-8 h-8 text-yellow-300" />
                ✅ En menos de 5 minutos recibirás:
              </h3>
              <div className="text-purple-100 text-left space-y-3">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" />
                  <p className="font-medium"><span className="text-yellow-200">Estrategia completa de contenido para 15 días</span> - Posts listos para copiar y pegar que generan engagement y ventas</p>
                </div>
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-blue-300 mt-1 flex-shrink-0" />
                  <p className="font-medium"><span className="text-yellow-200">Tu asistente de marketing IA personalizado</span> - Un prompt profesional para ChatGPT que te ayudará siempre</p>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-purple-300 mt-1 flex-shrink-0" />
                  <p className="font-medium"><span className="text-yellow-200">Página web automática y profesional</span> - Código completo para crear tu sitio en Lovable.dev en 2 minutos</p>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-pink-300 mt-1 flex-shrink-0" />
                  <p className="font-medium"><span className="text-yellow-200">Textos persuasivos para todas tus redes</span> - Copys que convierten visitantes en clientes</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/20">
                <p className="text-yellow-200 font-medium text-lg">
                  🎁 <strong>Valor real: $500 USD</strong> - Tuyo gratis hoy porque quiero que pruebes la calidad de mi trabajo.
                </p>
              </div>
            </div>
          </div>

          {/* Social proof */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-green-500/10 border border-green-300/30 backdrop-blur-lg rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
              <p className="text-green-100 font-medium">
                "En 2 días ya tenía mi web funcionando y contenido para todo el mes. ¡Increíble!" - Carolina M., Coach
              </p>
            </div>
          </div>

          <p className="text-purple-300 text-sm">
            Creado por <span className="font-semibold text-purple-200">Esteban Montenegro</span> - Especialista en IA y Marketing Digital
          </p>
        </div>

        {/* Important notice */}
        <Card className="max-w-4xl mx-auto mb-8 bg-white/95 border-gray-200 shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Brain className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800">⚠️ Importante: Sé específico en tus respuestas</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              <strong>La calidad de tu Kit IA depende 100% de qué tan detalladas sean tus respuestas.</strong>
              <br />
              Entre más específico seas sobre tu negocio, mejor será el contenido que generes. 
              <span className="text-blue-600 font-semibold"> ¡No te apures, tómate el tiempo necesario!</span>
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 font-medium">
                🧠 <strong>Nueva función IA:</strong> Desde la pregunta 6 puedes mejorar tus respuestas con inteligencia artificial
                <br />
                <span className="text-sm">Límite: 2 mejoras por campo | 3 formularios completos por email</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="max-w-4xl mx-auto mb-8 text-center">
          <Button 
            onClick={loadExampleData}
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm mb-4"
          >
            <Zap className="w-4 h-4 mr-2" />
            Ver ejemplo completo (recomendado)
          </Button>
          <p className="text-purple-200 text-sm">
            👆 Recomendado: Mira primero el ejemplo para entender la calidad de respuestas que necesitas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: MessageSquare, title: "Contenido que Vende", desc: "15 días de posts estratégicos que generan clientes reales", color: "text-green-300" },
            { icon: Rocket, title: "Web en 2 Minutos", desc: "Página profesional automática con Lovable.dev", color: "text-blue-300" },
            { icon: TrendingUp, title: "IA Personal 24/7", desc: "Tu asistente de marketing que nunca duerme", color: "text-purple-300" }
          ].map((feature, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-lg hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <feature.icon className={`w-12 h-12 ${feature.color} mx-auto mb-4`} />
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-purple-200 text-sm">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Form */}
        <Card className="max-w-4xl mx-auto bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl text-white flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              Completa estos 10 campos para recibir tu Kit IA personalizado
            </CardTitle>
            <p className="text-purple-200 mt-4">
              ⏱️ <strong>Tiempo estimado: 3-5 minutos</strong> | 📧 <strong>Lo recibirás al instante en tu email</strong>
              <br />
              <span className="text-yellow-200 font-medium">🧠 ¡Nuevo! Usa IA para mejorar tus respuestas (2 veces por campo)</span>
              <br />
              <span className="text-green-200 text-sm">💾 Tu progreso se guarda automáticamente</span>
            </p>
          </CardHeader>
          <CardContent className="p-8">
            {isGenerating ? (
              <LoadingSpinner />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <FormField
                  type="input"
                  label="1. ¿Cómo se llama tu emprendimiento o marca personal?"
                  placeholder="Ej: Luz Interior Coaching, Panadería Las 3 Hermanas, Soy Nombre Apellido"
                  name="marca"
                  value={formData.marca}
                  onChange={handleInputChange}
                  icon={Users}
                />

                <FormField
                  type="input"
                  label="2. Correo electrónico (donde recibirás tu Kit IA)"
                  placeholder="Ej: info@tumarca.com"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  icon={Mail}
                />

                <FormField
                  type="input"
                  label="3. WhatsApp (para agregar botón de contacto en tu web)"
                  placeholder="Ej: 56945487423 (solo números, sin +)"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  icon={Phone}
                />

                <div className="space-y-3 group">
                  <FormField
                    type="input"
                    label="4. Página web actual (si tienes)"
                    placeholder="Ej: www.tumarca.com"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    icon={Globe}
                  />
                  <div className="flex items-center space-x-2 ml-8">
                    <Checkbox 
                      id="no-website" 
                      checked={noWebsite}
                      onCheckedChange={(checked) => {
                        setNoWebsite(checked as boolean);
                        if (checked) {
                          setFormData(prev => ({ ...prev, website: '' }));
                        }
                      }}
                    />
                    <label htmlFor="no-website" className="text-purple-200 text-sm cursor-pointer">
                      No tengo página web (se creará automáticamente)
                    </label>
                  </div>
                </div>

                <div className="space-y-3 group">
                  <FormField
                    type="input"
                    label="5. Instagram (nombre de usuario, sin @)"
                    placeholder="Ej: tumarca"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    icon={Instagram}
                  />
                  <div className="flex items-center space-x-2 ml-8">
                    <Checkbox 
                      id="no-instagram" 
                      checked={noInstagram}
                      onCheckedChange={(checked) => {
                        setNoInstagram(checked as boolean);
                        if (checked) {
                          setFormData(prev => ({ ...prev, instagram: '' }));
                        }
                      }}
                    />
                    <label htmlFor="no-instagram" className="text-purple-200 text-sm cursor-pointer">
                      No tengo Instagram
                    </label>
                  </div>
                </div>

                <FormField
                  type="textarea"
                  label="6. ¿Quién eres y qué te apasiona de tu trabajo? ¿A quién ayudas? (Sé específico)"
                  placeholder="Ej: Soy Carolina, coach de vida certificada con 8 años de experiencia. Me apasiona acompañar a mujeres emprendedoras de 30-45 años que buscan reconectar con su propósito..."
                  name="quien_eres"
                  value={formData.quien_eres}
                  onChange={handleInputChange}
                  icon={Users}
                  showAIEnhance={true}
                  context={{
                    marca: formData.marca,
                    estilo: formData.estilo
                  }}
                  sessionId={sessionId}
                  onAIUsageUpdate={handleAIUsageUpdate}
                />

                <FormField
                  type="textarea"
                  label="7. ¿Qué problema específico vives día a día con tus clientes y cómo los ayudas a solucionarlo?"
                  placeholder="Ej: Mis clientas llegan sintiéndose bloqueadas emocionalmente, con miedo al fracaso y síndrome del impostor. Yo las ayudo con un proceso de autoconocimiento profundo usando técnicas de PNL..."
                  name="problemas"
                  value={formData.problemas}
                  onChange={handleInputChange}
                  icon={Target}
                  showAIEnhance={true}
                  context={{
                    marca: formData.marca,
                    estilo: formData.estilo
                  }}
                  sessionId={sessionId}
                  onAIUsageUpdate={handleAIUsageUpdate}
                />

                <FormField
                  type="textarea"
                  label="8. ¿Qué te preguntan siempre tus clientes o qué disfrutas explicar una y otra vez?"
                  placeholder="Ej: Me preguntan constantemente si es posible cambiar de vida después de los 40 años cuando ya tienes responsabilidades. Me encanta mostrarles que siempre es posible..."
                  name="preguntas_frecuentes"
                  value={formData.preguntas_frecuentes}
                  onChange={handleInputChange}
                  icon={MessageSquare}
                  showAIEnhance={true}
                  context={{
                    marca: formData.marca,
                    estilo: formData.estilo
                  }}
                  sessionId={sessionId}
                  onAIUsageUpdate={handleAIUsageUpdate}
                />

                <FormField
                  type="select"
                  label="9. ¿Cómo te gusta comunicarte en redes sociales?"
                  name="estilo"
                  value={formData.estilo}
                  onChange={handleInputChange}
                  options={["Cercano", "Profesional", "Inspirador", "Con humor", "Técnico"]}
                  icon={MessageSquare}
                />

                <FormField
                  type="textarea"
                  label="10. ¿Cuál es tu producto o servicio principal que quieres vender más? (Describe beneficios específicos)"
                  placeholder="Ej: Mi programa 'Renace', un proceso de coaching de 8 semanas que incluye sesiones individuales, workbook personalizado y comunidad privada. Está diseñado para mujeres que quieren cambios profundos en 90 días..."
                  name="producto"
                  value={formData.producto}
                  onChange={handleInputChange}
                  icon={Rocket}
                  showAIEnhance={true}
                  context={{
                    marca: formData.marca,
                    estilo: formData.estilo
                  }}
                  sessionId={sessionId}
                  onAIUsageUpdate={handleAIUsageUpdate}
                />

                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-300/30 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-green-300" />
                    <h3 className="text-white text-lg font-semibold">⚡ ¡Ya casi terminas!</h3>
                  </div>
                  <p className="text-center text-green-100">
                    Tu Kit IA se generará al instante y llegará a tu email en menos de 30 segundos.
                    <br />
                    <strong>¡No olvides revisar tu carpeta de spam!</strong>
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  disabled={!isFormValid}
                >
                  <Brain className="w-6 h-6 mr-3" />
                  🚀 GENERAR MI KIT IA GRATIS AHORA
                </Button>

                <div className="text-center space-y-2">
                  <p className="text-purple-200 text-sm">
                    🔐 <strong>100% seguro y sin spam.</strong> Solo recibirás tu Kit IA.
                  </p>
                  <p className="text-yellow-200 text-sm font-medium">
                    ⏰ Esta oferta gratuita puede terminar en cualquier momento.
                  </p>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Final CTA Section */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 backdrop-blur-lg rounded-xl p-8">
            <h3 className="text-white text-2xl font-bold mb-4">
              ¿Por qué te doy esto gratis?
            </h3>
            <p className="text-purple-100 text-lg leading-relaxed mb-6">
              Porque sé que cuando veas la calidad del contenido que genero, 
              querrás trabajar conmigo en proyectos más grandes. 
              <br />
              <strong className="text-yellow-200">Esta es mi forma de mostrarte el poder de la IA aplicada correctamente.</strong>
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-purple-200">
              <span>✅ Sin tarjeta de crédito</span>
              <span>✅ Sin suscripciones</span>
              <span>✅ Sin letra pequeña</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
