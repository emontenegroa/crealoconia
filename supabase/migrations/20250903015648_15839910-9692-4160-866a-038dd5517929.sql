-- Crear tabla para almacenar claves temporales de admin
CREATE TABLE public.admin_temp_keys (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  temp_key text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  used boolean NOT NULL DEFAULT false,
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + interval '15 minutes')
);

-- Habilitar RLS
ALTER TABLE public.admin_temp_keys ENABLE ROW LEVEL SECURITY;

-- Política para permitir insertar claves temporales (sin autenticación)
CREATE POLICY "Allow inserting temp keys"
ON public.admin_temp_keys
FOR INSERT
WITH CHECK (true);

-- Política para permitir leer claves temporales (sin autenticación)
CREATE POLICY "Allow reading temp keys"
ON public.admin_temp_keys
FOR SELECT
USING (true);

-- Política para permitir actualizar claves temporales (sin autenticación)
CREATE POLICY "Allow updating temp keys"
ON public.admin_temp_keys
FOR UPDATE
USING (true);

-- Función para limpiar claves expiradas
CREATE OR REPLACE FUNCTION public.cleanup_expired_temp_keys()
RETURNS void AS $$
BEGIN
  DELETE FROM public.admin_temp_keys 
  WHERE expires_at < now() OR used = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;