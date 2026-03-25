
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: getCorsHeaders(req) });
  }

  try {
    console.log('🔍 Revisando formularios abandonados...');

    const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');
    
    if (!BREVO_API_KEY) {
      console.error('❌ BREVO_API_KEY no está configurada');
      throw new Error('BREVO_API_KEY no está configurada en las variables de entorno');
    }

    // Crear cliente de Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Buscar formularios abandonados de las últimas 24 horas
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const { data: abandonedForms, error } = await supabase
      .from('form_submissions')
      .select('*')
      .eq('completed', false)
      .gte('updated_at', twentyFourHoursAgo.toISOString())
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('❌ Error obteniendo formularios abandonados:', error);
      throw error;
    }

    console.log(`📊 Encontrados ${abandonedForms?.length || 0} formularios abandonados`);

    // Si no hay formularios abandonados, no enviar email
    if (!abandonedForms || abandonedForms.length === 0) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'No hay formularios abandonados' 
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...getCorsHeaders(req) },
      });
    }

    // Agrupar por horas de abandono
    const recentlyAbandoned = abandonedForms.filter(form => {
      const updatedAt = new Date(form.updated_at);
      const hoursAgo = (Date.now() - updatedAt.getTime()) / (1000 * 60 * 60);
      return hoursAgo <= 2; // Últimas 2 horas
    });

    const olderAbandoned = abandonedForms.filter(form => {
      const updatedAt = new Date(form.updated_at);
      const hoursAgo = (Date.now() - updatedAt.getTime()) / (1000 * 60 * 60);
      return hoursAgo > 2;
    });

    // Preparar el contenido del email
    const generateFormRow = (form: any) => {
      const formData = form.form_data;
      const timeSinceUpdate = Math.round((Date.now() - new Date(form.updated_at).getTime()) / (1000 * 60));
      
      return `
        <tr style="border-bottom: 1px solid #E5E7EB;">
          <td style="padding: 12px; text-align: left;">${formData.marca || 'Sin marca'}</td>
          <td style="padding: 12px; text-align: left;">${formData.email || 'Sin email'}</td>
          <td style="padding: 12px; text-align: left;">${formData.whatsapp || 'Sin WhatsApp'}</td>
          <td style="padding: 12px; text-align: left;">${timeSinceUpdate} min</td>
          <td style="padding: 12px; text-align: left;">Intento #${form.attempt_number}</td>
        </tr>
      `;
    };

    const emailData = {
      sender: {
        name: "Sistema Crealoconia",
        email: "esteban.montenegro@gmail.com"
      },
      to: [
        {
          email: "esteban.montenegro@gmail.com",
          name: "Esteban Montenegro"
        }
      ],
      subject: `📋 Reporte: ${abandonedForms.length} formularios abandonados`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
          <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <h1 style="color: #7C3AED; text-align: center; margin-bottom: 30px; font-size: 28px;">📋 Formularios Abandonados</h1>
            
            <div style="background: #FEF3C7; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #F59E0B;">
              <h3 style="color: #D97706; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📊 Resumen:</h3>
              <p style="color: #D97706; margin-bottom: 8px;"><strong>Total de formularios abandonados:</strong> ${abandonedForms.length}</p>
              <p style="color: #D97706; margin-bottom: 8px;"><strong>Abandonados recientemente (últimas 2h):</strong> ${recentlyAbandoned.length}</p>
              <p style="color: #D97706; margin-bottom: 0;"><strong>Abandonados anteriormente:</strong> ${olderAbandoned.length}</p>
            </div>

            ${recentlyAbandoned.length > 0 ? `
            <div style="background: #FEF2F2; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #EF4444;">
              <h3 style="color: #DC2626; margin-top: 0; margin-bottom: 15px; font-size: 18px;">🚨 Abandonados Recientemente (últimas 2 horas)</h3>
              <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 6px; overflow: hidden;">
                <thead>
                  <tr style="background: #F3F4F6;">
                    <th style="padding: 12px; text-align: left; font-weight: bold; color: #374151;">Marca</th>
                    <th style="padding: 12px; text-align: left; font-weight: bold; color: #374151;">Email</th>
                    <th style="padding: 12px; text-align: left; font-weight: bold; color: #374151;">WhatsApp</th>
                    <th style="padding: 12px; text-align: left; font-weight: bold; color: #374151;">Hace</th>
                    <th style="padding: 12px; text-align: left; font-weight: bold; color: #374151;">Intento</th>
                  </tr>
                </thead>
                <tbody>
                  ${recentlyAbandoned.map(generateFormRow).join('')}
                </tbody>
              </table>
            </div>
            ` : ''}

            ${olderAbandoned.length > 0 ? `
            <div style="background: #F0F9FF; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #3B82F6;">
              <h3 style="color: #1E40AF; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📋 Otros Formularios Abandonados</h3>
              <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 6px; overflow: hidden;">
                <thead>
                  <tr style="background: #F3F4F6;">
                    <th style="padding: 12px; text-align: left; font-weight: bold; color: #374151;">Marca</th>
                    <th style="padding: 12px; text-align: left; font-weight: bold; color: #374151;">Email</th>
                    <th style="padding: 12px; text-align: left; font-weight: bold; color: #374151;">WhatsApp</th>
                    <th style="padding: 12px; text-align: left; font-weight: bold; color: #374151;">Hace</th>
                    <th style="padding: 12px; text-align: left; font-weight: bold; color: #374151;">Intento</th>
                  </tr>
                </thead>
                <tbody>
                  ${olderAbandoned.map(generateFormRow).join('')}
                </tbody>
              </table>
            </div>
            ` : ''}

            <div style="background: #ECFDF5; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #10B981;">
              <h3 style="color: #059669; margin-top: 0; margin-bottom: 15px; font-size: 18px;">💡 Acciones Sugeridas:</h3>
              <ul style="color: #059669; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Enviar email de seguimiento a los usuarios recientes</li>
                <li style="margin-bottom: 8px;">Contactar vía WhatsApp si está disponible</li>
                <li style="margin-bottom: 8px;">Analizar en qué campos se abandonan más</li>
                <li style="margin-bottom: 0;">Revisar si hay problemas técnicos en el formulario</li>
              </ul>
            </div>

            <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px;">
              <p style="margin: 0; color: #6B7280; font-size: 14px;">
                Reporte generado automáticamente el ${new Date().toLocaleDateString('es-ES', { 
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

    // Enviar el email usando Brevo
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('✅ Reporte de formularios abandonados enviado:', responseData);
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: `Reporte enviado con ${abandonedForms.length} formularios abandonados`,
        data: responseData 
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...getCorsHeaders(req) },
      });
    } else {
      const errorData = await response.text();
      console.error('❌ Error al enviar reporte:', errorData);
      throw new Error(`Error ${response.status}: ${errorData}`);
    }

  } catch (error: any) {
    console.error('💥 Error en check-abandoned-forms function:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor', code: 'INTERNAL_ERROR' }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...getCorsHeaders(req) },
      }
    );
  }
};

serve(handler);
