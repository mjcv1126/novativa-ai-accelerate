
-- Agregar campo de servicio de interés a la tabla contacts
ALTER TABLE public.contacts ADD COLUMN service_of_interest text;

-- Agregar estado cancelada a las actividades (modificar el tipo de dato si es necesario)
-- Primero verificamos si existe una restricción en activity_type
DO $$ 
BEGIN
    -- Agregar nuevo estado para actividades
    ALTER TABLE public.contact_activities ADD COLUMN status text DEFAULT 'pending';
    
    -- Actualizar actividades existentes basado en is_completed
    UPDATE public.contact_activities 
    SET status = CASE 
        WHEN is_completed = true THEN 'completed'
        ELSE 'pending'
    END;
    
    -- Crear índice para mejor rendimiento en consultas de estado
    CREATE INDEX IF NOT EXISTS idx_contact_activities_status ON public.contact_activities(status);
    CREATE INDEX IF NOT EXISTS idx_contacts_service_of_interest ON public.contacts(service_of_interest);
    CREATE INDEX IF NOT EXISTS idx_contacts_country_name ON public.contacts(country_name);
END $$;
