import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Función para convertir imagen a base64
async function getImageAsBase64(imageName: string): Promise<string> {
  try {
    // Leer la imagen desde el directorio public/lovable-uploads usando la URL correcta del proyecto
    const response = await fetch(`https://yxagfbefgqlsjrxjtgjr.lovable.app/lovable-uploads/${imageName}`);
    if (!response.ok) {
      console.error(`Error loading image ${imageName}:`, response.status);
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    return `data:image/png;base64,${base64}`;
  } catch (error) {
    console.error(`Error converting image ${imageName} to base64:`, error);
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
  }
}

interface EmailRequest {
  type: 'test' | 'admin' | 'confirmation' | 'custom' | 'follow-up' | 'admin_temp_key' | 'proposal';
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

    // Base URL fija para imágenes servidas desde el mismo sistema
    let baseUrl = 'https://crealoconia.com';
    const originHeader = req.headers.get('origin') || req.headers.get('referer') || '';
    try {
      if (originHeader) {
        const u = new URL(originHeader);
        // Solo aceptar orígenes públicos válidos
        if (u.hostname.includes('crealoconia.com') || u.hostname.includes('yxagfbefgqlsjrxjtgjr.lovable.app')) {
          baseUrl = u.origin;
        }
      }
    } catch (_) { /* ignore errors */ }
    console.log('🖼️ Base URL para imágenes:', baseUrl);

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
        subject: "Completa tu información para tu sitio web personalizado",
        htmlContent: `
          <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: white; padding: 0;">
            
            <div style="background: white; padding: 32px 32px 24px 32px;">
              <h1 style="color: #1f2937; font-size: 24px; font-weight: 600; margin: 0 0 16px 0; line-height: 1.3;">
                Hola 👋🏻 ${data?.name || 'allí'},
              </h1>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Revisamos tus respuestas en Crealoconia y vimos que quedaron incompletas o demasiado breves.
              </p>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Esto es clave: <strong>mientras más detalles entregues, mejor podemos preparar tu propuesta de sitio web</strong>.
              </p>

              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 24px; margin: 24px 0;">
                <p style="color: #059669; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
                  👉 La buena noticia es que aún puedes completarlo y ser considerado para la creación de tu página personalizada.
                </p>
              </div>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                Para ayudarte, añadimos un <strong>botón de IA junto a cada campo</strong>. Con él puedes mejorar tus respuestas en segundos, haciéndolas más claras y atractivas.
              </p>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                Recuerda: seleccionamos algunos proyectos y les creamos una propuesta 100% funcional, lista para revisar sin compromiso.
              </p>

              <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 24px; margin: 24px 0;">
                <p style="color: #92400e; font-size: 16px; font-weight: 600; margin: 0 0 12px 0;">
                  👉 Si el sitio te convence y decides publicarlo, avanzamos con una sesión de ajustes y la puesta en línea en un dominio propio (.com o .cl).
                </p>
                <p style="color: #92400e; font-size: 16px; margin: 0 0 8px 0;">
                  Esa sesión, junto con la publicación, tiene un valor de <strong>$197.000 CLP</strong>.
                </p>
                <p style="color: #92400e; font-size: 14px; margin: 0; font-style: italic;">
                  (El valor no incluye el dominio, ya que depende del proveedor que elijas).
                </p>
              </div>

              <div style="text-align: center; margin: 32px 0;">
                <a href="https://crealoconia.com" style="background: #059669; color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; font-size: 18px;">
                  👉 Completa tu formulario aquí: crealoconia.com
                </a>
              </div>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                Si tienes dudas, escríbeme directo a mi WhatsApp: <a href="https://wa.me/56962791772" style="color: #059669; text-decoration: none; font-weight: 600;">+56 9 6279 1772</a>.
              </p>

              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 24px 0; text-align: center;">
                <p style="color: #059669; font-size: 18px; font-weight: 600; margin: 0;">
                  ✅ Da el paso ahora, completa tu información y asegura tu sitio.
                </p>
              </div>

              <div style="background: #f8fafc; padding: 24px; border-top: 1px solid #e5e7eb; margin-top: 32px;">
                <p style="color: #4b5563; font-size: 16px; margin: 0 0 8px 0; line-height: 1.6;">
                  Un saludo,<br>
                  <strong>Esteban Montenegro</strong><br>
                  Fundador de CrealoconIA<br>
                  📲 WhatsApp: <a href="https://wa.me/56962791772" style="color: #059669; text-decoration: none;">+56 9 6279 1772</a>
                </p>
              </div>
            </div>
          </div>
        `
      };
    } else if (type === 'proposal') {
      emailPayload = {
        sender: {
          name: "Esteban de CrealoconIA",
          email: "esteban@crealoconia.com"
        },
        to: [{ email: email, name: data?.name || email }],
        subject: "Propuesta personalizada para tu sitio web",
        htmlContent: `
          <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: white; padding: 0;">
            
            <div style="background: white; padding: 32px 32px 24px 32px;">
              <h1 style="color: #1f2937; font-size: 24px; font-weight: 600; margin: 0 0 16px 0; line-height: 1.3;">
                Hola 👋🏻 ${data?.name || 'allí'},
              </h1>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Revisamos tus respuestas en Crealoconia y vimos un gran potencial en tu proyecto. Se nota el compromiso y la claridad con que completaste el formulario, y eso nos permite avanzar hacia la creación de tu sitio web personalizado.
              </p>

              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 24px; margin: 24px 0;">
                <p style="color: #059669; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
                  👉 El proceso es muy simple:
                </p>
                <ol style="color: #059669; font-size: 16px; line-height: 1.6; margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 8px;">Con tus respuestas generamos una propuesta 100% funcional, lista para revisar sin compromiso.</li>
                  <li style="margin-bottom: 8px;">Si te gusta y aceptas el sitio, hacemos una sesión de ajustes para dejarlo exactamente como lo necesitas (textos, fotos, colores).</li>
                  <li style="margin-bottom: 0;">En esa misma sesión publicamos tu web en tu propio dominio (.com o .cl).</li>
                </ol>
              </div>

              <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 24px; margin: 24px 0;">
                <p style="color: #92400e; font-size: 16px; font-weight: 600; margin: 0 0 12px 0;">
                  La inversión es de $197.000 CLP por 2 años, lo que incluye la sesión personalizada y la publicación en tu dominio.
                </p>
                <p style="color: #92400e; font-size: 14px; margin: 0; font-style: italic;">
                  (El costo del dominio depende del proveedor que elijas).
                </p>
              </div>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                Con Crealoconia obtienes una herramienta profesional, rápida y sin complicaciones técnicas.
              </p>

              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 24px; margin: 24px 0;">
                <p style="color: #059669; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
                  👉 Para avanzar, solo responde este correo diciendo "Sí, quiero mi sitio" y damos el vamos.
                </p>
                <p style="color: #059669; font-size: 16px; line-height: 1.6; margin: 0;">
                  📲 Si prefieres, también puedes escribirme directo a mi WhatsApp: <a href="https://wa.me/56962791772" style="color: #059669; text-decoration: none; font-weight: 600;">+56 9 6279 1772</a>.
                </p>
              </div>

              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 24px 0; text-align: center;">
                <p style="color: #059669; font-size: 18px; font-weight: 600; margin: 0;">
                  ✅ Da el paso ahora y asegura tu sitio.
                </p>
              </div>

              <div style="background: #f8fafc; padding: 24px; border-top: 1px solid #e5e7eb; margin-top: 32px;">
                <p style="color: #4b5563; font-size: 16px; margin: 0 0 8px 0; line-height: 1.6;">
                  Un saludo,<br>
                  <strong>Esteban Montenegro</strong><br>
                  Fundador de CrealoconIA<br>
                  📲 WhatsApp: <a href="https://wa.me/56962791772" style="color: #059669; text-decoration: none;">+56 9 6279 1772</a>
                </p>
              </div>
            </div>
          </div>
        `
      };
    } else if (type === 'admin') {
      emailPayload = {
        sender: {
          name: "Kit IA - Nueva Submisión",
          email: "esteban@crealoconia.com"
        },
        to: [{ email: email }],
        subject: `🧠 Nueva submisión Kit IA - ${data?.marca || 'Sin marca'}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background: white; padding: 20px;">
            <div style="background: linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%); padding: 30px; border-radius: 12px; margin-bottom: 30px;">
              <h1 style="color: white; font-size: 28px; margin: 0 0 10px 0; font-weight: bold;">🧠 Nueva Submisión - Kit IA</h1>
              <p style="color: white; margin: 0; font-size: 16px; opacity: 0.9;">Datos del formulario completado</p>
            </div>
            
            <div style="background: #F8FAFC; padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #3B82F6;">
              <h2 style="color: #1E293B; margin: 0 0 15px 0; font-size: 18px;">📊 Información Básica</h2>
              <p style="margin: 8px 0; color: #475569;"><strong>Marca/Negocio:</strong> ${data?.marca || 'No especificado'}</p>
              <p style="margin: 8px 0; color: #475569;"><strong>Email:</strong> ${data?.email || 'No especificado'}</p>
              <p style="margin: 8px 0; color: #475569;"><strong>WhatsApp:</strong> ${data?.whatsapp || 'No especificado'}</p>
              <p style="margin: 8px 0; color: #475569;"><strong>Website:</strong> ${data?.website || 'No especificado'}</p>
              <p style="margin: 8px 0; color: #475569;"><strong>Instagram:</strong> ${data?.instagram || 'No especificado'}</p>
            </div>

            <div style="background: #FEF7FF; padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #7C3AED;">
              <h2 style="color: #1E293B; margin: 0 0 15px 0; font-size: 18px;">🎯 Información del Negocio</h2>
              <p style="margin: 12px 0; color: #475569;"><strong>¿Quién eres?</strong><br>${data?.quien_eres || 'No especificado'}</p>
              <p style="margin: 12px 0; color: #475569;"><strong>Problemas que resuelves:</strong><br>${data?.problemas || 'No especificado'}</p>
              <p style="margin: 12px 0; color: #475569;"><strong>Preguntas frecuentes:</strong><br>${data?.preguntas_frecuentes || 'No especificado'}</p>
              <p style="margin: 12px 0; color: #475569;"><strong>Estilo de comunicación:</strong><br>${data?.estilo || 'No especificado'}</p>
              <p style="margin: 12px 0; color: #475569;"><strong>Producto/Servicio:</strong><br>${data?.producto || 'No especificado'}</p>
            </div>

            ${data?.generatedPrompts ? `
            <div style="background: #F0FDF4; padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #10B981;">
              <h2 style="color: #1E293B; margin: 0 0 15px 0; font-size: 18px;">🚀 Prompts Generados</h2>
              <p style="margin: 8px 0; color: #059669; font-weight: 600;">✅ Super Prompt generado exitosamente</p>
              ${data.generatedPrompts.lovablePrompt ? '<p style="margin: 8px 0; color: #059669; font-weight: 600;">✅ Prompt de Lovable generado</p>' : ''}
            </div>
            ` : ''}

            <div style="background: #F1F5F9; padding: 20px; border-radius: 12px; text-align: center; margin-top: 30px;">
              <p style="margin: 0; color: #64748B; font-size: 14px;">
                Submisión recibida: ${new Date().toLocaleDateString('es-ES', { 
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
        `
      };
    } else if (type === 'confirmation') {
      emailPayload = {
        sender: {
          name: "Esteban de CrealoconIA",
          email: "esteban@crealoconia.com"
        },
        to: [{ email: email, name: data?.marca || email }],
        subject: `🧠 Tu Kit IA está listo - ${data?.marca || 'Kit Personalizado'}`,
        htmlContent: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: white; color: #333;">
            
            <div style="padding: 40px 32px 32px 32px; background: white;">
              <h1 style="color: #1f2937; font-size: 24px; font-weight: 600; margin: 0 0 16px 0; line-height: 1.3;">
                Hola ${data?.marca || 'allí'},
              </h1>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Gracias por completar el formulario en Crealoconia.com. Con la información que compartiste, crearemos tu sitio web oficial con diseño moderno, colores armónicos y una estructura pensada específicamente para resaltar lo que ofreces.
              </p>
              
              <h2 style="color: #1f2937; font-size: 20px; font-weight: 600; margin: 24px 0 16px 0;">
                🎁 Bonus Adelantado: Tu Super Prompt para ChatGPT
              </h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
                Por haber completado el formulario, ya recibes AHORA un Super Prompt optimizado para ChatGPT.
              </p>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0; font-weight: 600;">
                Con este prompt podrás generar:
              </p>
              <ul style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0; padding-left: 20px;">
                <li>Contenido viral para redes sociales</li>
                <li>Emails de venta y captación de clientes</li>
                <li>Estrategias y guiones comerciales efectivos</li>
                <li>Textos de alta conversión para tu negocio</li>
              </ul>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; font-weight: 600;">
                Este recurso ya es tuyo, sin condiciones.
              </p>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Si luego decides publicar tu sitio, potenciaremos aún más tu comunicación digital con estrategias avanzadas.
              </p>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Ahora, sobre tu sitio web... queremos asegurarnos de que esto realmente se alinee con lo que buscas.
              </p>
              
              <h2 style="color: #1f2937; font-size: 20px; font-weight: 600; margin: 32px 0 16px 0;">
                Tu Sitio Web Personalizado
              </h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
                Nuestro proceso es simple y efectivo:
              </p>
              <ol style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Creamos tu sitio 100% funcional - Sin compromiso, solo con la confianza de que el resultado te va a encantar</li>
                <li style="margin-bottom: 8px;">Si te gusta, avanzamos el mismo día con una sesión completa de ajustes y publicación</li>
                <li style="margin-bottom: 8px;">Tu sitio queda en línea con tu dominio propio (.com o .cl) ese mismo día</li>
              </ol>
              
              <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; margin: 24px 0;">
                <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
                  La sesión de publicación incluye:
                </h3>
                <p style="color: #059669; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
                  Inversión total: $197.000 CLP
                </p>
                <ul style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 8px;">✅ Modificaciones de textos - Ajustamos todo el copy a tu gusto</li>
                  <li style="margin-bottom: 8px;">✅ Cambio de imágenes - Seleccionamos las mejores para tu negocio</li>
                  <li style="margin-bottom: 8px;">✅ Asesoría 1 a 1 - Con un experto de más de 10 años de experiencia</li>
                  <li style="margin-bottom: 8px;">✅ Publicación inmediata - Tu sitio en línea el mismo día</li>
                  <li>✅ Configuración completa - WhatsApp, botón de pago, formularios de contacto</li>
                </ul>
              </div>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 24px 0; font-weight: 600;">
                Nuestro objetivo: que salgas de la sesión con tu sitio web completamente publicado y funcionando.
              </p>
              
              <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 24px 0 16px 0;">
                🌐 Ejemplos de sitios creados con Crealoconia:
              </h3>
              <div style="display: flex; gap: 10px; flex-wrap: wrap; margin: 20px 0;">
                <img src="${baseUrl}/lovable-uploads/ejemplos-sonrisas.png" alt="Ejemplo Sonrisas" style="width: 150px; height: auto; border-radius: 8px; border: 1px solid #e5e7eb;">
                <img src="${baseUrl}/lovable-uploads/ejemplos-ate.png" alt="Ejemplo ATE" style="width: 150px; height: auto; border-radius: 8px; border: 1px solid #e5e7eb;">
                <img src="${baseUrl}/lovable-uploads/ejemplos-colegio.png" alt="Ejemplo Colegio" style="width: 150px; height: auto; border-radius: 8px; border: 1px solid #e5e7eb;">
                <img src="${baseUrl}/lovable-uploads/ejemplos-ecopartner.png" alt="Ejemplo EcoPartner" style="width: 150px; height: auto; border-radius: 8px; border: 1px solid #e5e7eb;">
              </div>
              <div style="display: flex; gap: 10px; flex-wrap: wrap; margin: 20px 0;">
                <img src="${baseUrl}/lovable-uploads/ejemplos-gatitos.png" alt="Ejemplo Gatitos" style="width: 150px; height: auto; border-radius: 8px; border: 1px solid #e5e7eb;">
                <img src="${baseUrl}/lovable-uploads/ejemplos-lux.png" alt="Ejemplo Lux" style="width: 150px; height: auto; border-radius: 8px; border: 1px solid #e5e7eb;">
                <img src="${baseUrl}/lovable-uploads/ejemplos-propiedades.png" alt="Ejemplo Propiedades" style="width: 150px; height: auto; border-radius: 8px; border: 1px solid #e5e7eb;">
                <img src="${baseUrl}/lovable-uploads/ejemplos-taxi.png" alt="Ejemplo Taxi" style="width: 150px; height: auto; border-radius: 8px; border: 1px solid #e5e7eb;">
              </div>
              <div style="display: flex; gap: 10px; flex-wrap: wrap; margin: 20px 0;">
                <img src="${baseUrl}/lovable-uploads/ejemplos-emprendedora.png" alt="Ejemplo Emprendedora" style="width: 150px; height: auto; border-radius: 8px; border: 1px solid #e5e7eb;">
                <img src="${baseUrl}/lovable-uploads/ejemplos-artetransfer.png" alt="Ejemplo Arte Transfer" style="width: 150px; height: auto; border-radius: 8px; border: 1px solid #e5e7eb;">
              </div>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; font-style: italic;">
                Todos estos proyectos fueron creados y publicados el mismo día de la sesión.
              </p>
              
              <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 24px 0 16px 0;">
                ¿Quieres avanzar?
              </h3>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
                Si deseas que creemos tu sitio y darle prioridad a tu proyecto, responde este correo con "Sí, quiero avanzar".
              </p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Tan pronto recibamos tu confirmación, comenzaremos a crear tu sitio y te presentaremos tu nueva página web.
              </p>
              
              <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 24px 0 16px 0;">
                ¿Y si no te gusta el resultado?
              </h3>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Sin problema. Te ayudamos a encontrar la solución perfecta, ya sea conectándote con alguno de nuestros partners o guiándote hacia la mejor alternativa para tu proyecto.
              </p>
              
              <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 24px 0 16px 0;">
                ¿Listo para tener tu sitio web profesional?
              </h3>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
                Esperamos tu respuesta para comenzar.
              </p>
            </div>
            
            <!-- Prompts Section -->
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 32px; margin: 32px; text-align: center;">
              <h3 style="color: #059669; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
                📋 Tu Super Prompt Personalizado
              </h3>
              <p style="color: #059669; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
                Copia y pega este prompt en ChatGPT para generar contenido optimizado para tu marca:
              </p>
              <div style="background: white; border: 1px solid #d1d5db; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: left; font-family: monospace; font-size: 14px; line-height: 1.5; white-space: pre-wrap; overflow-x: auto; color: #1f2937;">${data?.generatedPrompts?.superPrompt || 'Super Prompt no disponible'}</div>
              
            </div>
            
            <!-- Footer -->
            <div style="background: #f8fafc; padding: 32px; margin: 32px 0 0 0; text-align: center;">
              <p style="color: #4b5563; font-size: 16px; margin: 0 0 8px 0; line-height: 1.6;">
                Saludos,<br>
                <strong>Esteban Montenegro</strong><br>
                Fundador de Crealoconia.com
              </p>
              <p style="color: #4b5563; font-size: 16px; margin: 16px 0 0 0; line-height: 1.6;">
                <a href="https://wa.me/56962791772" style="background: #059669; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
                  📱 WhatsApp: +56 9 6279 1772
                </a>
              </p>
            </div>

          </div>

            <!-- Footer -->
            <div style="background: #F1F5F9; padding: 30px; text-align: center; border-radius: 0 0 12px 12px;">
              <p style="margin: 0 0 10px 0; color: #64748B; font-size: 16px; font-weight: 600;">
                Saludos,<br>
                <strong style="color: #1E293B;">Esteban Montenegro</strong>
              </p>
              <p style="margin: 0; color: #64748B; font-size: 14px;">
                Fundador de CrealoconIA | Experto en IA para emprendedores
              </p>
              <p style="margin: 10px 0 0 0; color: #94A3B8; font-size: 12px;">
                Kit generado: ${new Date().toLocaleDateString('es-ES', { 
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
        `
      };
    } else if (type === 'admin_temp_key') {
      const { tempKey } = data;
      
      emailPayload = {
        sender: { email: "esteban@crealoconia.com", name: "Kit IA Admin" },
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
      if (submissionId && (type === 'custom' || type === 'follow-up' || type === 'proposal' || type === 'confirmation')) {
        try {
          const tagToAdd = type === 'custom' ? 'email-personalizado' : 
                          type === 'follow-up' ? 'email-seguimiento' : 
                          type === 'proposal' ? 'email-propuesta' :
                          type === 'confirmation' ? 'email-enviado' : 'email-enviado';
          
          // Obtener el registro actual para conservar tags existentes y verificar si es actualización
          const { data: currentSubmission, error: fetchError } = await supabase
            .from('form_submissions')
            .select('tags, created_at, updated_at')
            .eq('id', submissionId)
            .single();

          if (!fetchError && currentSubmission) {
            const currentTags = currentSubmission.tags || [];
            const newTags = [...currentTags];
            
            // Verificar si es una actualización (si updated_at > created_at)
            const isUpdate = new Date(currentSubmission.updated_at) > new Date(currentSubmission.created_at);
            
            // Agregar tag de "Actualizado" si es una actualización
            if (isUpdate && !newTags.includes('Actualizado')) {
              newTags.push('Actualizado');
            }
            
            // Solo agregar el tag principal si no existe ya
            if (!newTags.includes(tagToAdd)) {
              newTags.push(tagToAdd);
            }
            
            // Actualizar tags y fecha si hubo cambios
            if (newTags.length !== currentTags.length || isUpdate) {
              const updateData: any = { tags: newTags };
              
              // Si es una actualización de confirmación, actualizar la fecha para que aparezca primero
              if (type === 'confirmation' && isUpdate) {
                updateData.created_at = new Date().toISOString();
              }
              
              const { error: updateError } = await supabase
                .from('form_submissions')
                .update(updateData)
                .eq('id', submissionId);

              if (updateError) {
                console.error('❌ Error actualizando registro:', updateError);
              } else {
                console.log(`✅ Registro actualizado - Tags: ${newTags.join(', ')} - ID: ${submissionId}`);
                if (isUpdate) {
                  console.log(`🔄 Tag 'Actualizado' agregado al registro existente`);
                }
              }
            } else {
              console.log(`📝 Tags ya existen en el registro ${submissionId}`);
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