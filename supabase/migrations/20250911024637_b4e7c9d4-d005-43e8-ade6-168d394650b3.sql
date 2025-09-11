-- Add tags column to form_submissions table
ALTER TABLE public.form_submissions 
ADD COLUMN tags TEXT[] DEFAULT '{}';

-- Add an index for better performance when filtering by tags
CREATE INDEX idx_form_submissions_tags ON public.form_submissions USING GIN(tags);