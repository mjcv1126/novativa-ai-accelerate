-- Allow public form submissions for conversational form leads
CREATE POLICY "Allow public form submissions" 
ON public.conversational_form_leads 
FOR INSERT 
WITH CHECK (true);