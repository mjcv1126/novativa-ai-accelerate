DO $$
DECLARE
  v_settings_id uuid;
  v_desired_seq int := 2007;
  v_invoice_number text := '000-002-01-' || LPAD(2007::text, 8, '0');
  v_exists bool;
BEGIN
  -- Bloquear la fila de configuración para evitar carreras
  SELECT id
  INTO v_settings_id
  FROM public.invoice_settings
  ORDER BY created_at ASC
  LIMIT 1
  FOR UPDATE;

  IF v_settings_id IS NULL THEN
    RAISE EXCEPTION 'No se encontró registro en invoice_settings';
  END IF;

  -- Verificar que el número esté libre para facturas
  SELECT EXISTS (
    SELECT 1
    FROM public.invoices
    WHERE invoice_number = v_invoice_number
      AND invoice_type = 'invoice'
  )
  INTO v_exists;

  IF v_exists THEN
    RAISE EXCEPTION 'El número % ya está en uso por una factura. No se puede ajustar el correlativo.', v_invoice_number;
  END IF;

  -- Ajustar el siguiente correlativo para facturas
  UPDATE public.invoice_settings
  SET next_invoice_number = v_desired_seq
  WHERE id = v_settings_id;

  RAISE NOTICE 'next_invoice_number ajustado a %', v_desired_seq;
END $$;

-- Verificación: mostrar el correlativo configurado
SELECT
  next_invoice_number,
  '000-002-01-' || LPAD(next_invoice_number::text, 8, '0') AS next_invoice_number_formatted
FROM public.invoice_settings
ORDER BY created_at ASC
LIMIT 1;