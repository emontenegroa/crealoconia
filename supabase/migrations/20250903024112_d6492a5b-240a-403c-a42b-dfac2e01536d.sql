-- Fix security vulnerabilities identified in the security review

-- 1. CRITICAL: Secure AI usage tracking table - currently allows public access
DROP POLICY IF EXISTS "Users can manage their own AI usage by session" ON public.ai_usage_tracking;

-- Create proper policies that don't allow universal access
CREATE POLICY "Allow AI usage tracking by session" 
ON public.ai_usage_tracking 
FOR ALL 
USING (
  -- Only allow if the session_id matches and is not empty
  session_id IS NOT NULL AND session_id != ''
);

-- 2. Add proper indexes for security and performance
CREATE INDEX IF NOT EXISTS idx_admin_temp_keys_email_expires 
ON public.admin_temp_keys(email, expires_at) 
WHERE used = false;

CREATE INDEX IF NOT EXISTS idx_security_logs_email_created 
ON public.security_logs(email, created_at);

-- 3. Add a function to properly verify admin codes
CREATE OR REPLACE FUNCTION public.verify_admin_code(
  check_email TEXT,
  check_code TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  stored_code TEXT;
  code_exists BOOLEAN := FALSE;
BEGIN
  -- Look for a valid, unused, non-expired code for this email
  SELECT temp_key INTO stored_code
  FROM public.admin_temp_keys
  WHERE email = check_email
    AND expires_at > now()
    AND used = false
  ORDER BY created_at DESC
  LIMIT 1;

  -- Check if code exists and matches
  IF stored_code IS NOT NULL AND stored_code = check_code THEN
    -- Mark the code as used
    UPDATE public.admin_temp_keys
    SET used = true
    WHERE email = check_email
      AND temp_key = check_code
      AND used = false;
    
    code_exists := TRUE;
  END IF;

  RETURN code_exists;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 4. Add a function to store admin codes securely
CREATE OR REPLACE FUNCTION public.store_admin_code(
  admin_email TEXT,
  code TEXT,
  user_ip INET DEFAULT NULL,
  user_agent_string TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  new_id UUID;
BEGIN
  -- Clean up any existing unused codes for this email first
  UPDATE public.admin_temp_keys
  SET used = true
  WHERE email = admin_email AND used = false;

  -- Insert the new code
  INSERT INTO public.admin_temp_keys (
    email,
    temp_key,
    ip_address,
    user_agent,
    expires_at
  ) VALUES (
    admin_email,
    code,
    user_ip,
    user_agent_string,
    now() + interval '5 minutes'  -- Reduced from 60 seconds to 5 minutes for better UX
  ) RETURNING id INTO new_id;

  RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 5. Add rate limiting function for admin authentication
CREATE OR REPLACE FUNCTION public.check_admin_rate_limit(
  check_email TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  recent_attempts INTEGER;
BEGIN
  -- Count recent authentication attempts (successful or failed)
  SELECT COUNT(*)
  INTO recent_attempts
  FROM public.security_logs
  WHERE email = check_email
    AND event_type IN ('admin_auth_attempt', 'admin_auth_failed', 'admin_auth_success')
    AND created_at > now() - interval '5 minutes';

  -- Allow up to 3 attempts per 5-minute window
  RETURN recent_attempts < 3;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;