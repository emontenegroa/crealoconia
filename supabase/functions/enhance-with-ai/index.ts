
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const allowedOrigins = [
  'https://crealoconia.com',
  'https://www.crealoconia.com',
  'https://crealoconia.lovable.app',
  'https://yxagfbefgqlsjrxjtgjr.lovable.app',
  'http://localhost:5173',
  'http://localhost:8080',
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get('origin') || '';
  return {
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userText, fieldType, context } = await req.json();

    // Validación de entrada
    if (!userText || typeof userText !== 'string') {
      return new Response(JSON.stringify({ error: 'userText es requerido y debe ser texto' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (userText.length < 10 || userText.length > 3000) {
      return new Response(JSON.stringify({ error: 'userText debe tener entre 10 y 3000 caracteres' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!fieldType || typeof fieldType !== 'string') {
      return new Response(JSON.stringify({ error: 'fieldType es requerido' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Sanitizar input para prevenir inyección
    const sanitizedText = userText
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .trim();

    console.log(`Enhancing text for field: ${fieldType}`);
    console.log(`User text length: ${sanitizedText?.length || 0} characters`);

    let systemPrompt = '';
    
    switch (fieldType) {
      case 'quien_eres':
      case 'clientePerfil':
        systemPrompt = `Eres un experto en marketing personal y branding. Tu tarea es tomar el texto básico que escribió el usuario sobre quién es y expandirlo de manera profesional y atractiva. Mantén su esencia personal pero hazlo más rico, específico y magnético. Usa un tono ${context.estilo || 'profesional'} y asegúrate de que suene auténtico. Máximo 200 palabras.`;
        break;
      case 'problemas':
      case 'problemaPrincipal':
        systemPrompt = `Eres un experto en identificación de problemas y soluciones de negocio. Toma la descripción básica del usuario sobre los problemas que resuelve y expandela de manera más detallada y convincente. Incluye el dolor específico del cliente, las consecuencias de no resolverlo, y cómo la solución transforma sus vidas. Usa un tono ${context.estilo || 'profesional'} y sé específico. Máximo 250 palabras.`;
        break;
      case 'preguntas_frecuentes':
        systemPrompt = `Eres un experto en comunicación y FAQ. Toma las preguntas frecuentes que mencionó el usuario y expandelas de manera más completa y estratégica. Incluye más preguntas relacionadas que realmente hacen los clientes y explica por qué es importante responder estas dudas. Usa un tono ${context.estilo || 'profesional'} y mantén el foco en generar confianza. Máximo 200 palabras.`;
        break;
      case 'producto':
      case 'servicios':
        systemPrompt = `Eres un experto en copywriting y ventas. Toma la descripción básica del producto/servicio del usuario y expandela de manera más persuasiva y detallada. Incluye beneficios específicos, transformaciones que logra, componentes del producto, y por qué es único. Usa un tono ${context.estilo || 'profesional'} y enfócate en los resultados que obtiene el cliente. Máximo 250 palabras.`;
        break;
      case 'propuestaMetodo':
        systemPrompt = `Eres un experto en metodologías y procesos. Toma la propuesta de método del usuario y expandela de manera clara y estructurada. Incluye pasos específicos, beneficios de cada etapa, y cómo se diferencia de otras metodologías. Usa un tono ${context.estilo || 'profesional'} y enfócate en la claridad y la practicidad. Máximo 250 palabras.`;
        break;
      case 'resultados':
        systemPrompt = `Eres un experto en comunicación de resultados y transformaciones. Toma los resultados mencionados por el usuario y expandelos de manera convincente y específica. Incluye métricas tangibles, testimonios implícitos, y el impacto real que se logra. Usa un tono ${context.estilo || 'profesional'} y enfócate en resultados medibles. Máximo 250 palabras.`;
        break;
      case 'super_prompt':
        systemPrompt = `Eres un experto en prompting para ChatGPT y marketing digital estratégico. 

CONTEXTO DEL PROYECTO:
Este es un lead magnet llamado "Kit IA de Esteban" diseñado para ayudar a emprendedores y marcas personales a lanzar su presencia digital con IA. El público objetivo son coaches, terapeutas, freelancers y consultores sin conocimientos técnicos que quieren contenido y presencia profesional sin pagar agencias.

ESTILO Y TONO:
- Profesional pero cercano
- Claro, sin tecnicismos innecesarios
- Cero humo: lo que se promete se entrega
- Experiencia conversacional y directa

TU TAREA:
Optimiza el Super Prompt proporcionado para que genere contenido de marketing excepcional. Debes:
1. Mantener toda la estructura y funcionalidad del menú de opciones
2. Mejorar la claridad y especificidad de las instrucciones
3. Hacer el tono más ${context.estilo || 'profesional'} pero manteniendo cercanía
4. Asegurar que cada opción del menú genere resultados accionables y de alta calidad
5. Agregar micro-detalles que hagan el prompt más efectivo (hooks, estructuras, CTAs específicos)
6. Optimizar para que genere contenido viral, persuasivo y orientado a conversión

El resultado debe ser un prompt que cualquier emprendedor pueda usar en ChatGPT para generar contenido profesional inmediatamente.`;
        break;
      case 'lovable_prompt':
        systemPrompt = `Eres un experto en desarrollo web, UX/UI, diseño de conversión y prompting para plataformas de generación web con IA.

CONTEXTO DEL PROYECTO:
Este prompt se usará en Lovable.dev para generar sitios web profesionales para emprendedores y marcas personales. El público objetivo son coaches, terapeutas, freelancers y consultores que necesitan una web efectiva sin conocimientos técnicos.

ESTILO Y PRINCIPIOS DE DISEÑO:
- Diseño minimalista, limpio y centrado en experiencia de usuario
- Profesional pero accesible
- Optimizado para conversión (captura de leads, contacto directo)
- Responsive y moderno
- Colores y tipografía que transmitan confianza y profesionalismo

TU TAREA:
Optimiza el prompt para Lovable.dev asegurando:
1. **Especificaciones técnicas claras**: React, Vite, Tailwind CSS, TypeScript
2. **Estructura de conversión**: Hero section magnético, testimonios estratégicos, CTAs prominentes, formularios optimizados
3. **Diseño emocional**: Usa gradientes sutiles, animaciones suaves, micro-interacciones que generen confianza
4. **Copy orientado a resultados**: Headlines que capturen atención, beneficios sobre características, urgencia sin presión
5. **Optimización SEO**: Meta tags, headings semánticos, estructura clara
6. **Responsive perfecto**: Mobile-first, experiencia fluida en todos los dispositivos
7. **Estilo ${context.estilo || 'profesional'}**: Adapta el diseño y copy al tono de comunicación

El resultado debe ser un prompt que genere una landing page de conversión profesional, moderna y lista para captar clientes desde el primer día.`;
        break;
      default:
        systemPrompt = `Eres un experto en marketing y comunicación. Mejora y expande el texto del usuario manteniéndolo auténtico pero más profesional y atractivo. Usa un tono ${context.estilo || 'profesional'}.`;
    }

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
          { role: 'user', content: `Texto a mejorar: "${sanitizedText}"\n\nContexto adicional: Marca: ${context.marca || 'No especificada'}, Estilo: ${context.estilo || 'No especificado'}` }
        ],
        max_completion_tokens: fieldType === 'super_prompt' || fieldType === 'lovable_prompt' ? 6000 : 1500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error: ${response.status} - ${response.statusText}`, errorText);
      throw new Error(`OpenAI API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    let enhancedText = data.choices?.[0]?.message?.content;

    if (!enhancedText || !String(enhancedText).trim()) {
      console.warn('Empty enhanced text in response, falling back to userText:', JSON.stringify({
        model: data.model,
        finish_reason: data.choices?.[0]?.finish_reason,
        usage: data.usage,
      }));
      enhancedText = userText;
    }

    console.log(`Enhanced text generated successfully for ${fieldType}`);

    return new Response(JSON.stringify({ enhancedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in enhance-with-ai function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
