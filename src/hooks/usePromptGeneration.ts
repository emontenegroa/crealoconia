
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

      // Generar prompt de Lovable (solo para admin)
      const lovablePrompt = `Crea un sitio web profesional para ${data.marca}.

INFORMACIÓN DEL NEGOCIO:
- Marca: ${data.marca}
- Especialista: ${data.quien_eres}
- Problema que resuelve: ${data.problemas}
- Producto principal: ${data.producto}
- Estilo: ${data.estilo}
- Instagram: ${data.instagram || 'No proporcionado'}
- Website actual: ${data.website || 'No tiene'}
- WhatsApp: ${data.whatsapp}

ESTRUCTURA REQUERIDA:
1. Header con navegación clara
2. Hero section con propuesta de valor potente
3. Sección "Sobre mí" profesional
4. Problemas que resuelve
5. Metodología/proceso de trabajo
6. Testimonios (crear 3 testimonios creíbles)
7. Producto principal con beneficios
8. FAQ respondiendo: ${data.preguntas_frecuentes}
9. Formulario de contacto
10. Footer con redes sociales

CARACTERÍSTICAS TÉCNICAS:
- Diseño moderno, profesional y responsive
- Optimizado para conversión
- CTA claros en cada sección
- Paleta de colores coherente con el nicho
- Tipografía legible y profesional
- Imágenes placeholder apropiadas
- Formulario funcional de contacto

El sitio debe posicionar a ${data.marca} como autoridad en su nicho y convertir visitantes en leads cualificados.`;

      return {
        superPrompt: enhancedSuperPrompt,
        lovablePrompt // Solo para envío al admin
      };
      
    } catch (error) {
      console.error('❌ Error al generar prompts:', error);
      
      // Fallback: devolver prompt base si falla la mejora
      return {
        superPrompt: baseSuperPrompt,
        lovablePrompt: `Prompt de Lovable para ${data.marca} - Error en generación automática`
      };
    }
  };

  return {
    generateSuperPrompt
  };
};
