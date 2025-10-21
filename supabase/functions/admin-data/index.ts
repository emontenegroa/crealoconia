import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
    // Create supabase client from request (validates JWT automatically)
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get authenticated user
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      console.log('❌ Unauthorized - Invalid or missing JWT token');
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Invalid or missing JWT token' }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if user has admin role using database function
    const { data: isAdmin, error: roleError } = await supabaseClient
      .rpc('has_role', { _user_id: user.id, _role: 'admin' });
    
    if (roleError || !isAdmin) {
      console.log('❌ Forbidden - Non-admin access attempt:', user.email);
      return new Response(
        JSON.stringify({ error: 'Forbidden - Admin role required' }),
        { 
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('✅ Admin authenticated:', user.email);

    // Create admin client for operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    console.log('📥 Reading request body...');
    const body = await req.json();
    console.log('📋 Request body:', JSON.stringify(body));
    
    const { action, data } = body;
    console.log('Action:', action);

    if (action === 'get_submissions') {
      console.log('📊 Obteniendo submissions...');
      
      const { data: submissions, error } = await supabaseAdmin
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
      
      const { error } = await supabaseAdmin
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
      
      const { error } = await supabaseAdmin
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
      
      const { error } = await supabaseAdmin
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
