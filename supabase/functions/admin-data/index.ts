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

// Initialize Supabase client with service role
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  console.log('🚀 admin-data function started');
  
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
    
    const { email, action, data } = body;
    console.log('📧 Email:', email, 'Action:', action);

    // Validate admin email
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

    if (action === 'get_submissions') {
      console.log('📊 Obteniendo submissions...');
      
      const { data: submissions, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error getting submissions:', error);
        return new Response(
          JSON.stringify({ error: 'Error obteniendo datos' }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      console.log(`✅ Enviados ${submissions?.length || 0} registros`);
      return new Response(
        JSON.stringify({ submissions }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );

    } else if (action === 'update_submission') {
      console.log('✏️ Actualizando submission...');
      
      const { id, updates } = data;
      
      const { error } = await supabase
        .from('form_submissions')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error('❌ Error updating submission:', error);
        return new Response(
          JSON.stringify({ error: 'Error actualizando registro' }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      console.log('✅ Submission actualizado exitosamente');
      return new Response(
        JSON.stringify({ message: 'Actualizado exitosamente' }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );

    } else if (action === 'delete_submission') {
      console.log('🗑️ Eliminando submission...');
      
      const { id } = data;
      
      const { error } = await supabase
        .from('form_submissions')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('❌ Error deleting submission:', error);
        return new Response(
          JSON.stringify({ error: 'Error eliminando registro' }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      console.log('✅ Submission eliminado exitosamente');
      return new Response(
        JSON.stringify({ message: 'Eliminado exitosamente' }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );

    } else if (action === 'delete_multiple_submissions') {
      console.log('🗑️ Eliminando múltiples submissions...');
      
      const { ids } = data;
      
      const { error } = await supabase
        .from('form_submissions')
        .delete()
        .in('id', ids);

      if (error) {
        console.error('❌ Error deleting multiple submissions:', error);
        return new Response(
          JSON.stringify({ error: 'Error eliminando registros' }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      console.log(`✅ ${ids.length} submissions eliminados exitosamente`);
      return new Response(
        JSON.stringify({ message: `${ids.length} registros eliminados exitosamente` }),
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