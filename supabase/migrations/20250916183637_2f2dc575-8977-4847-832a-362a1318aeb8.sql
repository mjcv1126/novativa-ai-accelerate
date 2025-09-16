-- Fix RLS policies for conversational_form_leads table
DROP POLICY IF EXISTS "Admins can manage conversational form leads" ON public.conversational_form_leads;

-- Create new policies that work with the current authentication system
CREATE POLICY "Enable read access for authenticated admin users" ON public.conversational_form_leads
    FOR SELECT USING (
        current_setting('app.current_email', true) = 'soporte@novativa.org'
        OR EXISTS (
            SELECT 1 FROM app_users 
            WHERE email = current_setting('app.current_email', true) 
            AND role IN ('admin', 'super_admin') 
            AND is_active = true
        )
    );

CREATE POLICY "Enable insert access for authenticated admin users" ON public.conversational_form_leads
    FOR INSERT WITH CHECK (
        current_setting('app.current_email', true) = 'soporte@novativa.org'
        OR EXISTS (
            SELECT 1 FROM app_users 
            WHERE email = current_setting('app.current_email', true) 
            AND role IN ('admin', 'super_admin') 
            AND is_active = true
        )
    );

CREATE POLICY "Enable update access for authenticated admin users" ON public.conversational_form_leads
    FOR UPDATE USING (
        current_setting('app.current_email', true) = 'soporte@novativa.org'
        OR EXISTS (
            SELECT 1 FROM app_users 
            WHERE email = current_setting('app.current_email', true) 
            AND role IN ('admin', 'super_admin') 
            AND is_active = true
        )
    );

CREATE POLICY "Enable delete access for authenticated admin users" ON public.conversational_form_leads
    FOR DELETE USING (
        current_setting('app.current_email', true) = 'soporte@novativa.org'
        OR EXISTS (
            SELECT 1 FROM app_users 
            WHERE email = current_setting('app.current_email', true) 
            AND role IN ('admin', 'super_admin') 
            AND is_active = true
        )
    );

-- Also add the new lead mentioned by the user
INSERT INTO public.conversational_form_leads (
  first_name,
  last_name,
  email,
  phone,
  country_code,
  country_name,
  services_of_interest,
  investment_budget,
  submission_datetime
) VALUES (
  'Marlon',
  'Caballero', 
  'soporte@novativa.org',
  '50496472774',
  '504',
  'Honduras',
  'Agentes IA',
  'Cuento con $49 (USD) al mes para dicha inversión',
  '2025-09-16T18:32:53.804Z'
);