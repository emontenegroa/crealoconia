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
  generatedPrompts?: {
    superPrompt: string;
    lovablePrompt?: string;
  };
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
        subject: `🚀 Nuevo Super Prompt generado: ${formData.marca}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
            <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h1 style="color: #7C3AED; text-align: center; margin-bottom: 30px; font-size: 28px;">🧠 Nuevo Super Prompt Generado</h1>
              
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
                <h2 style="color: #1E40AF; margin-top: 0; font-size: 18px;">👤 Perfil del negocio</h2>
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

              ${formData.generatedPrompts?.superPrompt ? `
              <div style="background: #F0F9FF; padding: 20px; border-radius: 8px; margin: 20px 0; border: 3px solid #3B82F6;">
                <h2 style="color: #1E40AF; margin-top: 0; font-size: 18px;">🤖 SUPER PROMPT PARA CHATGPT (Cliente)</h2>
                <div style="background: #FFF; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 400px; overflow-y: auto; border: 1px solid #E5E7EB;">${formData.generatedPrompts.superPrompt}</div>
              </div>
              ` : ''}

              ${formData.generatedPrompts?.lovablePrompt ? `
              <div style="background: #FEF3C7; padding: 20px; border-radius: 8px; margin: 20px 0; border: 3px solid #F59E0B;">
                <h2 style="color: #D97706; margin-top: 0; font-size: 18px;">🌐 PROMPT LOVABLE (Solo para ti)</h2>
                <div style="background: #FFF; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 400px; overflow-y: auto; border: 1px solid #E5E7EB;">${formData.generatedPrompts.lovablePrompt}</div>
                <p style="color: #D97706; margin: 10px 0 0 0; font-weight: bold;">💡 Este prompt NO se entrega al cliente</p>
              </div>
              ` : ''}

              <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <p style="margin: 0; color: #6B7280; font-size: 14px;">
                  Super Prompt generado el ${new Date().toLocaleDateString('es-ES', { 
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

      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      });

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
        subject: `🎯 ${formData.marca}, tu Super Prompt está listo`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
            <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h1 style="color: #7C3AED; text-align: center; margin-bottom: 30px; font-size: 28px;">🚀 Tu Super Prompt está listo</h1>
              
              <p style="font-size: 18px; color: #374151; margin-bottom: 20px;">Hola <strong>${formData.marca}</strong>,</p>
              
              <p style="font-size: 16px; color: #6B7280; line-height: 1.6; margin-bottom: 25px;">
                Tu Super Prompt personalizado ya está generado y listo para revolucionar tu estrategia de contenido.<br>
                Esto es lo que incluye:
              </p>

              <div style="background: #F0F9FF; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #3B82F6;">
                <h3 style="color: #1E40AF; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📱 Contenido para Redes Sociales:</h3>
                <p style="color: #1E40AF; margin-bottom: 8px;">1️⃣ Publicaciones virales (carrousel, post de autoridad, contenido de ventas)</p>
                <p style="color: #1E40AF; margin-bottom: 8px;">2️⃣ Guiones de Reels y Shorts para viralización y captación</p>
                <p style="color: #1E40AF; margin-bottom: 8px;">3️⃣ Historias de Instagram con engagement emocional y venta indirecta</p>
                <p style="color: #1E40AF; margin-bottom: 8px;">4️⃣ Series educativas para construir autoridad y lead magnet</p>
                <p style="color: #1E40AF; margin-bottom: 0;">5️⃣ Preguntas frecuentes convertidas en contenido educativo</p>
              </div>

              <div style="background: #ECFDF5; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #10B981;">
                <h3 style="color: #059669; margin-top: 0; margin-bottom: 15px; font-size: 18px;">💰 Estrategias de Venta y Marketing:</h3>
                <p style="color: #059669; margin-bottom: 8px;">6️⃣ Secuencias de email marketing (captación, nutrición, lanzamiento)</p>
                <p style="color: #059669; margin-bottom: 8px;">7️⃣ Guiones de venta (para webinars, DM, sesiones discovery)</p>
                <p style="color: #059669; margin-bottom: 8px;">8️⃣ Guiones para webinars o clases online de conversión</p>
                <p style="color: #059669; margin-bottom: 8px;">9️⃣ Copy para landings de captación o venta</p>
                <p style="color: #059669; margin-bottom: 0;">🔟 Diseño de embudo de lanzamiento digital</p>
              </div>

              ${formData.generatedPrompts?.superPrompt ? `
              <div style="background: #F0F9FF; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h2 style="color: #0369A1; margin-top: 0; font-size: 18px;">🧠 Tu Super Prompt para ChatGPT</h2>
                <p style="color: #1E40AF; margin-bottom: 15px;">Copia este prompt completo y úsalo en ChatGPT para generar contenido estratégico y campañas de marketing:</p>
                <div style="background: white; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 400px; overflow-y: auto; border: 1px solid #E5E7EB;">${formData.generatedPrompts.superPrompt}</div>
              </div>
              ` : ''}

              <div style="background: #FDF2F8; padding: 25px; border-radius: 8px; margin: 30px 0; border: 2px solid #EC4899;">
                <h3 style="color: #BE185D; margin-top: 0; margin-bottom: 15px; font-size: 20px;">🚀 Cómo usar tu Super Prompt:</h3>
                <div style="color: #BE185D; margin-bottom: 15px; font-size: 16px; line-height: 1.6;">
                  <p style="margin-bottom: 10px;"><strong>1. Copia el prompt completo:</strong> Pégalo en ChatGPT para configurar tu asistente</p>
                  <p style="margin-bottom: 10px;"><strong>2. Pide contenido específico:</strong> "Crea 10 posts para Instagram", "Escribe emails de venta"</p>
                  <p style="margin-bottom: 0;"><strong>3. Escala tu contenido:</strong> Genera material para todas tus plataformas</p>
                </div>
              </div>

              <div style="background: #FEF3C7; padding: 25px; border-radius: 8px; margin: 30px 0; border: 2px solid #F59E0B;">
                <h3 style="color: #D97706; margin-top: 0; margin-bottom: 15px; font-size: 20px;">🌐 Bonus: Tu sitio web profesional</h3>
                <p style="color: #D97706; margin-bottom: 15px; font-size: 16px; line-height: 1.6;">
                  <strong>Posterior a este email, recibirás la URL de tu sitio web</strong> el cual podrás revisar y si te encanta, 
                  <strong>te generaremos una propuesta irresistible para las mejoras y publicarlo</strong>.
                </p>
                <p style="color: #D97706; font-weight: bold; margin: 0;">
                  ✨ Sin compromiso, sin pagos adelantados, sin letra pequeña
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

      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(confirmationEmailData)
      });

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
