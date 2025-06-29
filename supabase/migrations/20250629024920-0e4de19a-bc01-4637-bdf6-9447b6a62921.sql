
-- Corregir la función para tener un search_path seguro
CREATE OR REPLACE FUNCTION public.update_tidycal_automation_rules_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql 
SET search_path = public
SECURITY DEFINER;
