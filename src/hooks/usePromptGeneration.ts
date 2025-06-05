
import { FormData } from './useFormHandler';

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
    const baseSuperPrompt = `ASISTENTE PERSONALIZADO DE CONTENIDO Y ESTRATEGIA PARA ${data.marca}

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

INSTRUCCIONES PARA CREAR CONTENIDO:
- Genera contenido accionable, persuasivo y adaptado a cada plataforma.
- No repitas literalmente el perfil de negocio, usa el contexto para crear.
- Integra ejemplos, casos, microhistorias y lenguaje emocional.
- Menciona "${data.producto.split(',')[0]}" cuando corresponda.
- Adapta el contenido a: Instagram, Reels, Stories, TikTok, LinkedIn, YouTube Shorts, Email Marketing y Webinars.
- Incluye llamados a la acción coherentes.
- Permite variar entre contenido educativo, ventas, posicionamiento de autoridad, engagement emocional y manejo de objeciones.
- Identifica ángulos comerciales aprovechables.

ÁREAS DE CONTENIDO PARA CREAR:
- Publicaciones virales en redes sociales
- Reels y Shorts de alto alcance
- Historias de Instagram
- Series educativas
- Secuencias de email marketing
- Lanzamientos digitales
- Scripts de venta persuasivos
- Preguntas frecuentes convertidas en contenido educativo
- Guías de autoridad profesional

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

    try {
      // Intentar mejorar el prompt usando la integración con ChatGPT
      console.log('🤖 Mejorando Super Prompt con ChatGPT...');
      
      const response = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: baseSuperPrompt,
          marca: data.marca
        }),
      });

      let enhancedSuperPrompt = baseSuperPrompt;
      
      if (response.ok) {
        const result = await response.json();
        enhancedSuperPrompt = result.enhancedPrompt || baseSuperPrompt;
        console.log('✅ Super Prompt mejorado con ChatGPT');
      } else {
        console.warn('⚠️ No se pudo mejorar con ChatGPT, usando versión base');
      }

      return {
        superPrompt: enhancedSuperPrompt,
        lovablePrompt // Siempre devuelve el prompt completo de Lovable
      };
      
    } catch (error) {
      console.error('❌ Error al generar prompts:', error);
      
      // Fallback: devolver prompts base si falla la mejora
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
