-- Actualizar el correlativo para que la próxima factura sea 000-002-01-00002004
UPDATE invoice_settings 
SET next_invoice_number = 2004
WHERE id IN (SELECT id FROM invoice_settings LIMIT 1);