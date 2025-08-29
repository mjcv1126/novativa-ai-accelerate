-- Resolver warnings de seguridad menores
-- Fijar search_path en funciones de seguridad existentes

-- Actualizar función is_current_user_admin para fijar search_path
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM app_users au 
    JOIN auth.users u ON u.email = au.email 
    WHERE u.id = auth.uid() 
      AND au.role = 'admin' 
      AND au.is_active = true
  );
$$;

-- Actualizar función get_current_user_email para fijar search_path
CREATE OR REPLACE FUNCTION public.get_current_user_email()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT email FROM auth.users WHERE id = auth.uid();
$$;