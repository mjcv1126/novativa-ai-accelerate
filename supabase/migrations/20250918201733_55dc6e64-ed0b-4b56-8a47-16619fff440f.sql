-- Fix CRM RLS policies to work with admin authentication
-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admin can access all contacts" ON public.contacts;
DROP POLICY IF EXISTS "Admin can access all crm stages" ON public.crm_stages;
DROP POLICY IF EXISTS "Admin can manage contact activities" ON public.contact_activities;
DROP POLICY IF EXISTS "Admin can manage contact attachments" ON public.contact_attachments;
DROP POLICY IF EXISTS "Admin can manage lead assignments" ON public.lead_assignments;

-- Create improved RLS policies that work with session-based admin auth
-- Contacts table
CREATE POLICY "Admin can access all contacts"
ON public.contacts
FOR ALL
USING (
  -- Allow if session email is the main admin
  current_setting('app.current_email', true) = 'soporte@novativa.org'
  OR
  -- Allow if user has admin role in app_users table
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.email = current_setting('app.current_email', true) 
    AND au.role IN ('admin', 'super_admin') 
    AND au.is_active = true
  )
  OR
  -- Allow if authenticated user and correct org_id
  (auth.uid() IS NOT NULL AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
)
WITH CHECK (
  current_setting('app.current_email', true) = 'soporte@novativa.org'
  OR
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.email = current_setting('app.current_email', true) 
    AND au.role IN ('admin', 'super_admin') 
    AND au.is_active = true
  )
  OR
  (auth.uid() IS NOT NULL AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
);

-- CRM Stages table
CREATE POLICY "Admin can access all crm stages"
ON public.crm_stages
FOR ALL
USING (
  current_setting('app.current_email', true) = 'soporte@novativa.org'
  OR
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.email = current_setting('app.current_email', true) 
    AND au.role IN ('admin', 'super_admin') 
    AND au.is_active = true
  )
  OR
  (auth.uid() IS NOT NULL AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
)
WITH CHECK (
  current_setting('app.current_email', true) = 'soporte@novativa.org'
  OR
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.email = current_setting('app.current_email', true) 
    AND au.role IN ('admin', 'super_admin') 
    AND au.is_active = true
  )
  OR
  (auth.uid() IS NOT NULL AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
);

-- Contact activities table
CREATE POLICY "Admin can manage contact activities"
ON public.contact_activities
FOR ALL
USING (
  current_setting('app.current_email', true) = 'soporte@novativa.org'
  OR
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.email = current_setting('app.current_email', true) 
    AND au.role IN ('admin', 'super_admin') 
    AND au.is_active = true
  )
  OR
  (auth.uid() IS NOT NULL AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
)
WITH CHECK (
  current_setting('app.current_email', true) = 'soporte@novativa.org'
  OR
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.email = current_setting('app.current_email', true) 
    AND au.role IN ('admin', 'super_admin') 
    AND au.is_active = true
  )
  OR
  (auth.uid() IS NOT NULL AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
);

-- Contact attachments table
CREATE POLICY "Admin can manage contact attachments"
ON public.contact_attachments
FOR ALL
USING (
  current_setting('app.current_email', true) = 'soporte@novativa.org'
  OR
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.email = current_setting('app.current_email', true) 
    AND au.role IN ('admin', 'super_admin') 
    AND au.is_active = true
  )
  OR
  (auth.uid() IS NOT NULL AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
)
WITH CHECK (
  current_setting('app.current_email', true) = 'soporte@novativa.org'
  OR
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.email = current_setting('app.current_email', true) 
    AND au.role IN ('admin', 'super_admin') 
    AND au.is_active = true
  )
  OR
  (auth.uid() IS NOT NULL AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
);

-- Lead assignments table
CREATE POLICY "Admin can manage lead assignments"
ON public.lead_assignments
FOR ALL
USING (
  current_setting('app.current_email', true) = 'soporte@novativa.org'
  OR
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.email = current_setting('app.current_email', true) 
    AND au.role IN ('admin', 'super_admin') 
    AND au.is_active = true
  )
  OR
  (auth.uid() IS NOT NULL AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
)
WITH CHECK (
  current_setting('app.current_email', true) = 'soporte@novativa.org'
  OR
  EXISTS (
    SELECT 1 FROM public.app_users au 
    WHERE au.email = current_setting('app.current_email', true) 
    AND au.role IN ('admin', 'super_admin') 
    AND au.is_active = true
  )
  OR
  (auth.uid() IS NOT NULL AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid)
);

-- Insert default org_id for existing data if needed
UPDATE public.contacts SET org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid WHERE org_id IS NULL;
UPDATE public.crm_stages SET org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid WHERE org_id IS NULL;
UPDATE public.contact_activities SET org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid WHERE org_id IS NULL;
UPDATE public.contact_attachments SET org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid WHERE org_id IS NULL;
UPDATE public.lead_assignments SET org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid WHERE org_id IS NULL;