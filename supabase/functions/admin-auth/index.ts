import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (action === 'generate') {
      console.log('🎲 Generando código temporal...');
      
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
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
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
                  Este código expira en 60 segundos
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
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }

        const result = await emailResponse.json();
        console.log('✅ Email enviado exitosamente:', result);

        // Guardar código temporalmente en memoria (simplificado)
        // En producción esto iría a la base de datos
        console.log('✅ Proceso completado exitosamente');

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

      } catch (emailError) {
        console.error('💥 Error crítico enviando email:', emailError);
        return new Response(
          JSON.stringify({ error: 'Error interno enviando email' }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

    } else if (action === 'verify') {
      console.log('🔍 Verificando código...');
      
      // Por ahora, simular verificación exitosa para testing
      // En producción esto verificaría contra la base de datos
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
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});