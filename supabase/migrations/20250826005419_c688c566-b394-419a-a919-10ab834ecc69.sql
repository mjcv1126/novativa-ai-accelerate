-- Eliminar políticas actuales de uploaded_files
DROP POLICY IF EXISTS "Admins can view all uploaded files" ON public.uploaded_files;
DROP POLICY IF EXISTS "Admins can create uploaded files" ON public.uploaded_files;
DROP POLICY IF EXISTS "Admins can update uploaded files" ON public.uploaded_files;
DROP POLICY IF EXISTS "Admins can delete uploaded files" ON public.uploaded_files;

-- Crear nuevas políticas más flexibles para el sistema admin
CREATE POLICY "Allow all operations for uploaded files" 
ON public.uploaded_files 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Verificar que RLS esté habilitado
ALTER TABLE public.uploaded_files ENABLE ROW LEVEL SECURITY;