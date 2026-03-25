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

    // Parse request body for all methods that need it
    let requestBody: { email?: string; name?: string; color?: string } = {}
    if (method === 'POST') {
      requestBody = await req.json()
    } else if (method === 'GET') {
      // For GET requests, check query params or headers for email
      const url = new URL(req.url)
      requestBody.email = url.searchParams.get('email') || undefined
    }

    // Validate admin email - only authorized admin can access tags
    const authorizedEmail = 'esteban@crealoconia.com'
    if (!requestBody.email || requestBody.email.toLowerCase() !== authorizedEmail.toLowerCase()) {
      console.log('❌ Unauthorized access attempt:', requestBody.email)
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Admin access required' }),
        { 
          status: 403,
          headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('✅ Admin authenticated:', requestBody.email)

    switch (method) {
      case 'GET':
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

      case 'POST':
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