
-- Crear tabla para manejar asignaciones de leads
CREATE TABLE public.lead_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID NOT NULL REFERENCES public.contacts(id) ON DELETE CASCADE,
  assigned_user_email TEXT NOT NULL,
  assigned_by_email TEXT NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT
);

-- Habilitar RLS en la tabla de asignaciones
ALTER TABLE public.lead_assignments ENABLE ROW LEVEL SECURITY;

-- Política para permitir que todos los usuarios autenticados vean todas las asignaciones
CREATE POLICY "Users can view all lead assignments" 
  ON public.lead_assignments 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Política para permitir que todos los usuarios autenticados creen asignaciones
CREATE POLICY "Users can create lead assignments" 
  ON public.lead_assignments 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Política para permitir que todos los usuarios autenticados actualicen asignaciones
CREATE POLICY "Users can update lead assignments" 
  ON public.lead_assignments 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Función para obtener o crear la asignación más reciente de un contacto
CREATE OR REPLACE FUNCTION public.get_latest_assignment(contact_uuid UUID)
RETURNS TABLE(assigned_user_email TEXT, assigned_at TIMESTAMP WITH TIME ZONE)
LANGUAGE sql
STABLE
AS $$
  SELECT assigned_user_email, assigned_at
  FROM public.lead_assignments
  WHERE contact_id = contact_uuid
  ORDER BY assigned_at DESC
  LIMIT 1;
$$;

-- Trigger function para auto-asignar leads cuando se crean o modifican
CREATE OR REPLACE FUNCTION public.auto_assign_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_user_email TEXT;
BEGIN
  -- Obtener el email del usuario actual desde localStorage (se pasará como parámetro)
  -- Por ahora usaremos un valor por defecto, esto se manejará desde el frontend
  current_user_email := COALESCE(current_setting('app.current_user_email', true), 'soporte@novativa.org');
  
  -- Si es una inserción (nuevo lead)
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.lead_assignments (contact_id, assigned_user_email, assigned_by_email, notes)
    VALUES (NEW.id, current_user_email, current_user_email, 'Auto-asignado al crear el lead');
    RETURN NEW;
  END IF;
  
  -- Si es una actualización
  IF TG_OP = 'UPDATE' THEN
    INSERT INTO public.lead_assignments (contact_id, assigned_user_email, assigned_by_email, notes)
    VALUES (NEW.id, current_user_email, current_user_email, 'Reasignado al modificar el lead');
    RETURN NEW;
  END IF;
  
  RETURN NULL;
END;
$$;

-- Crear trigger para auto-asignación en inserts y updates
CREATE OR REPLACE TRIGGER trigger_auto_assign_lead
  AFTER INSERT OR UPDATE ON public.contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_assign_lead();
