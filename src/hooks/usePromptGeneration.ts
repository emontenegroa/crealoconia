
import { FormData } from './useFormHandler';
import { supabase } from '@/integrations/supabase/client';

export const usePromptGeneration = () => {
  const generateSuperPrompt = async (data: FormData) => {
    // Generar público objetivo basado en el problema y quien eres
    const publicoObjetivo = data.quien_eres.includes('atletas') ? 
      'Atletas, deportistas de alto rendimiento y emprendedores ambiciosos' :
      data.quien_eres.includes('productividad') ?
      'Ejecutivos, emprendedores y freelancers que buscan optimizar su tiempo' :
      `Personas que ${data.problemas.toLowerCase().split('.')[0]}`;
    
    // Generar beneficios principales reformulados
    const beneficios = `✅ Transformación comprobada con metodología específica
✅ Eliminación de bloqueos limitantes en tiempo récord
✅ Desarrollo de confianza y resultados sostenibles
✅ Estrategias probadas por profesionales de alto rendimiento
✅ Acompañamiento ${data.estilo.toLowerCase()} durante todo el proceso`;

    // Detectar gaps de información
    const gaps = [];
    if (!data.quien_eres.includes('años') && !data.quien_eres.includes('experiencia')) {
      gaps.push('- Años de experiencia específicos');
    }
    if (!data.producto.includes('precio') && !data.producto.includes('inversión')) {
      gaps.push('- Información de inversión o precio');
    }
    if (!data.problemas.includes('resultados') && !data.problemas.includes('logran')) {
      gaps.push('- Resultados específicos que logras con tus clientes');
    }

    const gapsSection = gaps.length > 0 ? 
      `\n\nVACÍOS DETECTADOS QUE DEBERÍAS COMPLETAR:\n${gaps.join('\n')}\n\nPREGUNTAS ADICIONALES PARA ENRIQUECER TU ESTRATEGIA:\n- ¿Cuáles son 3 casos de éxito específicos con resultados medibles?\n- ¿Qué metodología o framework único utilizas?\n- ¿Cuál es la inversión de tu programa principal?\n- ¿Qué garantías o diferenciadores ofreces vs. la competencia?` : '';

    // Prompt base para ChatGPT
    const baseSuperPrompt = `👋 ¡Hola, ${data.marca}!
Bienvenida/o al **Asistente de Contenido, Estrategia e Imágenes**, creado con toda tu información para ayudarte a potenciar tu marca, atraer clientes y comunicar desde tu autenticidad.

Este SuperPROM fue desarrollado con **CrealoConIA.com** y ejecutado en **Lovable.dev**, para ofrecerte una experiencia estratégica, creativa y automatizada adaptada a tu esencia.

🎯 Funciona como una agencia de marketing personalizada que combina estrategia, creatividad, generación de contenido e imágenes asistidas por IA.
Te felicitamos por integrar Inteligencia Artificial a tu negocio o servicio.

───────────────────────────────────────────────
ASISTENTE PERSONALIZADO DE CONTENIDO Y ESTRATEGIA PARA ${data.marca}

Actúa como experto en:
- Marketing digital estratégico
- Marca personal profesional  
- Generación de contenido viral
- Ventas digitales
- Embudos de monetización
- Posicionamiento de autoridad
- Estrategias de crecimiento orgánico
- Copywriting emocional y persuasivo
- Automatización de negocio digital
- Generación y mejora de imágenes con IA

DATOS DEL NEGOCIO:
Marca: ${data.marca}
Profesional: ${data.quien_eres}
Público objetivo: ${publicoObjetivo}
Problema principal: ${data.problemas}
Método de trabajo: A través de ${data.producto}
Producto principal: ${data.producto}
Beneficios clave: ${beneficios}
Preguntas frecuentes de su audiencia: ${data.preguntas_frecuentes}
Estilo de comunicación: ${data.estilo}${data.instagram ? `\nInstagram: @${data.instagram}` : ''}${data.website ? `\nWeb: ${data.website}` : ''}${data.whatsapp ? `\nWhatsApp: +${data.whatsapp}` : ''}

───────────────────────────────────────────────
📋 **MENÚ PRINCIPAL DEL SUPERPROM**
───────────────────────────────────────────────
1️⃣ Crear publicaciones virales para Instagram o TikTok
2️⃣ Diseñar guiones de Reels con estructura emocional y CTA
3️⃣ Escribir historias de conexión para Stories o newsletters
4️⃣ Redactar secuencias de email marketing estratégicas
5️⃣ Elaborar un guion para un webinar o masterclass
6️⃣ Escribir un copy de venta para el servicio principal
7️⃣ Crear una serie educativa para posicionamiento de autoridad
8️⃣ Responder objeciones frecuentes del público
9️⃣ Diseñar un embudo completo (atracción, conexión, conversión)
🔟 Mejorar o reescribir textos de página web o landing
💬 Explicar el servicio/producto principal de forma cercana y profesional
🪄 Generar ideas creativas para lanzamientos o campañas
🖼️ Crear o mejorar imágenes con Gemini (nuevo módulo visual)

───────────────────────────────────────────────
🖼️ **MÓDULO DE CREACIÓN Y MEJORA DE IMÁGENES CON GEMINI**
───────────────────────────────────────────────
Selecciona una de las siguientes opciones visuales:

1️⃣ Mejorar la calidad o nitidez de una imagen existente.
2️⃣ Crear una imagen **ultrarrealista** basada en una idea o concepto.
3️⃣ Generar una imagen **artística o metafórica** para redes sociales.
4️⃣ Crear una **imagen con fondo neutro o blanco** para productos o retratos.
5️⃣ Diseñar una **portada de curso, libro o programa online**.
6️⃣ Generar **variaciones visuales** de una misma imagen.
7️⃣ Crear una **composición emocional** (por ejemplo: calma, transformación, conexión interior).
8️⃣ Crear un **mockup profesional** (celular, laptop, banner).
9️⃣ Combinar **texto + imagen** en estilo afiche inspiracional.
🔟 Crear una imagen **publicitaria con enfoque estratégico**.

✨ Luego de elegir, escribe tu idea o descripción. Ejemplo:
"Quiero usar la opción 2 y crear una imagen ultrarrealista de una persona alcanzando sus metas, estilo natural y cálido."

───────────────────────────────────────────────
⚙️ **INSTRUCCIONES DE USO**
───────────────────────────────────────────────
🔹 Escribe el número de la opción que deseas ejecutar o descríbelo en tus palabras.
🔹 Puedes escribir "MENÚ" en cualquier momento para volver a esta guía.
🔹 El asistente usará toda la información contextual de **${data.marca}** para generar contenido y visuales alineados a su estilo ${data.estilo.toLowerCase()}.
🔹 Indica si deseas un enfoque **emocional**, **educativo**, **de venta**, o **visual**.
🔹 Cada opción puede adaptarse al formato que necesites (Instagram, Reels, Email, Blog, Web, o Imagen).

───────────────────────────────────────────────
💡 **Ejemplo de uso:**
"Quiero usar la opción 2 del módulo de imágenes para crear una ilustración artística sobre ${data.problemas.split('.')[0].toLowerCase()}."

O simplemente: "Ayúdame a crear 5 posts para Instagram sobre ${data.producto.split(',')[0]}."
───────────────────────────────────────────────

INSTRUCCIONES PARA CREAR CONTENIDO:
- Genera contenido accionable, persuasivo y adaptado a cada plataforma.
- No repitas literalmente el perfil de negocio, usa el contexto para crear.
- Integra ejemplos, casos, microhistorias y lenguaje emocional.
- Menciona "${data.producto.split(',')[0]}" cuando corresponda.
- Adapta el contenido a: Instagram, Reels, Stories, TikTok, LinkedIn, YouTube Shorts, Email Marketing y Webinars.
- Incluye llamados a la acción coherentes.
- Permite variar entre contenido educativo, ventas, posicionamiento de autoridad, engagement emocional y manejo de objeciones.
- Identifica ángulos comerciales aprovechables.

¿En qué área específica de contenido o estrategia te gustaría que te ayude hoy para ${data.marca}?${gapsSection}`;

    // Generar prompt de Lovable mejorado
    const lovablePrompt = `Crea un sitio web profesional y altamente efectivo para ${data.marca}.

INFORMACIÓN DEL NEGOCIO:
- Marca: ${data.marca}
- Especialista: ${data.quien_eres}
- Problema que resuelve: ${data.problemas}
- Producto principal: ${data.producto}
- Estilo de comunicación: ${data.estilo}
- Instagram: ${data.instagram || 'No proporcionado'}
- Website actual: ${data.website || 'No tiene'}
- WhatsApp: ${data.whatsapp}

OBJETIVO DEL SITIO:
Crear una landing page que posicione a ${data.marca} como la autoridad definitiva en su nicho y convierta visitantes en clientes potenciales cualificados.

ESTRUCTURA REQUERIDA:
1. **Header navegable** con logo, menú y CTA principal
2. **Hero section impactante** con propuesta de valor clara y CTA prominente
3. **Sección "Quién soy"** que genere credibilidad y conexión emocional
4. **Problema-Solución** mostrando pain points específicos y cómo los resuelve
5. **Metodología/Proceso** explicando su sistema único de trabajo
6. **Testimonios sociales** (crear 3-4 testimonios realistas y específicos)
7. **Producto/Servicio principal** con beneficios claros y urgencia
8. **FAQ estratégicas** respondiendo: ${data.preguntas_frecuentes}
9. **Formulario de contacto/captación** optimizado para conversión
10. **Footer completo** con redes sociales y información de contacto

ESPECIFICACIONES TÉCNICAS:
- Diseño moderno, limpio y 100% responsive
- Optimizado para conversión con múltiples CTAs estratégicos
- Paleta de colores profesional y coherente con el nicho
- Tipografía legible y jerarquía visual clara
- Animaciones sutiles y micro-interacciones
- Imágenes placeholder apropiadas para el sector
- Formularios funcionales con validación
- Optimización SEO básica

COPY Y CONTENIDO:
- Headlines magnéticos que capturen atención inmediata
- Copy emocional que conecte con dolores específicos del público
- Prueba social estratégicamente distribuida
- CTAs irresistibles con urgencia y claridad
- Beneficios orientados a resultados, no características
- Lenguaje ${data.estilo.toLowerCase()} pero persuasivo

El sitio debe transmitir autoridad, generar confianza y motivar acción inmediata para contactar o contratar los servicios de ${data.marca}.`;

    console.log('🎯 Iniciando generación de prompts para:', data.marca);
    console.log('📝 Datos del formulario recibidos:', {
      marca: data.marca,
      estilo: data.estilo,
      quien_eres: data.quien_eres ? 'Presente' : 'Ausente',
      problemas: data.problemas ? 'Presente' : 'Ausente',
      producto: data.producto ? 'Presente' : 'Ausente'
    });

    try {
      // Intentar mejorar el prompt usando la Edge Function de Supabase
      console.log('🤖 Mejorando Super Prompt con ChatGPT via Supabase...');
      
      const { data: enhanceResult, error } = await supabase.functions.invoke('enhance-with-ai', {
        body: {
          userText: baseSuperPrompt,
          fieldType: 'super_prompt',
          context: {
            marca: data.marca,
            estilo: data.estilo
          }
        }
      });

      let enhancedSuperPrompt = baseSuperPrompt;
      
      if (!error && enhanceResult?.enhancedText) {
        enhancedSuperPrompt = enhanceResult.enhancedText;
        console.log('✅ Super Prompt mejorado con ChatGPT via Supabase');
      } else {
        console.warn('⚠️ No se pudo mejorar con ChatGPT, usando versión base. Error:', error);
      }

      console.log('📋 Prompts generados exitosamente:', {
        superPromptLength: enhancedSuperPrompt.length,
        lovablePromptLength: lovablePrompt.length,
        hasSuperPrompt: !!enhancedSuperPrompt,
        hasLovablePrompt: !!lovablePrompt
      });

      return {
        superPrompt: enhancedSuperPrompt,
        lovablePrompt // Siempre devuelve el prompt completo de Lovable
      };
      
    } catch (error) {
      console.error('❌ Error al generar prompts:', error);
      
      // Fallback: devolver prompts base si falla la mejora
      console.log('🔄 Usando prompts base como fallback');
      console.log('📋 Prompts base generados:', {
        superPromptLength: baseSuperPrompt.length,
        lovablePromptLength: lovablePrompt.length
      });
      
      return {
        superPrompt: baseSuperPrompt,
        lovablePrompt // Devuelve el prompt completo, no un mensaje de error
      };
    }
  };

  return {
    generateSuperPrompt
  };
};
