import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { submissionId } = await req.json();

    if (!submissionId) {
      return new Response(JSON.stringify({ error: 'submissionId es requerido' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`📧 Generando prompt de Lovable optimizado para submission: ${submissionId}`);

    // Crear cliente de Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Obtener los datos del formulario del usuario
    const { data: submission, error: fetchError } = await supabaseClient
      .from('form_submissions')
      .select('*')
      .eq('id', submissionId)
      .single();

    if (fetchError || !submission) {
      console.error('Error al obtener submission:', fetchError);
      return new Response(JSON.stringify({ error: 'No se encontró el formulario del usuario' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const formData = submission.form_data as any;

    const publicoObjetivo = formData.quien_eres?.includes('atletas') ? 
      'Atletas, deportistas de alto rendimiento y emprendedores ambiciosos' :
      formData.quien_eres?.includes('productividad') ?
      'Ejecutivos, emprendedores y freelancers que buscan optimizar su tiempo' :
      `Personas que ${formData.problemas?.toLowerCase().split('.')[0] || 'buscan soluciones'}`;
    
    const mensajeCentral = formData.producto 
      ? `Transformamos ${formData.problemas?.toLowerCase().split('.')[0] || 'tu situación actual'} en ${formData.producto.toLowerCase().split('.')[0]}`
      : `Acompañamiento profesional para superar ${formData.problemas?.toLowerCase().split('.')[0] || 'tus desafíos'}`;

    const beneficios = `✅ Transformación comprobada con metodología específica
✅ Eliminación de bloqueos limitantes en tiempo récord
✅ Desarrollo de confianza y resultados sostenibles
✅ Estrategias probadas por profesionales de alto rendimiento
✅ Acompañamiento ${formData.estilo?.toLowerCase() || 'profesional'} durante todo el proceso`;

    // Generar prompt base de Lovable
    const baseLovablePrompt = `═══════════════════════════════════════════════
🎨 PROMPT PROFESIONAL PARA LOVABLE
═══════════════════════════════════════════════

Crea un sitio web moderno, premium y altamente efectivo para ${formData.marca}.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 INFORMACIÓN DEL NEGOCIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Marca:** ${formData.marca}
**Especialista:** ${formData.quien_eres}
**Problema que resuelve:** ${formData.problemas}
**Producto/Servicio principal:** ${formData.producto}
**Estilo de comunicación:** ${formData.estilo}
**Público objetivo:** ${publicoObjetivo}
**Preguntas frecuentes:** ${formData.preguntas_frecuentes}

**Contacto:**
- Instagram: ${formData.instagram || 'No proporcionado'}
- WhatsApp: ${formData.whatsapp}
- Website actual: ${formData.website || 'Primer sitio web'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 OBJETIVO DEL SITIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Crear un sitio web que:
✓ Posicione a ${formData.marca} como autoridad indiscutible en su nicho
✓ Genere conexión emocional profunda con el público objetivo
✓ Convierta visitantes en leads cualificados
✓ Transmita profesionalismo y diferenciación única
✓ Sea memorable, impactante y orientado a resultados

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📐 ESTRUCTURA COMPLETA DEL SITIO (EN ORDEN)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**1. HEADER PROFESIONAL**
- Logo de ${formData.marca} (texto elegante o placeholder)
- Menú de navegación suave (Inicio, Quién Soy, Servicios, Testimonios, Contacto)
- CTA principal destacado en el header ("Agenda tu Llamada", "Comenzar Ahora", etc.)
- Diseño sticky/fijo al hacer scroll

**2. HERO SECTION IMPACTANTE**
Crear una sección hero cinematográfica con:
- Headline magnético que capture el dolor principal: "${formData.problemas?.split('.')[0] || 'Transforma tu vida'}"
- Subheadline que presente la solución transformadora
- CTA prominente y persuasivo
- Imagen/ilustración premium relacionada al nicho
- Elementos visuales que generen credibilidad (años de experiencia, clientes, resultados)
- Diseño full-screen o split-screen moderno

**3. QUIÉN SOY / QUIÉNES SOMOS**
Sección de conexión emocional y credibilidad:
- Foto profesional placeholder (persona o equipo)
- Historia breve pero impactante sobre ${formData.quien_eres}
- Credenciales, experiencia y autoridad
- Por qué es diferente de otros en el mercado
- Conexión emocional con el público objetivo
- Diseño: imagen + texto en layout atractivo

**4. PROBLEMA - SOLUCIÓN**
Mostrar empatía y presentar la transformación:
- 3-4 problemas específicos del público (basados en: ${formData.problemas})
- Cómo ${formData.marca} resuelve cada uno
- Contraste antes/después
- Copy emocional y persuasivo
- Diseño: tarjetas, íconos o ilustraciones

**5. METODOLOGÍA / PROCESO**
Explicar el sistema único de ${formData.marca}:
- 3-5 pasos claros del proceso de trabajo
- Cada paso con título, descripción y beneficio
- Visual: línea de tiempo, pasos numerados o diagrama
- Transmitir profesionalismo y estructura
- Mostrar que hay un sistema probado

**6. SERVICIOS / PRODUCTOS**
Presentación del ${formData.producto}:
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
- Resultado específico logrado con ${formData.marca}
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
- Basadas en: ${formData.preguntas_frecuentes}
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
- Integración con WhatsApp: ${formData.whatsapp}
- Diseño limpio y profesional

**12. FOOTER COMPLETO**
- Logo de ${formData.marca}
- Links de navegación
- Redes sociales (especialmente Instagram: ${formData.instagram || 'agregar placeholder'})
- WhatsApp de contacto: ${formData.whatsapp}
- Email de contacto
- Aviso legal y términos (links básicos)
- Copyright con año actual
- Diseño organizado y legible

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 ESTÉTICA Y DISEÑO VISUAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**PALETA DE COLORES INTELIGENTE:**
- Detectar el rubro de ${formData.marca} y elegir colores coherentes
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
- Imágenes placeholder coherentes con el rubro de ${formData.marca}
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
- ${formData.estilo} pero siempre persuasivo
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
(Adaptar según el producto/servicio de ${formData.marca})

**HEADLINES MAGNÉTICOS:**
- Hero: Enfocado en el dolor principal y la transformación
- Secciones: Generar curiosidad y continuidad
- Usar números, preguntas, promesas específicas
- Ejemplo para ${formData.marca}: "Transforma [DOLOR] en [RESULTADO] en [TIEMPO]"

**PRUEBA SOCIAL:**
- Testimonios distribuidos estratégicamente
- Números impactantes (clientes, años, resultados)
- Logos de medios/certificaciones si aplica
- Badges de confianza sutiles

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 DIFERENCIACIÓN OBLIGATORIA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Este sitio NO debe parecer genérico. Debe:**
- Detectar lo único de ${formData.marca} y destacarlo
- Proponer composición visual propia y memorable
- Incorporar detalles personalizados basados en la información
- Evitar templates repetitivos
- Tener personalidad clara y diferenciada
- Reflejar la esencia del ${formData.estilo} del negocio

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 ESPECIFICACIONES TÉCNICAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- **Responsive**: 100% mobile-first, tablet y desktop perfecto
- **Performance**: Optimizado, rápido, sin elementos innecesarios
- **SEO**: Meta tags, headings semánticos, alt texts, URLs limpias
- **Accesibilidad**: Contraste apropiado, navegación por teclado, ARIA labels
- **Formularios**: Validación en tiempo real, mensajes de error claros
- **CTAs**: Múltiples puntos de conversión estratégicos
- **WhatsApp**: Botón flotante de WhatsApp con el número ${formData.whatsapp}
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

**Seleccionar la versión que mejor se alinee con ${formData.marca} y ${formData.estilo}**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ RESULTADO FINAL ESPERADO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Un sitio web completo que:
✓ Se vea profesional, moderno y premium
✓ Cuente la historia de ${formData.marca} de forma persuasiva
✓ Conecte emocionalmente con ${publicoObjetivo}
✓ Posicione como autoridad indiscutible
✓ Convierta visitantes en clientes potenciales
✓ Sea memorable y único
✓ Funcione perfectamente en todos los dispositivos
✓ Esté listo para publicarse y generar resultados

═══════════════════════════════════════════════

**INSTRUCCIONES FINALES PARA LOVABLE:**

Genera el sitio completo con todas las secciones mencionadas, copy profesional y persuasivo, diseño premium diferenciado, y optimización total para conversión. El sitio debe transmitir autoridad absoluta, generar confianza inmediata y motivar acción desde el primer segundo.

Usa React, TailwindCSS, componentes modernos, animaciones suaves, formularios funcionales, y toda la tecnología necesaria para crear una experiencia web de nivel profesional para ${formData.marca}.

═══════════════════════════════════════════════`;

    console.log('🤖 Mejorando prompt de Lovable con GPT-5...');

    // Mejorar el prompt con GPT-5
    const systemPrompt = `Eres especialista élite en UX/UI, diseño web de alta conversión, copywriting estratégico y creación de PROMPTS para Lovable.dev.

CONTEXTO:
Nuestro sistema genera un "prompt base" con información del negocio. Tu misión es transformarlo en un prompt EXCEPCIONAL que Lovable pueda usar para crear sitios únicos, memorables y altamente conversores.

TU TRABAJO ES TRIPLE:
1) MEJORAR Y REESCRIBIR TODO el prompt que recibes
2) ELEVAR la calidad estratégica, emocional y comercial
3) CREAR contenido completo y listo para implementar

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 MEJORAS OBLIGATORIAS QUE DEBES APLICAR:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. MEJORA Y REESCRIBE EL PROMPT COMPLETO
   - Revisa todo el contenido
   - Reescríbelo con mayor claridad, estrategia y orientación a conversión
   - Mantén la esencia pero optimiza tono, orden, claridad y fuerza emocional
   - Haz que cada palabra cuente

2. ASEGURA COHERENCIA VISUAL COMPLETA
   - Ajusta paleta, tipografías, estilos, fotografías para que todo sea coherente con la marca
   - Evita clichés visuales o elementos genéricos
   - Crea una identidad visual propia y distintiva
   - Define mood/atmósfera específica para esta marca

3. ELEVA LA PROPUESTA DE VALOR Y POSICIONAMIENTO
   - Identifica la VERDADERA transformación que ofrece el cliente
   - Refuerza promesa, diferenciadores, beneficios y autoridad
   - Reescribe titulares y subtítulos para maximizar impacto emocional y profesional
   - Haz que suene único, no como otros del mismo rubro

4. OPTIMIZA EL COPY PARA CONVERSIÓN
   - Reestructura oraciones para hacerlas claras, breves, directas y emocionalmente potentes
   - Añade CTAs relevantes en TODAS las secciones clave
   - Ajusta lenguaje para reducir fricción y aumentar deseo y confianza
   - Usa fórmulas probadas de copywriting (PAS, AIDA, etc.)

5. MANTÉN EL TONO PERFECTO SEGÚN LA MARCA
   - Detecta el tono ideal basado en el negocio y público
   - Mantén coherencia tonal en TODO el sitio
   - No exageres, no infantilices, no generalices
   - Usa mensajes que inviten, sostengan y acompañen

6. EVITA EL "SITIO PLANTILLA"
   - Reescribe estructuras para que NO parezcan genéricas
   - Añade detalles originales y distintivos
   - Recomienda composiciones, detalles visuales y micro-narrativas ÚNICAS
   - Propón elementos sorpresa que diferencien

7. HAZ QUE LA LANDING TENGA NARRATIVA
   - Crea un hilo emocional coherente: dolor → reconocimiento → camino → metodología → resultados → acción
   - Asegura que cada sección conversa con la siguiente
   - El usuario debe sentir un viaje, no una lista de secciones

8. CREA TODOS LOS TEXTOS COMPLETOS
   Debes entregar TODO el copy escrito y listo:
   - Titulares potentes y únicos
   - Subtitulares que amplifiquen el mensaje
   - Párrafos completos (no "ejemplo de texto aquí")
   - Bullets específicos y orientados a beneficios
   - CTAs variados y contextuales
   - Testimonios creíbles y específicos (4-5 completos)
   - FAQs completas con respuestas persuasivas (8 mínimo)
   - Microcopys (formulario, botones, mensajes de éxito/error)
   - Meta title y description optimizados

9. ELEVA LA EXPERIENCIA DE USUARIO
   - Propón micro-interacciones conceptuales (NO código)
   - Indica cómo debe SENTIRSE la navegación (fluida, suave, cálida, etc.)
   - Sugiere estructuras visuales innovadoras para hero, testimonios, metodología, CTA
   - Piensa en el journey emocional del visitante

10. HAZ QUE SEA LO MEJOR POSIBLE
    - Mejora cosas que no se pidieron explícitamente
    - Anticipa necesidades y objeciones
    - Añade toques de excelencia sin que te lo pidan
    - Piensa como un estratega digital senior

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚫 RESTRICCIONES ABSOLUTAS (NO NEGOCIABLES):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NUNCA menciones:
- Stack técnico (React, Vite, TypeScript, Tailwind, Supabase, etc.)
- Estructura de carpetas (src/components, pages, etc.)
- Entregables técnicos (código, README, tests, Lighthouse, Figma)
- Implementación técnica (APIs, webhooks, configuraciones)
- Comandos o código de ningún tipo

TODO debe ser:
- Contenido (copy completo)
- Estructura (arquitectura de información)
- Guía visual (paleta, tipografía, estilo, mood)
- Experiencia de usuario (journey, emociones, micro-interacciones conceptuales)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 FORMATO DE ENTREGA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Devuelve UN ÚNICO BLOQUE de texto: el "Prompt optimizado para Lovable"
- En español
- Estructurado con secciones claras
- Copy completo (no placeholders)
- Guía visual detallada
- Sin explicaciones sobre lo que hiciste
- Directo y listo para usar

El resultado debe hacer que Lovable genere una landing:
✓ Visualmente impresionante y coherente
✓ Estratégicamente orientada a conversión
✓ Emocionalmente conectada con el público
✓ Única y memorable (no plantilla)
✓ Con copy completo y profesional
✓ Con narrativa fluida de principio a fin
✓ Lista para captar clientes desde el primer scroll

Transforma el prompt base en una OBRA MAESTRA de contenido, estrategia y diseño.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Texto a mejorar: "${baseLovablePrompt}"\n\nContexto adicional: Marca: ${formData.marca || 'No especificada'}, Estilo: ${formData.estilo || 'No especificado'}` }
        ],
        max_completion_tokens: 6000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error: ${response.status} - ${response.statusText}`, errorText);
      
      // Si falla la mejora con IA, devolver el prompt base
      return new Response(JSON.stringify({ 
        lovablePrompt: baseLovablePrompt,
        improved: false,
        message: 'Prompt base generado (no se pudo mejorar con IA)'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const enhancedPrompt = data.choices[0].message.content;

    console.log('✅ Prompt de Lovable mejorado exitosamente');

    // Actualizar el form_data con el prompt mejorado
    const { error: updateError } = await supabaseClient
      .from('form_submissions')
      .update({
        form_data: {
          ...formData,
          generatedPrompts: {
            ...formData.generatedPrompts,
            lovablePrompt: enhancedPrompt
          }
        }
      })
      .eq('id', submissionId);

    if (updateError) {
      console.error('Error al actualizar el prompt:', updateError);
    }

    return new Response(JSON.stringify({ 
      lovablePrompt: enhancedPrompt,
      improved: true,
      message: 'Prompt de Lovable mejorado y guardado exitosamente'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error en generate-lovable-prompt:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Error desconocido' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
