
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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');
    
    if (!BREVO_API_KEY) {
      console.error('❌ BREVO_API_KEY no está configurada');
      throw new Error('BREVO_API_KEY no está configurada en las variables de entorno');
    }

    const { type, email, data }: EmailRequest = await req.json();
    
    console.log(`📧 Enviando email de tipo: ${type} a: ${email}`);

    let emailPayload: any;

    if (type === 'test') {
      emailPayload = {
        sender: {
          name: "Kit IA - Crealoconia",
          email: "esteban.montenegro@gmail.com"
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
    } else if (type === 'admin') {
      // Email para Esteban con datos del formulario
      const formData = data;
      emailPayload = {
        sender: {
          name: "Kit IA - Crealoconia",
          email: "esteban.montenegro@gmail.com"
        },
        to: [
          {
            email: "esteban.montenegro@gmail.com",
            name: "Esteban Montenegro"
          }
        ],
        subject: `🧠 Nuevo Kit IA generado: ${formData.marca}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px;">
            <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #7C3AED; font-size: 28px; margin: 0; font-weight: bold;">🧠 Nuevo Kit IA Generado</h1>
                <p style="color: #6B7280; font-size: 16px; margin: 10px 0 0 0;">Lead magnet completado exitosamente</p>
              </div>
              
              <div style="background: #F8FAFC; padding: 25px; border-radius: 12px; margin: 25px 0; border: 2px solid #E2E8F0;">
                <h2 style="color: #1E293B; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #7C3AED; padding-bottom: 10px;">📊 Información del Cliente</h2>
                <div style="display: grid; gap: 12px;">
                  <p style="margin: 0; padding: 8px 0; border-bottom: 1px solid #E2E8F0;"><strong style="color: #475569;">Marca:</strong> <span style="color: #1E293B;">${formData.marca}</span></p>
                  <p style="margin: 0; padding: 8px 0; border-bottom: 1px solid #E2E8F0;"><strong style="color: #475569;">Email:</strong> <span style="color: #1E293B;">${formData.email}</span></p>
                  <p style="margin: 0; padding: 8px 0; border-bottom: 1px solid #E2E8F0;"><strong style="color: #475569;">WhatsApp:</strong> <span style="color: #1E293B;">${formData.whatsapp || 'No proporcionado'}</span></p>
                  <p style="margin: 0; padding: 8px 0; border-bottom: 1px solid #E2E8F0;"><strong style="color: #475569;">Website:</strong> <span style="color: #1E293B;">${formData.website || 'No proporcionado'}</span></p>
                  <p style="margin: 0; padding: 8px 0; border-bottom: 1px solid #E2E8F0;"><strong style="color: #475569;">Instagram:</strong> <span style="color: #1E293B;">${formData.instagram ? '@' + formData.instagram : 'No proporcionado'}</span></p>
                  <p style="margin: 0; padding: 8px 0;"><strong style="color: #475569;">Estilo:</strong> <span style="color: #1E293B;">${formData.estilo}</span></p>
                </div>
              </div>

              <div style="background: #EFF6FF; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #3B82F6;">
                <h3 style="color: #1E40AF; margin: 0 0 15px 0; font-size: 18px;">👤 Perfil del Negocio</h3>
                <p style="color: #1E40AF; line-height: 1.6; margin: 0; font-size: 15px;">${formData.quien_eres}</p>
              </div>

              <div style="background: #FEF3C7; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #F59E0B;">
                <h3 style="color: #D97706; margin: 0 0 15px 0; font-size: 18px;">🎯 Problemas que Resuelve</h3>
                <p style="color: #D97706; line-height: 1.6; margin: 0; font-size: 15px;">${formData.problemas}</p>
              </div>

              <div style="background: #ECFDF5; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #10B981;">
                <h3 style="color: #059669; margin: 0 0 15px 0; font-size: 18px;">❓ Preguntas Frecuentes</h3>
                <p style="color: #059669; line-height: 1.6; margin: 0; font-size: 15px;">${formData.preguntas_frecuentes}</p>
              </div>

              <div style="background: #FDF2F8; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #EC4899;">
                <h3 style="color: #BE185D; margin: 0 0 15px 0; font-size: 18px;">🚀 Producto Principal</h3>
                <p style="color: #BE185D; line-height: 1.6; margin: 0; font-size: 15px;">${formData.producto}</p>
              </div>

              ${formData.generatedPrompts?.superPrompt ? `
              <div style="background: #F0F9FF; padding: 25px; border-radius: 12px; margin: 25px 0; border: 3px solid #3B82F6;">
                <h2 style="color: #1E40AF; margin: 0 0 15px 0; font-size: 18px;">🤖 SUPER PROMPT ENTREGADO AL CLIENTE</h2>
                <div style="background: #FFF; padding: 20px; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 300px; overflow-y: auto; border: 1px solid #E5E7EB; line-height: 1.4;">${formData.generatedPrompts.superPrompt.substring(0, 500)}${formData.generatedPrompts.superPrompt.length > 500 ? '...\n\n[Prompt completo enviado al cliente]' : ''}</div>
              </div>
              ` : ''}

              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #E2E8F0;">
                <p style="margin: 0; color: #6B7280; font-size: 14px;">
                  Kit IA generado el ${new Date().toLocaleDateString('es-ES', { 
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
    } else if (type === 'confirmation') {
      // Email de confirmación para el cliente
      const formData = data;
      emailPayload = {
        sender: {
          name: "Kit IA - Crealoconia",
          email: "esteban.montenegro@gmail.com"
        },
        to: [
          {
            email: formData.email,
            name: formData.marca
          }
        ],
        subject: `🧠 ${formData.marca}, tu Kit IA está listo para usar`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px;">
            <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #7C3AED; font-size: 32px; margin: 0; font-weight: bold;">🧠 Tu Kit IA está listo</h1>
                <p style="color: #6B7280; font-size: 18px; margin: 10px 0 0 0;">Revoluciona tu estrategia de contenido ahora mismo</p>
              </div>
              
              <div style="background: #F0F9FF; padding: 25px; border-radius: 12px; margin: 25px 0; text-align: center; border: 3px solid #3B82F6;">
                <h2 style="color: #1E40AF; margin: 0 0 15px 0; font-size: 24px;">¡Hola ${formData.marca}! 🚀</h2>
                <p style="color: #1E40AF; margin: 0; font-size: 16px; line-height: 1.6;">
                  Tu Kit IA personalizado ya está generado y listo para <strong>revolucionar tu estrategia de contenido digital</strong>.
                </p>
              </div>

              <div style="background: #ECFDF5; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #10B981;">
                <h3 style="color: #059669; margin: 0 0 15px 0; font-size: 20px;">🎯 Lo que incluye tu Kit IA:</h3>
                <div style="color: #059669; font-size: 15px; line-height: 1.8;">
                  <p style="margin: 8px 0;"><strong>📱 Contenido para Redes:</strong> Posts virales, Reels, Stories y carrousels</p>
                  <p style="margin: 8px 0;"><strong>📧 Email Marketing:</strong> Secuencias de captación, nutrición y venta</p>
                  <p style="margin: 8px 0;"><strong>💰 Estrategias de Venta:</strong> Guiones para webinars y sesiones de cierre</p>
                  <p style="margin: 8px 0;"><strong>🌐 Copy para Web:</strong> Landing pages y textos de conversión</p>
                  <p style="margin: 8px 0;"><strong>🎓 Contenido Educativo:</strong> Series para construir autoridad</p>
                </div>
              </div>

              ${formData.generatedPrompts?.superPrompt ? `
              <div style="background: #F0F9FF; padding: 25px; border-radius: 12px; margin: 25px 0; border: 2px solid #7C3AED;">
                <h2 style="color: #7C3AED; margin: 0 0 15px 0; font-size: 20px;">🤖 Tu Super Prompt para ChatGPT</h2>
                <p style="color: #5B21B6; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">Copia este prompt completo y úsalo en ChatGPT para generar todo tu contenido:</p>
                <div style="background: white; padding: 20px; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 400px; overflow-y: auto; border: 2px solid #E5E7EB; line-height: 1.4;">${formData.generatedPrompts.superPrompt}</div>
              </div>
              ` : ''}

              <div style="background: #FDF2F8; padding: 30px; border-radius: 12px; margin: 30px 0; border: 3px solid #EC4899;">
                <h3 style="color: #BE185D; margin: 0 0 20px 0; font-size: 22px; text-align: center;">🚀 Cómo usar tu Kit IA</h3>
                <div style="color: #BE185D; font-size: 16px; line-height: 1.8;">
                  <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <span style="background: #EC4899; color: white; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold;">1</span>
                    <span><strong>Copia el Super Prompt:</strong> Pégalo completo en ChatGPT</span>
                  </div>
                  <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <span style="background: #EC4899; color: white; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold;">2</span>
                    <span><strong>Pide contenido específico:</strong> "Crea 10 posts para Instagram"</span>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <span style="background: #EC4899; color: white; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold;">3</span>
                    <span><strong>Escala tu presencia:</strong> Genera contenido para todas tus plataformas</span>
                  </div>
                </div>
              </div>

              <div style="background: #FEF3C7; padding: 30px; border-radius: 12px; margin: 30px 0; border: 3px solid #F59E0B; text-align: center;">
                <h3 style="color: #D97706; margin: 0 0 15px 0; font-size: 20px;">🌐 Bonus Especial: Tu Sitio Web</h3>
                <p style="color: #D97706; margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
                  <strong>Próximamente recibirás el enlace de tu sitio web profesional</strong> creado automáticamente con tu información.
                </p>
                <p style="color: #D97706; font-weight: bold; margin: 0; font-size: 16px;">
                  ✨ Sin compromiso • Sin pagos adelantados • Sin letra pequeña
                </p>
              </div>

              <div style="text-align: center; margin-top: 40px; padding-top: 25px; border-top: 2px solid #E2E8F0;">
                <p style="margin: 0 0 10px 0; color: #1E293B; font-size: 16px; font-weight: 600;">El equipo de Crealoconia.com</p>
                <p style="margin: 0; color: #6B7280; font-size: 14px;">
                  ${new Date().toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    timeZone: 'America/Santiago'
                  })}
                </p>
              </div>
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

    // Usar la API v3 de Brevo actualizada
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
