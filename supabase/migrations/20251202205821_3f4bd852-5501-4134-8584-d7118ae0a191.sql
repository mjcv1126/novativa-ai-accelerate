-- Update RLS policy for invoices table
DROP POLICY IF EXISTS "Invoice access for admins and org members" ON public.invoices;
CREATE POLICY "Invoice access for admins and org members" 
ON public.invoices 
FOR ALL 
USING (
  (COALESCE(current_setting('app.current_email'::text, true), ''::text) = ANY (ARRAY['soporte@novativa.org'::text, 'dcuellar@novativa.org'::text]))
  OR 
  (EXISTS (
    SELECT 1 FROM app_users au
    WHERE au.email = COALESCE(current_setting('app.current_email'::text, true), ''::text)
    AND au.role = ANY (ARRAY['admin'::text, 'super_admin'::text])
    AND au.is_active = true
  ))
  OR
  (EXISTS (
    SELECT 1 FROM app_users au
    WHERE au.email = auth.jwt()->>'email'
    AND au.role = ANY (ARRAY['admin'::text, 'super_admin'::text])
    AND au.is_active = true
  ))
  OR
  (auth.jwt()->>'email' = ANY (ARRAY['soporte@novativa.org'::text, 'dcuellar@novativa.org'::text]))
  OR (org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
)
WITH CHECK (
  (COALESCE(current_setting('app.current_email'::text, true), ''::text) = ANY (ARRAY['soporte@novativa.org'::text, 'dcuellar@novativa.org'::text]))
  OR 
  (EXISTS (
    SELECT 1 FROM app_users au
    WHERE au.email = COALESCE(current_setting('app.current_email'::text, true), ''::text)
    AND au.role = ANY (ARRAY['admin'::text, 'super_admin'::text])
    AND au.is_active = true
  ))
  OR
  (EXISTS (
    SELECT 1 FROM app_users au
    WHERE au.email = auth.jwt()->>'email'
    AND au.role = ANY (ARRAY['admin'::text, 'super_admin'::text])
    AND au.is_active = true
  ))
  OR
  (auth.jwt()->>'email' = ANY (ARRAY['soporte@novativa.org'::text, 'dcuellar@novativa.org'::text]))
  OR (org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
);

-- Update RLS policy for invoice_items table
DROP POLICY IF EXISTS "Invoice items access for admins and org members" ON public.invoice_items;
CREATE POLICY "Invoice items access for admins and org members" 
ON public.invoice_items 
FOR ALL 
USING (
  (COALESCE(current_setting('app.current_email'::text, true), ''::text) = ANY (ARRAY['soporte@novativa.org'::text, 'dcuellar@novativa.org'::text]))
  OR 
  (EXISTS (
    SELECT 1 FROM app_users au
    WHERE au.email = COALESCE(current_setting('app.current_email'::text, true), ''::text)
    AND au.role = ANY (ARRAY['admin'::text, 'super_admin'::text])
    AND au.is_active = true
  ))
  OR
  (EXISTS (
    SELECT 1 FROM app_users au
    WHERE au.email = auth.jwt()->>'email'
    AND au.role = ANY (ARRAY['admin'::text, 'super_admin'::text])
    AND au.is_active = true
  ))
  OR
  (auth.jwt()->>'email' = ANY (ARRAY['soporte@novativa.org'::text, 'dcuellar@novativa.org'::text]))
  OR (org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
)
WITH CHECK (
  (COALESCE(current_setting('app.current_email'::text, true), ''::text) = ANY (ARRAY['soporte@novativa.org'::text, 'dcuellar@novativa.org'::text]))
  OR 
  (EXISTS (
    SELECT 1 FROM app_users au
    WHERE au.email = COALESCE(current_setting('app.current_email'::text, true), ''::text)
    AND au.role = ANY (ARRAY['admin'::text, 'super_admin'::text])
    AND au.is_active = true
  ))
  OR
  (EXISTS (
    SELECT 1 FROM app_users au
    WHERE au.email = auth.jwt()->>'email'
    AND au.role = ANY (ARRAY['admin'::text, 'super_admin'::text])
    AND au.is_active = true
  ))
  OR
  (auth.jwt()->>'email' = ANY (ARRAY['soporte@novativa.org'::text, 'dcuellar@novativa.org'::text]))
  OR (org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
);

-- Update RLS policy for invoice_settings table
DROP POLICY IF EXISTS "Invoice settings access for admins and org members" ON public.invoice_settings;
CREATE POLICY "Invoice settings access for admins and org members" 
ON public.invoice_settings 
FOR ALL 
USING (
  (COALESCE(current_setting('app.current_email'::text, true), ''::text) = ANY (ARRAY['soporte@novativa.org'::text, 'dcuellar@novativa.org'::text]))
  OR 
  (EXISTS (
    SELECT 1 FROM app_users au
    WHERE au.email = COALESCE(current_setting('app.current_email'::text, true), ''::text)
    AND au.role = ANY (ARRAY['admin'::text, 'super_admin'::text])
    AND au.is_active = true
  ))
  OR
  (EXISTS (
    SELECT 1 FROM app_users au
    WHERE au.email = auth.jwt()->>'email'
    AND au.role = ANY (ARRAY['admin'::text, 'super_admin'::text])
    AND au.is_active = true
  ))
  OR
  (auth.jwt()->>'email' = ANY (ARRAY['soporte@novativa.org'::text, 'dcuellar@novativa.org'::text]))
  OR (org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
)
WITH CHECK (
  (COALESCE(current_setting('app.current_email'::text, true), ''::text) = ANY (ARRAY['soporte@novativa.org'::text, 'dcuellar@novativa.org'::text]))
  OR 
  (EXISTS (
    SELECT 1 FROM app_users au
    WHERE au.email = COALESCE(current_setting('app.current_email'::text, true), ''::text)
    AND au.role = ANY (ARRAY['admin'::text, 'super_admin'::text])
    AND au.is_active = true
  ))
  OR
  (EXISTS (
    SELECT 1 FROM app_users au
    WHERE au.email = auth.jwt()->>'email'
    AND au.role = ANY (ARRAY['admin'::text, 'super_admin'::text])
    AND au.is_active = true
  ))
  OR
  (auth.jwt()->>'email' = ANY (ARRAY['soporte@novativa.org'::text, 'dcuellar@novativa.org'::text]))
  OR (org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
);