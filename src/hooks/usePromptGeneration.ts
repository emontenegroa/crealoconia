
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
• Estrategia de contenido profesional
• Copywriting persuasivo y emocional
• Generación de imágenes con IA
• Posicionamiento de autoridad
• Campañas de conversión

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

    // Generar prompt profesional de Lovable con todas las especificaciones
    const lovablePrompt = `═══════════════════════════════════════════════
🎨 PROMPT PROFESIONAL PARA LOVABLE
═══════════════════════════════════════════════

Crea un sitio web moderno, premium y altamente efectivo para ${data.marca}.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 INFORMACIÓN DEL NEGOCIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Marca:** ${data.marca}
**Especialista:** ${data.quien_eres}
**Problema que resuelve:** ${data.problemas}
**Producto/Servicio principal:** ${data.producto}
**Estilo de comunicación:** ${data.estilo}
**Público objetivo:** ${publicoObjetivo}
**Preguntas frecuentes:** ${data.preguntas_frecuentes}

**Contacto:**
- Instagram: ${data.instagram || 'No proporcionado'}
- WhatsApp: ${data.whatsapp}
- Website actual: ${data.website || 'Primer sitio web'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 OBJETIVO DEL SITIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Crear un sitio web que:
✓ Posicione a ${data.marca} como autoridad indiscutible en su nicho
✓ Genere conexión emocional profunda con el público objetivo
✓ Convierta visitantes en leads cualificados
✓ Transmita profesionalismo y diferenciación única
✓ Sea memorable, impactante y orientado a resultados

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📐 ESTRUCTURA COMPLETA DEL SITIO (EN ORDEN)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**1. HEADER PROFESIONAL**
- Logo de ${data.marca} (texto elegante o placeholder)
- Menú de navegación suave (Inicio, Quién Soy, Servicios, Testimonios, Contacto)
- CTA principal destacado en el header ("Agenda tu Llamada", "Comenzar Ahora", etc.)
- Diseño sticky/fijo al hacer scroll

**2. HERO SECTION IMPACTANTE**
Crear una sección hero cinematográfica con:
- Headline magnético que capture el dolor principal: "${data.problemas.split('.')[0]}"
- Subheadline que presente la solución transformadora
- CTA prominente y persuasivo
- Imagen/ilustración premium relacionada al nicho
- Elementos visuales que generen credibilidad (años de experiencia, clientes, resultados)
- Diseño full-screen o split-screen moderno

**3. QUIÉN SOY / QUIÉNES SOMOS**
Sección de conexión emocional y credibilidad:
- Foto profesional placeholder (persona o equipo)
- Historia breve pero impactante sobre ${data.quien_eres}
- Credenciales, experiencia y autoridad
- Por qué es diferente de otros en el mercado
- Conexión emocional con el público objetivo
- Diseño: imagen + texto en layout atractivo

**4. PROBLEMA - SOLUCIÓN**
Mostrar empatía y presentar la transformación:
- 3-4 problemas específicos del público (basados en: ${data.problemas})
- Cómo ${data.marca} resuelve cada uno
- Contraste antes/después
- Copy emocional y persuasivo
- Diseño: tarjetas, íconos o ilustraciones

**5. METODOLOGÍA / PROCESO**
Explicar el sistema único de ${data.marca}:
- 3-5 pasos claros del proceso de trabajo
- Cada paso con título, descripción y beneficio
- Visual: línea de tiempo, pasos numerados o diagrama
- Transmitir profesionalismo y estructura
- Mostrar que hay un sistema probado

**6. SERVICIOS / PRODUCTOS**
Presentación del ${data.producto}:
- Descripción clara del servicio/producto principal
- Beneficios específicos (no características)
- ${beneficios}
- Qué incluye
- Resultados esperados
- CTA de conversión fuerte
- Diseño premium con tarjetas o secciones destacadas

**7. TESTIMONIOS SOCIALES**
Crear 4-5 testimonios realistas y específicos:
- Nombre, profesión/contexto del cliente
- Problema que tenía antes
- Resultado específico logrado con ${data.marca}
- Cita textual emocional y creíble
- Foto placeholder profesional
- Estrellas o elementos de validación
- Diseño: carrusel, grid o tarjetas destacadas

**8. PORTAFOLIO (si aplica al rubro)**
- Mostrar trabajos, casos de éxito o resultados previos
- Imágenes placeholder profesionales
- Breve descripción de cada caso
- Métricas o resultados cuando sea posible

**9. FAQ ESTRATÉGICAS**
Responder objeciones y preguntas frecuentes (mínimo 8):
- Basadas en: ${data.preguntas_frecuentes}
- Adicionales: precio, tiempo, garantías, proceso, diferenciadores
- Respuestas persuasivas y completas
- Diseño accordion/desplegable elegante
- Copy que elimine fricción y genere confianza

**10. CTA ESTRATÉGICA FINAL**
Sección de conversión potente:
- Headline urgente y motivacional
- Resumen de beneficios clave
- CTA irresistible y claro
- Elemento de urgencia o escasez sutil
- Fondo contrastante o degradado premium

**11. FORMULARIO DE CONTACTO OPTIMIZADO**
- Campos mínimos necesarios (nombre, email, WhatsApp, mensaje)
- Copy persuasivo arriba del formulario
- Validación en tiempo real
- Botón de envío destacado
- Mensaje de confirmación amigable
- Integración con WhatsApp: ${data.whatsapp}
- Diseño limpio y profesional

**12. FOOTER COMPLETO**
- Logo de ${data.marca}
- Links de navegación
- Redes sociales (especialmente Instagram: ${data.instagram || 'agregar placeholder'})
- WhatsApp de contacto: ${data.whatsapp}
- Email de contacto
- Aviso legal y términos (links básicos)
- Copyright con año actual
- Diseño organizado y legible

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 ESTÉTICA Y DISEÑO VISUAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**PALETA DE COLORES INTELIGENTE:**
- Detectar el rubro de ${data.marca} y elegir colores coherentes
- 1 color primario/base profesional
- 2 colores secundarios complementarios
- 1 acento premium para CTAs y destacados
- 1-2 tonos neutros (gris claro/oscuro según modo)
- Asegurar contraste y legibilidad
- Degradados sutiles donde sea apropiado

**TIPOGRAFÍA PREMIUM:**
- Titulares: fuente moderna serif elegante o sans editorial
- Párrafos: sans moderna y legible (Inter, Manrope, Plus Jakarta, similar)
- Jerarquía clara: H1 (hero), H2 (secciones), H3 (subsecciones), párrafos, botones
- Tamaños responsivos y optimizados
- Peso de fuentes variado para énfasis

**MICRO-INTERACCIONES Y ANIMACIONES:**
- Fade-in suave al hacer scroll en cada sección
- Hover effects en botones (escala, color, sombra)
- Tarjetas con efecto de elevación al hover
- Transiciones suaves entre estados
- Animaciones sutiles pero notables
- Performance optimizado (sin saturar)

**DISEÑO VISUAL AVANZADO:**
- Split screen en secciones clave
- Tarjetas con sombras premium y bordes suaves
- Textos con degradé sutil en headlines
- Espaciado generoso y respiración visual
- Secciones alternas (fondo claro/oscuro)
- Imágenes con border-radius y tratamiento profesional
- Íconos modernos y coherentes
- Elementos decorativos sutiles (líneas, formas geométricas)

**PLACEHOLDERS E IMÁGENES:**
- Imágenes placeholder coherentes con el rubro de ${data.marca}
- Estilo consistente (fotografía profesional, ilustraciones modernas, etc.)
- Alt text descriptivo para SEO
- Lazy loading implementado
- Aspect ratios apropiados

**ELEMENTOS DECORATIVOS:**
- Texturas sutiles de fondo si mejoran la estética
- Formas geométricas o patrones relacionados al rubro
- Símbolos o íconos representativos del nicho
- Backgrounds con degradados suaves
- No saturar: mantener elegancia y minimalismo premium

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✍️ COPYWRITING DE ALTO IMPACTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**TONO Y ESTILO:**
- ${data.estilo} pero siempre persuasivo
- Emocional y conectado con los dolores reales
- Profesional sin ser corporativo aburrido
- Claro, directo y orientado a beneficios
- Evitar jerga innecesaria
- Usar storytelling donde sea apropiado

**CTAs (Llamadas a Acción):**
- Primario: "Agenda tu Llamada Estratégica Gratuita"
- Secundario: "Descubre Cómo Funciona"
- Terciario: "Comienza tu Transformación Hoy"
- Urgencia: "Cupos Limitados este Mes"
- Curiosidad: "Ver Casos de Éxito"
(Adaptar según el producto/servicio de ${data.marca})

**HEADLINES MAGNÉTICOS:**
- Hero: Enfocado en el dolor principal y la transformación
- Secciones: Generar curiosidad y continuidad
- Usar números, preguntas, promesas específicas
- Ejemplo para ${data.marca}: "Transforma [DOLOR] en [RESULTADO] en [TIEMPO]"

**PRUEBA SOCIAL:**
- Testimonios distribuidos estratégicamente
- Números impactantes (clientes, años, resultados)
- Logos de medios/certificaciones si aplica
- Badges de confianza sutiles

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 DIFERENCIACIÓN OBLIGATORIA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Este sitio NO debe parecer genérico. Debe:**
- Detectar lo único de ${data.marca} y destacarlo
- Proponer composición visual propia y memorable
- Incorporar detalles personalizados basados en la información
- Evitar templates repetitivos
- Tener personalidad clara y diferenciada
- Reflejar la esencia del ${data.estilo} del negocio

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 ESPECIFICACIONES TÉCNICAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- **Responsive**: 100% mobile-first, tablet y desktop perfecto
- **Performance**: Optimizado, rápido, sin elementos innecesarios
- **SEO**: Meta tags, headings semánticos, alt texts, URLs limpias
- **Accesibilidad**: Contraste apropiado, navegación por teclado, ARIA labels
- **Formularios**: Validación en tiempo real, mensajes de error claros
- **CTAs**: Múltiples puntos de conversión estratégicos
- **WhatsApp**: Botón flotante de WhatsApp con el número ${data.whatsapp}
- **Navegación**: Suave scroll a secciones, UX intuitiva
- **Modo oscuro/claro**: Si el diseño lo permite, soporte para ambos

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎭 VERSIONES DE DISEÑO (Elige una según el rubro)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**VERSIÓN A - PREMIUM EDITORIAL:**
- Estilo revista de lujo
- Elegante y sofisticado
- Tipografía serif para títulos
- Colores suaves con 1 acento premium
- Mucho espacio en blanco
- Fotografías grandes y elegantes
- Ideal para: coaches, consultores, servicios profesionales premium

**VERSIÓN B - MODERNA CINEMATOGRÁFICA:**
- Estilo oscuro o alto contraste
- Tipografía sans moderna y bold
- Hero dramático con imagen impactante
- Animaciones más marcadas
- Degradados vibrantes
- Ideal para: creativos, tech, innovación, marcas disruptivas

**Seleccionar la versión que mejor se alinee con ${data.marca} y ${data.estilo}**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ RESULTADO FINAL ESPERADO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Un sitio web completo que:
✓ Se vea profesional, moderno y premium
✓ Cuente la historia de ${data.marca} de forma persuasiva
✓ Conecte emocionalmente con ${publicoObjetivo}
✓ Posicione como autoridad indiscutible
✓ Convierta visitantes en clientes potenciales
✓ Sea memorable y único
✓ Funcione perfectamente en todos los dispositivos
✓ Esté listo para publicarse y generar resultados

═══════════════════════════════════════════════

**INSTRUCCIONES FINALES PARA LOVABLE:**

Genera el sitio completo con todas las secciones mencionadas, copy profesional y persuasivo, diseño premium diferenciado, y optimización total para conversión. El sitio debe transmitir autoridad absoluta, generar confianza inmediata y motivar acción desde el primer segundo.

Usa React, TailwindCSS, componentes modernos, animaciones suaves, formularios funcionales, y toda la tecnología necesaria para crear una experiencia web de nivel profesional para ${data.marca}.

═══════════════════════════════════════════════`;

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
