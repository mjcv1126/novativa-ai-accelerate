-- Crear tabla para leads del formulario conversacional
CREATE TABLE public.conversational_form_leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  country_code text NOT NULL,
  country_name text NOT NULL,
  services_of_interest text NOT NULL,
  investment_budget text NOT NULL,
  submission_date date NOT NULL DEFAULT CURRENT_DATE,
  submission_time time NOT NULL DEFAULT CURRENT_TIME,
  submission_datetime timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.conversational_form_leads ENABLE ROW LEVEL SECURITY;

-- Crear políticas RLS
CREATE POLICY "Admins can manage conversational form leads" 
ON public.conversational_form_leads 
FOR ALL 
USING (is_admin_by_email())
WITH CHECK (is_admin_by_email());

-- Crear función para actualizar updated_at
CREATE OR REPLACE FUNCTION public.update_conversational_form_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Crear trigger
CREATE TRIGGER update_conversational_form_leads_updated_at
BEFORE UPDATE ON public.conversational_form_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_conversational_form_leads_updated_at();