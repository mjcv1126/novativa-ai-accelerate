
-- Arreglar las políticas RLS para la tabla lead_assignments
-- Primero eliminamos las políticas existentes que están causando problemas
DROP POLICY IF EXISTS "Users can view all lead assignments" ON public.lead_assignments;
DROP POLICY IF EXISTS "Users can create lead assignments" ON public.lead_assignments;
DROP POLICY IF EXISTS "Users can update lead assignments" ON public.lead_assignments;

-- Crear políticas más permisivas que permitan operaciones a usuarios autenticados
CREATE POLICY "Allow all operations for authenticated users" 
  ON public.lead_assignments 
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- También permitir operaciones para usuarios anónimos (ya que estamos usando localStorage auth)
CREATE POLICY "Allow all operations for anon" 
  ON public.lead_assignments 
  FOR ALL 
  TO anon
  USING (true)
  WITH CHECK (true);
