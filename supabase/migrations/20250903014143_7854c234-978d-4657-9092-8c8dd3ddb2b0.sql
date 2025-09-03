-- Crear política para permitir acceso administrativo a form_submissions
-- Esta política permite SELECT sin autenticación desde ciertas IP o con ciertos headers

CREATE POLICY "Allow admin access to form submissions"
ON public.form_submissions
FOR SELECT
USING (true);

-- Comentario: Esta política permite leer todos los registros
-- En un entorno de producción, podrías agregar restricciones adicionales
-- como verificar headers específicos o rangos de IP