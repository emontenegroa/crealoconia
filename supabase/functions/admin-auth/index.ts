import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para generar clave temporal de 6 dígitos
function generateTempKey(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Función para llamar a la edge function de envío de email
async function sendEmail(email: string, tempKey: string) {
  const response = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseKey}`,
    },
    body: JSON.stringify({
      email,
      type: 'admin_temp_key',
      tempKey,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error enviando email: ${response.statusText}`);
  }

  return response.json();
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const { email, action } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email es requerido' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (action === 'generate') {
      // Generar nueva clave temporal
      const tempKey = generateTempKey();
      
      // Limpiar claves expiradas
      await supabase.rpc('cleanup_expired_temp_keys');
      
      // Guardar la nueva clave temporal
      const { error: insertError } = await supabase
        .from('admin_temp_keys')
        .insert({
          email,
          temp_key: tempKey
        });

      if (insertError) {
        console.error('Error guardando clave temporal:', insertError);
        throw new Error('Error interno del servidor');
      }

      // Enviar email con la clave temporal
      await sendEmail(email, tempKey);

      return new Response(
        JSON.stringify({ message: 'Clave temporal enviada por email' }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );

    } else if (action === 'verify') {
      const { tempKey } = await req.json();

      if (!tempKey) {
        return new Response(
          JSON.stringify({ error: 'Clave temporal es requerida' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      // Verificar la clave temporal
      const { data, error } = await supabase
        .from('admin_temp_keys')
        .select('*')
        .eq('email', email)
        .eq('temp_key', tempKey)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !data) {
        return new Response(
          JSON.stringify({ error: 'Clave temporal inválida o expirada' }),
          { 
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      // Marcar la clave como usada
      await supabase
        .from('admin_temp_keys')
        .update({ used: true })
        .eq('id', data.id);

      return new Response(
        JSON.stringify({ message: 'Autenticación exitosa' }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Acción no válida' }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error en admin-auth:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});