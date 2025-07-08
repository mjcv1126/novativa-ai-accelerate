-- Eliminar todas las facturas e items del sistema
DELETE FROM invoice_items;
DELETE FROM invoices;

-- Reiniciar correlativos
UPDATE invoice_settings 
SET next_invoice_number = 1,
    next_proforma_number = 1
WHERE id IN (SELECT id FROM invoice_settings LIMIT 1);

-- Actualizar la función para manejar diferente numeración de proformas
CREATE OR REPLACE FUNCTION public.generate_invoice_number(invoice_type text DEFAULT 'invoice'::text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
    settings_row invoice_settings%ROWTYPE;
    next_number integer;
    formatted_number text;
BEGIN
    -- Obtener configuración actual
    SELECT * INTO settings_row FROM invoice_settings LIMIT 1;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'No se encontraron configuraciones de facturación';
    END IF;
    
    -- Determinar el siguiente número según el tipo
    IF invoice_type = 'proforma' THEN
        next_number := settings_row.next_proforma_number;
        formatted_number := 'PRF-' || LPAD(next_number::text, 6, '0');
        
        -- Actualizar el siguiente número de proforma
        UPDATE invoice_settings 
        SET next_proforma_number = next_proforma_number + 1
        WHERE id = settings_row.id;
    ELSE
        next_number := settings_row.next_invoice_number;
        formatted_number := '000-002-01-' || LPAD(next_number::text, 8, '0');
        
        -- Actualizar el siguiente número de factura
        UPDATE invoice_settings 
        SET next_invoice_number = next_invoice_number + 1
        WHERE id = settings_row.id;
    END IF;
    
    RETURN formatted_number;
END;
$function$;