-- Arreglar las políticas RLS para permitir acceso a contactos y stages sin restricción de org para admin
-- Corregir el typo auth.uuid() -> auth.uid()

-- Eliminar políticas actuales de contacts
DROP POLICY IF EXISTS "Authenticated users can manage contacts" ON public.contacts;

-- Crear políticas más permisivas para contacts
CREATE POLICY "Admin can access all contacts" ON public.contacts
FOR ALL
USING (
  -- Admin puede acceder a todos los contactos
  EXISTS (
    SELECT 1 FROM app_users au 
    JOIN auth.users u ON u.email = au.email 
    WHERE u.id = auth.uid() AND au.role IN ('admin', 'super_admin') AND au.is_active = true
  )
  OR
  -- O contactos de la organización del usuario autenticado
  (auth.uid() IS NOT NULL AND org_id IN (
    SELECT org_id FROM org_members 
    WHERE user_id = auth.uid()
  ))
  OR
  -- O permitir acceso por email de sesión configurado
  is_admin_by_email()
)
WITH CHECK (
  -- Mismas condiciones para INSERT/UPDATE
  EXISTS (
    SELECT 1 FROM app_users au 
    JOIN auth.users u ON u.email = au.email 
    WHERE u.id = auth.uid() AND au.role IN ('admin', 'super_admin') AND au.is_active = true
  )
  OR
  (auth.uid() IS NOT NULL AND org_id IN (
    SELECT org_id FROM org_members 
    WHERE user_id = auth.uid()
  ))
  OR
  is_admin_by_email()
);

-- Eliminar políticas actuales de crm_stages  
DROP POLICY IF EXISTS "Authenticated users can manage CRM stages" ON public.crm_stages;

-- Crear políticas más permisivas para crm_stages
CREATE POLICY "Admin can access all crm stages" ON public.crm_stages
FOR ALL
USING (
  -- Admin puede acceder a todos los stages
  EXISTS (
    SELECT 1 FROM app_users au 
    JOIN auth.users u ON u.email = au.email 
    WHERE u.id = auth.uid() AND au.role IN ('admin', 'super_admin') AND au.is_active = true
  )
  OR
  -- O stages de la organización del usuario autenticado
  (auth.uid() IS NOT NULL AND org_id IN (
    SELECT org_id FROM org_members 
    WHERE user_id = auth.uid()
  ))
  OR
  -- O permitir acceso por email de sesión configurado
  is_admin_by_email()
)
WITH CHECK (
  -- Mismas condiciones para INSERT/UPDATE
  EXISTS (
    SELECT 1 FROM app_users au 
    JOIN auth.users u ON u.email = au.email 
    WHERE u.id = auth.uid() AND au.role IN ('admin', 'super_admin') AND au.is_active = true
  )
  OR
  (auth.uid() IS NOT NULL AND org_id IN (
    SELECT org_id FROM org_members 
    WHERE user_id = auth.uid()
  ))
  OR
  is_admin_by_email()
);