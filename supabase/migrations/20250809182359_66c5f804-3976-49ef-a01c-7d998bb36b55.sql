-- Cambio manual del número de factura específico
UPDATE public.invoices 
SET invoice_number = 'PRF-000005',
    invoice_type = 'proforma',
    updated_at = now()
WHERE invoice_number = '000-002-01-00002007';