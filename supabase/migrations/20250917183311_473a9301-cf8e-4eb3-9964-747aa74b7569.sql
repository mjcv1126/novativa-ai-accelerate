-- Migrate conversational form leads to contacts table
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
  first_name,
  last_name,
  email,
  phone,
  country_code,
  country_name,
  services_of_interest as service_of_interest,
  CASE 
    WHEN investment_budget IS NOT NULL AND investment_budget != '' 
    THEN 'Presupuesto de inversión: ' || investment_budget
    ELSE NULL
  END as notes,
  'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid as org_id,
  created_at
FROM public.conversational_form_leads
WHERE NOT EXISTS (
  SELECT 1 FROM public.contacts c 
  WHERE c.email = conversational_form_leads.email
  AND c.phone = conversational_form_leads.phone
);