
-- Crear tabla para las etapas del embudo de ventas
CREATE TABLE public.crm_stages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  position INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Crear tabla para actividades/timeline de contactos
CREATE TABLE public.contact_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID NOT NULL REFERENCES public.contacts(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL, -- 'call', 'email', 'meeting', 'note', 'reminder', 'status_change'
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Agregar columnas a la tabla contacts para el CRM
ALTER TABLE public.contacts 
ADD COLUMN stage_id UUID REFERENCES public.crm_stages(id),
ADD COLUMN email TEXT,
ADD COLUMN company TEXT,
ADD COLUMN notes TEXT,
ADD COLUMN last_contact_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Crear trigger para actualizar updated_at en contacts
CREATE OR REPLACE FUNCTION update_contacts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contacts_updated_at
    BEFORE UPDATE ON public.contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_contacts_updated_at();

-- Crear trigger para actualizar updated_at en crm_stages
CREATE TRIGGER update_crm_stages_updated_at
    BEFORE UPDATE ON public.crm_stages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Crear trigger para actualizar updated_at en contact_activities
CREATE TRIGGER update_contact_activities_updated_at
    BEFORE UPDATE ON public.contact_activities
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insertar etapas por defecto del embudo
INSERT INTO public.crm_stages (name, description, color, position) VALUES
('Nuevo Lead', 'Contactos recién llegados', '#10B981', 1),
('Contactado', 'Primer contacto realizado', '#F59E0B', 2),
('Calificado', 'Lead calificado como prospecto', '#3B82F6', 3),
('Propuesta', 'Propuesta enviada', '#8B5CF6', 4),
('Negociación', 'En proceso de negociación', '#F97316', 5),
('Cerrado Ganado', 'Venta exitosa', '#22C55E', 6),
('Cerrado Perdido', 'Oportunidad perdida', '#EF4444', 7);

-- Actualizar contactos existentes para asignarlos a la primera etapa
UPDATE public.contacts 
SET stage_id = (SELECT id FROM public.crm_stages WHERE position = 1 LIMIT 1)
WHERE stage_id IS NULL;
