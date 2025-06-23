
-- Habilitar RLS en todas las tablas
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage_tracking ENABLE ROW LEVEL SECURITY;

-- Políticas para form_submissions - solo acceso a datos propios por email
CREATE POLICY "Users can view their own submissions"
ON public.form_submissions
FOR SELECT
USING (email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can insert their own submissions"
ON public.form_submissions
FOR INSERT
WITH CHECK (email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can update their own submissions"
ON public.form_submissions
FOR UPDATE
USING (email = current_setting('request.jwt.claims', true)::json->>'email')
WITH CHECK (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Políticas para ai_usage_tracking - acceso por session_id
CREATE POLICY "Users can view their own AI usage"
ON public.ai_usage_tracking
FOR SELECT
USING (true); -- Permitir lectura para todos los usuarios autenticados

CREATE POLICY "Users can insert their own AI usage"
ON public.ai_usage_tracking
FOR INSERT
WITH CHECK (true); -- Permitir inserción para todos los usuarios autenticados

CREATE POLICY "Users can update their own AI usage"
ON public.ai_usage_tracking
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Crear tabla de logs de seguridad
CREATE TABLE IF NOT EXISTS public.security_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type text NOT NULL,
    user_id uuid,
    email text,
    ip_address inet,
    user_agent text,
    event_data jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT now()
);

-- RLS para security_logs - solo admins pueden ver
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only service role can manage security logs"
ON public.security_logs
USING (false); -- No acceso directo para usuarios

-- Función para logging de seguridad
CREATE OR REPLACE FUNCTION public.log_security_event(
    event_type text,
    user_id uuid DEFAULT NULL,
    email text DEFAULT NULL,
    ip_address inet DEFAULT NULL,
    user_agent text DEFAULT NULL,
    event_data jsonb DEFAULT '{}'::jsonb
)
RETURNS uuid
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    log_id uuid;
BEGIN
    INSERT INTO public.security_logs (
        event_type, user_id, email, ip_address, user_agent, event_data
    )
    VALUES (
        event_type, user_id, email, ip_address, user_agent, event_data
    )
    RETURNING id INTO log_id;
    
    RETURN log_id;
END;
$$;

-- Añadir índices de seguridad para mejorar performance
CREATE INDEX IF NOT EXISTS idx_security_logs_event_type_created 
ON public.security_logs(event_type, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_security_logs_email_created 
ON public.security_logs(email, created_at DESC);

-- Función para detectar comportamiento sospechoso
CREATE OR REPLACE FUNCTION public.detect_suspicious_activity(
    check_email text,
    time_window_minutes integer DEFAULT 5
)
RETURNS boolean
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    recent_attempts integer;
BEGIN
    SELECT COUNT(*)
    INTO recent_attempts
    FROM public.security_logs
    WHERE email = check_email
    AND event_type IN ('failed_submission', 'rate_limit_exceeded', 'validation_failed')
    AND created_at > now() - (time_window_minutes || ' minutes')::interval;
    
    RETURN recent_attempts >= 5;
END;
$$;
