-- Simplificar políticas RLS de invoice_products
-- Eliminar política anterior
DROP POLICY IF EXISTS "Invoice products access for admins" ON public.invoice_products;

-- Permitir lectura pública de productos activos (son datos de catálogo)
CREATE POLICY "Anyone can view active products" 
ON public.invoice_products 
FOR SELECT 
USING (is_active = true);

-- Solo admins pueden modificar productos
CREATE POLICY "Admins can manage products" 
ON public.invoice_products 
FOR ALL 
USING (
  (COALESCE(current_setting('app.current_email', true), '') = ANY (ARRAY['soporte@novativa.org', 'dcuellar@novativa.org'])) 
  OR 
  (EXISTS (
    SELECT 1 FROM app_users au 
    WHERE au.email = COALESCE(current_setting('app.current_email', true), '') 
    AND au.role = ANY (ARRAY['admin', 'super_admin']) 
    AND au.is_active = true
  ))
)
WITH CHECK (
  (COALESCE(current_setting('app.current_email', true), '') = ANY (ARRAY['soporte@novativa.org', 'dcuellar@novativa.org'])) 
  OR 
  (EXISTS (
    SELECT 1 FROM app_users au 
    WHERE au.email = COALESCE(current_setting('app.current_email', true), '') 
    AND au.role = ANY (ARRAY['admin', 'super_admin']) 
    AND au.is_active = true
  ))
);