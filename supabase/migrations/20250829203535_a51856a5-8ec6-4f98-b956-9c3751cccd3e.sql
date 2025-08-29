-- Create function to check if current email is admin
CREATE OR REPLACE FUNCTION public.is_admin_by_email()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    current_email text;
BEGIN
    -- Get email from current session or return false
    SELECT nullif(current_setting('app.current_email', true), '') INTO current_email;
    
    -- If no email set, return false
    IF current_email IS NULL THEN
        RETURN false;
    END IF;
    
    -- Check if email exists in app_users with admin role
    RETURN EXISTS (
        SELECT 1 FROM app_users 
        WHERE email = current_email 
        AND role IN ('admin', 'super_admin') 
        AND is_active = true
    );
END;
$$;

-- Drop existing restrictive policies on invoices table
DROP POLICY IF EXISTS "Authenticated users can manage invoices" ON public.invoices;

-- Create new policies for invoices that work with email-based auth
CREATE POLICY "Admins can manage all invoices"
ON public.invoices
FOR ALL
USING (public.is_admin_by_email())
WITH CHECK (public.is_admin_by_email());

-- Update invoice_items policies
DROP POLICY IF EXISTS "Authenticated users can manage invoice items" ON public.invoice_items;

CREATE POLICY "Admins can manage all invoice items"
ON public.invoice_items
FOR ALL
USING (public.is_admin_by_email())
WITH CHECK (public.is_admin_by_email());

-- Update invoice_products policies  
DROP POLICY IF EXISTS "Authenticated users can manage invoice products" ON public.invoice_products;

CREATE POLICY "Admins can manage all invoice products"
ON public.invoice_products
FOR ALL
USING (public.is_admin_by_email())
WITH CHECK (public.is_admin_by_email());

-- Update invoice_settings policies
DROP POLICY IF EXISTS "Authenticated users can manage invoice settings" ON public.invoice_settings;

CREATE POLICY "Admins can manage all invoice settings"
ON public.invoice_settings
FOR ALL
USING (public.is_admin_by_email())
WITH CHECK (public.is_admin_by_email());