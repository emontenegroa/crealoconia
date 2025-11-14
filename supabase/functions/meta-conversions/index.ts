import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const FACEBOOK_PIXEL_ID = '1681063145914408';

// Get secrets from environment
const FACEBOOK_ACCESS_TOKEN = Deno.env.get('FACEBOOK_ACCESS_TOKEN');
const TEST_EVENT_CODE = Deno.env.get('FACEBOOK_TEST_EVENT_CODE');

if (!FACEBOOK_ACCESS_TOKEN) {
  console.error('FACEBOOK_ACCESS_TOKEN not configured in secrets');
}

console.log('Meta Conversions Function loaded with Pixel ID:', FACEBOOK_PIXEL_ID);

// Hash function for SHA256
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Normalize data for hashing
function normalizeData(data: string): string {
  return data.toLowerCase().trim();
}

interface FacebookEvent {
  event_name: string;
  event_time: number;
  action_source: string;
  event_source_url: string;
  event_id: string;
  user_data: {
    em?: string;
    ph?: string;
    client_ip_address?: string;
    client_user_agent?: string;
  };
  custom_data?: Record<string, any>;
}

interface ConversionRequest {
  eventType: 'PageView' | 'Lead' | 'CompleteRegistration' | 'Purchase';
  eventId: string;
  eventSourceUrl: string;
  userAgent: string;
  clientIpAddress?: string;
  email?: string;
  phone?: string;
  customData?: Record<string, any>;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: ConversionRequest = await req.json();
    
    // Get client IP from Cloudflare headers or X-Forwarded-For
    const clientIp = req.headers.get('cf-connecting-ip') || 
                      req.headers.get('x-forwarded-for')?.split(',')[0] || 
                      req.headers.get('x-real-ip');
    
    console.log('Processing Facebook Conversion Event:', {
      eventType: requestData.eventType,
      eventId: requestData.eventId,
      hasEmail: !!requestData.email,
      clientIp: clientIp || 'not available'
    });

    // Prepare user data with hashing
    const userData: any = {
      client_ip_address: clientIp || requestData.clientIpAddress,
      client_user_agent: requestData.userAgent
    };

    // Hash email if provided
    if (requestData.email) {
      userData.em = await sha256(normalizeData(requestData.email));
    }

    // Hash phone if provided
    if (requestData.phone) {
      userData.ph = await sha256(normalizeData(requestData.phone));
    }

    // Create Facebook event
    const facebookEvent: FacebookEvent = {
      event_name: requestData.eventType,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: requestData.eventSourceUrl,
      event_id: requestData.eventId,
      user_data: userData
    };

    // Add custom data if provided
    if (requestData.customData) {
      facebookEvent.custom_data = requestData.customData;
    }

    // Prepare the payload for Facebook Conversions API
    const payload = {
      data: [facebookEvent],
      ...(TEST_EVENT_CODE && { test_event_code: TEST_EVENT_CODE }), // Only add if set
      access_token: FACEBOOK_ACCESS_TOKEN
    };

    console.log('Sending to Facebook Conversions API:', {
      url: `https://graph.facebook.com/v18.0/${FACEBOOK_PIXEL_ID}/events`,
      eventName: facebookEvent.event_name,
      eventId: facebookEvent.event_id,
      hasEmail: !!requestData.email,
      isTestMode: !!TEST_EVENT_CODE
    });

    // Send to Facebook Conversions API
    const facebookResponse = await fetch(
      `https://graph.facebook.com/v18.0/${FACEBOOK_PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }
    );

    const facebookResult = await facebookResponse.json();
    
    if (!facebookResponse.ok) {
      console.error('Facebook API Error:', facebookResult);
      throw new Error(`Facebook API Error: ${JSON.stringify(facebookResult)}`);
    }

    console.log('Facebook Conversion Event sent successfully:', facebookResult);

    // Store event in our database for tracking
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase
      .from('conversion_events')
      .insert({
        event_type: requestData.eventType,
        event_id: requestData.eventId,
        event_source_url: requestData.eventSourceUrl,
        user_email: requestData.email,
        facebook_response: facebookResult,
        created_at: new Date().toISOString()
      });

    return new Response(
      JSON.stringify({
        success: true,
        facebook_response: facebookResult,
        event_id: requestData.eventId
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error in meta-conversions function:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
};

serve(handler);