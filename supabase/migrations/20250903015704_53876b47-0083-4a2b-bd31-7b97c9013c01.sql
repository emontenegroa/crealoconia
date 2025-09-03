-- Corregir la función para usar search_path seguro
DROP FUNCTION IF EXISTS public.cleanup_expired_temp_keys();

CREATE OR REPLACE FUNCTION public.cleanup_expired_temp_keys()
RETURNS void AS $$
BEGIN
  DELETE FROM public.admin_temp_keys 
  WHERE expires_at < now() OR used = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;