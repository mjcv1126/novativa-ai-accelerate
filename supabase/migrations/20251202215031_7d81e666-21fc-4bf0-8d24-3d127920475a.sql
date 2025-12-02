-- Actualizar facturas existentes (excepto la actual) con los datos SAR ANTIGUOS
UPDATE public.invoices 
SET company_settings = company_settings || jsonb_build_object(
  'cai', '26D174-BF2409-E904E0-63BE03-0909C5-B3',
  'rango_autorizado', '000-002-01-00002001 - 000-002-01-00002055',
  'fecha_limite_emision', '13/11/2025'
)
WHERE id != 'c97fb2a4-8851-4b0c-ab87-3cd5f202bfe9'
  AND invoice_type = 'invoice';

-- Actualizar la factura actual (00002056) con los NUEVOS datos SAR
UPDATE public.invoices 
SET company_settings = company_settings || jsonb_build_object(
  'cai', '26D174-BF2409-E904E0-63BE03-0909C5-B3',
  'rango_autorizado', '000-002-01-00002056 - 000-002-01-00002105',
  'fecha_limite_emision', '02/12/2026'
)
WHERE id = 'c97fb2a4-8851-4b0c-ab87-3cd5f202bfe9';

-- Agregar columnas SAR a invoice_settings si no existen (para futuras facturas)
ALTER TABLE public.invoice_settings 
ADD COLUMN IF NOT EXISTS sar_cai text DEFAULT '26D174-BF2409-E904E0-63BE03-0909C5-B3',
ADD COLUMN IF NOT EXISTS sar_rango_autorizado text DEFAULT '000-002-01-00002056 - 000-002-01-00002105',
ADD COLUMN IF NOT EXISTS sar_fecha_limite_emision text DEFAULT '02/12/2026';

-- Actualizar la configuración con los nuevos valores SAR
UPDATE public.invoice_settings 
SET 
  sar_cai = '26D174-BF2409-E904E0-63BE03-0909C5-B3',
  sar_rango_autorizado = '000-002-01-00002056 - 000-002-01-00002105',
  sar_fecha_limite_emision = '02/12/2026',
  updated_at = now();