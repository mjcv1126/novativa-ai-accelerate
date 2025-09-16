-- Agregar los nuevos registros faltantes
INSERT INTO public.conversational_form_leads (
  first_name,
  last_name,
  email,
  phone,
  country_code,
  country_name,
  services_of_interest,
  investment_budget,
  submission_datetime
) VALUES 
  ('Marlon', 'Caballero', 'mar_1126@hotmail.com', '50496472774', '504', 'Honduras', 'Agentes IA', 'Cuento con presupuesto inicial', '2025-09-16T19:57:59.618Z'),
  ('Marlon', 'Caballero', 'mar_1126@hotmail.com', '50496472774', '504', 'Honduras', 'Creación de Jingle', 'Cuento con presupuesto inicial', '2025-09-16T20:07:12.558Z');