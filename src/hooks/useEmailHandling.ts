
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
    chatGPTPrompt: string;
    lovablePrompt: string;
  };
}

export const useEmailHandling = () => {
  const sendEmailToAdmin = async (formData: FormData) => {
    const BREVO_API_KEY = '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';
    
    try {
      console.log('🚀 Enviando email a Esteban con datos del formulario...');
      
      const contactInfo = () => {
        let contact = '';
        if (formData.email) contact += `📧 Email: ${formData.email}\n`;
        if (formData.whatsapp) contact += `📱 WhatsApp: +${formData.whatsapp}\n`;
        if (formData.website) contact += `🌐 Website: ${formData.website}\n`;
        if (formData.instagram) contact += `📱 Instagram: @${formData.instagram}\n`;
        return contact ? `${contact}` : '';
      };

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
        subject: `🚀 Nuevo Kit IA generado: ${formData.marca} - Crear sitio web`,
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
                <h2 style="color: #1E40AF; margin-top: 0; font-size: 18px;">👤 Descripción del negocio</h2>
                <p style="line-height: 1.6;">${formData.quien_eres}</p>
              </div>

              <div style="background: #FEF3C7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #D97706; margin-top: 0; font-size: 18px;">🎯 Problemas que resuelve</h2>
                <p style="line-height: 1.6;">${formData.problemas}</p>
              </div>

              <div style="background: #ECFDF5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #059669; margin-top: 0; font-size: 18px;">❓ Preguntas frecuentes de su audiencia</h2>
                <p style="line-height: 1.6;">${formData.preguntas_frecuentes}</p>
              </div>

              <div style="background: #FDF2F8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #BE185D; margin-top: 0; font-size: 18px;">🚀 Producto/servicio principal</h2>
                <p style="line-height: 1.6;">${formData.producto}</p>
              </div>

              ${formData.generatedPrompts ? `
              <div style="background: #FEF3C7; padding: 20px; border-radius: 8px; margin: 20px 0; border: 3px solid #F59E0B;">
                <h2 style="color: #92400E; margin-top: 0; font-size: 18px;">🤖 PROMPT TÉCNICO PARA LOVABLE</h2>
                <div style="background: #FFF; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 300px; overflow-y: auto; border: 1px solid #E5E7EB;">${formData.generatedPrompts.lovablePrompt}</div>
                <p style="color: #92400E; margin: 10px 0 0 0; font-weight: bold;">💡 Crear sitio web usando este prompt en Lovable</p>
              </div>
              ` : ''}

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
        subject: `🎯 ${formData.marca}, tu Kit IA está listo`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
            <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h1 style="color: #7C3AED; text-align: center; margin-bottom: 30px; font-size: 28px;">🎯 Tu Kit IA está listo</h1>
              
              <p style="font-size: 18px; color: #374151; margin-bottom: 20px;">Hola <strong>${formData.marca}</strong>,</p>
              
              <p style="font-size: 16px; color: #6B7280; line-height: 1.6; margin-bottom: 25px;">
                Tu kit personalizado ya está generado y listo para usar.<br>
                Esto es lo que incluye:
              </p>

              <div style="background: #F0F9FF; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #3B82F6;">
                <p style="color: #1E40AF; margin-bottom: 10px; font-weight: bold;">✅ Tu asistente IA personalizado para ChatGPT</p>
                <p style="color: #1E40AF; margin-bottom: 10px; font-weight: bold;">✅ Prompt técnico para crear tu sitio web</p>
                <p style="color: #1E40AF; margin-bottom: 0; font-weight: bold;">✅ Estrategia de contenido personalizada</p>
              </div>

              ${formData.generatedPrompts ? `
              <!-- Prompt para ChatGPT -->
              <div style="background: #F0F9FF; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h2 style="color: #0369A1; margin-top: 0; font-size: 18px;">🧠 Tu Asistente IA para ChatGPT</h2>
                <p style="color: #1E40AF; margin-bottom: 15px;">Copia este prompt y úsalo en ChatGPT para generar contenido personalizado:</p>
                <div style="background: white; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 300px; overflow-y: auto; border: 1px solid #E5E7EB;">${formData.generatedPrompts.chatGPTPrompt}</div>
              </div>

              <!-- Prompt para Lovable -->
              <div style="background: #ECFDF5; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h2 style="color: #059669; margin-top: 0; font-size: 18px;">🌐 Prompt para crear tu sitio web</h2>
                <p style="color: #065F46; margin-bottom: 15px;">Usa este prompt en Lovable.dev para crear tu sitio web automáticamente:</p>
                <div style="background: white; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 300px; overflow-y: auto; border: 1px solid #E5E7EB;">${formData.generatedPrompts.lovablePrompt}</div>
              </div>
              ` : ''}

              <div style="background: #FDF2F8; padding: 25px; border-radius: 8px; margin: 30px 0; border: 2px solid #EC4899;">
                <h3 style="color: #BE185D; margin-top: 0; margin-bottom: 15px; font-size: 20px;">🚀 Próximos pasos:</h3>
                <div style="color: #BE185D; margin-bottom: 15px; font-size: 16px; line-height: 1.6;">
                  <p style="margin-bottom: 10px;"><strong>1. Contenido inmediato:</strong> Usa tu asistente IA en ChatGPT</p>
                  <p style="margin-bottom: 10px;"><strong>2. Sitio web:</strong> Copia el prompt en Lovable.dev para crear tu web</p>
                  <p style="margin-bottom: 0;"><strong>3. Implementación:</strong> Estás listo para lanzar tu presencia digital</p>
                </div>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #6B7280; font-size: 14px; margin: 0;">
                  Kit completo valorado en <strong style="color: #7C3AED;">$97 USD</strong> - ¡Completamente gratis!
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
