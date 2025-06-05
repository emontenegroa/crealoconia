
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
    const { content, context } = await req.json();

    console.log(`Mejorando contenido con ChatGPT...`);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { 
            role: 'system', 
            content: `Eres un experto estratega de marca personal, copywriter profesional y creador de contenido. Tu trabajo es mejorar y profesionalizar contenido para emprendedores y marcas personales. 

Instrucciones importantes:
- Reescribe y mejora el contenido manteniéndolo profesional pero accesible
- Conserva la estructura con emojis y formato
- Haz el texto más persuasivo y claro
- Adapta el tono según el contexto proporcionado
- Mantén la autenticidad del mensaje original
- Optimiza para engagement y conversión` 
          },
          { 
            role: 'user', 
            content: `${context}\n\nContenido a mejorar:\n\n${content}` 
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const enhancedContent = data.choices[0].message.content;

    console.log(`Contenido mejorado exitosamente`);

    return new Response(JSON.stringify({ enhancedContent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error en enhance-with-chatgpt function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
