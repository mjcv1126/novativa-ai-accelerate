
-- Agregar campos de fecha y hora exacta a las actividades
ALTER TABLE public.contact_activities 
ADD COLUMN scheduled_date DATE,
ADD COLUMN scheduled_time TIME;

-- Crear índices para mejorar el rendimiento de las consultas por fecha
CREATE INDEX idx_contact_activities_scheduled_date ON public.contact_activities(scheduled_date);
CREATE INDEX idx_contact_activities_due_date ON public.contact_activities(due_date);
