
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
      console.log('📤 Enviando email al admin con datos del formulario...');
      
      const tecnicalPromptForLovable = `# PROMPT PARA GENERAR SITIO WEB EN LOVABLE

## DATOS DEL CLIENTE:
- **Marca:** ${formData.marca}
- **Email:** ${formData.email}
- **WhatsApp:** ${formData.whatsapp}
- **Website actual:** ${formData.website || 'No tiene'}
- **Instagram:** ${formData.instagram || 'No tiene'}

## PERFIL PROFESIONAL:
${formData.quien_eres}

## PROBLEMAS QUE RESUELVE:
${formData.problemas}

## PRODUCTO/SERVICIO PRINCIPAL:
${formData.producto}

## PREGUNTAS FRECUENTES:
${formData.preguntas_frecuentes}

## ESTILO DE COMUNICACIÓN:
${formData.estilo}

---

# INSTRUCCIONES PARA LOVABLE:

Genera un sitio web profesional de una página (landing page) que incluya:

## 1. ESTRUCTURA GENERAL:
- Header con navegación limpia
- Hero section potente con propuesta de valor clara
- Sección "Sobre mí/nosotros"
- Sección de servicios/productos
- Sección de testimonios (placeholder)
- FAQ section
- Call-to-action final
- Footer con contacto

## 2. DISEÑO Y ESTILO:
- Diseño moderno, limpio y profesional
- Responsive design
- Colores que transmitan confianza y profesionalismo
- Tipografía clara y legible
- Espaciado generoso y jerarquía visual clara

## 3. CONTENIDO CLAVE:
- Headlines impactantes basados en la propuesta de valor
- Textos persuasivos que conecten emocionalmente
- CTAs claros hacia WhatsApp y formularios de contacto
- Integrar información de contacto proporcionada

## 4. FUNCIONALIDADES:
- Formulario de contacto funcional
- Botones de WhatsApp
- Links a redes sociales
- Sección FAQ expandible
- Animaciones sutiles y profesionales

## 5. OPTIMIZACIÓN:
- SEO básico implementado
- Velocidad de carga optimizada
- Accesibilidad web
- Compatible con dispositivos móviles

**IMPORTANTE:** Usa los datos proporcionados para personalizar todo el contenido, pero mejora la redacción para que sea más profesional y persuasiva.`;

      const { data, error } = await supabase.functions.invoke('send-admin-email', {
        body: {
          to: 'estebanbonansea@gmail.com',
          subject: `🚀 Nuevo cliente: ${formData.marca}`,
          content: tecnicalPromptForLovable,
          formData: formData
        }
      });

      if (error) {
        console.error('❌ Error enviando email al admin:', error);
        throw new Error(`Error del servidor: ${error.message}`);
      }

      console.log('✅ Email enviado al admin exitosamente');
      return { success: true, data };
    } catch (error) {
      console.error('💥 Error en sendEmailToAdmin:', error);
      throw error;
    }
  };

  const sendConfirmationEmail = async (formData: FormData) => {
    try {
      console.log('📤 Generando contenido estratégico...');
      
      const baseContent = `# 🎯 TU KIT IA PERSONALIZADO ESTÁ LISTO

¡Hola! Aquí tienes tu material "Hazlo con IA" personalizado para ${formData.marca}.

---

## 📋 BLOQUE 1 - DOCUMENTACIÓN DE MARCA

**Nombre de la marca:** ${formData.marca}

**Quién eres:** ${formData.quien_eres}

**Problema que resuelves:** ${formData.problemas}

**Producto principal:** ${formData.producto}

**Preguntas frecuentes clave:** ${formData.preguntas_frecuentes}

**Estilo de comunicación:** ${formData.estilo}

---

## 💡 BLOQUE 2 - IDEAS DE CONTENIDO INICIAL

### Reels (5 ideas)
1. "Un día en la vida de..." - Muestra tu proceso de trabajo
2. "Mito vs Realidad" - Desmiente creencias limitantes de tu nicho
3. "Antes y después" - Transformación de un cliente (con permiso)
4. "3 errores que cometes..." - Errores comunes en tu área
5. "Mi historia personal" - Cómo llegaste a hacer lo que haces

### Stories (5 ideas)
1. Pregunta & respuesta con tu audiencia
2. "Detrás de escena" de una sesión/consulta
3. Reflexión del día con mensaje inspirador
4. Testimonial de cliente en formato historia
5. Tips rápidos en formato carrusel

### Posts (5 ideas)
1. Post educativo: "5 pasos para..." relacionado a tu método
2. Post inspiracional con tu filosofía de vida/trabajo
3. Post de autoridad: "Por qué creo que..." (opinión experta)
4. Post storytelling: caso de éxito de cliente
5. Post de valor: herramienta o recurso gratuito

---

## 🤖 BLOQUE 3 - ASISTENTE PERSONAL IA

**Copia este prompt en ChatGPT y úsalo como tu generador de contenido:**

Eres un experto en creación de contenido, marketing digital, ventas y posicionamiento de marca personal.

DATOS DEL NEGOCIO:
- Marca: ${formData.marca}
- Profesional: ${formData.quien_eres}
- Problema que resuelve: ${formData.problemas}
- Método de solución: ${formData.producto}
- Preguntas frecuentes: ${formData.preguntas_frecuentes}
- Estilo de comunicación: ${formData.estilo}
- Instagram: ${formData.instagram || 'No especificado'}
- Web: ${formData.website || 'No especificado'}
- WhatsApp: ${formData.whatsapp}

INSTRUCCIONES DE CONTENIDO:
- Mantén tono inspirador, profesional y cercano
- Genera contenido educativo, emocional, de venta y autoridad
- Aplica microhistorias y ejemplos
- Menciona el programa principal cuando sea relevante
- Crea material adaptable para Instagram, Reels, Stories, LinkedIn, Facebook y correos
- Dirige tráfico a su website o WhatsApp
- Invita a la acción
- No repitas las respuestas exactas del formulario

Cuando el usuario te pida contenido, genera ideas específicas, textos completos y estrategias accionables.

---

## 🚀 PRÓXIMOS PASOS

1. **Guarda este prompt** en ChatGPT para generar contenido ilimitado
2. **Úsalo diariamente** pidiendo posts, reels, emails, etc.
3. **Tu sitio web profesional** estará listo en las próximas horas y lo recibirás por email

¡Tu presencia digital profesional está en camino! 💪`;

      const context = `El cliente es ${formData.marca}, que se dedica a: ${formData.quien_eres}. Su estilo de comunicación debe ser: ${formData.estilo}. Mejora este contenido para que sea más profesional, estratégico y accionable.`;

      console.log('🔄 Mejorando contenido con ChatGPT...');
      
      const { data: enhancedData, error: enhanceError } = await supabase.functions.invoke('enhance-with-chatgpt', {
        body: {
          content: baseContent,
          context: context
        }
      });

      const finalContent = enhancedData?.enhancedContent || baseContent;

      console.log('📤 Enviando email de confirmación al cliente...');

      const { data, error } = await supabase.functions.invoke('send-confirmation-email', {
        body: {
          to: formData.email,
          subject: `🎯 Tu material "Hazlo con IA" está listo - ${formData.marca}`,
          content: finalContent,
          formData: formData
        }
      });

      if (error) {
        console.error('❌ Error enviando email de confirmación:', error);
        throw new Error(`Error del servidor: ${error.message}`);
      }

      console.log('✅ Email de confirmación enviado exitosamente');
      return { success: true, data };
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
