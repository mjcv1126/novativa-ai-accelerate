-- Solución simplificada: Corregir políticas RLS para sistema admin actual
-- Eliminar todas las políticas problemáticas y crear políticas simples basadas en admin

-- ===== POLÍTICAS PARA FACTURAS =====
DROP POLICY IF EXISTS "Users can view their organization's invoices" ON public.invoices;
DROP POLICY IF EXISTS "Users can insert invoices for their organization" ON public.invoices;
DROP POLICY IF EXISTS "Users can update their organization's invoices" ON public.invoices;
DROP POLICY IF EXISTS "Users can delete their organization's invoices" ON public.invoices;

CREATE POLICY "Admins can manage all invoices" ON public.invoices
FOR ALL TO authenticated
USING (is_current_user_admin())
WITH CHECK (is_current_user_admin());

-- ===== POLÍTICAS PARA PRODUCTOS =====
DROP POLICY IF EXISTS "Org admins can manage invoice products" ON public.invoice_products;
DROP POLICY IF EXISTS "Users can view invoice products" ON public.invoice_products;

CREATE POLICY "Admins can manage all invoice products" ON public.invoice_products
FOR ALL TO authenticated
USING (is_current_user_admin())
WITH CHECK (is_current_user_admin());

-- ===== POLÍTICAS PARA ITEMS DE FACTURA =====
DROP POLICY IF EXISTS "Users can view their organization's invoice items" ON public.invoice_items;
DROP POLICY IF EXISTS "Users can insert invoice items for their organization" ON public.invoice_items;
DROP POLICY IF EXISTS "Users can update their organization's invoice items" ON public.invoice_items;
DROP POLICY IF EXISTS "Users can delete their organization's invoice items" ON public.invoice_items;

CREATE POLICY "Admins can manage all invoice items" ON public.invoice_items
FOR ALL TO authenticated
USING (is_current_user_admin())
WITH CHECK (is_current_user_admin());

-- ===== POLÍTICAS PARA CONFIGURACIÓN DE FACTURAS =====
DROP POLICY IF EXISTS "Users can manage their organization's invoice settings" ON public.invoice_settings;

CREATE POLICY "Admins can manage invoice settings" ON public.invoice_settings
FOR ALL TO authenticated
USING (is_current_user_admin())
WITH CHECK (is_current_user_admin());

-- ===== POLÍTICAS PARA CONTACTOS CRM =====
DROP POLICY IF EXISTS "Users can view their organization's contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can insert contacts for their organization" ON public.contacts;
DROP POLICY IF EXISTS "Users can update their organization's contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can delete their organization's contacts" ON public.contacts;

CREATE POLICY "Admins can manage all contacts" ON public.contacts
FOR ALL TO authenticated
USING (is_current_user_admin())
WITH CHECK (is_current_user_admin());

-- ===== POLÍTICAS PARA ETAPAS CRM =====
DROP POLICY IF EXISTS "Users can view their organization's CRM stages" ON public.crm_stages;
DROP POLICY IF EXISTS "Users can manage their organization's CRM stages" ON public.crm_stages;

CREATE POLICY "Admins can manage all CRM stages" ON public.crm_stages
FOR ALL TO authenticated
USING (is_current_user_admin())
WITH CHECK (is_current_user_admin());

-- ===== POLÍTICAS PARA ACTIVIDADES DE CONTACTO =====
DROP POLICY IF EXISTS "Users can view their organization's contact activities" ON public.contact_activities;
DROP POLICY IF EXISTS "Users can insert contact activities for their organization" ON public.contact_activities;
DROP POLICY IF EXISTS "Users can update their organization's contact activities" ON public.contact_activities;
DROP POLICY IF EXISTS "Users can delete their organization's contact activities" ON public.contact_activities;

CREATE POLICY "Admins can manage all contact activities" ON public.contact_activities
FOR ALL TO authenticated
USING (is_current_user_admin())
WITH CHECK (is_current_user_admin());

-- ===== POLÍTICAS PARA ASIGNACIONES DE LEADS =====
DROP POLICY IF EXISTS "Users can manage their organization's lead assignments" ON public.lead_assignments;

CREATE POLICY "Admins can manage all lead assignments" ON public.lead_assignments
FOR ALL TO authenticated
USING (is_current_user_admin())
WITH CHECK (is_current_user_admin());

-- Establecer org_id por defecto donde sea NULL (sin crear nuevas organizaciones)
UPDATE public.contacts 
SET org_id = (SELECT id FROM public.orgs LIMIT 1)
WHERE org_id IS NULL;

UPDATE public.crm_stages 
SET org_id = (SELECT id FROM public.orgs LIMIT 1)
WHERE org_id IS NULL;

UPDATE public.contact_activities 
SET org_id = (SELECT id FROM public.orgs LIMIT 1)
WHERE org_id IS NULL;

UPDATE public.lead_assignments 
SET org_id = (SELECT id FROM public.orgs LIMIT 1)
WHERE org_id IS NULL;

UPDATE public.invoices 
SET org_id = (SELECT id FROM public.orgs LIMIT 1)
WHERE org_id IS NULL;

UPDATE public.invoice_items 
SET org_id = (SELECT id FROM public.orgs LIMIT 1)
WHERE org_id IS NULL;

UPDATE public.invoice_settings 
SET org_id = (SELECT id FROM public.orgs LIMIT 1)
WHERE org_id IS NULL;