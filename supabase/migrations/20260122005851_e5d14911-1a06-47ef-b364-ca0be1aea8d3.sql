-- Create briefs table
CREATE TABLE public.briefs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Sección 1: Información General
  empresa TEXT,
  contacto TEXT NOT NULL,
  cargo TEXT,
  telefono TEXT NOT NULL,
  correo TEXT NOT NULL,
  ubicacion TEXT,
  horario TEXT,
  sitio_web TEXT,
  instagram TEXT,
  facebook TEXT,
  tiktok TEXT,
  youtube TEXT,
  linkedin TEXT,
  
  -- Sección 2: Descripción de la empresa
  que_hace TEXT,
  desde_cuando TEXT,
  problema_resuelve TEXT,
  tipo_clientes TEXT[],
  
  -- Sección 3: Propuesta de valor
  propuesta_valor TEXT,
  diferenciador_1 TEXT,
  diferenciador_2 TEXT,
  diferenciador_3 TEXT,
  resultado_promesa TEXT,
  
  -- Sección 4: Por qué contratarían
  mas_confianza TEXT,
  objeciones TEXT,
  pruebas TEXT[],
  pruebas_detalle TEXT,
  
  -- Sección 5: Productos/Servicios (JSON array)
  productos JSONB DEFAULT '[]'::jsonb,
  combos TEXT,
  promociones TEXT,
  
  -- Sección 6: Producto estrella
  producto_estrella TEXT,
  porque_mas_vendido TEXT,
  mas_conviene TEXT,
  objetivo_mes TEXT,
  
  -- Sección 7: Objetivos de redes
  objetivos_redes TEXT[],
  objetivo_uno TEXT,
  meta_concreta TEXT,
  
  -- Sección 8: Buyer Persona
  edad_cliente TEXT,
  genero_cliente TEXT,
  ubicacion_cliente TEXT,
  nivel_economico TEXT,
  trabajo_estilo_vida TEXT,
  problema_cliente TEXT,
  cliente_valora TEXT[],
  miedos_dudas TEXT,
  cliente_pasa_tiempo TEXT[],
  frase_tipica TEXT,
  
  -- Sección 9: Competencia
  competidor_1 TEXT,
  competidor_2 TEXT,
  competidor_3 TEXT,
  que_gusta_competencia TEXT,
  que_mal_competencia TEXT,
  cuentas_inspiran TEXT,
  
  -- Sección 10: Identidad y estilo
  tono_marca TEXT[],
  colores_marca TEXT,
  tipografias TEXT,
  logo_png TEXT,
  tono_prohibido TEXT,
  
  -- Sección 11: Recursos disponibles
  tiene_fotos_videos TEXT,
  tiene_grabador TEXT,
  tiene_testimonios TEXT,
  tiene_catalogo TEXT,
  drive_link TEXT,
  
  -- Sección 12: Presupuesto de publicidad
  invertir_pauta TEXT,
  presupuesto_mensual TEXT,
  producto_pautar TEXT
);

-- Enable RLS
ALTER TABLE public.briefs ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (anyone can submit a brief)
CREATE POLICY "Anyone can create briefs" 
ON public.briefs 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admin read access
CREATE POLICY "Admins can read briefs" 
ON public.briefs 
FOR SELECT 
USING (public.is_current_user_admin());

-- Create policy for admin delete access
CREATE POLICY "Admins can delete briefs" 
ON public.briefs 
FOR DELETE 
USING (public.is_current_user_admin());

-- Create policy for admin update access
CREATE POLICY "Admins can update briefs" 
ON public.briefs 
FOR UPDATE 
USING (public.is_current_user_admin());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_briefs_updated_at
BEFORE UPDATE ON public.briefs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();