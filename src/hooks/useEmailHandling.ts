
import { useState } from 'react';
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
  generatedPrompts?: {
    superPrompt: string;
    lovablePrompt?: string;
  };
}

export const useEmailHandling = () => {
  const sendTestEmail = async (testEmail: string) => {
    try {
      console.log('🧪 Enviando email de prueba via edge function a:', testEmail);
      
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          type: 'test',
          email: testEmail
        }
      });

      if (error) {
        console.error('❌ Error en edge function:', error);
        throw error;
      }

      console.log('✅ Email de prueba enviado exitosamente:', data);
      return { success: true, data };
      
    } catch (error) {
      console.error('💥 Error en sendTestEmail:', error);
      throw error;
    }
  };

  const sendEmailToAdmin = async (formData: FormData) => {
    try {
      console.log('🚀 Enviando email a Esteban con datos del formulario...');
      console.log('📊 FormData recibida:', JSON.stringify(formData, null, 2));
      
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          type: 'admin',
          email: 'esteban@crealoconia.com',
          data: formData
        }
      });

      if (error) {
        console.error('❌ Error en edge function:', error);
        throw error;
      }

      console.log('✅ Email enviado exitosamente a Esteban:', data);
      return true;
      
    } catch (error) {
      console.error('💥 Error en sendEmailToAdmin:', error);
      throw error;
    }
  };

  const sendConfirmationEmail = async (formData: FormData) => {
    try {
      console.log('📨 Enviando email de confirmación al usuario:', formData.email);
      
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          type: 'confirmation',
          email: formData.email,
          data: formData
        }
      });

      if (error) {
        console.error('❌ Error en edge function:', error);
        throw error;
      }

      console.log('✅ Email de confirmación enviado exitosamente:', data);
      return true;
      
    } catch (error) {
      console.error('💥 Error en sendConfirmationEmail:', error);
      throw error;
    }
  };

  return {
    sendEmailToAdmin,
    sendConfirmationEmail,
    sendTestEmail
  };
};
