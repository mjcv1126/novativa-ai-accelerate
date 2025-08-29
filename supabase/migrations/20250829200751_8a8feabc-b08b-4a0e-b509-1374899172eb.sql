-- Create sample data for invoices system

-- First, ensure we have invoice settings
INSERT INTO invoice_settings (
  org_id,
  company_name,
  company_rtn,
  company_address,
  company_phone,
  company_email,
  isv_rate,
  default_currency,
  default_country,
  invoice_prefix,
  proforma_prefix,
  next_invoice_number,
  next_proforma_number
) 
SELECT 
  'a7b8c9d0-e1f2-3456-7890-123456789abc',
  'Novativa',
  '08011998765432',
  'San José, Costa Rica',
  '+506 1234-5678',
  'soporte@novativa.org',
  0.15,
  'USD',
  'Costa Rica',
  'INV',
  'PRF',
  1001,
  1001
WHERE NOT EXISTS (
  SELECT 1 FROM invoice_settings WHERE org_id = 'a7b8c9d0-e1f2-3456-7890-123456789abc'
);

-- Insert sample invoice products
INSERT INTO invoice_products (name, description, price, has_isv, type)
SELECT * FROM (VALUES
  ('Desarrollo de Agente IA', 'Desarrollo personalizado de agente de inteligencia artificial para atención al cliente', 2500.00, true, 'service'),
  ('NovaChannel Premium', 'Plataforma de gestión de canales de comunicación con IA integrada', 150.00, true, 'service'),
  ('Consultoría IA', 'Consultoría especializada en implementación de soluciones de inteligencia artificial', 100.00, true, 'service'),
  ('Desarrollo Web Personalizado', 'Desarrollo de sitio web o aplicación web a medida', 1200.00, true, 'service')
) AS v(name, description, price, has_isv, type)
WHERE NOT EXISTS (
  SELECT 1 FROM invoice_products WHERE name = v.name
);

-- Insert sample invoices with generated UUIDs
DO $$
DECLARE
  invoice1_id UUID := gen_random_uuid();
  invoice2_id UUID := gen_random_uuid();
BEGIN
  -- Insert first sample invoice
  INSERT INTO invoices (
    id, invoice_number, contact_name, contact_email, contact_phone, 
    contact_address, contact_rtn, invoice_date, due_date, status, 
    invoice_type, subtotal, isv_amount, total, currency, country, 
    notes, org_id, company_settings
  ) VALUES (
    invoice1_id,
    'INV-2025-001',
    'Juan Pérez Empresas',
    'juan.perez@empresa.com',
    '+504 9999-8888',
    'Tegucigalpa, Honduras',
    '08011234567890',
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '30 days',
    'pending',
    'invoice',
    2650.00,
    397.50,
    3047.50,
    'USD',
    'Honduras',
    'Desarrollo de agente IA personalizado para atención al cliente',
    'a7b8c9d0-e1f2-3456-7890-123456789abc',
    '{"company_name": "Novativa", "company_rtn": "08011998765432"}'::jsonb
  );

  -- Insert second sample invoice
  INSERT INTO invoices (
    id, invoice_number, contact_name, contact_email, contact_phone, 
    contact_address, contact_rtn, invoice_date, due_date, status, 
    invoice_type, subtotal, isv_amount, total, currency, country, 
    notes, org_id, company_settings
  ) VALUES (
    invoice2_id,
    'PRF-2025-001',
    'María González Tech',
    'maria@gonzaleztech.com',
    '+506 8888-7777',
    'San José, Costa Rica',
    null,
    CURRENT_DATE - INTERVAL '5 days',
    CURRENT_DATE + INTERVAL '25 days',
    'draft',
    'proforma',
    1450.00,
    217.50,
    1667.50,
    'USD',
    'Costa Rica',
    'Propuesta para desarrollo web personalizado',
    'a7b8c9d0-e1f2-3456-7890-123456789abc',
    '{"company_name": "Novativa", "company_rtn": "08011998765432"}'::jsonb
  );

  -- Insert invoice items for first invoice
  INSERT INTO invoice_items (
    invoice_id, product_name, description, quantity, unit_price, 
    has_isv, subtotal, isv_amount, total, org_id
  ) VALUES 
  (
    invoice1_id,
    'Desarrollo de Agente IA',
    'Desarrollo personalizado de agente de inteligencia artificial',
    1,
    2500.00,
    true,
    2500.00,
    375.00,
    2875.00,
    'a7b8c9d0-e1f2-3456-7890-123456789abc'
  ),
  (
    invoice1_id,
    'NovaChannel Premium',
    'Suscripción mensual plataforma NovaChannel',
    1,
    150.00,
    true,
    150.00,
    22.50,
    172.50,
    'a7b8c9d0-e1f2-3456-7890-123456789abc'
  );

  -- Insert invoice items for second invoice
  INSERT INTO invoice_items (
    invoice_id, product_name, description, quantity, unit_price, 
    has_isv, subtotal, isv_amount, total, org_id
  ) VALUES 
  (
    invoice2_id,
    'Desarrollo Web Personalizado',
    'Desarrollo de sitio web corporativo responsive',
    1,
    1200.00,
    true,
    1200.00,
    180.00,
    1380.00,
    'a7b8c9d0-e1f2-3456-7890-123456789abc'
  ),
  (
    invoice2_id,
    'Consultoría IA',
    'Consultoría especializada - 2.5 horas',
    2.5,
    100.00,
    true,
    250.00,
    37.50,
    287.50,
    'a7b8c9d0-e1f2-3456-7890-123456789abc'
  );

END $$;