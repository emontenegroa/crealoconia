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
      emailData: { tempKey },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error enviando email: ${response.status} - ${errorText}`);
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
    console.log('🚀 admin-auth function called');
    
    const body = await req.json();
    console.log('📥 Request body:', body);
    
    const { email, action, tempKey } = body;
    
    // Obtener información de tracking
    const clientIP = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    console.log('📋 Datos procesados:', { email, action, clientIP });

    if (!email) {
      console.log('❌ Email requerido');
      return new Response(
        JSON.stringify({ error: 'Email es requerido' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (action === 'generate') {
      console.log('🎲 Generando nueva clave temporal');
      // Generar nueva clave temporal
      const tempKey = generateTempKey();
      console.log('🔢 Clave generada:', tempKey);
      
      // Limpiar claves expiradas
      console.log('🧹 Limpiando claves expiradas');
      try {
        await supabase.rpc('cleanup_expired_temp_keys');
      } catch (cleanupError) {
        console.error('⚠️ Error limpiando claves (continuando):', cleanupError);
      }
      
      // Guardar la nueva clave temporal con información de tracking
      console.log('💾 Guardando clave en base de datos');
      const { error: insertError } = await supabase
        .from('admin_temp_keys')
        .insert({
          email,
          temp_key: tempKey,
          ip_address: clientIP,
          user_agent: userAgent,
          location_info: {
            timestamp: new Date().toISOString(),
            headers: {
              'x-forwarded-for': req.headers.get('x-forwarded-for'),
              'x-real-ip': req.headers.get('x-real-ip')
            }
          }
        });

      if (insertError) {
        console.error('❌ Error guardando clave temporal:', insertError);
        return new Response(
          JSON.stringify({ error: `Error de base de datos: ${insertError.message}` }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
      
      console.log('✅ Clave guardada exitosamente');

      // Enviar email con la clave temporal
      console.log('📧 Enviando email para:', email, 'con código:', tempKey);
      try {
        await sendEmail(email, tempKey);
        console.log('✅ Email enviado exitosamente');
      } catch (emailError) {
        console.error('❌ Error enviando email:', emailError);
        // No fallar por el email, pero loggear el error
      }

      return new Response(
        JSON.stringify({ 
          message: 'Código enviado',
          expiresIn: 60 // segundos
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );

    } else if (action === 'verify') {
      if (!tempKey) {
        return new Response(
          JSON.stringify({ error: 'Código requerido' }),
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
          JSON.stringify({ error: 'Código inválido o expirado' }),
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
    console.error('💥 Error crítico en admin-auth:', error);
    console.error('📋 Stack trace:', error.stack);
    return new Response(
      JSON.stringify({ 
        error: 'Error interno del servidor',
        details: error.message || 'Error desconocido'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});