-- Plan de Recuperación Completo del CRM
-- Corrección de org_id y restauración de datos

-- 1. Corregir org_id de contactos migrados de facturas
UPDATE contacts 
SET org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid
WHERE org_id = '00000000-0000-0000-0000-000000000001'::uuid;

-- 2. Corregir org_id de etapas CRM para que todas tengan el correcto
UPDATE crm_stages 
SET org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid
WHERE org_id != 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid 
AND is_active = true;

-- 3. Restaurar nombres correctos de empresas basándose en facturas
-- Restaurar Distribuidora Platino
UPDATE contacts 
SET company = 'Distribuidora Platino S.A de C.V.'
WHERE id = 'fe1c2b3a-4d5e-6f7a-8b9c-0d1e2f3a4b5c'::uuid;

-- 4. Corregir org_id en contact_activities para contactos migrados
UPDATE contact_activities 
SET org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid
WHERE contact_id IN (
    SELECT id FROM contacts 
    WHERE org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid
) AND org_id != 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid;

-- 5. Corregir org_id en lead_assignments para contactos migrados
UPDATE lead_assignments 
SET org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid
WHERE contact_id IN (
    SELECT id FROM contacts 
    WHERE org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid
) AND org_id != 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid;

-- 6. Corregir org_id en contact_attachments para contactos migrados
UPDATE contact_attachments 
SET org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid
WHERE contact_id IN (
    SELECT id FROM contacts 
    WHERE org_id = 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid
) AND org_id != 'd010fb06-7e97-4cef-90b6-be84942ac1d1'::uuid;