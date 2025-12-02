-- Actualizar el correlativo de la factura específica
UPDATE public.invoices 
SET invoice_number = '000-002-01-00002056',
    updated_at = now()
WHERE id = 'c97fb2a4-8851-4b0c-ab87-3cd5f202bfe9';

-- Actualizar el contador para que la siguiente factura sea 00002057
UPDATE public.invoice_settings 
SET next_invoice_number = 2057,
    updated_at = now();