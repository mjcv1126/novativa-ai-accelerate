
-- Habilitar RLS en las tablas de TidyCal
ALTER TABLE public.tidycal_processed_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tidycal_sync_logs ENABLE ROW LEVEL SECURITY;

-- Crear políticas de seguridad para tidycal_processed_bookings
-- Solo permitir acceso a usuarios autenticados (admins del sistema)
CREATE POLICY "Allow authenticated users to view processed bookings" 
ON public.tidycal_processed_bookings 
FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert processed bookings" 
ON public.tidycal_processed_bookings 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update processed bookings" 
ON public.tidycal_processed_bookings 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Crear políticas de seguridad para tidycal_sync_logs
-- Solo permitir acceso a usuarios autenticados (admins del sistema)
CREATE POLICY "Allow authenticated users to view sync logs" 
ON public.tidycal_sync_logs 
FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert sync logs" 
ON public.tidycal_sync_logs 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update sync logs" 
ON public.tidycal_sync_logs 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Permitir acceso a las funciones edge de Supabase usando el service role
-- Esto es necesario para que las funciones de sincronización automática funcionen
CREATE POLICY "Allow service role full access to processed bookings" 
ON public.tidycal_processed_bookings 
FOR ALL 
USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Allow service role full access to sync logs" 
ON public.tidycal_sync_logs 
FOR ALL 
USING (auth.jwt() ->> 'role' = 'service_role');
