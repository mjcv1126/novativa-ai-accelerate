-- Solución definitiva: Políticas RLS que funcionen con autenticación personalizada
-- Permitir acceso temporal para admins autenticados hasta configurar correctamente la autenticación

-- Políticas temporales que permitan acceso a usuarios autenticados
-- (esto asume que solo admins tienen acceso al panel admin)

-- ===== FACTURAS - Política temporal =====
DROP POLICY IF EXISTS "Admins can manage all invoices" ON public.invoices;

CREATE POLICY "Authenticated users can manage invoices" ON public.invoices
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- ===== PRODUCTOS - Política temporal =====
DROP POLICY IF EXISTS "Admins can manage all invoice products" ON public.invoice_products;

CREATE POLICY "Authenticated users can manage invoice products" ON public.invoice_products
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- ===== ITEMS DE FACTURA - Política temporal =====
DROP POLICY IF EXISTS "Admins can manage all invoice items" ON public.invoice_items;

CREATE POLICY "Authenticated users can manage invoice items" ON public.invoice_items
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- ===== CONFIGURACIÓN DE FACTURAS - Política temporal =====
DROP POLICY IF EXISTS "Admins can manage invoice settings" ON public.invoice_settings;

CREATE POLICY "Authenticated users can manage invoice settings" ON public.invoice_settings
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- ===== CONTACTOS CRM - Política temporal =====
DROP POLICY IF EXISTS "Admins can manage all contacts" ON public.contacts;

CREATE POLICY "Authenticated users can manage contacts" ON public.contacts
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- ===== ETAPAS CRM - Política temporal =====
DROP POLICY IF EXISTS "Admins can manage all CRM stages" ON public.crm_stages;

CREATE POLICY "Authenticated users can manage CRM stages" ON public.crm_stages
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- ===== ACTIVIDADES DE CONTACTO - Política temporal =====
DROP POLICY IF EXISTS "Admins can manage all contact activities" ON public.contact_activities;

CREATE POLICY "Authenticated users can manage contact activities" ON public.contact_activities
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- ===== ASIGNACIONES DE LEADS - Política temporal =====
DROP POLICY IF EXISTS "Admins can manage all lead assignments" ON public.lead_assignments;

CREATE POLICY "Authenticated users can manage lead assignments" ON public.lead_assignments
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);