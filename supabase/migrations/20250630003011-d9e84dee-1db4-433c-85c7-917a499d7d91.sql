
-- Solucionar el problema de borrado de contactos removiendo la restricción de foreign key problemática
ALTER TABLE tidycal_processed_bookings DROP CONSTRAINT IF EXISTS tidycal_processed_bookings_contact_id_fkey;

-- Recrear la restricción con CASCADE para permitir borrado
ALTER TABLE tidycal_processed_bookings 
ADD CONSTRAINT tidycal_processed_bookings_contact_id_fkey 
FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE;

-- Crear tabla para adjuntos de contactos
CREATE TABLE contact_attachments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  file_id UUID NOT NULL REFERENCES uploaded_files(id) ON DELETE CASCADE,
  uploaded_by_email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  description TEXT
);

-- Habilitar realtime para las tablas del CRM
ALTER TABLE contacts REPLICA IDENTITY FULL;
ALTER TABLE contact_activities REPLICA IDENTITY FULL;
ALTER TABLE contact_attachments REPLICA IDENTITY FULL;
ALTER TABLE crm_stages REPLICA IDENTITY FULL;

-- Añadir las tablas a la publicación de realtime
ALTER PUBLICATION supabase_realtime ADD TABLE contacts;
ALTER PUBLICATION supabase_realtime ADD TABLE contact_activities;
ALTER PUBLICATION supabase_realtime ADD TABLE contact_attachments;
ALTER PUBLICATION supabase_realtime ADD TABLE crm_stages;
