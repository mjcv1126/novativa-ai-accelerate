-- Revert the automatic migration and add proper CRM constraints
-- First, remove any leads that were automatically migrated
DELETE FROM public.contacts 
WHERE org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid;

-- Add unique constraints to prevent duplicates in CRM
ALTER TABLE public.contacts 
ADD CONSTRAINT contacts_email_org_unique UNIQUE (email, org_id);

ALTER TABLE public.contacts 
ADD CONSTRAINT contacts_phone_org_unique UNIQUE (phone, org_id);

-- Add some sample CRM data for testing
INSERT INTO public.contacts (
  first_name,
  last_name,
  email,
  phone,
  country_code,
  country_name,
  service_of_interest,
  notes,
  org_id
) VALUES 
(
  'Juan Carlos',
  'Rodriguez',
  'juan.rodriguez@empresa.com',
  '50412345678',
  '+504',
  'Honduras',
  'IA Coding',
  'Cliente potencial de automatización',
  'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid
),
(
  'Maria Elena',
  'Gonzalez',
  'maria.gonzalez@startup.com',
  '50487654321',
  '+504',
  'Honduras',
  'Social Media AI',
  'Interesada en gestión de redes sociales',
  'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid
),
(
  'Carlos Alberto',
  'Martinez',
  'carlos.martinez@negocio.com',
  '+50433221100',
  '+504',
  'Honduras',
  'Contact Center',
  'Necesita centro de contacto',
  'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid
);

-- Create a default stage for new CRM contacts
INSERT INTO public.crm_stages (
  name,
  description,
  color,
  position,
  org_id
) VALUES 
(
  'Nuevo Lead',
  'Contactos recién agregados al CRM',
  '#3B82F6',
  1,
  'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid
) ON CONFLICT DO NOTHING;

-- Set the default stage for contacts without a stage
UPDATE public.contacts 
SET stage_id = (
  SELECT id FROM public.crm_stages 
  WHERE org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid 
  AND name = 'Nuevo Lead'
  LIMIT 1
)
WHERE stage_id IS NULL 
AND org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid;