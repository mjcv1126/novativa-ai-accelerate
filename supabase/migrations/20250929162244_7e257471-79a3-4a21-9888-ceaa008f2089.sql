-- Fix invoice data and RLS policies to restore missing invoices

-- Step 1: Normalize org_id for all existing invoices and invoice_items
UPDATE public.invoices 
SET org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid 
WHERE org_id != 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid;

UPDATE public.invoice_items 
SET org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid 
WHERE org_id != 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid;

-- Step 2: Drop existing RLS policies for invoice tables
DROP POLICY IF EXISTS "Admins can manage all invoices" ON public.invoices;
DROP POLICY IF EXISTS "Admins can manage all invoice items" ON public.invoice_items;
DROP POLICY IF EXISTS "Admins can manage all invoice products" ON public.invoice_products;
DROP POLICY IF EXISTS "Admins can manage all invoice settings" ON public.invoice_settings;

-- Step 3: Create new RLS policies with the same logic as CRM tables
-- Invoices policy
CREATE POLICY "Invoice access for admins and org members" 
ON public.invoices 
FOR ALL 
USING (
  (COALESCE(current_setting('app.current_email', true), '') = ANY (ARRAY['soporte@novativa.org', 'dcuellar@novativa.org'])) 
  OR (EXISTS (
    SELECT 1 FROM app_users au 
    WHERE au.email = COALESCE(current_setting('app.current_email', true), '') 
    AND au.role = ANY (ARRAY['admin', 'super_admin']) 
    AND au.is_active = true
  )) 
  OR (org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
)
WITH CHECK (
  (COALESCE(current_setting('app.current_email', true), '') = ANY (ARRAY['soporte@novativa.org', 'dcuellar@novativa.org'])) 
  OR (EXISTS (
    SELECT 1 FROM app_users au 
    WHERE au.email = COALESCE(current_setting('app.current_email', true), '') 
    AND au.role = ANY (ARRAY['admin', 'super_admin']) 
    AND au.is_active = true
  )) 
  OR (org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
);

-- Invoice items policy
CREATE POLICY "Invoice items access for admins and org members" 
ON public.invoice_items 
FOR ALL 
USING (
  (COALESCE(current_setting('app.current_email', true), '') = ANY (ARRAY['soporte@novativa.org', 'dcuellar@novativa.org'])) 
  OR (EXISTS (
    SELECT 1 FROM app_users au 
    WHERE au.email = COALESCE(current_setting('app.current_email', true), '') 
    AND au.role = ANY (ARRAY['admin', 'super_admin']) 
    AND au.is_active = true
  )) 
  OR (org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
)
WITH CHECK (
  (COALESCE(current_setting('app.current_email', true), '') = ANY (ARRAY['soporte@novativa.org', 'dcuellar@novativa.org'])) 
  OR (EXISTS (
    SELECT 1 FROM app_users au 
    WHERE au.email = COALESCE(current_setting('app.current_email', true), '') 
    AND au.role = ANY (ARRAY['admin', 'super_admin']) 
    AND au.is_active = true
  )) 
  OR (org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
);

-- Invoice products policy (no org_id column, so only admin access)
CREATE POLICY "Invoice products access for admins" 
ON public.invoice_products 
FOR ALL 
USING (
  (COALESCE(current_setting('app.current_email', true), '') = ANY (ARRAY['soporte@novativa.org', 'dcuellar@novativa.org'])) 
  OR (EXISTS (
    SELECT 1 FROM app_users au 
    WHERE au.email = COALESCE(current_setting('app.current_email', true), '') 
    AND au.role = ANY (ARRAY['admin', 'super_admin']) 
    AND au.is_active = true
  ))
)
WITH CHECK (
  (COALESCE(current_setting('app.current_email', true), '') = ANY (ARRAY['soporte@novativa.org', 'dcuellar@novativa.org'])) 
  OR (EXISTS (
    SELECT 1 FROM app_users au 
    WHERE au.email = COALESCE(current_setting('app.current_email', true), '') 
    AND au.role = ANY (ARRAY['admin', 'super_admin']) 
    AND au.is_active = true
  ))
);

-- Invoice settings policy
CREATE POLICY "Invoice settings access for admins and org members" 
ON public.invoice_settings 
FOR ALL 
USING (
  (COALESCE(current_setting('app.current_email', true), '') = ANY (ARRAY['soporte@novativa.org', 'dcuellar@novativa.org'])) 
  OR (EXISTS (
    SELECT 1 FROM app_users au 
    WHERE au.email = COALESCE(current_setting('app.current_email', true), '') 
    AND au.role = ANY (ARRAY['admin', 'super_admin']) 
    AND au.is_active = true
  )) 
  OR (org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
)
WITH CHECK (
  (COALESCE(current_setting('app.current_email', true), '') = ANY (ARRAY['soporte@novativa.org', 'dcuellar@novativa.org'])) 
  OR (EXISTS (
    SELECT 1 FROM app_users au 
    WHERE au.email = COALESCE(current_setting('app.current_email', true), '') 
    AND au.role = ANY (ARRAY['admin', 'super_admin']) 
    AND au.is_active = true
  )) 
  OR (org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
);