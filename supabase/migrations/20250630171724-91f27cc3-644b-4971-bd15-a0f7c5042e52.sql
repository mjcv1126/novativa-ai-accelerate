
-- Enable RLS on contact_attachments table
ALTER TABLE public.contact_attachments ENABLE ROW LEVEL SECURITY;

-- Create policies for contact_attachments
CREATE POLICY "Users can view contact attachments" 
  ON public.contact_attachments 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can create contact attachments" 
  ON public.contact_attachments 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can update contact attachments" 
  ON public.contact_attachments 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Users can delete contact attachments" 
  ON public.contact_attachments 
  FOR DELETE 
  USING (true);
