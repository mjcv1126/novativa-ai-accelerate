-- Create a function to get icom_leads data
CREATE OR REPLACE FUNCTION get_icom_leads()
RETURNS TABLE(
  id uuid,
  first_name text,
  last_name text,
  email text,
  phone text,
  country_code text,
  country_name text,
  will_attend boolean,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    id,
    first_name,
    last_name,
    email,
    phone,
    country_code,
    country_name,
    will_attend,
    created_at,
    updated_at
  FROM public.icom_leads
  ORDER BY created_at DESC;
$$;