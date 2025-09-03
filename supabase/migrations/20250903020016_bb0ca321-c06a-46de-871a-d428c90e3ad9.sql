-- Actualizar tabla para tracking de IP y reducir tiempo de expiración
ALTER TABLE public.admin_temp_keys 
ADD COLUMN ip_address inet,
ADD COLUMN user_agent text,
ADD COLUMN location_info jsonb DEFAULT '{}';

-- Cambiar tiempo de expiración a 60 segundos
ALTER TABLE public.admin_temp_keys 
ALTER COLUMN expires_at SET DEFAULT (now() + interval '60 seconds');