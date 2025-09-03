-- Agregar política para permitir eliminación administrativa de form_submissions
CREATE POLICY "Allow admin delete access to form submissions"
ON public.form_submissions
FOR DELETE
USING (true);

-- Agregar política para permitir actualización administrativa de form_submissions  
CREATE POLICY "Allow admin update access to form submissions"
ON public.form_submissions
FOR UPDATE
USING (true);