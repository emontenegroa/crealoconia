
import { useState } from 'react';

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

export const useEmailHandling = () => {
  const sendEmailToAdmin = async (formData: FormData) => {
    const BREVO_API_KEY = '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';
    
    try {
      console.log('🚀 Enviando email a Esteban con datos del formulario y prompt técnico...');
      
      // Generate contact info section
      const contactInfo = () => {
        let contact = '';
        if (formData.email) contact += `📧 Email: ${formData.email}\n`;
        if (formData.whatsapp) contact += `📱 WhatsApp: +${formData.whatsapp}\n`;
        if (formData.website) contact += `🌐 Website: ${formData.website}\n`;
        if (formData.instagram) contact += `📱 Instagram: @${formData.instagram}\n`;
        return contact ? `${contact}` : '';
      };

      // PROMPT TÉCNICO PARA LOVABLE (SOLO PARA ADMIN)
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
        subject: `🚀 Nuevo Kit IA generado para: ${formData.marca} - CREAR WEB MANUALMENTE`,
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

              <div style="background: #FEF3C7; padding: 20px; border-radius: 8px; margin: 20px 0; border: 3px solid #F59E0B;">
                <h2 style="color: #92400E; margin-top: 0; font-size: 18px;">🔧 PROMPT TÉCNICO PARA LOVABLE (CREAR WEB MANUALMENTE)</h2>
                <div style="background: #FFF; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 300px; overflow-y: auto; border: 1px solid #E5E7EB;">${lovablePrompt}</div>
                <p style="color: #92400E; margin: 10px 0 0 0; font-weight: bold;">⚠️ El usuario NO recibe este prompt. Crear web manualmente en Lovable y enviar enlace cuando esté listo.</p>
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

      // 1️⃣ TEXTOS BASE PARA EL SITIO WEB
      const websiteTexts = `📄 TEXTOS BASE PARA TU SITIO WEB - ${formData.marca}

🎯 TÍTULO PRINCIPAL:
${formData.marca} - ${formData.estilo === 'Profesional' ? 'Soluciones Profesionales' : formData.estilo === 'Cercano' ? 'Acompañamiento Personalizado' : formData.estilo === 'Inspirador' ? 'Transforma Tu Vida' : 'Expertos en Resultados'}

💡 SUBTÍTULO/PROPUESTA DE VALOR:
Ayudamos a personas que ${formData.problemas.toLowerCase()} a través de ${formData.producto}

📋 DESCRIPCIÓN DE SERVICIOS:
${formData.quien_eres}

Nos especializamos en resolver: ${formData.problemas}

🎁 BENEFICIOS CLAVE:
✅ Solución personalizada para tu situación específica
✅ Metodología probada con resultados reales
✅ Acompañamiento ${formData.estilo.toLowerCase()} durante todo el proceso
✅ Respuestas a tus principales dudas: ${formData.preguntas_frecuentes}

${contactInfo()}`;

      // 2️⃣ PROMPT PARA CHATGPT
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

      // 3️⃣ CALENDARIO DE CONTENIDO 15 DÍAS
      const contentCalendar = `📅 CALENDARIO DE CONTENIDO 15 DÍAS - ${formData.marca}

🎯 POSTS EDUCATIVOS Y DE AUTORIDAD (5):

POST 1 - EDUCATIVO:
"💡 ¿Sabías que...? ${formData.preguntas_frecuentes}
En ${formData.marca}, hemos aprendido que la clave está en [tu experiencia específica].
¿Te has sentido identificado/a con esto? Cuéntame en comentarios 👇"

POST 2 - AUTORIDAD:
"Mi experiencia me ha enseñado que cuando alguien siente ${formData.problemas}, lo primero que necesita es [consejo específico].
Esto es lo que hago en ${formData.producto}..."

POST 3 - PROBLEMA/SOLUCIÓN:
"Señales de que podrías necesitar ayuda con ${formData.problemas}:
1. [Señal específica]
2. [Segunda señal]
3. [Tercera señal]
Si te identificas con al menos 2, hablemos 📩"

POST 4 - HISTORIA PERSONAL:
"Mi historia: Por qué decidí especializarme en ${formData.problemas}.
Todo comenzó cuando [tu historia personal]...
Hoy ayudo a personas como tú a través de ${formData.producto}"

POST 5 - LLAMADA A LA ACCIÓN:
"¿Listo/a para transformar ${formData.problemas}?
Te presento ${formData.producto}.
Escríbeme 'ME INTERESA' para conocer más 📱"

🎬 GUIONES DE REELS (5):

REEL 1 - PRESENTACIÓN (15-30 seg):
"¡Hola! Soy [tu nombre] de ${formData.marca} 👋
Mi misión: ayudarte con ${formData.problemas}
¿Te resuena? ¡Sígueme! 💫"

REEL 2 - EDUCATIVO (30 seg):
"3 mitos sobre [tu área]:
❌ Mito 1: [mito común]
✅ Realidad: [tu verdad]
[Continúa con otros 2 mitos]"

REEL 3 - PROCESO (45 seg):
"¿Cómo funciona ${formData.producto}?
Paso 1: [primer paso]
Paso 2: [segundo paso]
Paso 3: [resultado]"

REEL 4 - TESTIMONIAL (30 seg):
"Lo que dicen quienes han trabajado conmigo:
'[Crear testimonial realista basado en tu problema]'
¿Quieres ser el/la siguiente? 📩"

REEL 5 - MOTIVACIONAL (20 seg):
"Para ti que sientes ${formData.problemas}:
Recuerda que [mensaje motivacional específico]
No estás solo/a en esto 💙"

📱 IDEAS DE STORIES (5):

STORY 1 - DETRÁS DE CÁMARAS:
"Un día en mi vida ayudando con ${formData.problemas}"

STORY 2 - PREGUNTA INTERACTIVA:
"¿Cuál es tu mayor desafío con [tu área]?" + sticker de pregunta

STORY 3 - CONSEJO RÁPIDO:
"Tip del día: Si sientes [problema específico], prueba esto..."

STORY 4 - ENCUESTA:
"¿Has experimentado [situación relacionada con tu problema]?" + sticker de encuesta

STORY 5 - LLAMADA A LA ACCIÓN:
"¿Necesitas ayuda con ${formData.problemas}? Escríbeme 📩"

📝 NOTAS IMPORTANTES:
- Adapta cada contenido a tu estilo: ${formData.estilo}
- Programa las publicaciones para mantener consistencia
- Usa hashtags relevantes a tu nicho
- Siempre incluye una llamada a la acción clara
${contactInfo()}`;
      
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
        subject: `🎯 Tu Kit IA está listo (y esto recién comienza)`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
            <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h1 style="color: #7C3AED; text-align: center; margin-bottom: 30px; font-size: 28px;">🎯 Tu Kit IA está listo (y esto recién comienza)</h1>
              
              <p style="font-size: 18px; color: #374151; margin-bottom: 20px;">Hola <strong>${formData.marca}</strong>,</p>
              
              <p style="font-size: 16px; color: #6B7280; line-height: 1.6; margin-bottom: 25px;">
                Primero: felicitaciones por dar el primer paso.<br>
                No es solo un formulario. Lo que completaste es la base real para profesionalizar tu marca digital.
              </p>

              <p style="font-size: 16px; color: #6B7280; line-height: 1.6; margin-bottom: 25px;">
                Aquí tienes el material inicial que armamos para ti:
              </p>

              <div style="background: #F0F9FF; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #3B82F6;">
                <p style="color: #1E40AF; margin-bottom: 10px; font-weight: bold;">✅ Textos base para tu sitio web</p>
                <p style="color: #1E40AF; margin-bottom: 10px; font-weight: bold;">✅ Prompt personalizado para que sigas creando contenido en ChatGPT</p>
                <p style="color: #1E40AF; margin-bottom: 0; font-weight: bold;">✅ 15 días de contenido para tus redes (posts, stories y reels)</p>
              </div>

              <!-- Textos Base para Sitio Web -->
              <div style="background: #FEF3C7; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h2 style="color: #D97706; margin-top: 0; font-size: 18px;">📄 Textos Base para tu Sitio Web</h2>
                <div style="background: white; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 300px; overflow-y: auto;">${websiteTexts}</div>
              </div>

              <!-- Prompt para ChatGPT -->
              <div style="background: #F0F9FF; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h2 style="color: #0369A1; margin-top: 0; font-size: 18px;">🧠 Tu Asistente Personal para ChatGPT</h2>
                <div style="background: white; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 300px; overflow-y: auto;">${chatGPTPrompt}</div>
              </div>

              <!-- Calendario de Contenido -->
              <div style="background: #ECFDF5; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h2 style="color: #059669; margin-top: 0; font-size: 18px;">📅 15 Días de Contenido para tus Redes</h2>
                <div style="background: white; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 300px; overflow-y: auto;">${contentCalendar}</div>
              </div>

              <p style="font-size: 16px; color: #6B7280; line-height: 1.6; margin: 25px 0;">
                Este material te permite empezar a construir tu presencia online con dirección y claridad.
              </p>

              <!-- Información sobre sitio web en producción -->
              <div style="background: #FDF2F8; padding: 25px; border-radius: 8px; margin: 30px 0; border: 2px solid #EC4899;">
                <h3 style="color: #BE185D; margin-top: 0; margin-bottom: 15px; font-size: 20px;">🚀 Ahora, atención:</h3>
                <p style="color: #BE185D; margin-bottom: 15px; font-size: 16px; line-height: 1.6;">
                  En base a lo que completaste, ya estamos trabajando en generar la primera versión de tu sitio web profesional.
                </p>
                <p style="color: #BE185D; margin-bottom: 15px; font-size: 16px; line-height: 1.6;">
                  <strong>Muy pronto te enviaremos el acceso directo para revisarlo.</strong><br>
                  Queremos asegurarnos de que el resultado refleje realmente lo que haces, por eso revisamos cada caso manualmente antes de la entrega final.
                </p>
                <p style="color: #BE185D; margin: 0; font-size: 16px; font-weight: bold;">
                  Seguimos trabajando en tu proyecto.<br>
                  Pronto recibirás novedades.
                </p>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #6B7280; font-size: 14px; margin: 0;">
                  Valor del kit: <strong style="color: #7C3AED;">USD $50</strong> - ¡Completamente gratis para ti!
                </p>
              </div>

              <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px;">
                <p style="margin: 0; color: #6B7280; font-size: 14px;">
                  El equipo de <strong>Kit IA</strong><br>
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

  return {
    sendEmailToAdmin,
    sendConfirmationEmail
  };
};
