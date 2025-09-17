-- Migrate conversational form leads to contacts table (avoiding duplicates)
INSERT INTO public.contacts (
  first_name,
  last_name,
  email,
  phone,
  country_code,
  country_name,
  service_of_interest,
  notes,
  org_id,
  created_at
)
SELECT 
  cfl.first_name,
  cfl.last_name,
  cfl.email,
  cfl.phone,
  cfl.country_code,
  cfl.country_name,
  cfl.services_of_interest as service_of_interest,
  CASE 
    WHEN cfl.investment_budget IS NOT NULL AND cfl.investment_budget != '' 
    THEN 'Presupuesto de inversión: ' || cfl.investment_budget
    ELSE NULL
  END as notes,
  'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid as org_id,
  cfl.created_at
FROM public.conversational_form_leads cfl
WHERE NOT EXISTS (
  SELECT 1 FROM public.contacts c 
  WHERE c.email = cfl.email
)
ON CONFLICT (email) DO NOTHING;