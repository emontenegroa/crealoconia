import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';
import { verify } from 'https://deno.land/x/djwt@v3.0.2/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const ADMIN_JWT_SECRET = Deno.env.get('ADMIN_JWT_SECRET');
const AUTHORIZED_EMAIL = 'esteban@crealoconia.com';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Generate crypto key for JWT verification
async function getJWTKey() {
  if (!ADMIN_JWT_SECRET) {
    throw new Error('ADMIN_JWT_SECRET not configured');
  }
  return await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(ADMIN_JWT_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );
}

// Verify JWT token from Authorization header
async function verifyAdminToken(req: Request): Promise<{ valid: boolean; email?: string }> {
  const authHeader = req.headers.get('Authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    return { valid: false };
  }

  const token = authHeader.substring(7);
  
  try {
    const key = await getJWTKey();
    const payload = await verify(token, key);
    
    if (payload.role !== 'admin' || payload.email !== AUTHORIZED_EMAIL) {
      return { valid: false };
    }
    
    return { valid: true, email: payload.email as string };
  } catch (error) {
    console.error('Token verification failed');
    return { valid: false };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify JWT token for all requests
    const { valid } = await verifyAdminToken(req);
    
    if (!valid) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name');

      if (error) {
        console.error('Database error');
        return new Response(
          JSON.stringify({ error: 'Database error' }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      }

      return new Response(
        JSON.stringify(data),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    if (req.method === 'POST') {
      const { name, color } = await req.json();

      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return new Response(
          JSON.stringify({ error: 'Tag name is required' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      }

      // Check if tag already exists
      const { data: existingTag } = await supabase
        .from('tags')
        .select('id')
        .ilike('name', name.trim())
        .single();

      if (existingTag) {
        return new Response(
          JSON.stringify({ error: 'Tag already exists' }),
          {
            status: 409,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      }

      const { data, error } = await supabase
        .from('tags')
        .insert({ name: name.trim(), color: color || '#3b82f6' })
        .select()
        .single();

      if (error) {
        console.error('Database error');
        return new Response(
          JSON.stringify({ error: 'Database error' }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      }

      return new Response(
        JSON.stringify(data),
        {
          status: 201,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Admin tags error');
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});
