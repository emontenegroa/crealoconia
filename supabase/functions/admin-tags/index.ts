import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: getCorsHeaders(req) })
  }

  try {
    // Create supabase client with service role
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const { method } = req

    // Parse request body/params
    let sessionToken: string | undefined
    let requestBody: { email?: string; name?: string; color?: string; sessionToken?: string; action?: string } = {}
    
    if (method === 'POST') {
      requestBody = await req.json()
      sessionToken = requestBody.sessionToken
    } else if (method === 'GET') {
      const url = new URL(req.url)
      sessionToken = url.searchParams.get('sessionToken') || undefined
      requestBody.email = url.searchParams.get('email') || undefined
    }

    // Validate session token server-side
    if (!sessionToken) {
      console.log('❌ Missing session token')
      return new Response(
        JSON.stringify({ error: 'Sesión no válida' }),
        { 
          status: 401,
          headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
        }
      )
    }

    // Verify token against database
    const { data: tokenRecord, error: tokenError } = await supabaseAdmin
      .from('admin_temp_keys')
      .select('email, expires_at, used')
      .eq('temp_key', sessionToken)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (tokenError || !tokenRecord) {
      console.log('❌ Invalid or expired session token')
      return new Response(
        JSON.stringify({ error: 'Sesión expirada o no válida' }),
        { 
          status: 401,
          headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
        }
      )
    }

    // Verify the token belongs to the authorized admin email
    const authorizedEmail = 'esteban@crealoconia.com'
    if (tokenRecord.email?.toLowerCase() !== authorizedEmail.toLowerCase()) {
      console.log('❌ Token email mismatch')
      return new Response(
        JSON.stringify({ error: 'No autorizado' }),
        { 
          status: 403,
          headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('✅ Admin authenticated via session token')

    // Route by action field since supabase.functions.invoke always uses POST
    const action = requestBody.action || (method === 'GET' ? 'get' : 'create')
    
    switch (action) {
      case 'get':
        // Get all tags
        const { data: tags, error: fetchError } = await supabaseAdmin
          .from('tags')
          .select('*')
          .order('name')

        if (fetchError) throw fetchError

        return new Response(
          JSON.stringify(tags),
          { headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' } }
        )

      case 'create':
        // Create a new tag
        const { name, color } = requestBody

        if (!name || !name.trim()) {
          return new Response(
            JSON.stringify({ error: 'Tag name is required' }),
            { 
              status: 400,
              headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
            }
          )
        }

        // Check if tag already exists
        const { data: existingTag } = await supabaseAdmin
          .from('tags')
          .select('*')
          .ilike('name', name.trim())
          .maybeSingle()

        if (existingTag) {
          return new Response(
            JSON.stringify(existingTag),
            { headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' } }
          )
        }

        // Create new tag
        const { data: newTag, error: createError } = await supabaseAdmin
          .from('tags')
          .insert({
            name: name.trim(),
            color: color || '#3b82f6'
          })
          .select()
          .single()

        if (createError) throw createError

        return new Response(
          JSON.stringify(newTag),
          { headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' } }
        )

      default:
        return new Response(
          JSON.stringify({ error: 'Method not allowed' }),
          { 
            status: 405,
            headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
          }
        )
    }

  } catch (error) {
    console.error('Error in admin-tags function:', error)
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor', code: 'INTERNAL_ERROR' }),
      { 
        status: 500,
        headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
      }
    )
  }
})