
-- Habilitar RLS en la segunda tabla
ALTER TABLE public.tidycal_rule_executions ENABLE ROW LEVEL SECURITY;

-- Crear políticas de seguridad para tidycal_automation_rules
-- Solo permitir acceso a usuarios autenticados (admins del sistema)
CREATE POLICY "Allow authenticated users to view automation rules" 
ON public.tidycal_automation_rules 
FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert automation rules" 
ON public.tidycal_automation_rules 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update automation rules" 
ON public.tidycal_automation_rules 
FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete automation rules" 
ON public.tidycal_automation_rules 
FOR DELETE 
USING (auth.role() = 'authenticated');

-- Crear políticas de seguridad para tidycal_rule_executions
-- Solo permitir acceso a usuarios autenticados (admins del sistema)
CREATE POLICY "Allow authenticated users to view rule executions" 
ON public.tidycal_rule_executions 
FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert rule executions" 
ON public.tidycal_rule_executions 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update rule executions" 
ON public.tidycal_rule_executions 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Permitir acceso a las funciones edge de Supabase usando el service role
-- Esto es necesario para que las funciones de automatización funcionen
CREATE POLICY "Allow service role full access to automation rules" 
ON public.tidycal_automation_rules 
FOR ALL 
USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Allow service role full access to rule executions" 
ON public.tidycal_rule_executions 
FOR ALL 
USING (auth.jwt() ->> 'role' = 'service_role');
