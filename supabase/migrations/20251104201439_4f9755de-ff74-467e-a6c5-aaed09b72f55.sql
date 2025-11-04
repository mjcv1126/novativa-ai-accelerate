-- Crear enums para el sistema de tickets
CREATE TYPE request_type_enum AS ENUM (
  'banner',
  'post',
  'video',
  'otro'
);

CREATE TYPE priority_level_enum AS ENUM (
  'alta',
  'media',
  'baja'
);

CREATE TYPE ticket_status_enum AS ENUM (
  'nuevo',
  'en_revision',
  'en_progreso',
  'esperando_informacion',
  'completado',
  'cancelado'
);

-- Crear tabla de perfiles de usuario
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  company_name TEXT,
  applicant_role TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Trigger para updated_at en user_profiles
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS para user_profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON public.user_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM app_users au
      WHERE au.email = (SELECT email FROM auth.users WHERE id = auth.uid())
      AND au.role IN ('admin', 'super_admin')
      AND au.is_active = true
    )
  );

-- Crear tabla principal de tickets
CREATE TABLE public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Información de contacto
  company_name TEXT NOT NULL,
  applicant_name TEXT NOT NULL,
  applicant_role TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT NOT NULL,
  
  -- Solicitud
  request_type request_type_enum NOT NULL,
  request_type_other TEXT,
  content_objective TEXT NOT NULL,
  
  -- Especificaciones técnicas
  dimensions TEXT,
  delivery_format TEXT,
  final_use TEXT,
  delivery_date DATE,
  
  -- Referencias visuales
  concept_description TEXT NOT NULL,
  reference_url TEXT,
  reference_feedback TEXT NOT NULL,
  reference_images JSONB DEFAULT '[]'::jsonb,
  
  -- Archivos adjuntos
  attached_files JSONB DEFAULT '[]'::jsonb,
  
  -- Urgencia y estado
  priority_level priority_level_enum NOT NULL,
  status ticket_status_enum DEFAULT 'nuevo',
  
  -- Aprobaciones
  confirmed_final_info BOOLEAN DEFAULT true,
  understands_changes BOOLEAN DEFAULT true,
  
  -- Metadata
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  notes TEXT,
  internal_notes TEXT,
  estimated_completion_date DATE,
  actual_completion_date DATE,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Función para generar número de ticket
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  next_number INTEGER;
  ticket_number TEXT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(ticket_number FROM 'TKT-(.*)') AS INTEGER)), 0) + 1
  INTO next_number
  FROM public.tickets;
  
  ticket_number := 'TKT-' || LPAD(next_number::TEXT, 6, '0');
  RETURN ticket_number;
END;
$$;

-- Trigger para auto-generar número de ticket
CREATE OR REPLACE FUNCTION set_ticket_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.ticket_number IS NULL THEN
    NEW.ticket_number := generate_ticket_number();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER before_insert_ticket_number
  BEFORE INSERT ON public.tickets
  FOR EACH ROW
  EXECUTE FUNCTION set_ticket_number();

-- Trigger para updated_at en tickets
CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON public.tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS para tickets
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tickets"
  ON public.tickets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all tickets"
  ON public.tickets FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM app_users au
      WHERE au.email = (SELECT email FROM auth.users WHERE id = auth.uid())
      AND au.role IN ('admin', 'super_admin')
      AND au.is_active = true
    )
  );

CREATE POLICY "System can insert tickets"
  ON public.tickets FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update tickets"
  ON public.tickets FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM app_users au
      WHERE au.email = (SELECT email FROM auth.users WHERE id = auth.uid())
      AND au.role IN ('admin', 'super_admin')
      AND au.is_active = true
    )
  );

CREATE POLICY "Admins can delete tickets"
  ON public.tickets FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM app_users au
      WHERE au.email = (SELECT email FROM auth.users WHERE id = auth.uid())
      AND au.role IN ('admin', 'super_admin')
      AND au.is_active = true
    )
  );

-- Crear tabla de historial de tickets
CREATE TABLE public.ticket_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID REFERENCES public.tickets(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  field_changed TEXT,
  old_value TEXT,
  new_value TEXT,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.ticket_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view ticket history"
  ON public.ticket_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM app_users au
      WHERE au.email = (SELECT email FROM auth.users WHERE id = auth.uid())
      AND au.role IN ('admin', 'super_admin')
      AND au.is_active = true
    )
  );

CREATE POLICY "Admins can insert ticket history"
  ON public.ticket_history FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM app_users au
      WHERE au.email = (SELECT email FROM auth.users WHERE id = auth.uid())
      AND au.role IN ('admin', 'super_admin')
      AND au.is_active = true
    )
  );

-- Crear buckets de storage
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('reference-images', 'reference-images', true),
  ('ticket-attachments', 'ticket-attachments', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de storage para reference-images
CREATE POLICY "Authenticated users can upload reference images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'reference-images' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Anyone can view reference images"
ON storage.objects FOR SELECT
USING (bucket_id = 'reference-images');

CREATE POLICY "Admins can delete reference images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'reference-images' AND
  EXISTS (
    SELECT 1 FROM app_users au
    WHERE au.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    AND au.role IN ('admin', 'super_admin')
    AND au.is_active = true
  )
);

-- Políticas de storage para ticket-attachments
CREATE POLICY "Authenticated users can upload ticket attachments"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'ticket-attachments' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Anyone can view ticket attachments"
ON storage.objects FOR SELECT
USING (bucket_id = 'ticket-attachments');

CREATE POLICY "Admins can delete ticket attachments"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'ticket-attachments' AND
  EXISTS (
    SELECT 1 FROM app_users au
    WHERE au.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    AND au.role IN ('admin', 'super_admin')
    AND au.is_active = true
  )
);