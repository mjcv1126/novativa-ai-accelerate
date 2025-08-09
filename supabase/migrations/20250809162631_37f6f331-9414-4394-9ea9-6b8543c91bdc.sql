
-- Crea o reemplaza la función para cambiar el tipo de documento y renumerar de forma atómica
CREATE OR REPLACE FUNCTION public.change_invoice_type(p_invoice_id uuid, p_new_type text)
RETURNS public.invoices
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_invoice public.invoices%ROWTYPE;
  v_settings public.invoice_settings%ROWTYPE;
  v_current_type text;
  v_old_number text;
  v_old_seq int;
  v_new_number text;
BEGIN
  IF p_new_type NOT IN ('invoice','proforma') THEN
    RAISE EXCEPTION 'Tipo inválido: % (usar "invoice" o "proforma")', p_new_type;
  END IF;

  -- Bloquear la factura objetivo
  SELECT * INTO v_invoice
  FROM public.invoices
  WHERE id = p_invoice_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Factura no encontrada con id=%', p_invoice_id;
  END IF;

  v_current_type := v_invoice.invoice_type;

  -- Si no hay cambio de tipo, devolver tal cual
  IF v_current_type = p_new_type THEN
    RETURN v_invoice;
  END IF;

  -- Bloquear configuración para evitar carreras con los correlativos
  SELECT *
  INTO v_settings
  FROM public.invoice_settings
  ORDER BY created_at ASC
  LIMIT 1
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'No se encontraron configuraciones de facturación (invoice_settings)';
  END IF;

  v_old_number := v_invoice.invoice_number;

  IF v_current_type = 'invoice' AND p_new_type = 'proforma' THEN
    -- Intentar liberar el último correlativo de factura si corresponde
    BEGIN
      v_old_seq := RIGHT(v_old_number, 8)::int;
      IF v_settings.next_invoice_number = v_old_seq + 1 THEN
        UPDATE public.invoice_settings
        SET next_invoice_number = v_old_seq
        WHERE id = v_settings.id;
        v_settings.next_invoice_number := v_old_seq;
      END IF;
    EXCEPTION WHEN OTHERS THEN
      -- Ignorar errores de parseo/formato
      NULL;
    END;

    -- Generar nuevo número de proforma
    SELECT public.generate_invoice_number('proforma') INTO v_new_number;

  ELSIF v_current_type = 'proforma' AND p_new_type = 'invoice' THEN
    -- Intentar liberar el último correlativo de proforma si corresponde
    BEGIN
      v_old_seq := RIGHT(v_old_number, 6)::int;
      IF v_settings.next_proforma_number = v_old_seq + 1 THEN
        UPDATE public.invoice_settings
        SET next_proforma_number = v_old_seq
        WHERE id = v_settings.id;
        v_settings.next_proforma_number := v_old_seq;
      END IF;
    EXCEPTION WHEN OTHERS THEN
      -- Ignorar errores de parseo/formato
      NULL;
    END;

    -- Generar nuevo número de factura
    SELECT public.generate_invoice_number('invoice') INTO v_new_number;
  ELSE
    RAISE EXCEPTION 'Transición de tipo no soportada: % -> %', v_current_type, p_new_type;
  END IF;

  -- Aplicar cambio en la factura
  UPDATE public.invoices
  SET invoice_type = p_new_type,
      invoice_number = v_new_number,
      updated_at = now()
  WHERE id = p_invoice_id
  RETURNING * INTO v_invoice;

  RETURN v_invoice;
END;
$function$;
