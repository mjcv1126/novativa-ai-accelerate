-- Actualizar configuración general de facturas
UPDATE public.invoice_settings 
SET 
  company_rtn = '05121996012974',
  company_address = 'San Pedro Sula',
  company_phone = '+504 9647-2774',
  updated_at = now()
WHERE id = '18ded77c-7496-4054-8c36-3938f730d4e8';

-- Actualizar facturas existentes para reflejar los nuevos datos
UPDATE public.invoices 
SET company_settings = jsonb_set(
  jsonb_set(
    jsonb_set(
      COALESCE(company_settings, '{}'::jsonb),
      '{company_rtn}', '"05121996012974"'
    ),
    '{company_address}', '"San Pedro Sula"'
  ),
  '{company_phone}', '"+504 9647-2774"'
),
updated_at = now();