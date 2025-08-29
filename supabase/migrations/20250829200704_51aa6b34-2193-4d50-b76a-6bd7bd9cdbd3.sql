-- Insert sample invoice settings if not exists
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
) VALUES (
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
) ON CONFLICT (org_id) DO NOTHING;

-- Insert sample invoice products
INSERT INTO invoice_products (name, description, price, has_isv, type) VALUES
('Desarrollo de Agente IA', 'Desarrollo personalizado de agente de inteligencia artificial para atención al cliente', 2500.00, true, 'service'),
('NovaChannel Premium', 'Plataforma de gestión de canales de comunicación con IA integrada', 150.00, true, 'service'),
('Consultoría IA', 'Consultoría especializada en implementación de soluciones de inteligencia artificial', 100.00, true, 'service'),
('Desarrollo Web Personalizado', 'Desarrollo de sitio web o aplicación web a medida', 1200.00, true, 'service')
ON CONFLICT DO NOTHING;

-- Insert sample invoices
WITH sample_invoices AS (
  SELECT 
    gen_random_uuid() as id,
    'INV-2025-001' as invoice_number,
    'Juan Pérez Empresas' as contact_name,
    'juan.perez@empresa.com' as contact_email,
    '+504 9999-8888' as contact_phone,
    'Tegucigalpa, Honduras' as contact_address,
    '08011234567890' as contact_rtn,
    CURRENT_DATE as invoice_date,
    CURRENT_DATE + INTERVAL '30 days' as due_date,
    'pending' as status,
    'invoice' as invoice_type,
    2875.00 as subtotal,
    431.25 as isv_amount,
    3306.25 as total,
    'USD' as currency,
    'Honduras' as country,
    'Desarrollo de agente IA personalizado para atención al cliente' as notes,
    'a7b8c9d0-e1f2-3456-7890-123456789abc' as org_id,
    '{"company_name": "Novativa", "company_rtn": "08011998765432"}' as company_settings
  UNION ALL
  SELECT 
    gen_random_uuid() as id,
    'PRF-2025-001' as invoice_number,
    'María González Tech' as contact_name,
    'maria@gonzaleztech.com' as contact_email,
    '+506 8888-7777' as contact_phone,
    'San José, Costa Rica' as contact_address,
    null as contact_rtn,
    CURRENT_DATE - INTERVAL '5 days' as invoice_date,
    CURRENT_DATE + INTERVAL '25 days' as due_date,
    'draft' as status,
    'proforma' as invoice_type,
    1450.00 as subtotal,
    217.50 as isv_amount,
    1667.50 as total,
    'USD' as currency,
    'Costa Rica' as country,
    'Propuesta para desarrollo web personalizado' as notes,
    'a7b8c9d0-e1f2-3456-7890-123456789abc' as org_id,
    '{"company_name": "Novativa", "company_rtn": "08011998765432"}' as company_settings
)
INSERT INTO invoices (
  id, invoice_number, contact_name, contact_email, contact_phone, 
  contact_address, contact_rtn, invoice_date, due_date, status, 
  invoice_type, subtotal, isv_amount, total, currency, country, 
  notes, org_id, company_settings
)
SELECT * FROM sample_invoices
ON CONFLICT DO NOTHING;

-- Insert sample invoice items
WITH invoice_ids AS (
  SELECT id, invoice_number FROM invoices WHERE org_id = 'a7b8c9d0-e1f2-3456-7890-123456789abc'
),
product_ids AS (
  SELECT id, name FROM invoice_products LIMIT 4
)
INSERT INTO invoice_items (
  invoice_id, product_name, description, quantity, unit_price, 
  has_isv, subtotal, isv_amount, total, org_id
)
SELECT 
  i.id,
  'Desarrollo de Agente IA',
  'Desarrollo personalizado de agente de inteligencia artificial',
  1,
  2500.00,
  true,
  2500.00,
  375.00,
  2875.00,
  'a7b8c9d0-e1f2-3456-7890-123456789abc'
FROM invoice_ids i
WHERE i.invoice_number = 'INV-2025-001'
UNION ALL
SELECT 
  i.id,
  'NovaChannel Premium',
  'Suscripción mensual plataforma NovaChannel',
  1,
  150.00,
  true,
  150.00,
  22.50,
  172.50,
  'a7b8c9d0-e1f2-3456-7890-123456789abc'
FROM invoice_ids i
WHERE i.invoice_number = 'INV-2025-001'
UNION ALL
SELECT 
  i.id,
  'Desarrollo Web Personalizado',
  'Desarrollo de sitio web corporativo responsive',
  1,
  1200.00,
  true,
  1200.00,
  180.00,
  1380.00,
  'a7b8c9d0-e1f2-3456-7890-123456789abc'
FROM invoice_ids i
WHERE i.invoice_number = 'PRF-2025-001'
UNION ALL
SELECT 
  i.id,
  'Consultoría IA',
  'Consultoría especializada - 2.5 horas',
  2.5,
  100.00,
  true,
  250.00,
  37.50,
  287.50,
  'a7b8c9d0-e1f2-3456-7890-123456789abc'
FROM invoice_ids i
WHERE i.invoice_number = 'PRF-2025-001'
ON CONFLICT DO NOTHING;