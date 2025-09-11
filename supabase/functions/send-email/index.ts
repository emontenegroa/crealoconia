
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
    } else if (type === 'admin') {
      // Email para Esteban con datos del formulario
      const formData = data;
      emailPayload = {
        sender: {
          name: "Kit IA - Crealoconia",
          email: "esteban@crealoconia.com"
        },
        to: [
          {
            email: "esteban@crealoconia.com",
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

              ${formData.generatedPrompts?.lovablePrompt ? `
              <div style="background: #F0F9FF; padding: 25px; border-radius: 12px; margin: 25px 0; border: 3px solid #7C3AED;">
                <h2 style="color: #7C3AED; margin: 0 0 15px 0; font-size: 18px;">🌐 PROMPT PARA LOVABLE (GENERAR SITIO WEB)</h2>
                <div style="background: #FFF; padding: 20px; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 12px; white-space: pre-wrap; overflow-x: auto; max-height: 300px; overflow-y: auto; border: 1px solid #E5E7EB; line-height: 1.4;">${formData.generatedPrompts.lovablePrompt.substring(0, 500)}${formData.generatedPrompts.lovablePrompt.length > 500 ? '...\n\n[Prompt completo de Lovable disponible]' : ''}</div>
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
          email: "esteban@crealoconia.com"
        },
        to: [
          {
            email: formData.email,
            name: formData.marca
          }
        ],
        subject: `Tu sitio web está casi listo 🚀`,
        htmlContent: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
            <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #1d1d1f; font-size: 28px; margin: 0; font-weight: 600; letter-spacing: -0.5px;">Tu sitio web está casi listo 🚀</h1>
              </div>
              
              <p style="color: #1d1d1f; font-size: 17px; margin: 20px 0; line-height: 1.5;">Hola,</p>
              
              <p style="color: #1d1d1f; font-size: 17px; margin: 20px 0; line-height: 1.5;">
                Gracias por completar el formulario en Crealoconia.com. Con la información que compartiste, podemos generar tu sitio web de muestra con diseño moderno, colores armónicos y una estructura pensada para resaltar lo que ofreces.
              </p>
              
              <p style="color: #1d1d1f; font-size: 17px; margin: 20px 0; line-height: 1.5;">
                Antes de avanzar, queremos asegurarnos de que este paso realmente encaje con lo que buscas.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <div style="width: 50px; height: 1px; background: #e5e5e7; margin: 0 auto;"></div>
              </div>
              
              <h2 style="color: #1d1d1f; font-size: 20px; margin: 30px 0 15px 0; font-weight: 600;">🌐 Ejemplos de sitios ya creados con Crealoconia</h2>
              
              <p style="color: #1d1d1f; font-size: 17px; margin: 20px 0; line-height: 1.5;">
                Para que te inspires, aquí algunos proyectos que ya hemos generado:
              </p>
              
              <ul style="color: #1d1d1f; font-size: 17px; margin: 20px 0; line-height: 1.8; padding-left: 20px;">
                <li>Total Sport</li>
                <li>Gatitos</li>
                <li>MST Traslados</li>
                <li>Esteban Montenegro</li>
                <li>Hampi</li>
              </ul>
              
              <p style="color: #1d1d1f; font-size: 17px; margin: 20px 0; line-height: 1.5;">
                Cada uno nació de las mismas 10 preguntas que respondiste en el formulario.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <div style="width: 50px; height: 1px; background: #e5e5e7; margin: 0 auto;"></div>
              </div>
              
              <h2 style="color: #1d1d1f; font-size: 20px; margin: 30px 0 15px 0; font-weight: 600;">🔑 Inversión para publicar tu sitio</h2>
              
              <p style="color: #1d1d1f; font-size: 17px; margin: 20px 0; line-height: 1.5;">
                Lo que hacemos es seleccionar algunos proyectos y crearles una versión funcional de su sitio web, sin compromiso.
              </p>
              
              <p style="color: #1d1d1f; font-size: 17px; margin: 20px 0; line-height: 1.5;">
                Si el resultado te convence y quieres publicarlo, avanzamos con:
              </p>
              
              <ul style="color: #1d1d1f; font-size: 17px; margin: 20px 0; line-height: 1.8; padding-left: 20px;">
                <li>✔️ Una sesión de ajuste y actualización</li>
                <li>✔️ Publicación en dominio propio .com o .cl</li>
              </ul>
              
              <p style="color: #1d1d1f; font-size: 17px; margin: 20px 0; line-height: 1.5;">
                <strong>Inversión: $197.000 CLP</strong><br>
                <span style="color: #86868b; font-size: 15px;">(No incluye el costo del dominio, ya que depende de la extensión y proveedor que elijas).</span>
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <div style="width: 50px; height: 1px; background: #e5e5e7; margin: 0 auto;"></div>
              </div>
              
              <h2 style="color: #1d1d1f; font-size: 20px; margin: 30px 0 15px 0; font-weight: 600;">🎁 Bonus adelantado</h2>
              
              <p style="color: #1d1d1f; font-size: 17px; margin: 20px 0; line-height: 1.5;">
                Por haber completado el formulario, ya recibes ahora un Super Prompt optimizado para ChatGPT.
              </p>
              
              <p style="color: #1d1d1f; font-size: 17px; margin: 20px 0; line-height: 1.5;">
                Con este prompt podrás generar:
              </p>
              
              <ul style="color: #1d1d1f; font-size: 17px; margin: 20px 0; line-height: 1.8; padding-left: 20px;">
                <li>Contenido para redes sociales</li>
                <li>Emails de venta y captación</li>
                <li>Estrategias y guiones comerciales</li>
                <li>Textos de alta conversión para tu negocio</li>
              </ul>
              
              <p style="color: #1d1d1f; font-size: 17px; margin: 20px 0; line-height: 1.5;">
                Este recurso ya es tuyo, sin condiciones.<br>
                Si luego decides publicar tu sitio, potenciaremos aún más tu comunicación digital.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <div style="width: 50px; height: 1px; background: #e5e5e7; margin: 0 auto;"></div>
              </div>
              
              ${formData.generatedPrompts?.superPrompt ? `
              <div style="background: #f0f9ff; padding: 25px; border-radius: 8px; margin: 25px 0; border: 1px solid #e0e7ff;">
                <h2 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">🤖 Tu Super Prompt para ChatGPT</h2>
                <p style="color: #1e40af; margin: 0 0 15px 0; font-size: 15px;">
                  Copia este prompt completo y úsalo en ChatGPT para generar todo tu contenido:
                </p>
                <div style="background: white; padding: 20px; border-radius: 6px; font-family: 'SF Mono', Monaco, monospace; font-size: 13px; white-space: pre-wrap; overflow-x: auto; max-height: 300px; overflow-y: auto; border: 1px solid #e5e7eb; line-height: 1.4; position: relative;">
                  <button onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent); this.textContent='✅ Copiado!'; setTimeout(() => this.textContent='📋 Copiar', 2000)" style="position: absolute; top: 10px; right: 10px; background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 11px; cursor: pointer;">📋 Copiar</button>
                  <div style="margin-top: 30px;">${formData.generatedPrompts.superPrompt}</div>
                </div>
              </div>
              ` : ''}
              
              <h2 style="color: #1d1d1f; font-size: 20px; margin: 30px 0 15px 0; font-weight: 600;">📩 ¿Quieres avanzar?</h2>
              
              <p style="color: #1d1d1f; font-size: 17px; margin: 20px 0; line-height: 1.5;">
                Si deseas que generemos tu sitio de muestra y darle prioridad a tu proyecto, responde a este correo con un "Sí, quiero avanzar".
              </p>
              
              <p style="color: #1d1d1f; font-size: 17px; margin: 20px 0; line-height: 1.5;">
                Así podremos guiarte en el siguiente paso y acompañarte en la publicación de tu página.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <div style="width: 50px; height: 1px; background: #e5e5e7; margin: 0 auto;"></div>
              </div>
              
              <p style="color: #86868b; font-size: 15px; margin: 20px 0; line-height: 1.5; text-align: center;">
                ✨ Sin compromiso inicial • Selección limitada de proyectos • Hecho para quienes quieren dar el paso
              </p>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e7;">
                <p style="margin: 0 0 5px 0; color: #1d1d1f; font-size: 16px; font-weight: 600;">El equipo de Crealoconia.com</p>
                <p style="margin: 0; color: #86868b; font-size: 15px;">esteban@crealoconia.com</p>
              </div>
            </div>
          </div>
        `
      };
    } else if (type === 'admin_temp_key') {
      // Email para clave temporal de admin
      const { tempKey } = emailData;
      
      const emailContent = {
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

      console.log('📧 Enviando clave temporal de admin a:', email);
      
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': brevoApiKey
        },
        body: JSON.stringify(emailContent)
      });

      console.log('📊 Brevo API Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error de Brevo API:', errorText);
        throw new Error(`Brevo API error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ Email enviado exitosamente via Brevo v3:', result);

      return new Response(
        JSON.stringify({ success: true, messageId: result.messageId }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );

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
