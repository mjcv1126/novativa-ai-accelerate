-- Create function to set session email for RLS policies
CREATE OR REPLACE FUNCTION public.set_session_email(email_value text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT set_config('app.current_email', email_value, true);
$$;