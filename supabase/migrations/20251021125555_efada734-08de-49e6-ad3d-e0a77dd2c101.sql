-- Remove the overly permissive policy that allows anyone to read AI usage data
DROP POLICY IF EXISTS "Allow AI usage tracking by session" ON public.ai_usage_tracking;

-- Allow anonymous INSERT for tracking AI usage (write-only)
CREATE POLICY "Allow anonymous AI usage tracking insert"
ON public.ai_usage_tracking
FOR INSERT
WITH CHECK (
  (session_id IS NOT NULL) AND (session_id <> '')
);

-- Only admins can read AI usage data
CREATE POLICY "Only admins can view AI usage data"
ON public.ai_usage_tracking
FOR SELECT
USING (is_admin_authenticated());

-- Only admins can update AI usage data
CREATE POLICY "Only admins can update AI usage data"
ON public.ai_usage_tracking
FOR UPDATE
USING (is_admin_authenticated());

-- Only admins can delete AI usage data
CREATE POLICY "Only admins can delete AI usage data"
ON public.ai_usage_tracking
FOR DELETE
USING (is_admin_authenticated());