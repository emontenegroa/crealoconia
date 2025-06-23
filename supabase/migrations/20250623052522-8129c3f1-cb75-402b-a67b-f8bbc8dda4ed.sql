
-- First, let's check and fix any invalid email data
-- Update any invalid emails to a placeholder (this maintains data integrity)
UPDATE public.form_submissions 
SET email = 'invalid-email-' || id::text || '@placeholder.com'
WHERE email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';

-- Now apply the constraints safely
ALTER TABLE public.form_submissions 
ADD CONSTRAINT check_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE public.form_submissions 
ADD CONSTRAINT check_attempt_number_positive 
CHECK (attempt_number > 0 AND attempt_number <= 50);

ALTER TABLE public.form_submissions 
ADD CONSTRAINT check_email_length 
CHECK (length(email) <= 254);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_email_completed 
ON public.form_submissions(email, completed);

CREATE INDEX IF NOT EXISTS idx_ai_usage_tracking_session_field 
ON public.ai_usage_tracking(session_id, field_name);
