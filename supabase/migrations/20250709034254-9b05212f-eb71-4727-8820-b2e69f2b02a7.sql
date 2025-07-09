-- Cambiar el número de factura existente de 000-002-01-00002004 a 000-002-01-00002003
UPDATE invoices 
SET invoice_number = '000-002-01-00002003'
WHERE invoice_number = '000-002-01-00002004';

-- Ajustar el correlativo para que la próxima factura sea 000-002-01-00002004
UPDATE invoice_settings 
SET next_invoice_number = 2004
WHERE id IN (SELECT id FROM invoice_settings LIMIT 1);