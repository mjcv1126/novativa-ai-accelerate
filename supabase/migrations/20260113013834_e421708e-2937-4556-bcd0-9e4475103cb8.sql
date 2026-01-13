-- Drop conflicting policies on conversational_form_leads
DROP POLICY IF EXISTS "Allow authenticated admins to read leads" ON conversational_form_leads;
DROP POLICY IF EXISTS "Allow authenticated admins to delete leads" ON conversational_form_leads;
DROP POLICY IF EXISTS "Allow admin access to conversational form leads" ON conversational_form_leads;
DROP POLICY IF EXISTS "Allow public to insert form leads" ON conversational_form_leads;
DROP POLICY IF EXISTS "Allow public form submissions" ON conversational_form_leads;

-- Update is_current_user_admin to support super_admin role
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM app_users au 
    JOIN auth.users u ON u.email = au.email 
    WHERE u.id = auth.uid() 
      AND au.role IN ('admin', 'super_admin')
      AND au.is_active = true
  );
$$;

-- Create new SELECT policy using SECURITY DEFINER function
CREATE POLICY "Admins can read leads"
ON conversational_form_leads FOR SELECT
TO authenticated
USING (public.is_current_user_admin());

-- Create new DELETE policy using SECURITY DEFINER function
CREATE POLICY "Admins can delete leads"
ON conversational_form_leads FOR DELETE
TO authenticated
USING (public.is_current_user_admin());

-- Create INSERT policy for public form submissions
CREATE POLICY "Public can insert leads"
ON conversational_form_leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);