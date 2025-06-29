
-- Agregar campo para correos adicionales a la tabla contacts
ALTER TABLE public.contacts 
ADD COLUMN additional_emails text[];

-- Crear índice para mejor rendimiento en búsquedas de correos adicionales
CREATE INDEX IF NOT EXISTS idx_contacts_additional_emails 
ON public.contacts USING GIN (additional_emails);

-- Comentario para documentar el nuevo campo
COMMENT ON COLUMN public.contacts.additional_emails IS 'Array de direcciones de correo electrónico adicionales del contacto';
