-- Drop existing policy
DROP POLICY IF EXISTS "Admins can manage products" ON public.invoice_products;

-- Create new policy that also checks authenticated user's email from JWT
CREATE POLICY "Admins can manage products" 
ON public.invoice_products 
FOR ALL 
USING (
  -- Check session email (for backwards compatibility)
  (COALESCE(current_setting('app.current_email'::text, true), ''::text) = ANY (ARRAY['soporte@novativa.org'::text, 'dcuellar@novativa.org'::text]))
  OR 
  -- Check if session email is an admin user
  (EXISTS (
    SELECT 1 FROM app_users au
    WHERE au.email = COALESCE(current_setting('app.current_email'::text, true), ''::text)
    AND au.role = ANY (ARRAY['admin'::text, 'super_admin'::text])
    AND au.is_active = true
  ))
  OR
  -- NEW: Check authenticated user's email from JWT directly
  (EXISTS (
    SELECT 1 FROM app_users au
    WHERE au.email = auth.jwt()->>'email'
    AND au.role = ANY (ARRAY['admin'::text, 'super_admin'::text])
    AND au.is_active = true
  ))
  OR
  -- NEW: Allow specific emails directly from JWT
  (auth.jwt()->>'email' = ANY (ARRAY['soporte@novativa.org'::text, 'dcuellar@novativa.org'::text]))
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
);