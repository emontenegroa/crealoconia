
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formData }: { formData: FormData } = await req.json();

    console.log('Generando contenido estratégico para:', formData.marca);

    // Prompt más corto y específico para evitar problemas de formato
    const prompt = `Actúa como estratega de marca personal y copywriter profesional.

DATOS DEL CLIENTE:
- Marca: ${formData.marca}
- Quién es: ${formData.quien_eres}
- Problema que resuelve: ${formData.problemas}
- Preguntas frecuentes: ${formData.preguntas_frecuentes}
- Estilo: ${formData.estilo}
- Producto: ${formData.producto}
- Email: ${formData.email}
- WhatsApp: ${formData.whatsapp}
- Website: ${formData.website || 'No especificado'}
- Instagram: ${formData.instagram || 'No especificado'}

Crea un entregable profesional con exactamente esta estructura:

**BLOQUE 1 - DOCUMENTACIÓN DE MARCA**
- Nombre de la marca: [nombre]
- Quién es: [descripción profesional mejorada]
- Público objetivo: [define el público basándote en el contexto]
- Problema que resuelve: [reformula estratégicamente]
- Cómo lo soluciona: [método extraído del producto/servicio]
- Producto principal: [reformula con beneficios]
- Beneficios principales: [lista de 3-4 beneficios clave]
- Preguntas frecuentes: [reformula profesionalmente]
- Estilo de comunicación: [describe el estilo seleccionado]

**BLOQUE 2 - IDEAS DE CONTENIDO INICIAL**
Reels (5 ideas específicas para captar atención):
1. [idea específica]
2. [idea específica]
3. [idea específica]
4. [idea específica]
5. [idea específica]

Stories (5 ideas para mostrar proceso y generar empatía):
1. [idea específica]
2. [idea específica]
3. [idea específica]
4. [idea específica]
5. [idea específica]

Posts (5 ideas educativas/inspiradoras):
1. [idea específica]
2. [idea específica]
3. [idea específica]
4. [idea específica]
5. [idea específica]

**BLOQUE 3 - ASISTENTE PERSONAL IA**
Prompt para ChatGPT:

"Eres un experto en creación de contenido y marketing digital. 

PERFIL DEL NEGOCIO:
- Marca: ${formData.marca}
- Profesional: ${formData.quien_eres}
- Problema: ${formData.problemas}
- Producto: ${formData.producto}
- Estilo: ${formData.estilo}
- Instagram: ${formData.instagram || 'No especificado'}
- Web: ${formData.website || 'No especificado'}

INSTRUCCIONES:
Genera contenido educativo, inspirador y de venta. Mantén un tono ${formData.estilo.toLowerCase()}. Incluye llamados a la acción. Adapta el contenido para Instagram, Stories, LinkedIn y email marketing."

REGLAS:
- No copies textualmente las respuestas originales
- Mejora y estructura toda la información
- Mantén un tono claro y profesional
- Las ideas de contenido deben ser específicas y accionables`;

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
            content: 'Eres un experto estratega de marca personal y copywriter profesional. Generas contenido estructurado y profesional.' 
          },
          { 
            role: 'user', 
            content: prompt 
          }
        ],
        temperature: 0.7,
        max_tokens: 2500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    let strategicContent = data.choices[0].message.content;

    // Limpiar caracteres problemáticos que pueden romper el JSON
    strategicContent = strategicContent
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '')
      .replace(/"/g, '"')
      .replace(/"/g, '"')
      .replace(/'/g, "'")
      .replace(/'/g, "'")
      .trim();

    console.log('Contenido estratégico generado exitosamente');

    return new Response(JSON.stringify({ strategicContent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error en generate-strategic-content function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
