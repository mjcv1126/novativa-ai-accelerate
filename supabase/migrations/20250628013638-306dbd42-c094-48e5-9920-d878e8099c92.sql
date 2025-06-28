
-- Corregir la función get_latest_assignment para tener un search_path seguro
CREATE OR REPLACE FUNCTION public.get_latest_assignment(contact_uuid uuid)
RETURNS TABLE(assigned_user_email text, assigned_at timestamp with time zone)
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT assigned_user_email, assigned_at
  FROM public.lead_assignments
  WHERE contact_id = contact_uuid
  ORDER BY assigned_at DESC
  LIMIT 1;
$$;

-- Corregir la función auto_assign_lead para tener un search_path seguro
CREATE OR REPLACE FUNCTION public.auto_assign_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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
