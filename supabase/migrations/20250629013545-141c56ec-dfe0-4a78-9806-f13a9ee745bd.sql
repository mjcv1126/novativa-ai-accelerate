
-- Agregar campo para números de teléfono adicionales
ALTER TABLE public.contacts 
ADD COLUMN additional_phones text[];

-- Crear índice único compuesto para email (cuando no es null)
CREATE UNIQUE INDEX idx_contacts_unique_email 
ON public.contacts (email) 
WHERE email IS NOT NULL;

-- Crear índice único para el teléfono principal
CREATE UNIQUE INDEX idx_contacts_unique_phone 
ON public.contacts (phone);

-- Comentarios para documentar la estructura de identificación
COMMENT ON COLUMN public.contacts.id IS 'ID único principal del contacto';
COMMENT ON COLUMN public.contacts.email IS 'Email único del contacto (puede ser null)';
COMMENT ON COLUMN public.contacts.phone IS 'Número de teléfono principal único';
COMMENT ON COLUMN public.contacts.additional_phones IS 'Array de números de teléfono adicionales';
