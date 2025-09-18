-- Migrar contactos existentes de facturas al CRM
-- Primero, obtener un stage por defecto para estos contactos
DO $$
DECLARE
    default_stage_id UUID;
    nuevo_lead_stage_id UUID;
    default_org_id UUID := '00000000-0000-0000-0000-000000000001'::UUID;
BEGIN
    -- Buscar si existe el stage "Nuevo Lead"
    SELECT id INTO nuevo_lead_stage_id 
    FROM crm_stages 
    WHERE name = 'Nuevo Lead' AND org_id = default_org_id
    LIMIT 1;
    
    -- Si no existe, usar cualquier stage activo o crear uno
    IF nuevo_lead_stage_id IS NULL THEN
        SELECT id INTO default_stage_id 
        FROM crm_stages 
        WHERE is_active = true AND org_id = default_org_id
        ORDER BY position ASC 
        LIMIT 1;
        
        -- Si no hay stages, crear el stage "Cliente Facturado"
        IF default_stage_id IS NULL THEN
            INSERT INTO crm_stages (org_id, name, description, color, position, is_active)
            VALUES (default_org_id, 'Cliente Facturado', 'Contactos migrados desde facturas existentes', '#10B981', 1, true)
            RETURNING id INTO default_stage_id;
        ELSE
            default_stage_id := nuevo_lead_stage_id;
        END IF;
    ELSE
        default_stage_id := nuevo_lead_stage_id;
    END IF;

    -- Insertar contactos únicos desde facturas al CRM
    INSERT INTO contacts (
        org_id,
        first_name,
        last_name,
        email,
        phone,
        company,
        country_code,
        country_name,
        stage_id,
        rtn,
        address,
        service_of_interest,
        notes,
        created_at,
        updated_at
    )
    SELECT DISTINCT
        default_org_id,
        -- Intentar separar nombre y apellido del contact_name
        CASE 
            WHEN position(' ' IN contact_name) > 0 
            THEN split_part(contact_name, ' ', 1)
            ELSE contact_name
        END as first_name,
        CASE 
            WHEN position(' ' IN contact_name) > 0 
            THEN substring(contact_name from position(' ' IN contact_name) + 1)
            ELSE ''
        END as last_name,
        contact_email,
        COALESCE(contact_phone, ''),
        contact_name, -- usar contact_name como company
        CASE 
            WHEN country = 'Honduras' THEN 'HN'
            WHEN country = 'Costa Rica' THEN 'CR'
            WHEN country = 'Guatemala' THEN 'GT'
            WHEN country = 'El Salvador' THEN 'SV'
            WHEN country = 'Nicaragua' THEN 'NI'
            WHEN country = 'Panama' THEN 'PA'
            ELSE 'HN'
        END as country_code,
        COALESCE(country, 'Honduras'),
        default_stage_id,
        contact_rtn,
        contact_address,
        'Facturación',
        'Contacto migrado desde módulo de facturación',
        now(),
        now()
    FROM invoices i
    WHERE contact_name IS NOT NULL 
      AND contact_name != ''
      AND contact_phone IS NOT NULL 
      AND contact_phone != ''
      AND NOT EXISTS (
          SELECT 1 FROM contacts c 
          WHERE (c.email = i.contact_email AND i.contact_email IS NOT NULL)
             OR (c.phone = i.contact_phone AND i.contact_phone IS NOT NULL)
      )
    ON CONFLICT (org_id, phone) DO NOTHING;

    -- Actualizar las facturas para vincularlas con los contactos del CRM
    UPDATE invoices 
    SET contact_id = c.id
    FROM contacts c
    WHERE invoices.contact_id IS NULL
      AND (
          (invoices.contact_email = c.email AND invoices.contact_email IS NOT NULL AND c.email IS NOT NULL)
          OR (invoices.contact_phone = c.phone AND invoices.contact_phone IS NOT NULL)
      );

END $$;