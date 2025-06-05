
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

    const prompt = `Actúa como un estratega de marca personal, copywriter profesional, generador de documentación estratégica y creador de contenido digital para coaches, consultores y emprendedores.

A partir de los siguientes datos del formulario, crea un entregable profesional dividido en tres bloques:

DATOS DEL CLIENTE:
- Marca: ${formData.marca}
- Quién es: ${formData.quien_eres}
- Problema que resuelve: ${formData.problemas}
- Preguntas frecuentes: ${formData.preguntas_frecuentes}
- Estilo de comunicación: ${formData.estilo}
- Producto principal: ${formData.producto}
- Email: ${formData.email}
- WhatsApp: ${formData.whatsapp}
- Website: ${formData.website || 'No especificado'}
- Instagram: ${formData.instagram || 'No especificado'}

ESTRUCTURA REQUERIDA:

**BLOQUE 1 - DOCUMENTACIÓN DE MARCA**
- Nombre de la marca: [Extraer de los datos]
- Quién es: [Reformular profesionalmente]
- Público objetivo: [Inferir del problema y contexto]
- Problema que resuelve: [Reformular estratégicamente]
- Cómo lo soluciona: [Extraer método del producto/servicio]
- Producto principal: [Reformular con beneficios]
- Beneficios principales: [Crear lista de 3-4 beneficios clave]
- Preguntas frecuentes: [Reformular profesionalmente]
- Estilo de comunicación: [Describir el estilo seleccionado]

**BLOQUE 2 - IDEAS DE CONTENIDO INICIAL**
- Reels: [5 ideas específicas para captar atención]
- Stories: [5 ideas para mostrar proceso y generar empatía]
- Posts: [5 ideas educativas/inspiradoras]

**BLOQUE 3 - ASISTENTE PERSONAL IA**
Crea un prompt personalizado para ChatGPT que incluya todos los datos del negocio y las instrucciones específicas para generar contenido futuro.

REGLAS:
- No copies textualmente las respuestas originales
- Mejora, estructura y profesionaliza toda la información
- Mantén un tono claro, persuasivo y accionable
- Las ideas de contenido deben ser específicas y accionables
- El prompt para ChatGPT debe ser completo y detallado`;

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
            content: 'Eres un experto estratega de marca personal y copywriter profesional. Generas contenido estructurado, claro y accionable para emprendedores.' 
          },
          { 
            role: 'user', 
            content: prompt 
          }
        ],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const strategicContent = data.choices[0].message.content;

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
