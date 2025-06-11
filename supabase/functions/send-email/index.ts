
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: 'test' | 'admin' | 'confirmation';
  email: string;
  data?: any;
}

const BREVO_API_KEY = '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';

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, email, data }: EmailRequest = await req.json();
    
    console.log(`📧 Enviando email de tipo: ${type} a: ${email}`);

    let emailData: any;

    if (type === 'test') {
      emailData = {
        sender: {
          name: "Kit IA de Esteban - TEST",
          email: "esteban.montenegro@gmail.com"
        },
        to: [{ email: email, name: "Usuario de Prueba" }],
        subject: `🧪 EMAIL DE PRUEBA - Kit IA Funcionando`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
            <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h1 style="color: #7C3AED; text-align: center; margin-bottom: 30px; font-size: 28px;">🧪 EMAIL DE PRUEBA</h1>
              
              <p style="font-size: 18px; color: #374151; margin-bottom: 20px; text-align: center;">
                <strong>¡Perfecto! El sistema de email está funcionando correctamente.</strong>
              </p>
              
              <div style="background: #F0F9FF; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #3B82F6;">
                <h3 style="color: #1E40AF; margin-top: 0; margin-bottom: 15px; font-size: 18px;">✅ Sistema Verificado:</h3>
                <p style="color: #1E40AF; margin-bottom: 8px;">📧 Conexión con Brevo: Exitosa</p>
                <p style="color: #1E40AF; margin-bottom: 8px;">🚀 API Key: Válida</p>
                <p style="color: #1E40AF; margin-bottom: 8px;">📨 Entrega de email: Funcionando</p>
                <p style="color: #1E40AF; margin-bottom: 0;">⚡ Sistema listo para Kit IA</p>
              </div>

              <div style="background: #ECFDF5; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #10B981;">
                <p style="color: #059669; text-align: center; margin: 0; font-size: 16px;">
                  <strong>Ya puedes usar el formulario del Kit IA con confianza</strong>
                </p>
              </div>

              <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px;">
                <p style="margin: 0; color: #6B7280; font-size: 14px;">
                  Email de prueba enviado el ${new Date().toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        `
      };
    } else {
      // Para otros tipos de email, mantener la lógica existente
      return new Response(JSON.stringify({ error: 'Tipo de email no implementado aún' }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    console.log('📊 Response status:', response.status);

    if (response.ok) {
      const responseData = await response.json();
      console.log('✅ Email enviado exitosamente:', responseData);
      return new Response(JSON.stringify({ success: true, data: responseData }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } else {
      const errorData = await response.text();
      console.error('❌ Error al enviar email:', errorData);
      throw new Error(`Error ${response.status}: ${errorData}`);
    }

  } catch (error: any) {
    console.error('💥 Error en send-email function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
