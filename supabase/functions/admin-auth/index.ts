import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const brevoApiKey = Deno.env.get('BREVO_API_KEY')!;

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

      // Enviar email usando Brevo directamente
      console.log('📧 Enviando email con Brevo...');
      try {
        const emailContent = {
          sender: { email: "noreply@crealoconia.com", name: "Panel Admin" },
          to: [{ email: email }],
          subject: "Código de acceso",
          htmlContent: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px; background: #f8f9fa;">
              <div style="background: white; padding: 48px 32px; border-radius: 12px; text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
                
                <div style="width: 56px; height: 56px; background: #000000; border-radius: 16px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center;">
                  <div style="color: white; font-size: 24px; font-weight: 600;">🔐</div>
                </div>
                
                <h1 style="color: #1d1d1f; font-size: 28px; font-weight: 600; margin: 0 0 8px 0; letter-spacing: -0.5px;">Código de acceso</h1>
                
                <p style="color: #86868b; font-size: 17px; margin: 0 0 32px 0; line-height: 1.4;">
                  Usa este código para acceder al panel
                </p>
                
                <div style="background: #f5f5f7; border-radius: 12px; padding: 24px; margin: 0 0 32px 0; border: 2px solid #000000;">
                  <div style="color: #1d1d1f; font-size: 48px; font-weight: 700; letter-spacing: 8px; font-family: 'SF Mono', Monaco, monospace;">
                    ${newTempKey}
                  </div>
                </div>
                
                <p style="color: #86868b; font-size: 15px; margin: 0; line-height: 1.5;">
                  Este código expira en 60 segundos
                </p>
                
              </div>
            </div>
          `
        };

        const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': brevoApiKey
          },
          body: JSON.stringify(emailContent)
        });

        console.log('📬 Brevo response status:', emailResponse.status);
        
        if (!emailResponse.ok) {
          const errorText = await emailResponse.text();
          console.error('❌ Error de Brevo:', errorText);
        } else {
          const result = await emailResponse.json();
          console.log('✅ Email enviado exitosamente:', result);
        }
      } catch (emailError) {
        console.error('⚠️ Error de email:', emailError);
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