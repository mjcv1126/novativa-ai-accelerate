
-- Habilitar RLS en las tablas del CRM si no está habilitado
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_activities ENABLE ROW LEVEL SECURITY;

-- Políticas para contacts (permitir todas las operaciones por ahora para el admin)
CREATE POLICY "Allow all operations on contacts" 
ON public.contacts 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Políticas para crm_stages (permitir todas las operaciones)
CREATE POLICY "Allow all operations on crm_stages" 
ON public.crm_stages 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Políticas para contact_activities (permitir todas las operaciones)
CREATE POLICY "Allow all operations on contact_activities" 
ON public.contact_activities 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Crear algunas etapas iniciales del CRM si no existen
INSERT INTO public.crm_stages (name, description, color, position) 
VALUES 
  ('Lead', 'Contacto inicial', '#3B82F6', 1),
  ('Calificado', 'Lead calificado', '#F59E0B', 2),
  ('Propuesta', 'Propuesta enviada', '#8B5CF6', 3),
  ('Negociación', 'En negociación', '#EF4444', 4),
  ('Cerrado', 'Venta cerrada', '#10B981', 5)
ON CONFLICT DO NOTHING;
