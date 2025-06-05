
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
      
      const emailData = {
        to: 'estebanbonansea@gmail.com',
        subject: 'Nuevo cliente: ' + formData.marca,
        content: 'NUEVO CLIENTE: ' + formData.marca + '\n\nEmail: ' + formData.email,
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
      console.log('Generando contenido estrategico...');
      
      const emailContent = 'TU KIT IA PERSONALIZADO ESTA LISTO\n\nHola! Tu material para ' + formData.marca + ' esta listo.';
      
      const emailData = {
        to: formData.email,
        subject: 'Tu Kit IA esta listo - ' + formData.marca,
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
