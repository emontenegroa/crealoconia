
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

      console.log('Email enviado al admin exitosamente');
      return { success: true };
    } catch (error) {
      console.error('Error en sendEmailToAdmin:', error);
      return { success: false, error };
    }
  };

  const sendConfirmationEmail = async (formData: FormData, strategicContent: string) => {
    try {
      console.log('Enviando email de confirmación...');
      
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
      
      console.log('Email de confirmación preparado');
      return { success: true, strategicContent };
    } catch (error) {
      console.error('Error en sendConfirmationEmail:', error);
      return { success: false, error };
    }
  };

  return {
    sendEmailToAdmin,
    sendConfirmationEmail
  };
};
