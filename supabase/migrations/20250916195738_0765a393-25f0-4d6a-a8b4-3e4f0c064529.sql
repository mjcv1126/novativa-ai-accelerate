-- Drop existing policies and create simpler ones that work
DROP POLICY IF EXISTS "Enable read access for authenticated admin users" ON public.conversational_form_leads;
DROP POLICY IF EXISTS "Enable insert access for authenticated admin users" ON public.conversational_form_leads;
DROP POLICY IF EXISTS "Enable update access for authenticated admin users" ON public.conversational_form_leads;
DROP POLICY IF EXISTS "Enable delete access for authenticated admin users" ON public.conversational_form_leads;

-- Create a simple policy that allows access when the session email is set to admin
CREATE POLICY "Allow admin access to conversational form leads" ON public.conversational_form_leads
    FOR ALL USING (
        COALESCE(current_setting('app.current_email', true), '') = 'soporte@novativa.org'
        OR 
        (
            COALESCE(current_setting('app.current_email', true), '') != '' 
            AND EXISTS (
                SELECT 1 FROM app_users 
                WHERE email = current_setting('app.current_email', true) 
                AND role IN ('admin', 'super_admin') 
                AND is_active = true
            )
        )
    );