
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

export const useStrategicContent = () => {
  const generateStrategicContent = async (formData: FormData): Promise<string> => {
    try {
      console.log('Generando contenido estratégico...');
      
      const { data, error } = await supabase.functions.invoke('generate-strategic-content', {
        body: { formData }
      });

      if (error) {
        console.error('Error generando contenido estratégico:', error);
        throw new Error('Error del servidor: ' + error.message);
      }

      console.log('Contenido estratégico generado exitosamente');
      return data.strategicContent;
    } catch (error) {
      console.error('Error en generateStrategicContent:', error);
      throw error;
    }
  };

  return {
    generateStrategicContent
  };
};
