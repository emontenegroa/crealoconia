import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

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

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  console.log('🚀 admin-auth function started');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('✅ CORS preflight handled');
    return new Response(null, { headers: getCorsHeaders(req) });
  }

  if (req.method !== 'POST') {
    console.log('❌ Method not allowed:', req.method);
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405,
        headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    console.log('📥 Reading request body...');
    const body = await req.json();
    console.log('📋 Request body:', JSON.stringify(body));
    
    const { email, action } = body;
    console.log('📧 Email:', email, 'Action:', action);

    // Validar email autorizado
    const authorizedEmail = 'esteban@crealoconia.com';
    if (email?.toLowerCase() !== authorizedEmail.toLowerCase()) {
      console.log('❌ Email no autorizado:', email);
      return new Response(
        JSON.stringify({ error: 'Email no autorizado para acceso administrativo' }),
        { 
          status: 403,
          headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
        }
      );
    }

    if (action === 'generate') {
      console.log('🎲 Generando código temporal...');
      
      // Check rate limiting first
      const { data: rateLimitOk, error: rateLimitError } = await supabase
        .rpc('check_admin_rate_limit', { check_email: email });
      
      if (rateLimitError) {
        console.error('❌ Error checking rate limit:', rateLimitError);
        return new Response(
          JSON.stringify({ error: 'Error interno de validación' }),
          { 
            status: 500,
            headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
          }
        );
      }
      
      if (!rateLimitOk) {
        console.log('❌ Rate limit exceeded for:', email);
        
        // Log the failed attempt
        await supabase.rpc('log_security_event', {
          event_type: 'admin_auth_rate_limit',
          email: email,
          event_data: { action: 'generate_code_blocked' }
        });
        
        return new Response(
          JSON.stringify({ error: 'Demasiados intentos. Inténtalo en 5 minutos.' }),
          { 
            status: 429,
            headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
          }
        );
      }
      
      // Log the attempt
      await supabase.rpc('log_security_event', {
        event_type: 'admin_auth_attempt',
        email: email,
        event_data: { action: 'generate_code' }
      });
      
      // Generar código de 6 dígitos
      const tempKey = Math.floor(100000 + Math.random() * 900000).toString();
      console.log('🔢 Código generado:', tempKey);

      // Verificar variables de entorno
      const brevoApiKey = Deno.env.get('BREVO_API_KEY');
      console.log('🔑 Brevo API Key:', brevoApiKey ? 'configurada' : 'no configurada');

      if (!brevoApiKey) {
        console.error('❌ BREVO_API_KEY no configurada');
        return new Response(
          JSON.stringify({ error: 'Configuración de email no disponible' }),
          { 
            status: 500,
            headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
          }
        );
      }

      // Enviar email con Brevo
      console.log('📧 Enviando email con Brevo...');
      try {
        const emailContent = {
          sender: { email: "noreply@crealoconia.com", name: "Panel Admin" },
          to: [{ email: email }],
          subject: "Código de acceso",
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
              <div style="background: white; padding: 48px 32px; border-radius: 12px; text-align: center;">
                <h1 style="color: #1d1d1f; font-size: 28px; margin-bottom: 20px;">Código de acceso</h1>
                <p style="color: #86868b; font-size: 17px; margin-bottom: 30px;">
                  Usa este código para acceder al panel
                </p>
                <div style="background: #f5f5f7; border-radius: 12px; padding: 24px; margin-bottom: 30px;">
                  <div style="color: #1d1d1f; font-size: 48px; font-weight: bold; letter-spacing: 8px;">
                    ${tempKey}
                  </div>
                </div>
                <p style="color: #86868b; font-size: 15px;">
                  Este código expira en 5 minutos
                </p>
              </div>
            </div>
          `
        };

        console.log('📤 Enviando request a Brevo...');
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
          return new Response(
            JSON.stringify({ error: 'Error enviando email' }),
            { 
              status: 500,
              headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
            }
          );
        }

        const result = await emailResponse.json();
        console.log('✅ Email enviado exitosamente:', result);

        // Store the code securely in the database
        const { data: codeId, error: storeError } = await supabase
          .rpc('store_admin_code', {
            admin_email: email,
            code: tempKey,
            user_ip: null, // Could be extracted from headers if needed
            user_agent_string: req.headers.get('user-agent')
          });
        
        if (storeError) {
          console.error('❌ Error storing code:', storeError);
          return new Response(
            JSON.stringify({ error: 'Error interno almacenando código' }),
            { 
              status: 500,
              headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
            }
          );
        }
        
        console.log('✅ Código almacenado con ID:', codeId);

        return new Response(
          JSON.stringify({ 
            message: 'Código enviado',
            expiresIn: 300 // 5 minutes
          }),
          { 
            status: 200,
            headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
          }
        );

      } catch (emailError) {
        console.error('💥 Error crítico enviando email:', emailError);
        return new Response(
          JSON.stringify({ error: 'Error interno enviando email' }),
          { 
            status: 500,
            headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
          }
        );
      }

    } else if (action === 'verify') {
      console.log('🔍 Verificando código...');
      
      const { tempKey } = body;
      
      if (!tempKey || tempKey.length !== 6) {
        console.log('❌ Código inválido:', tempKey);
        
        await supabase.rpc('log_security_event', {
          event_type: 'admin_auth_failed',
          email: email,
          event_data: { 
            action: 'verify_code',
            reason: 'invalid_code_format',
            code_length: tempKey?.length || 0
          }
        });
        
        return new Response(
          JSON.stringify({ error: 'Código inválido' }),
          { 
            status: 400,
            headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
          }
        );
      }
      
      // Check rate limiting for verification attempts
      const { data: rateLimitOk, error: rateLimitError } = await supabase
        .rpc('check_admin_rate_limit', { check_email: email });
      
      if (rateLimitError || !rateLimitOk) {
        console.log('❌ Rate limit exceeded for verification:', email);
        
        await supabase.rpc('log_security_event', {
          event_type: 'admin_auth_rate_limit',
          email: email,
          event_data: { action: 'verify_code_blocked' }
        });
        
        return new Response(
          JSON.stringify({ error: 'Demasiados intentos. Inténtalo en 5 minutos.' }),
          { 
            status: 429,
            headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
          }
        );
      }
      
      // Verify the code using the secure database function
      const { data: isValid, error: verifyError } = await supabase
        .rpc('verify_admin_code', {
          check_email: email,
          check_code: tempKey
        });
      
      if (verifyError) {
        console.error('❌ Error verifying code:', verifyError);
        
        await supabase.rpc('log_security_event', {
          event_type: 'admin_auth_failed',
          email: email,
          event_data: { 
            action: 'verify_code',
            reason: 'database_error',
            error: verifyError.message
          }
        });
        
        return new Response(
          JSON.stringify({ error: 'Error interno de verificación' }),
          { 
            status: 500,
            headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
          }
        );
      }
      
      if (!isValid) {
        console.log('❌ Código inválido o expirado:', tempKey);
        
        await supabase.rpc('log_security_event', {
          event_type: 'admin_auth_failed',
          email: email,
          event_data: { 
            action: 'verify_code',
            reason: 'invalid_or_expired_code'
          }
        });
        
        return new Response(
          JSON.stringify({ error: 'Código inválido o expirado' }),
          { 
            status: 401,
            headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
          }
        );
      }
      
      // Success! Log the successful authentication
      console.log('✅ Autenticación exitosa para:', email);
      
      await supabase.rpc('log_security_event', {
        event_type: 'admin_auth_success',
        email: email,
        event_data: { 
          action: 'verify_code',
          timestamp: new Date().toISOString()
        }
      });
      
      // Log admin access for audit trail
      await supabase.rpc('log_admin_access', { admin_email: email });
      
      return new Response(
        JSON.stringify({ 
          message: 'Autenticación exitosa',
          email: email
        }),
        { 
          status: 200,
          headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('❌ Acción no válida:', action);
    return new Response(
      JSON.stringify({ error: 'Acción no válida' }),
      { 
        status: 400,
        headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('💥 Error crítico general:', error);
    console.error('📋 Stack trace:', error.stack);
    console.error('📋 Error message:', error.message);
    return new Response(
      JSON.stringify({ 
        error: 'Error interno del servidor',
        details: error.message || 'Error desconocido'
      }),
      { 
        status: 500,
        headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
      }
    );
  }
});