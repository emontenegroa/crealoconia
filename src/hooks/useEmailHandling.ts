
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
  const enhanceWithChatGPT = async (content: string, context: string) => {
    try {
      const response = await fetch('/functions/v1/enhance-with-chatgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          context,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.enhancedContent;
      } else {
        console.log('ChatGPT enhancement failed, using original content');
        return content;
      }
    } catch (error) {
      console.log('ChatGPT enhancement error, using original content:', error);
      return content;
    }
  };

  const generateBrandDocumentation = async (formData: FormData) => {
    const rawDocumentation = `
📋 DOCUMENTACIÓN DE MARCA

🎯 Nombre de la marca: ${formData.marca}

👤 Quién es: ${formData.quien_eres}

🎯 Público objetivo: Personas que ${formData.problemas.toLowerCase()}

❗ Problema que resuelve: ${formData.problemas}

✅ Cómo lo soluciona: A través de ${formData.producto}

🚀 Producto principal: ${formData.producto}

💎 Beneficios principales:
- Solución personalizada y efectiva
- Acompañamiento profesional durante el proceso
- Metodología probada con resultados reales
- Transformación profunda y duradera

❓ Preguntas frecuentes: ${formData.preguntas_frecuentes}

🎨 Estilo de comunicación: ${formData.estilo}
    `;

    return await enhanceWithChatGPT(
      rawDocumentation,
      `Actúa como estratega de marca personal. Reescribe profesionalmente esta documentación de marca para ${formData.marca}. Mejora la redacción, estructura mejor los puntos y hazlo más profesional y claro. Mantén el formato con emojis.`
    );
  };

  const generateContentIdeas = async (formData: FormData) => {
    const rawContent = `
📱 IDEAS DE CONTENIDO INICIAL

🎬 REELS (5 ideas):
1. "3 señales de que necesitas ${formData.producto}" - Hook fuerte con ejemplos específicos
2. "Mi historia: Por qué me dedico a resolver ${formData.problemas}" - Historia personal
3. "El error más común cuando intentas solucionar ${formData.problemas}" - Educativo
4. "Antes vs Después: Transformación real con ${formData.producto}" - Social proof
5. "¿Sabías que...? Mito vs Realidad sobre [tu área]" - Educativo viral

📖 STORIES (5 ideas):
1. "Detrás de cámaras: Un día ayudando a resolver ${formData.problemas}"
2. "Pregunta del día: ¿Cuál es tu mayor desafío con [tu área]?" + Sticker de pregunta
3. "Consejo rápido: Qué hacer cuando sientes ${formData.problemas}"
4. "Testimonial destacado: Historia de transformación real"
5. "Encuesta: ¿Has experimentado [situación específica]?" + Llamada a la acción

📝 POSTS (5 ideas):
1. "Las 5 creencias limitantes que te impiden superar ${formData.problemas}"
2. "Mi metodología paso a paso para lograr [resultado específico]"
3. "Señales de que estás listo/a para ${formData.producto}"
4. "La diferencia entre intentar solo vs tener acompañamiento profesional"
5. "Por qué ${formData.estilo.toLowerCase()} es la clave para resultados duraderos"
    `;

    return await enhanceWithChatGPT(
      rawContent,
      `Actúa como creador de contenido para redes sociales. Mejora estas ideas de contenido para ${formData.marca}, haciendo cada idea más específica, atractiva y accionable. Mantén el tono ${formData.estilo.toLowerCase()}. Incluye hooks más poderosos y llamadas a la acción claras.`
    );
  };

  const generateAIAssistant = async (formData: FormData) => {
    const contactInfo = () => {
      let contact = '';
      if (formData.email) contact += `- Email: ${formData.email}\n`;
      if (formData.whatsapp) contact += `- WhatsApp: +${formData.whatsapp}\n`;
      if (formData.website) contact += `- Website: ${formData.website}\n`;
      if (formData.instagram) contact += `- Instagram: @${formData.instagram}\n`;
      return contact;
    };

    const rawPrompt = `
🧠 TU ASISTENTE PERSONAL IA

Eres un experto en creación de contenido, marketing digital, ventas y posicionamiento de marca personal.

DATOS DEL NEGOCIO:
- Marca: ${formData.marca}
- Profesional: ${formData.quien_eres}
- Público objetivo: Personas que ${formData.problemas.toLowerCase()}
- Problema que resuelve: ${formData.problemas}
- Método de solución: A través de ${formData.producto}
- Producto principal: ${formData.producto}
- Beneficios principales: Transformación profunda, acompañamiento personalizado, metodología probada
- Preguntas frecuentes: ${formData.preguntas_frecuentes}
- Estilo de comunicación: ${formData.estilo}
${contactInfo()}

INSTRUCCIONES DE CONTENIDO:
- Mantén tono ${formData.estilo.toLowerCase()}, profesional y cercano
- Genera contenido educativo, emocional, de venta y autoridad
- Aplica microhistorias y ejemplos reales
- Menciona ${formData.producto} cuando sea relevante
- Crea material adaptable para Instagram, Reels, Stories, LinkedIn, Facebook y correos
- Dirige tráfico a website o WhatsApp cuando sea apropiado
- Siempre incluye llamadas a la acción claras
- No repitas textualmente las respuestas, reescríbelas profesionalmente

ESPECIALIDADES EN LAS QUE PUEDES AYUDARME:
📱 Contenido para redes sociales (posts, reels, stories)
📧 Marketing directo y email marketing
🎯 Estrategia de ventas y conversión
📝 Contenido educativo y de autoridad
🔥 Promoción y lanzamientos
💬 Scripts para WhatsApp y atención al cliente

¿En qué área específica te gustaría que te ayude hoy con el contenido de ${formData.marca}?
    `;

    return await enhanceWithChatGPT(
      rawPrompt,
      `Actúa como experto en prompts para ChatGPT. Mejora este prompt para hacerlo más específico, efectivo y profesional. Asegúrate de que el ChatGPT resultante genere contenido de alta calidad para ${formData.marca} con estilo ${formData.estilo.toLowerCase()}.`
    );
  };

  const sendEmailToAdmin = async (formData: FormData) => {
    const BREVO_API_KEY = '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';
    
    try {
      console.log('🚀 Enviando email a Esteban con datos del formulario y prompt técnico...');
      
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
          name: "Hazlo con IA",
          email: "esteban.montenegro@gmail.com"
        },
        to: [
          {
            email: "esteban.montenegro@gmail.com",
            name: "Esteban Montenegro"
          }
        ],
        subject: `🚀 Nuevo sitio generado para: ${formData.marca} - CREAR WEB MANUALMENTE`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
            <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h1 style="color: #7C3AED; text-align: center; margin-bottom: 30px; font-size: 28px;">🚀 Nuevo sitio generado con Hazlo con IA</h1>
              
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
                  Sitio generado con Hazlo con IA el ${new Date().toLocaleDateString('es-ES', { 
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
      console.log('🧠 Generando contenido mejorado con ChatGPT...');
      
      // Generar contenido mejorado con ChatGPT
      const brandDocumentation = await generateBrandDocumentation(formData);
      const contentIdeas = await generateContentIdeas(formData);
      const aiAssistant = await generateAIAssistant(formData);
      
      const confirmationEmailData = {
        sender: {
          name: "Hazlo con IA",
          email: "esteban.montenegro@gmail.com"
        },
        to: [
          {
            email: formData.email,
            name: formData.marca
          }
        ],
        subject: `🎯 Tu contenido profesional está listo (revisión en proceso)`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
            <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h1 style="color: #7C3AED; text-align: center; margin-bottom: 30px; font-size: 28px;">🎯 Tu contenido profesional está listo</h1>
              
              <p style="font-size: 18px; color: #374151; margin-bottom: 20px;">Hola <strong>${formData.marca}</strong>,</p>
              
              <p style="font-size: 16px; color: #6B7280; line-height: 1.6; margin-bottom: 25px;">
                Ya tienes todo el material base para profesionalizar tu presencia digital.<br>
                Este es tu contenido estratégico personalizado:
              </p>

              <div style="background: #F0F9FF; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #3B82F6;">
                <p style="color: #1E40AF; margin-bottom: 10px; font-weight: bold;">✅ Documentación completa de tu marca</p>
                <p style="color: #1E40AF; margin-bottom: 10px; font-weight: bold;">✅ Ideas de contenido para 15 días</p>
                <p style="color: #1E40AF; margin-bottom: 0; font-weight: bold;">✅ Asistente IA personalizado para ChatGPT</p>
              </div>

              <!-- Documentación de Marca -->
              <div style="background: #FEF3C7; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h2 style="color: #D97706; margin-top: 0; font-size: 18px;">📋 BLOQUE 1: Documentación de Marca</h2>
                <div style="background: white; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 300px; overflow-y: auto;">${brandDocumentation}</div>
              </div>

              <!-- Ideas de Contenido -->
              <div style="background: #ECFDF5; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h2 style="color: #059669; margin-top: 0; font-size: 18px;">📱 BLOQUE 2: Ideas de Contenido Inicial</h2>
                <div style="background: white; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 300px; overflow-y: auto;">${contentIdeas}</div>
              </div>

              <!-- Asistente IA -->
              <div style="background: #F0F9FF; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h2 style="color: #0369A1; margin-top: 0; font-size: 18px;">🧠 BLOQUE 3: Tu Asistente Personal IA</h2>
                <div style="background: white; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 300px; overflow-y: auto;">${aiAssistant}</div>
                <p style="color: #0369A1; margin: 10px 0 0 0; font-size: 14px;">💡 Copia este prompt en ChatGPT para tener tu asistente personalizado</p>
              </div>

              <p style="font-size: 16px; color: #6B7280; line-height: 1.6; margin: 25px 0;">
                Con este material ya puedes empezar a crear contenido profesional y consistente para tu marca.
              </p>

              <!-- Información sobre sitio web en proceso -->
              <div style="background: #FDF2F8; padding: 25px; border-radius: 8px; margin: 30px 0; border: 2px solid #EC4899;">
                <h3 style="color: #BE185D; margin-top: 0; margin-bottom: 15px; font-size: 20px;">🚀 Tu sitio web está en proceso</h3>
                <p style="color: #BE185D; margin-bottom: 15px; font-size: 16px; line-height: 1.6;">
                  Estamos creando tu página web profesional basada en toda la información que nos proporcionaste.
                </p>
                <p style="color: #BE185D; margin-bottom: 15px; font-size: 16px; line-height: 1.6;">
                  <strong>En las próximas 24-48 horas recibirás el enlace directo</strong> para que puedas revisar tu sitio web antes de la publicación final.
                </p>
                <p style="color: #BE185D; margin: 0; font-size: 16px; font-weight: bold;">
                  Mientras tanto, ya puedes empezar a usar todo este contenido.<br>
                  Pronto tendrás tu presencia digital completa.
                </p>
              </div>

              <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px;">
                <p style="margin: 0; color: #6B7280; font-size: 14px;">
                  El equipo de <strong>Hazlo con IA</strong><br>
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
