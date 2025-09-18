-- Eliminar el trigger problemático que intenta acceder a auth.users
DROP TRIGGER IF EXISTS trigger_auto_assign_lead ON public.contacts;

-- Modificar la función auto_assign_lead para no usar auth.users
CREATE OR REPLACE FUNCTION public.auto_assign_lead()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  current_user_email TEXT;
BEGIN
  -- Usar email de sesión configurado o fallback a default
  current_user_email := COALESCE(
    nullif(current_setting('app.current_email', true), ''), 
    'soporte@novativa.org'
  );
  
  -- Si es un nuevo lead (INSERT)
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.lead_assignments (contact_id, assigned_user_email, assigned_by_email, notes, org_id)
    VALUES (NEW.id, current_user_email, current_user_email, 'Auto-asignado al crear el lead', NEW.org_id);
    RETURN NEW;
  END IF;
  
  -- Si es una actualización
  IF TG_OP = 'UPDATE' THEN
    INSERT INTO public.lead_assignments (contact_id, assigned_user_email, assigned_by_email, notes, org_id)
    VALUES (NEW.id, current_user_email, current_user_email, 'Reasignado al modificar el lead', NEW.org_id);
    RETURN NEW;
  END IF;
  
  RETURN NULL;
END;
$$;

-- Recrear el trigger con la función actualizada
CREATE TRIGGER trigger_auto_assign_lead
    AFTER INSERT OR UPDATE ON public.contacts
    FOR EACH ROW
    EXECUTE FUNCTION public.auto_assign_lead();