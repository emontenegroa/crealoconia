import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';
import { create, getNumericDate } from 'https://deno.land/x/djwt@v3.0.2/mod.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const ADMIN_JWT_SECRET = Deno.env.get('ADMIN_JWT_SECRET');
const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');
const AUTHORIZED_EMAIL = 'esteban@crealoconia.com';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Generate crypto key for JWT signing
async function getJWTKey() {
  if (!ADMIN_JWT_SECRET) {
    throw new Error('ADMIN_JWT_SECRET not configured');
  }
  return await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(ADMIN_JWT_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }

  try {
    const { email, action, tempKey } = await req.json();

    if (!email || email !== AUTHORIZED_EMAIL) {
      console.log(`Unauthorized access attempt from: ${email}`);
      return new Response(
        JSON.stringify({ error: 'Unauthorized email' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    if (action === 'generate') {
      // Check rate limiting
      const { data: rateLimitOk, error: rateLimitError } = await supabase.rpc(
        'check_admin_rate_limit',
        { check_email: email }
      );

      if (rateLimitError) {
        console.error('Rate limit check error:', rateLimitError);
        return new Response(
          JSON.stringify({ error: 'Internal server error' }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      }

      if (!rateLimitOk) {
        await supabase.rpc('log_security_event', {
          event_type: 'admin_rate_limit',
          email: email,
          event_data: { action: 'generate_code', reason: 'too_many_attempts' }
        });

        return new Response(
          JSON.stringify({ error: 'Too many attempts. Please wait 5 minutes.' }),
          {
            status: 429,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      }

      // Log the authentication attempt
      await supabase.rpc('log_security_event', {
        event_type: 'admin_auth_attempt',
        email: email,
        event_data: { action: 'generate_code' }
      });

      // Generate 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();

      // Send email if Brevo is configured
      if (BREVO_API_KEY) {
        try {
          const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'api-key': BREVO_API_KEY,
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              sender: { email: 'noreply@crealoconia.com', name: 'Kit IA Admin' },
              to: [{ email: email }],
              subject: 'Código de acceso admin',
              htmlContent: `<p>Tu código de acceso es: <strong>${code}</strong></p><p>Este código expira en 5 minutos.</p>`
            })
          });

          if (!emailResponse.ok) {
            console.error('Email send error');
          }
        } catch (emailError) {
          console.error('Failed to send email');
        }
      }

      // Store the code
      const { error: storeError } = await supabase.rpc('store_admin_code', {
        admin_email: email,
        code: code
      });

      if (storeError) {
        console.error('Failed to store code');
        return new Response(
          JSON.stringify({ error: 'Internal server error' }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Verification code sent' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    if (action === 'verify') {
      if (!tempKey || tempKey.length !== 6) {
        return new Response(
          JSON.stringify({ error: 'Invalid code format' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      }

      // Check rate limiting for verification
      const { data: rateLimitOk, error: rateLimitError } = await supabase.rpc(
        'check_admin_rate_limit',
        { check_email: email }
      );

      if (rateLimitError) {
        console.error('Rate limit check error');
        return new Response(
          JSON.stringify({ error: 'Internal server error' }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      }

      if (!rateLimitOk) {
        await supabase.rpc('log_security_event', {
          event_type: 'admin_rate_limit',
          email: email,
          event_data: { action: 'verify_code', reason: 'too_many_attempts' }
        });

        return new Response(
          JSON.stringify({ error: 'Too many attempts. Please wait 5 minutes.' }),
          {
            status: 429,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      }

      // Verify the code
      const { data: isValid, error: verifyError } = await supabase.rpc(
        'verify_admin_code',
        { check_email: email, check_code: tempKey }
      );

      if (verifyError) {
        console.error('Verification error');
        return new Response(
          JSON.stringify({ error: 'Internal server error' }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      }

      if (!isValid) {
        await supabase.rpc('log_security_event', {
          event_type: 'admin_auth_failed',
          email: email,
          event_data: { action: 'verify_code', reason: 'invalid_code' }
        });

        return new Response(
          JSON.stringify({ error: 'Invalid or expired code' }),
          {
            status: 401,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      }

      // Generate JWT token
      const key = await getJWTKey();
      const token = await create(
        { alg: 'HS256', typ: 'JWT' },
        {
          email: email,
          role: 'admin',
          exp: getNumericDate(60 * 60 * 24), // 24 hours
        },
        key
      );

      // Log successful authentication
      await supabase.rpc('log_security_event', {
        event_type: 'admin_auth_success',
        email: email,
        event_data: { action: 'verify_code' }
      });

      await supabase.rpc('log_admin_access', { admin_email: email });

      return new Response(
        JSON.stringify({
          success: true,
          token: token,
          expiresIn: 86400 // 24 hours in seconds
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Admin auth error');
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});
