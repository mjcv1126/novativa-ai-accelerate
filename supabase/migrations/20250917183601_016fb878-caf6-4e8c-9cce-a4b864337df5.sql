-- Fix critical security issues: Enable RLS on tables that need it
ALTER TABLE public.workflow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY; 
ALTER TABLE public.workflow_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_step_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_step_connections ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies for workflow tables
CREATE POLICY "Users can manage their organization's workflow executions" 
ON public.workflow_executions
FOR ALL
USING (org_id IN (
  SELECT org_id FROM org_members 
  WHERE user_id = auth.uid()
))
WITH CHECK (org_id IN (
  SELECT org_id FROM org_members 
  WHERE user_id = auth.uid()
));

-- Fix function search path issues
CREATE OR REPLACE FUNCTION public.update_workflow_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_invoice_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;