-- Primero, creamos una tabla temporal con solo los registros más recientes por email
CREATE TEMP TABLE latest_submissions AS
SELECT DISTINCT ON (email) 
  id, form_data, attempt_number, completed, created_at, updated_at, email
FROM form_submissions
ORDER BY email, created_at DESC;

-- Eliminamos todos los registros duplicados (mantenemos solo los más recientes)
DELETE FROM form_submissions 
WHERE id NOT IN (SELECT id FROM latest_submissions);

-- Agregamos un índice único en el email para prevenir duplicados futuros
CREATE UNIQUE INDEX IF NOT EXISTS idx_form_submissions_email_unique 
ON form_submissions(email);

-- Función para manejar conflictos de email (upsert)
CREATE OR REPLACE FUNCTION upsert_form_submission(
  p_email TEXT,
  p_form_data JSONB,
  p_attempt_number INTEGER DEFAULT 1,
  p_completed BOOLEAN DEFAULT false
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  submission_id UUID;
BEGIN
  -- Intentar insertar o actualizar si existe
  INSERT INTO form_submissions (email, form_data, attempt_number, completed, updated_at)
  VALUES (p_email, p_form_data, p_attempt_number, p_completed, now())
  ON CONFLICT (email) 
  DO UPDATE SET 
    form_data = EXCLUDED.form_data,
    attempt_number = EXCLUDED.attempt_number,
    completed = EXCLUDED.completed,
    updated_at = now()
  RETURNING id INTO submission_id;
  
  RETURN submission_id;
END;
$$;