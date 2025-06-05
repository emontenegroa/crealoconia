
import { supabase } from "@/integrations/supabase/client";

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
    try {
      console.log('Enviando email al admin...');
      
      const content = `NUEVO CLIENTE: ${formData.marca}
      
Email: ${formData.email}
WhatsApp: ${formData.whatsapp}
Website: ${formData.website || 'No tiene'}
Instagram: ${formData.instagram || 'No tiene'}

QUIEN ES: ${formData.quien_eres}

PROBLEMAS QUE RESUELVE: ${formData.problemas}

PRODUCTO: ${formData.producto}

PREGUNTAS FRECUENTES: ${formData.preguntas_frecuentes}

ESTILO: ${formData.estilo}`;

      const { data, error } = await supabase.functions.invoke('send-admin-email', {
        body: {
          to: 'estebanbonansea@gmail.com',
          subject: `Nuevo cliente: ${formData.marca}`,
          content: content,
          formData: formData
        }
      });

      if (error) {
        console.error('Error enviando email al admin:', error);
        throw new Error(`Error del servidor: ${error.message}`);
      }

      console.log('Email enviado al admin exitosamente');
      return { success: true, data };
    } catch (error) {
      console.error('Error en sendEmailToAdmin:', error);
      throw error;
    }
  };

  const sendConfirmationEmail = async (formData: FormData) => {
    try {
      console.log('Generando contenido estrategico...');
      
      const content = `TU KIT IA PERSONALIZADO ESTA LISTO

Hola! Aqui tienes tu material personalizado para ${formData.marca}.

DATOS DE TU MARCA:
- Marca: ${formData.marca}
- Email: ${formData.email}
- WhatsApp: ${formData.whatsapp}
- Website: ${formData.website || 'No especificado'}
- Instagram: ${formData.instagram || 'No especificado'}

PERFIL: ${formData.quien_eres}

PROBLEMA QUE RESUELVES: ${formData.problemas}

PRODUCTO PRINCIPAL: ${formData.producto}

PREGUNTAS FRECUENTES: ${formData.preguntas_frecuentes}

ESTILO DE COMUNICACION: ${formData.estilo}

PROXIMOS PASOS:
1. Guarda este contenido para crear tu estrategia
2. Tu sitio web estara listo pronto
3. Revisa tu email para mas detalles

Tu presencia digital profesional esta en camino!`;

      const context = `El cliente es ${formData.marca}, mejora este contenido para que sea profesional y estrategico.`;

      console.log('Mejorando contenido...');
      
      const { data: enhancedData, error: enhanceError } = await supabase.functions.invoke('enhance-with-chatgpt', {
        body: {
          content: content,
          context: context
        }
      });

      const finalContent = enhancedData?.enhancedContent || content;

      console.log('Enviando email de confirmacion...');

      const { data, error } = await supabase.functions.invoke('send-confirmation-email', {
        body: {
          to: formData.email,
          subject: `Tu Kit IA esta listo - ${formData.marca}`,
          content: finalContent,
          formData: formData
        }
      });

      if (error) {
        console.error('Error enviando email:', error);
        throw new Error(`Error del servidor: ${error.message}`);
      }

      console.log('Email enviado exitosamente');
      return { success: true, data };
    } catch (error) {
      console.error('Error en sendConfirmationEmail:', error);
      throw error;
    }
  };

  return {
    sendEmailToAdmin,
    sendConfirmationEmail
  };
};
