-- Create tags table for reusable tags with colors
CREATE TABLE public.tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL DEFAULT '#3b82f6',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

-- Create policies for tags
CREATE POLICY "Admins can view all tags" 
ON public.tags 
FOR SELECT 
USING (is_admin_authenticated());

CREATE POLICY "Admins can create tags" 
ON public.tags 
FOR INSERT 
WITH CHECK (is_admin_authenticated());

CREATE POLICY "Admins can update tags" 
ON public.tags 
FOR UPDATE 
USING (is_admin_authenticated());

CREATE POLICY "Admins can delete tags" 
ON public.tags 
FOR DELETE 
USING (is_admin_authenticated());

-- Create trigger for automatic timestamp updates on tags
CREATE TRIGGER update_tags_updated_at
BEFORE UPDATE ON public.tags
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default tags with colors
INSERT INTO public.tags (name, color) VALUES 
('email-personalizado', '#10b981'),
('email-seguimiento', '#f59e0b'),
('pendiente-revisar', '#ef4444'),
('completado', '#22c55e'),
('alta-prioridad', '#dc2626'),
('seguimiento-requerido', '#f97316');

-- Function to get or create tag
CREATE OR REPLACE FUNCTION public.get_or_create_tag(tag_name text, tag_color text DEFAULT '#3b82f6')
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  tag_id uuid;
BEGIN
  -- Try to find existing tag
  SELECT id INTO tag_id
  FROM public.tags
  WHERE LOWER(name) = LOWER(tag_name);
  
  -- If not found, create it
  IF tag_id IS NULL THEN
    INSERT INTO public.tags (name, color)
    VALUES (tag_name, tag_color)
    RETURNING id INTO tag_id;
  END IF;
  
  RETURN tag_id;
END;
$$;