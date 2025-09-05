-- Create table for tracking conversion events
CREATE TABLE IF NOT EXISTS public.conversion_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  event_id TEXT NOT NULL UNIQUE,
  event_source_url TEXT NOT NULL,
  user_email TEXT,
  facebook_response JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.conversion_events ENABLE ROW LEVEL SECURITY;

-- Create policy for service role access (for edge functions)
CREATE POLICY "Service role can insert conversion events" 
ON public.conversion_events 
FOR INSERT 
WITH CHECK (true);

-- Create index for performance
CREATE INDEX idx_conversion_events_event_id ON public.conversion_events(event_id);
CREATE INDEX idx_conversion_events_created_at ON public.conversion_events(created_at);
CREATE INDEX idx_conversion_events_event_type ON public.conversion_events(event_type);