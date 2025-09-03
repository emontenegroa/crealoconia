import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('🚀 admin-auth function started');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('✅ CORS preflight handled');
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    console.log('❌ Method not allowed:', req.method);
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    console.log('📥 Reading request body...');
    const body = await req.json();
    console.log('📋 Request body:', body);
    
    const { email, action, tempKey } = body;
    console.log('📧 Email:', email, 'Action:', action);

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

    // Validar que solo el email autorizado puede acceder
    const authorizedEmail = 'esteban@crealoconia.com';
    if (email.toLowerCase() !== authorizedEmail.toLowerCase()) {
      console.log('❌ Email no autorizado:', email);
      return new Response(
        JSON.stringify({ error: 'Email no autorizado para acceso administrativo' }),
        { 
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    console.log('✅ Email autorizado confirmado');

    // Obtener configuración de Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    console.log('🔧 Supabase URL:', supabaseUrl ? 'configurada' : 'no configurada');
    console.log('🔑 Service Key:', supabaseKey ? 'configurada' : 'no configurada');

    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Variables de entorno faltantes');
      return new Response(
        JSON.stringify({ error: 'Configuración de servidor incompleta' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Cliente de Supabase creado');

    if (action === 'generate') {
      console.log('🎲 Generando código temporal...');
      
      // Generar nueva clave temporal de 6 dígitos
      const newTempKey = Math.floor(100000 + Math.random() * 900000).toString();
      console.log('🔢 Código generado:', newTempKey);
      
      // Obtener información de tracking
      const clientIP = req.headers.get('x-forwarded-for') || 
                      req.headers.get('x-real-ip') || 
                      'unknown';
      const userAgent = req.headers.get('user-agent') || 'unknown';
      
      console.log('📍 IP:', clientIP, 'User-Agent:', userAgent.substring(0, 50) + '...');

      // Intentar guardar en la base de datos
      console.log('💾 Guardando en base de datos...');
      const { data, error: insertError } = await supabase
        .from('admin_temp_keys')
        .insert({
          email,
          temp_key: newTempKey,
          ip_address: clientIP,
          user_agent: userAgent,
          location_info: {
            timestamp: new Date().toISOString(),
            headers: {
              'x-forwarded-for': req.headers.get('x-forwarded-for'),
              'x-real-ip': req.headers.get('x-real-ip')
            }
          }
        })
        .select();

      if (insertError) {
        console.error('❌ Error de base de datos:', insertError);
        return new Response(
          JSON.stringify({ 
            error: 'Error de base de datos',
            details: insertError.message 
          }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
      
      console.log('✅ Código guardado exitosamente:', data);

      // Enviar email
      console.log('📧 Enviando email...');
      try {
        const emailResponse = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({
            email,
            type: 'admin_temp_key',
            emailData: { tempKey: newTempKey },
          }),
        });

        console.log('📬 Email response status:', emailResponse.status);
        
        if (!emailResponse.ok) {
          const errorText = await emailResponse.text();
          console.error('❌ Error enviando email:', errorText);
        } else {
          console.log('✅ Email enviado exitosamente');
        }
      } catch (emailError) {
        console.error('⚠️ Error de email (continuando):', emailError);
      }

      return new Response(
        JSON.stringify({ 
          message: 'Código enviado',
          expiresIn: 60
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );

    } else if (action === 'verify') {
      console.log('🔍 Verificando código...');
      
      if (!tempKey) {
        console.log('❌ Código requerido');
        return new Response(
          JSON.stringify({ error: 'Código requerido' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      // Verificar la clave temporal
      console.log('🔎 Buscando código en base de datos...');
      const { data, error } = await supabase
        .from('admin_temp_keys')
        .select('*')
        .eq('email', email)
        .eq('temp_key', tempKey)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .maybeSingle();

      if (error) {
        console.error('❌ Error consultando base de datos:', error);
        return new Response(
          JSON.stringify({ error: 'Error de consulta' }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      if (!data) {
        console.log('❌ Código inválido o expirado');
        return new Response(
          JSON.stringify({ error: 'Código inválido o expirado' }),
          { 
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      console.log('✅ Código válido encontrado');

      // Marcar la clave como usada
      const { error: updateError } = await supabase
        .from('admin_temp_keys')
        .update({ used: true })
        .eq('id', data.id);

      if (updateError) {
        console.error('⚠️ Error marcando código como usado:', updateError);
      }

      return new Response(
        JSON.stringify({ message: 'Autenticación exitosa' }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('❌ Acción no válida:', action);
    return new Response(
      JSON.stringify({ error: 'Acción no válida' }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('💥 Error crítico:', error);
    console.error('📋 Stack:', error.stack);
    return new Response(
      JSON.stringify({ 
        error: 'Error interno del servidor',
        details: error.message
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});