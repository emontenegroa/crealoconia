-- Add admin-only SELECT policy for conversion_events table
-- This prevents public access to sensitive conversion tracking data

CREATE POLICY "Only admins can view conversion events"
ON public.conversion_events
FOR SELECT
USING (is_admin_authenticated());

-- Also add UPDATE and DELETE policies for completeness
CREATE POLICY "Only admins can update conversion events"
ON public.conversion_events
FOR UPDATE
USING (is_admin_authenticated());

CREATE POLICY "Only admins can delete conversion events"
ON public.conversion_events
FOR DELETE
USING (is_admin_authenticated());