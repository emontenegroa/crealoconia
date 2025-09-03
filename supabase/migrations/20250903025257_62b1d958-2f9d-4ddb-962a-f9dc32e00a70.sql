-- Create a temporary admin session system that works with JWT authentication
-- This will allow proper RLS policy evaluation

-- First, create a function to create temporary admin JWT sessions
CREATE OR REPLACE FUNCTION public.create_admin_session(
  admin_email TEXT,
  temp_code TEXT
) RETURNS TEXT AS $$
DECLARE
  is_code_valid BOOLEAN;
  session_token TEXT;
BEGIN
  -- Verify the admin code first
  SELECT public.verify_admin_code(admin_email, temp_code) INTO is_code_valid;
  
  IF NOT is_code_valid THEN
    RAISE EXCEPTION 'Invalid admin code';
  END IF;
  
  -- Generate a simple session token for admin (this would be a JWT in production)
  session_token := 'admin_session_' || admin_email || '_' || extract(epoch from now())::text;
  
  -- Store the admin session temporarily
  INSERT INTO public.admin_temp_keys (
    email,
    temp_key,
    expires_at,
    used
  ) VALUES (
    admin_email,
    session_token,
    now() + interval '24 hours',
    false
  );
  
  RETURN session_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update the is_admin_authenticated function to also check for valid admin sessions
CREATE OR REPLACE FUNCTION public.is_admin_authenticated()
RETURNS boolean AS $$
DECLARE
    admin_email TEXT := 'esteban@crealoconia.com';
    current_session TEXT;
    current_role TEXT;
    session_header TEXT;
BEGIN
    -- Check if this is being called from a service role context
    current_role := current_setting('role', true);
    IF current_role = 'service_role' THEN
        RETURN true;
    END IF;
    
    -- Try to get email from JWT claims
    BEGIN
        current_session := current_setting('request.jwt.claims', true)::json ->> 'email';
    EXCEPTION WHEN OTHERS THEN
        current_session := NULL;
    END;
    
    -- If we have a valid JWT session with admin email, allow access
    IF current_session = admin_email THEN
        RETURN true;
    END IF;
    
    -- As a fallback, check for custom admin session header
    BEGIN
        session_header := current_setting('request.headers', true)::json ->> 'x-admin-session';
        
        -- Check if this admin session token is valid and not expired
        IF session_header IS NOT NULL THEN
            PERFORM 1 FROM public.admin_temp_keys
            WHERE temp_key = session_header
              AND email = admin_email
              AND expires_at > now()
              AND used = false;
            
            IF FOUND THEN
                RETURN true;
            END IF;
        END IF;
    EXCEPTION WHEN OTHERS THEN
        -- Ignore header parsing errors
        NULL;
    END;
    
    RETURN false;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;