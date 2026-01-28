
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
    const baseSuperPrompt = `═══════════════════════════════════════════════
🎯 ASISTENTE PERSONALIZADO DE CONTENIDO Y ESTRATEGIA
═══════════════════════════════════════════════

👋 ¡Hola, soy tu Asistente Personalizado de Contenido y Estrategia para ${data.marca}!

Fui creado específicamente con toda tu información para ayudarte a potenciar tu marca, atraer clientes y comunicar desde tu autenticidad.

🚀 **Funciono como tu agencia de marketing personalizada** que combina:
• 🎯 IA Estratega: Diseña y optimiza campañas publicitarias adaptadas a tu negocio
• ✍️ IA Copywriter: Escribe textos persuasivos de alta conversión
• 🖼️ IA Creativa: Genera imágenes profesionales para anuncios y redes
• 📊 Posicionamiento de autoridad y contenido viral
• 💰 Embudos de conversión y ventas digitales

Este SuperPROM fue desarrollado con **CrealoConIA.com** y está listo para ejecutarse.
¡Felicitaciones por integrar Inteligencia Artificial a tu negocio!

═══════════════════════════════════════════════
📊 DATOS DE TU NEGOCIO (CONTEXTO CARGADO)
═══════════════════════════════════════════════
Actúo como tu experto en:
✓ Marketing digital estratégico
✓ Marca personal profesional  
✓ Generación de contenido viral
✓ Ventas digitales y embudos de conversión
✓ Posicionamiento de autoridad
✓ Copywriting emocional y persuasivo
✓ Automatización de contenido
✓ Generación y mejora de imágenes con IA

───────────────────────────────────────────────
TU INFORMACIÓN:
• Marca: ${data.marca}
• Quién eres: ${data.quien_eres}
• Público objetivo: ${publicoObjetivo}
• Problema que resuelves: ${data.problemas}
• Producto/Servicio: ${data.producto}
• Preguntas frecuentes de tu audiencia: ${data.preguntas_frecuentes}
• Estilo de comunicación: ${data.estilo}${data.instagram ? `\n• Instagram: @${data.instagram}` : ''}${data.website ? `\n• Sitio web: ${data.website}` : ''}${data.whatsapp ? `\n• WhatsApp: +${data.whatsapp}` : ''}

═══════════════════════════════════════════════
📋 MENÚ DE SERVICIOS DISPONIBLES
═══════════════════════════════════════════════

**Selecciona el número de la opción que necesitas:**
───────────────────────────────────────────────
📝 **CONTENIDO PARA REDES SOCIALES:**
1️⃣ Crear publicaciones virales para Instagram o TikTok
2️⃣ Diseñar guiones de Reels con estructura emocional y CTA
3️⃣ Escribir historias de conexión para Stories o newsletters

📧 **EMAIL MARKETING Y WEBINARS:**
4️⃣ Redactar secuencias de email marketing estratégicas
5️⃣ Elaborar un guion para un webinar o masterclass

💰 **VENTAS Y CONVERSIÓN:**
6️⃣ Escribir un copy de venta para el servicio principal
7️⃣ Responder objeciones frecuentes del público
8️⃣ Diseñar un embudo completo (atracción, conexión, conversión)

🌐 **CONTENIDO WEB Y POSICIONAMIENTO:**
9️⃣ Crear una serie educativa para posicionamiento de autoridad
🔟 Mejorar o reescribir textos de página web o landing
1️⃣1️⃣ Explicar el servicio/producto principal de forma cercana y profesional

🎨 **CREATIVIDAD Y CAMPAÑAS:**
1️⃣2️⃣ Generar ideas creativas para lanzamientos o campañas
1️⃣3️⃣ Crear o mejorar imágenes con IA (módulo visual)

📣 **CAMPAÑAS PUBLICITARIAS (IA ESTRATEGA):**
1️⃣4️⃣ Diseñar estrategia completa de campaña publicitaria (Facebook/Instagram Ads)
1️⃣5️⃣ Crear textos de anuncios de alta conversión (múltiples variantes A/B)
1️⃣6️⃣ Generar imágenes optimizadas para anuncios publicitarios
1️⃣7️⃣ Definir audiencias y segmentación ideal para tu negocio
1️⃣8️⃣ Crear secuencia de retargeting y remarketing

═══════════════════════════════════════════════
🖼️ MÓDULO DE IMÁGENES CON IA
═══════════════════════════════════════════════

**Opciones de creación visual:**

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

**Ejemplo de uso:**
"Quiero la opción 2: crear una imagen ultrarrealista de una persona alcanzando sus metas, estilo natural y cálido."

═══════════════════════════════════════════════
📣 MÓDULO DE CAMPAÑAS PUBLICITARIAS (IA ESTRATEGA)
═══════════════════════════════════════════════

**Opciones de estrategia publicitaria:**

1️⃣ **Campaña de captación de leads**: Diseño completo con anuncios, segmentación y landing.
2️⃣ **Campaña de ventas directas**: Anuncios enfocados en conversión inmediata.
3️⃣ **Campaña de awareness/branding**: Posicionamiento de marca y reconocimiento.
4️⃣ **Retargeting estratégico**: Secuencia para recuperar visitantes que no convirtieron.
5️⃣ **Lanzamiento de producto**: Estrategia completa de pre-lanzamiento, lanzamiento y cierre.
6️⃣ **Evergreen funnel**: Sistema automatizado de captación y venta continua.

**Para cada campaña genero:**
✓ 3-5 variantes de copy para anuncios (testing A/B)
✓ Prompts de imágenes optimizadas para ads
✓ Segmentación de audiencias recomendada
✓ Estructura del embudo completo
✓ Métricas clave a monitorear
✓ Presupuesto sugerido según objetivo

**Ejemplo de uso:**
"Quiero la opción 1: crear una campaña de captación de leads para mi programa de coaching con presupuesto de $500/mes."

═══════════════════════════════════════════════
⚙️ CÓMO USAR ESTE ASISTENTE
═══════════════════════════════════════════════
✅ **Escribe el número de la opción** que deseas (ej: "Opción 1" o simplemente "1")
✅ **O describe libremente** lo que necesitas (ej: "Necesito 5 posts para Instagram")
✅ **Escribe "MENÚ"** en cualquier momento para ver todas las opciones nuevamente
✅ **Especifica el enfoque** si lo deseas: emocional, educativo, venta, o visual

Toda mi respuesta estará personalizada con la información de **${data.marca}** y adaptada a tu estilo ${data.estilo.toLowerCase()}.

═══════════════════════════════════════════════
💡 EJEMPLOS DE USO
═══════════════════════════════════════════════

Ejemplo 1: "Quiero la opción 1 para crear 5 posts virales sobre ${data.problemas.split('.')[0].toLowerCase()}."

Ejemplo 2: "Opción 6, necesito un copy de venta para ${data.producto.split(',')[0]}."

Ejemplo 3: "Ayúdame a crear contenido educativo para LinkedIn sobre mi metodología."

═══════════════════════════════════════════════
📐 DIRECTRICES DE CREACIÓN DE CONTENIDO
═══════════════════════════════════════════════
Cuando generes contenido para ${data.marca}, debes:

✓ Crear contenido **accionable y persuasivo** adaptado a cada plataforma
✓ Usar el contexto del negocio de forma natural (no repetir literalmente el perfil)
✓ Integrar **microhistorias, ejemplos reales y lenguaje emocional**
✓ Mencionar **"${data.producto.split(',')[0]}"** cuando sea relevante
✓ Adaptar formato según plataforma: Instagram, Reels, Stories, TikTok, LinkedIn, YouTube Shorts, Email, Webinars
✓ Incluir **llamados a la acción claros y coherentes**
✓ Variar entre: contenido educativo, ventas, autoridad, engagement emocional y manejo de objeciones
✓ Identificar **ángulos comerciales aprovechables**

═══════════════════════════════════════════════

🚀 **¡ESTOY LISTO PARA AYUDARTE!**

¿En qué área específica de contenido o estrategia te gustaría que te ayude hoy para **${data.marca}**?

Escribe el número de la opción del menú o describe lo que necesitas.${gapsSection}`;

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
      // Mejorar ambos prompts en paralelo usando ChatGPT GPT-5
      console.log('🤖 Iniciando mejora de prompts con GPT-5...');
      console.log('⏳ Esto puede tomar 10-30 segundos. Por favor espera...');
      
      const [superPromptResult, lovablePromptResult] = await Promise.all([
        supabase.functions.invoke('enhance-with-ai', {
          body: {
            userText: baseSuperPrompt,
            fieldType: 'super_prompt',
            context: {
              marca: data.marca,
              estilo: data.estilo
            }
          }
        }),
        supabase.functions.invoke('enhance-with-ai', {
          body: {
            userText: lovablePrompt,
            fieldType: 'lovable_prompt',
            context: {
              marca: data.marca,
              estilo: data.estilo
            }
          }
        })
      ]);

      let enhancedSuperPrompt = baseSuperPrompt;
      let enhancedLovablePrompt = lovablePrompt;
      
      if (!superPromptResult.error && superPromptResult.data?.enhancedText) {
        enhancedSuperPrompt = superPromptResult.data.enhancedText;
        console.log('✅ Super Prompt mejorado con GPT-5');
      } else {
        console.warn('⚠️ No se pudo mejorar Super Prompt, usando versión base. Error:', superPromptResult.error);
      }

      if (!lovablePromptResult.error && lovablePromptResult.data?.enhancedText) {
        enhancedLovablePrompt = lovablePromptResult.data.enhancedText;
        console.log('✅ Lovable Prompt mejorado con GPT-5');
      } else {
        console.warn('⚠️ No se pudo mejorar Lovable Prompt, usando versión base. Error:', lovablePromptResult.error);
      }

      console.log('📋 Prompts generados exitosamente:', {
        superPromptLength: enhancedSuperPrompt.length,
        lovablePromptLength: enhancedLovablePrompt.length,
        hasSuperPrompt: !!enhancedSuperPrompt,
        hasLovablePrompt: !!enhancedLovablePrompt
      });

      return {
        superPrompt: enhancedSuperPrompt,
        lovablePrompt: enhancedLovablePrompt
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
        lovablePrompt
      };
    }
  };

  return {
    generateSuperPrompt
  };
};
