-- Create function to set org context for admin users
CREATE OR REPLACE FUNCTION public.set_admin_org_context(p_org_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Set the org_id context for admin users
  PERFORM set_config('app.org_id', p_org_id::text, true);
END;
$function$;