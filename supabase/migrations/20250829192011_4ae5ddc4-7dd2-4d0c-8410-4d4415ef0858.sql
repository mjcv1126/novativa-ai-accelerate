-- Crear tablas faltantes para resolver errores de compilación

-- Tabla para adjuntos de contactos
CREATE TABLE IF NOT EXISTS public.contact_attachments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id uuid NOT NULL REFERENCES public.contacts(id) ON DELETE CASCADE,
  file_id uuid NOT NULL REFERENCES public.uploaded_files(id) ON DELETE CASCADE,
  uploaded_by_email text NOT NULL,
  description text,
  org_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Habilitar RLS en contact_attachments
ALTER TABLE public.contact_attachments ENABLE ROW LEVEL SECURITY;

-- Política RLS para contact_attachments
CREATE POLICY "Authenticated users can manage contact attachments" ON public.contact_attachments
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- Trigger para updated_at
CREATE TRIGGER update_contact_attachments_updated_at
  BEFORE UPDATE ON public.contact_attachments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();