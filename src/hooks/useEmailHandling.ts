
import { supabase } from "@/integrations/supabase/client";
import { useStrategicContent } from "./useStrategicContent";

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
  const { generateStrategicContent } = useStrategicContent();

  const sendEmailToAdmin = async (formData: FormData) => {
    try {
      console.log('Enviando email al admin...');
      
      // Crear contenido del email de forma más segura
      const emailContent = `NUEVO CLIENTE: ${formData.marca}

Email: ${formData.email}
WhatsApp: ${formData.whatsapp}
Website: ${formData.website || 'No especificado'}
Instagram: ${formData.instagram || 'No especificado'}

DATOS COMPLETOS:
Marca: ${formData.marca}
Quien es: ${formData.quien_eres}
Problemas: ${formData.problemas}
Preguntas frecuentes: ${formData.preguntas_frecuentes}
Estilo: ${formData.estilo}
Producto: ${formData.producto}`;

      const emailData = {
        to: 'estebanbonansea@gmail.com',
        subject: `Nuevo cliente: ${formData.marca}`,
        content: emailContent,
        formData: formData
      };

      const { data, error } = await supabase.functions.invoke('send-admin-email', {
        body: emailData
      });

      if (error) {
        console.error('Error enviando email al admin:', error);
        throw new Error('Error del servidor: ' + error.message);
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
      console.log('Generando contenido estratégico...');
      
      // Generar contenido estratégico usando OpenAI
      const strategicContent = await generateStrategicContent(formData);
      
      console.log('Enviando email de confirmación con contenido...');
      
      // Crear contenido del email de confirmación de forma más segura
      const emailContent = `🧠 TU KIT IA PERSONALIZADO ESTÁ LISTO

¡Hola!

Tu material estratégico para ${formData.marca} está listo. A continuación encontrarás tu Kit IA personalizado:

${strategicContent}

---

🚀 PRÓXIMOS PASOS:

1. Guarda este email en una carpeta especial
2. Usa el prompt personalizado de ChatGPT para generar más contenido
3. Implementa las ideas de contenido en tus redes sociales
4. Si necesitas ayuda, puedes contactarme por WhatsApp

¡Éxito en tu estrategia digital!

Esteban Bonansea
Kit IA de Esteban`;
      
      const emailData = {
        to: formData.email,
        subject: `🧠 Tu Kit IA está listo - ${formData.marca}`,
        content: emailContent,
        formData: formData
      };

      const { data, error } = await supabase.functions.invoke('send-confirmation-email', {
        body: emailData
      });

      if (error) {
        console.error('Error enviando email:', error);
        throw new Error('Error del servidor: ' + error.message);
      }

      console.log('Email enviado exitosamente');
      return { success: true, data, strategicContent };
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
