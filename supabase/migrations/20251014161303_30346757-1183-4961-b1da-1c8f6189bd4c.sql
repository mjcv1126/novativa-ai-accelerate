-- Actualizar función generate_invoice_number para consultar la última factura creada
CREATE OR REPLACE FUNCTION public.generate_invoice_number(invoice_type text DEFAULT 'invoice'::text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
    settings_row invoice_settings%ROWTYPE;
    last_invoice_number text;
    last_number integer;
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
        -- Para proformas, consultar la última proforma creada
        SELECT invoice_number INTO last_invoice_number
        FROM invoices
        WHERE invoice_type = 'proforma'
        ORDER BY created_at DESC
        LIMIT 1;
        
        IF last_invoice_number IS NOT NULL THEN
            -- Extraer el número de los últimos 6 dígitos (PRF-000001)
            last_number := RIGHT(last_invoice_number, 6)::integer;
            next_number := last_number + 1;
        ELSE
            -- Si no hay proformas, usar el contador
            next_number := settings_row.next_proforma_number;
        END IF;
        
        formatted_number := 'PRF-' || LPAD(next_number::text, 6, '0');
        
        -- Actualizar el contador para mantener sincronización
        UPDATE invoice_settings 
        SET next_proforma_number = next_number + 1
        WHERE id = settings_row.id;
        
    ELSE
        -- Para facturas, consultar la última factura creada
        SELECT invoice_number INTO last_invoice_number
        FROM invoices
        WHERE invoice_type = 'invoice'
        ORDER BY created_at DESC
        LIMIT 1;
        
        IF last_invoice_number IS NOT NULL THEN
            -- Extraer el número de los últimos 8 dígitos (000-002-01-00000001)
            last_number := RIGHT(last_invoice_number, 8)::integer;
            next_number := last_number + 1;
        ELSE
            -- Si no hay facturas, usar el contador
            next_number := settings_row.next_invoice_number;
        END IF;
        
        formatted_number := '000-002-01-' || LPAD(next_number::text, 8, '0');
        
        -- Actualizar el contador para mantener sincronización
        UPDATE invoice_settings 
        SET next_invoice_number = next_number + 1
        WHERE id = settings_row.id;
    END IF;
    
    RETURN formatted_number;
END;
$function$;