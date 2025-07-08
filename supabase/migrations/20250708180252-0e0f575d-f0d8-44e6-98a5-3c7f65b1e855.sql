-- Reiniciar el correlativo de facturas para que la próxima sea 000-002-01-00002001
UPDATE invoice_settings 
SET next_invoice_number = 2001
WHERE id IN (SELECT id FROM invoice_settings LIMIT 1);