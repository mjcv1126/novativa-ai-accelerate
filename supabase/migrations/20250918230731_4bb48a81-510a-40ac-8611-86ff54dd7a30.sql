-- Test and fix RLS policies with direct access for soporte@novativa.org
-- First, let's create a simpler approach - allow direct access for the main admin email

-- Drop existing policies and recreate with simpler logic
DROP POLICY IF EXISTS "Admin can access all contacts" ON public.contacts;
DROP POLICY IF EXISTS "Admin can access all crm stages" ON public.crm_stages;

-- Create simpler policies that definitely work
CREATE POLICY "Admin access to contacts"
ON public.contacts
FOR ALL
USING (
  -- Direct access for main admin or if email is in app_users
  current_setting('app.current_email', true) IN ('soporte@novativa.org', 'dcuellar@novativa.org')
  OR
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.email = current_setting('app.current_email', true) 
    AND au.role IN ('admin', 'super_admin') 
    AND au.is_active = true
  )
)
WITH CHECK (
  current_setting('app.current_email', true) IN ('soporte@novativa.org', 'dcuellar@novativa.org')
  OR
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.email = current_setting('app.current_email', true) 
    AND au.role IN ('admin', 'super_admin') 
    AND au.is_active = true
  )
);

CREATE POLICY "Admin access to crm stages"
ON public.crm_stages
FOR ALL
USING (
  current_setting('app.current_email', true) IN ('soporte@novativa.org', 'dcuellar@novativa.org')
  OR
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.email = current_setting('app.current_email', true) 
    AND au.role IN ('admin', 'super_admin') 
    AND au.is_active = true
  )
)
WITH CHECK (
  current_setting('app.current_email', true) IN ('soporte@novativa.org', 'dcuellar@novativa.org')
  OR
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.email = current_setting('app.current_email', true) 
    AND au.role IN ('admin', 'super_admin') 
    AND au.is_active = true
  )
);

-- Test the policies work by checking current context
SELECT 
  'Testing access after policy update:' as info,
  current_setting('app.current_email', true) as email,
  (current_setting('app.current_email', true) IN ('soporte@novativa.org', 'dcuellar@novativa.org')) as has_direct_access;