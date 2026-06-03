-- Fix INSECURE_ROLE_CHECK: replace current_setting('role') with auth.role()
DROP POLICY IF EXISTS "Service role can manage temp keys" ON public.admin_temp_keys;
CREATE POLICY "Service role can manage temp keys"
ON public.admin_temp_keys
AS PERMISSIVE
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Only service role can manage security logs" ON public.security_logs;
CREATE POLICY "Only service role can manage security logs"
ON public.security_logs
AS PERMISSIVE
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Fix OVERLY_PERMISSIVE_INSERT + RLS_POLICY_ALWAYS_TRUE on conversion_events
DROP POLICY IF EXISTS "Service role can insert conversion events" ON public.conversion_events;
CREATE POLICY "Service role can insert conversion events"
ON public.conversion_events
AS PERMISSIVE
FOR INSERT
TO service_role
WITH CHECK (true);

-- Fix PRIVILEGE_ESCALATION: restrict user_roles management to service role only
DROP POLICY IF EXISTS "Only admins can manage roles" ON public.user_roles;
CREATE POLICY "Only service role can manage roles"
ON public.user_roles
AS PERMISSIVE
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Fix JWT_EMAIL_CLAIM_POLICY: drop policies that rely on mutable JWT email claim.
-- Anonymous submission policy and admin policies remain; user reads go through
-- SECURITY DEFINER function get_user_submission which validates the email parameter.
DROP POLICY IF EXISTS "Users can view their own submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Users can insert their own submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Users can update their own submissions" ON public.form_submissions;

-- Fix SUPA security-definer-function-executable: revoke EXECUTE from anon/authenticated
-- on admin/server-only helper functions. Keep RLS helpers (has_role, is_admin_authenticated)
-- and anonymous-callable functions (upsert_form_submission, get_user_submission) executable.
REVOKE EXECUTE ON FUNCTION public.assign_admin_role_by_email(text) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.log_admin_access(text) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.store_admin_code(text, text, inet, text) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.verify_admin_code(text, text) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.check_admin_rate_limit(text) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.cleanup_expired_temp_keys() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.log_security_event(text, uuid, text, inet, text, jsonb) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.detect_suspicious_activity(text, integer) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.get_or_create_tag(text, text) FROM anon, authenticated, public;