-- Eliminar el índice único del email para permitir múltiples registros completados por email
-- Esto es necesario para la trazabilidad: cada vez que un usuario completa el formulario,
-- se debe crear un nuevo registro, no actualizar el existente

DROP INDEX IF EXISTS public.idx_form_submissions_email_unique;

-- El índice regular idx_form_submissions_email ya existe y es suficiente para búsquedas eficientes
-- El índice idx_form_submissions_email_completed también existe para búsquedas por email y completed