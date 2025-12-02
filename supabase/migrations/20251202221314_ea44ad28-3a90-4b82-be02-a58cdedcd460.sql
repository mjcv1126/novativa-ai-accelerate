-- Actualizar solo la factura actual (00002056) con el nuevo CAI
UPDATE public.invoices 
SET company_settings = company_settings || jsonb_build_object(
  'cai', '44FFFF-FCA5AC-A74EE0-63BE03-090926-EE'
)
WHERE id = 'c97fb2a4-8851-4b0c-ab87-3cd5f202bfe9';

-- Actualizar la configuración para futuras facturas
UPDATE public.invoice_settings 
SET 
  sar_cai = '44FFFF-FCA5AC-A74EE0-63BE03-090926-EE',
  updated_at = now();