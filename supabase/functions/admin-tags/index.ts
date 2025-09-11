import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
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
    const url = new URL(req.url)

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
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'POST':
        // Create a new tag
        const { name, color } = await req.json()

        if (!name || !name.trim()) {
          return new Response(
            JSON.stringify({ error: 'Tag name is required' }),
            { 
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
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
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      default:
        return new Response(
          JSON.stringify({ error: 'Method not allowed' }),
          { 
            status: 405,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
    }

  } catch (error) {
    console.error('Error in admin-tags function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})