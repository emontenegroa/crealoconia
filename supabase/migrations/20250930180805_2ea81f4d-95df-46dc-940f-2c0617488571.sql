-- Replace upsert function to avoid dependency on unique(email) and ensure only last incomplete is updated
CREATE OR REPLACE FUNCTION public.upsert_form_submission(
  p_email text,
  p_form_data jsonb,
  p_attempt_number integer DEFAULT 1,
  p_completed boolean DEFAULT false
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  existing_id UUID;
BEGIN
  IF p_email IS NULL OR p_email = '' THEN
    RAISE EXCEPTION 'Email required';
  END IF;

  -- If saving progress (incomplete), try to update the latest incomplete record for this email
  IF NOT p_completed THEN
    SELECT id
    INTO existing_id
    FROM public.form_submissions
    WHERE email = p_email AND completed = false
    ORDER BY created_at DESC
    LIMIT 1;
  END IF;

  IF existing_id IS NOT NULL THEN
    UPDATE public.form_submissions
    SET form_data = p_form_data,
        attempt_number = p_attempt_number,
        updated_at = now(),
        completed = false
    WHERE id = existing_id;

    RETURN existing_id;
  ELSE
    -- Insert a new record (either first incomplete save or a completed submission)
    INSERT INTO public.form_submissions (email, form_data, attempt_number, completed, updated_at)
    VALUES (p_email, p_form_data, p_attempt_number, p_completed, now())
    RETURNING id INTO existing_id;

    RETURN existing_id;
  END IF;
END;
$$;

-- Optional safety: ensure only one INCOMPLETE record per email (allows many completed)
-- Note: partial unique index cannot be targeted by ON CONFLICT, but it enforces integrity
CREATE UNIQUE INDEX IF NOT EXISTS uq_form_submissions_email_incomplete
ON public.form_submissions (email)
WHERE (completed = false);
