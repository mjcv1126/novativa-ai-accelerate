-- Habilitar RLS en las tablas críticas del CRM
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_assignments ENABLE ROW LEVEL SECURITY;

-- Actualizar la política de contactos para ser más robusta
DROP POLICY IF EXISTS "Admin can access all contacts" ON public.contacts;

CREATE POLICY "Admin can access all contacts" 
ON public.contacts 
FOR ALL 
USING (
  -- Admin directo por email hardcodeado
  current_setting('app.current_email', true) = 'soporte@novativa.org'
  OR 
  -- Admin por función is_admin_by_email
  is_admin_by_email()
  OR
  -- Usuario autenticado con org_id específico
  (auth.uid() IS NOT NULL AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1')
)
WITH CHECK (
  -- Admin directo por email hardcodeado
  current_setting('app.current_email', true) = 'soporte@novativa.org'
  OR 
  -- Admin por función is_admin_by_email
  is_admin_by_email()
  OR
  -- Usuario autenticado con org_id específico
  (auth.uid() IS NOT NULL AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1')
);

-- Actualizar la política de etapas CRM para ser más robusta
DROP POLICY IF EXISTS "Admin can access all crm stages" ON public.crm_stages;

CREATE POLICY "Admin can access all crm stages" 
ON public.crm_stages 
FOR ALL 
USING (
  -- Admin directo por email hardcodeado
  current_setting('app.current_email', true) = 'soporte@novativa.org'
  OR 
  -- Admin por función is_admin_by_email
  is_admin_by_email()
  OR
  -- Usuario autenticado con org_id específico
  (auth.uid() IS NOT NULL AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1')
)
WITH CHECK (
  -- Admin directo por email hardcodeado
  current_setting('app.current_email', true) = 'soporte@novativa.org'
  OR 
  -- Admin por función is_admin_by_email
  is_admin_by_email()
  OR
  -- Usuario autenticado con org_id específico
  (auth.uid() IS NOT NULL AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1')
);

-- Política simple para actividades de contactos
DROP POLICY IF EXISTS "Authenticated users can manage contact activities" ON public.contact_activities;

CREATE POLICY "Admin can manage contact activities" 
ON public.contact_activities 
FOR ALL 
USING (
  -- Admin directo por email hardcodeado
  current_setting('app.current_email', true) = 'soporte@novativa.org'
  OR 
  -- Admin por función is_admin_by_email
  is_admin_by_email()
  OR
  -- Usuario autenticado con org_id específico
  (auth.uid() IS NOT NULL AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1')
)
WITH CHECK (
  -- Admin directo por email hardcodeado
  current_setting('app.current_email', true) = 'soporte@novativa.org'
  OR 
  -- Admin por función is_admin_by_email
  is_admin_by_email()
  OR
  -- Usuario autenticado con org_id específico
  (auth.uid() IS NOT NULL AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1')
);

-- Política simple para adjuntos de contactos
DROP POLICY IF EXISTS "Authenticated users can manage contact attachments" ON public.contact_attachments;

CREATE POLICY "Admin can manage contact attachments" 
ON public.contact_attachments 
FOR ALL 
USING (
  -- Admin directo por email hardcodeado
  current_setting('app.current_email', true) = 'soporte@novativa.org'
  OR 
  -- Admin por función is_admin_by_email
  is_admin_by_email()
  OR
  -- Usuario autenticado con org_id específico
  (auth.uid() IS NOT NULL AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1')
)
WITH CHECK (
  -- Admin directo por email hardcodeado
  current_setting('app.current_email', true) = 'soporte@novativa.org'
  OR 
  -- Admin por función is_admin_by_email
  is_admin_by_email()
  OR
  -- Usuario autenticado con org_id específico
  (auth.uid() IS NOT NULL AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1')
);

-- Política simple para asignaciones de leads
DROP POLICY IF EXISTS "Authenticated users can manage lead assignments" ON public.lead_assignments;

CREATE POLICY "Admin can manage lead assignments" 
ON public.lead_assignments 
FOR ALL 
USING (
  -- Admin directo por email hardcodeado
  current_setting('app.current_email', true) = 'soporte@novativa.org'
  OR 
  -- Admin por función is_admin_by_email
  is_admin_by_email()
  OR
  -- Usuario autenticado con org_id específico
  (auth.uid() IS NOT NULL AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1')
)
WITH CHECK (
  -- Admin directo por email hardcodeado
  current_setting('app.current_email', true) = 'soporte@novativa.org'
  OR 
  -- Admin por función is_admin_by_email
  is_admin_by_email()
  OR
  -- Usuario autenticado con org_id específico
  (auth.uid() IS NOT NULL AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1')
);