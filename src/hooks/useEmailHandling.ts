
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

  return {
    sendEmailToAdmin,
    sendConfirmationEmail
  };
};
