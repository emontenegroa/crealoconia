
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { userText, fieldType, context } = await req.json();

    console.log(`Enhancing text for field: ${fieldType}`);
    console.log(`User text length: ${userText?.length || 0} characters`);

    let systemPrompt = '';
    
    switch (fieldType) {
      case 'quien_eres':
        systemPrompt = `Eres un experto en marketing personal y branding. Tu tarea es tomar el texto básico que escribió el usuario sobre quién es y expandirlo de manera profesional y atractiva. Mantén su esencia personal pero hazlo más rico, específico y magnético. Usa un tono ${context.estilo || 'profesional'} y asegúrate de que suene auténtico. Máximo 200 palabras.`;
        break;
      case 'problemas':
        systemPrompt = `Eres un experto en identificación de problemas y soluciones de negocio. Toma la descripción básica del usuario sobre los problemas que resuelve y expandela de manera más detallada y convincente. Incluye el dolor específico del cliente, las consecuencias de no resolverlo, y cómo la solución transforma sus vidas. Usa un tono ${context.estilo || 'profesional'} y sé específico. Máximo 250 palabras.`;
        break;
      case 'preguntas_frecuentes':
        systemPrompt = `Eres un experto en comunicación y FAQ. Toma las preguntas frecuentes que mencionó el usuario y expandelas de manera más completa y estratégica. Incluye más preguntas relacionadas que realmente hacen los clientes y explica por qué es importante responder estas dudas. Usa un tono ${context.estilo || 'profesional'} y mantén el foco en generar confianza. Máximo 200 palabras.`;
        break;
      case 'producto':
        systemPrompt = `Eres un experto en copywriting y ventas. Toma la descripción básica del producto/servicio del usuario y expandela de manera más persuasiva y detallada. Incluye beneficios específicos, transformaciones que logra, componentes del producto, y por qué es único. Usa un tono ${context.estilo || 'profesional'} y enfócate en los resultados que obtiene el cliente. Máximo 250 palabras.`;
        break;
      case 'super_prompt':
        systemPrompt = `Eres un experto en prompting para ChatGPT y marketing digital. Tu tarea es optimizar y mejorar el Super Prompt proporcionado. Hazlo más específico, estratégico y efectivo para generar contenido de marketing de alta calidad. Mantén toda la estructura y información esencial, pero mejora la claridad, especificidad y efectividad. El prompt debe ser más persuasivo y generar mejores resultados cuando se use en ChatGPT. Mantén el tono ${context.estilo || 'profesional'}.`;
        break;
      case 'lovable_prompt':
        systemPrompt = `Eres un experto en desarrollo web, UX/UI y prompting para IA. Tu tarea es optimizar el prompt para Lovable.dev (una plataforma de generación de sitios web con IA). Mejora la claridad técnica, las especificaciones de diseño, y la estructura del contenido. Asegúrate de que las instrucciones sean precisas, los requisitos técnicos estén bien definidos, y el resultado final sea un sitio web profesional y efectivo. Mantén el tono ${context.estilo || 'profesional'} pero enfócate en la claridad técnica.`;
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
        model: 'gpt-5-2025-08-07',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Texto a mejorar: "${userText}"\n\nContexto adicional: Marca: ${context.marca || 'No especificada'}, Estilo: ${context.estilo || 'No especificado'}` }
        ],
        max_completion_tokens: fieldType === 'super_prompt' ? 4000 : 800,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const enhancedText = data.choices[0].message.content;

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
