import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: 'test' | 'admin' | 'confirmation' | 'custom' | 'follow-up' | 'admin_temp_key';
  email: string;
  data?: any;
  submissionId?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!BREVO_API_KEY) {
      console.error('❌ BREVO_API_KEY no está configurada');
      throw new Error('BREVO_API_KEY no está configurada en las variables de entorno');
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('❌ Variables de Supabase no están configuradas');
      throw new Error('Variables de Supabase no están configuradas');
    }

    // Inicializar cliente de Supabase
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { type, email, data, submissionId }: EmailRequest = await req.json();
    
    console.log(`📧 Enviando email de tipo: ${type} a: ${email}`);

    let emailPayload: any;

    if (type === 'test') {
      emailPayload = {
        sender: {
          name: "Kit IA - Crealoconia",
          email: "esteban@crealoconia.com"
        },
        to: [{ email: email, name: "Usuario de Prueba" }],
        subject: `🧪 Sistema de Email Funcionando - Kit IA`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
            <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #7C3AED; font-size: 32px; margin: 0; font-weight: bold;">🧠 Kit IA</h1>
                <p style="color: #6B7280; font-size: 16px; margin: 10px 0 0 0;">Sistema de Email Verificado</p>
              </div>
              
              <div style="background: #F0F9FF; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #3B82F6;">
                <h3 style="color: #1E40AF; margin: 0 0 15px 0; font-size: 20px;">✅ Verificación Exitosa</h3>
                <p style="color: #1E40AF; margin: 8px 0; font-size: 16px;">🔗 Conexión con Brevo: Activa</p>
                <p style="color: #1E40AF; margin: 8px 0; font-size: 16px;">🔑 API Key: Válida y funcionando</p>
                <p style="color: #1E40AF; margin: 8px 0; font-size: 16px;">📨 Entrega de emails: Operativa</p>
                <p style="color: #1E40AF; margin: 8px 0; font-size: 16px;">🚀 Kit IA: Listo para generar prompts</p>
              </div>

              <div style="background: #ECFDF5; padding: 25px; border-radius: 12px; margin: 25px 0; text-align: center; border: 2px solid #10B981;">
                <h3 style="color: #059669; margin: 0 0 10px 0; font-size: 18px;">🎯 Sistema Completamente Funcional</h3>
                <p style="color: #059669; margin: 0; font-size: 16px; font-weight: 600;">
                  Tu Kit IA está listo para entregar Super Prompts personalizados
                </p>
              </div>

              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
                <p style="margin: 0; color: #6B7280; font-size: 14px;">
                  Email de verificación enviado: ${new Date().toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'America/Santiago'
                  })}
                </p>
              </div>
            </div>
          </div>
        `
      };
    } else if (type === 'custom') {
      emailPayload = {
        sender: {
          name: "Esteban de CrealoconIA",
          email: "esteban@crealoconia.com"
        },
        to: [{ email: email, name: data?.name || email }],
        subject: data?.subject || "Mensaje personalizado de CrealoconIA",
        htmlContent: data?.message || "Mensaje personalizado enviado desde CrealoconIA"
      };
    } else if (type === 'follow-up') {
      emailPayload = {
        sender: {
          name: "Esteban de CrealoconIA",
          email: "esteban@crealoconia.com"
        },
        to: [{ email: email, name: data?.name || email }],
        subject: "¿Quieres completar tu sitio web en CrealoconIA?",
        htmlContent: `
          <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: white; padding: 0;">
            
            <div style="background: white; padding: 32px 32px 24px 32px;">
              <h1 style="color: #1f2937; font-size: 24px; font-weight: 600; margin: 0 0 16px 0; line-height: 1.3;">
                Hola ${data?.name || 'allí'},
              </h1>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0;">
                Vimos que iniciaste el proceso en CrealoconIA, pero no llegaste a completar las preguntas.
              </p>
            </div>

            <div style="padding: 0 32px 32px 32px;">
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Esas preguntas son la clave: con ellas nuestro sistema crea tu sitio web automáticamente, con textos, diseño y estructura pensados para tu proyecto.
              </p>

              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 24px; margin: 24px 0;">
                <p style="color: #059669; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
                  👉 Si completas el formulario ahora, podrás tener tu sitio en minutos y revisarlo de inmediato.
                </p>
                <div style="text-align: center; margin: 24px 0;">
                  <a href="https://crealoconia.com" style="background: #059669; color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
                    Completar formulario aquí
                  </a>
                </div>
              </div>

              <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 24px 0 16px 0;">
                ¿Por qué vale la pena terminarlo?
              </h3>
              <ul style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">✅ Obtienes un sitio web real, no una demo</li>
                <li style="margin-bottom: 8px;">✅ Hecho a partir de tus respuestas, sin plantillas genéricas</li>
                <li style="margin-bottom: 8px;">✅ Disponible para revisión gratuita antes de decidir avanzar</li>
                <li style="margin-bottom: 8px;">✅ Una forma rápida de ver tu negocio en digital sin dolores de cabeza técnicos</li>
              </ul>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 24px 0;">
                Recuerda: quienes completan el formulario reciben su sitio web listo para ver, navegar y evaluar.
              </p>

              <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; margin: 24px 0; text-align: center;">
                <p style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
                  El siguiente paso está en tus manos:
                </p>
                <a href="https://crealoconia.com" style="background: #059669; color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; margin-bottom: 16px;">
                  👉 Completar formulario aquí
                </a>
                <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 16px 0 0 0;">
                  Si tienes dudas, escríbeme directo a WhatsApp: <a href="https://wa.me/56962791772" style="color: #059669; text-decoration: none;">+56 9 6279 1772</a>
                </p>
              </div>

              <div style="background: #f8fafc; padding: 24px; border-top: 1px solid #e5e7eb; margin-top: 32px;">
                <p style="color: #4b5563; font-size: 16px; margin: 0 0 8px 0; line-height: 1.6;">
                  Saludos,<br>
                  <strong>Esteban Montenegro</strong><br>
                  Fundador de CrealoconIA<br>
                  📲 WhatsApp: <a href="https://wa.me/56962791772" style="color: #059669; text-decoration: none;">+56 9 6279 1772</a>
                </p>
              </div>
            </div>
          </div>
        `
      };
    } else if (type === 'admin_temp_key') {
      const { tempKey } = data;
      
      emailPayload = {
        sender: { email: "noreply@crealoconia.com", name: "Kit IA Admin" },
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
                  ${tempKey}
                </div>
              </div>
              
              <p style="color: #86868b; font-size: 15px; margin: 0; line-height: 1.5;">
                Este código expira en 60 segundos
              </p>
              
            </div>
          </div>
        `
      };
    } else {
      return new Response(JSON.stringify({ error: 'Tipo de email no válido' }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Usar la API v3 de Brevo
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'User-Agent': 'Kit-IA-Crealoconia/1.0'
      },
      body: JSON.stringify(emailPayload)
    });

    console.log('📊 Brevo API Response Status:', response.status);

    if (response.ok) {
      const responseData = await response.json();
      console.log('✅ Email enviado exitosamente via Brevo v3:', responseData);
      
      // Agregar tag automáticamente después de enviar el email
      if (submissionId && (type === 'custom' || type === 'follow-up')) {
        try {
          const tagToAdd = type === 'custom' ? 'email-personalizado' : 'email-seguimiento';
          
          // Obtener el registro actual para conservar tags existentes
          const { data: currentSubmission, error: fetchError } = await supabase
            .from('form_submissions')
            .select('tags')
            .eq('id', submissionId)
            .single();

          if (!fetchError && currentSubmission) {
            const currentTags = currentSubmission.tags || [];
            const newTags = [...currentTags];
            
            // Solo agregar el tag si no existe ya
            if (!newTags.includes(tagToAdd)) {
              newTags.push(tagToAdd);
              
              const { error: updateError } = await supabase
                .from('form_submissions')
                .update({ tags: newTags })
                .eq('id', submissionId);

              if (updateError) {
                console.error('❌ Error actualizando tags:', updateError);
              } else {
                console.log(`✅ Tag '${tagToAdd}' agregado automáticamente al registro ${submissionId}`);
              }
            } else {
              console.log(`📝 Tag '${tagToAdd}' ya existe en el registro ${submissionId}`);
            }
          }
        } catch (tagError) {
          console.error('❌ Error procesando tags:', tagError);
          // No fallar el envío del email por error en tags
        }
      }
      
      return new Response(JSON.stringify({ 
        success: true, 
        data: responseData,
        timestamp: new Date().toISOString()
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } else {
      const errorData = await response.text();
      console.error('❌ Error en Brevo API v3:', errorData);
      throw new Error(`Brevo API Error ${response.status}: ${errorData}`);
    }

  } catch (error: any) {
    console.error('💥 Error en send-email function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);