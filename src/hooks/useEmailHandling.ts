
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
      
      const tecnicalPrompt = `PROMPT PARA GENERAR SITIO WEB EN LOVABLE

DATOS DEL CLIENTE:
- Marca: ${formData.marca}
- Email: ${formData.email}
- WhatsApp: ${formData.whatsapp}
- Website actual: ${formData.website || 'No tiene'}
- Instagram: ${formData.instagram || 'No tiene'}

PERFIL PROFESIONAL:
${formData.quien_eres}

PROBLEMAS QUE RESUELVE:
${formData.problemas}

PRODUCTO/SERVICIO PRINCIPAL:
${formData.producto}

PREGUNTAS FRECUENTES:
${formData.preguntas_frecuentes}

ESTILO DE COMUNICACION:
${formData.estilo}

INSTRUCCIONES PARA LOVABLE:
Genera un sitio web profesional de una pagina con estructura completa, diseño moderno y contenido personalizado basado en los datos proporcionados.`;

      const { data, error } = await supabase.functions.invoke('send-admin-email', {
        body: {
          to: 'estebanbonansea@gmail.com',
          subject: `Nuevo cliente: ${formData.marca}`,
          content: tecnicalPrompt,
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
      
      const baseContent = `TU KIT IA PERSONALIZADO ESTA LISTO

Hola! Aqui tienes tu material Hazlo con IA personalizado para ${formData.marca}.

BLOQUE 1 - DOCUMENTACION DE MARCA

Nombre de la marca: ${formData.marca}
Quien eres: ${formData.quien_eres}
Problema que resuelves: ${formData.problemas}
Producto principal: ${formData.producto}
Preguntas frecuentes clave: ${formData.preguntas_frecuentes}
Estilo de comunicacion: ${formData.estilo}

BLOQUE 2 - IDEAS DE CONTENIDO INICIAL

Reels (5 ideas)
1. Un dia en la vida de... - Muestra tu proceso de trabajo
2. Mito vs Realidad - Desmiente creencias limitantes de tu nicho
3. Antes y despues - Transformacion de un cliente
4. 3 errores que cometes... - Errores comunes en tu area
5. Mi historia personal - Como llegaste a hacer lo que haces

Stories (5 ideas)
1. Pregunta y respuesta con tu audiencia
2. Detras de escena de una sesion/consulta
3. Reflexion del dia con mensaje inspirador
4. Testimonial de cliente en formato historia
5. Tips rapidos en formato carrusel

Posts (5 ideas)
1. Post educativo: 5 pasos para... relacionado a tu metodo
2. Post inspiracional con tu filosofia de vida/trabajo
3. Post de autoridad: Por que creo que... (opinion experta)
4. Post storytelling: caso de exito de cliente
5. Post de valor: herramienta o recurso gratuito

BLOQUE 3 - ASISTENTE PERSONAL IA

Copia este prompt en ChatGPT y usalo como tu generador de contenido:

Eres un experto en creacion de contenido, marketing digital, ventas y posicionamiento de marca personal.

DATOS DEL NEGOCIO:
- Marca: ${formData.marca}
- Profesional: ${formData.quien_eres}
- Problema que resuelve: ${formData.problemas}
- Metodo de solucion: ${formData.producto}
- Preguntas frecuentes: ${formData.preguntas_frecuentes}
- Estilo de comunicacion: ${formData.estilo}
- Instagram: ${formData.instagram || 'No especificado'}
- Web: ${formData.website || 'No especificado'}
- WhatsApp: ${formData.whatsapp}

INSTRUCCIONES DE CONTENIDO:
- Manten tono inspirador, profesional y cercano
- Genera contenido educativo, emocional, de venta y autoridad
- Aplica microhistorias y ejemplos
- Menciona el programa principal cuando sea relevante
- Crea material adaptable para Instagram, Reels, Stories, LinkedIn, Facebook y correos
- Dirige trafico a su website o WhatsApp
- Invita a la accion
- No repitas las respuestas exactas del formulario

Cuando el usuario te pida contenido, genera ideas especificas, textos completos y estrategias accionables.

PROXIMOS PASOS

1. Guarda este prompt en ChatGPT para generar contenido ilimitado
2. Usalo diariamente pidiendo posts, reels, emails, etc.
3. Tu sitio web profesional estara listo en las proximas horas y lo recibiras por email

Tu presencia digital profesional esta en camino!`;

      const context = `El cliente es ${formData.marca}, que se dedica a: ${formData.quien_eres}. Su estilo de comunicacion debe ser: ${formData.estilo}. Mejora este contenido para que sea mas profesional, estrategico y accionable.`;

      console.log('Mejorando contenido con ChatGPT...');
      
      const { data: enhancedData, error: enhanceError } = await supabase.functions.invoke('enhance-with-chatgpt', {
        body: {
          content: baseContent,
          context: context
        }
      });

      const finalContent = enhancedData?.enhancedContent || baseContent;

      console.log('Enviando email de confirmacion al cliente...');

      const { data, error } = await supabase.functions.invoke('send-confirmation-email', {
        body: {
          to: formData.email,
          subject: `Tu material Hazlo con IA esta listo - ${formData.marca}`,
          content: finalContent,
          formData: formData
        }
      });

      if (error) {
        console.error('Error enviando email de confirmacion:', error);
        throw new Error(`Error del servidor: ${error.message}`);
      }

      console.log('Email de confirmacion enviado exitosamente');
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
