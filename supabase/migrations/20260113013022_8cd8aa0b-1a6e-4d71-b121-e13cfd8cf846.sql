-- Drop existing restrictive policies on conversational_form_leads
DROP POLICY IF EXISTS "Allow authenticated users to read form leads" ON conversational_form_leads;
DROP POLICY IF EXISTS "Allow public to insert form leads" ON conversational_form_leads;
DROP POLICY IF EXISTS "Allow authenticated users to delete form leads" ON conversational_form_leads;

-- Create new policy for reading leads - uses auth.uid() with app_users table
CREATE POLICY "Allow authenticated admins to read leads"
ON conversational_form_leads FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM app_users au
    WHERE au.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    AND au.role IN ('admin', 'super_admin')
    AND au.is_active = true
  )
);

-- Recreate insert policy for public form submissions
CREATE POLICY "Allow public to insert form leads"
ON conversational_form_leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Recreate delete policy for admins
CREATE POLICY "Allow authenticated admins to delete leads"
ON conversational_form_leads FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM app_users au
    WHERE au.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    AND au.role IN ('admin', 'super_admin')
    AND au.is_active = true
  )
);