-- Crear tablas para sistema de facturación integrado con CRM

-- Tabla de productos/servicios
CREATE TABLE public.invoice_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  has_isv BOOLEAN NOT NULL DEFAULT true,
  type TEXT NOT NULL DEFAULT 'product', -- 'product' | 'service'
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(name, price)
);

-- Tabla principal de facturas
CREATE TABLE public.invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_number TEXT NOT NULL UNIQUE,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  contact_name TEXT NOT NULL,
  contact_rtn TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  contact_address TEXT,
  invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE,
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'pending', 'paid', 'overdue', 'cancelled'
  invoice_type TEXT NOT NULL DEFAULT 'invoice', -- 'invoice', 'proforma'
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  isv_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'HNL',
  country TEXT NOT NULL DEFAULT 'Honduras',
  notes TEXT,
  company_settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla de items de factura
CREATE TABLE public.invoice_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.invoice_products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  description TEXT,
  quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  has_isv BOOLEAN NOT NULL DEFAULT true,
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  isv_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla de configuraciones de facturación
CREATE TABLE public.invoice_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL DEFAULT 'Novativa',
  company_rtn TEXT,
  company_address TEXT,
  company_phone TEXT,
  company_email TEXT,
  company_logo_url TEXT,
  isv_rate DECIMAL(5,4) NOT NULL DEFAULT 0.15, -- 15%
  default_currency TEXT NOT NULL DEFAULT 'HNL',
  default_country TEXT NOT NULL DEFAULT 'Honduras',
  invoice_prefix TEXT NOT NULL DEFAULT 'INV',
  proforma_prefix TEXT NOT NULL DEFAULT 'PRF',
  next_invoice_number INTEGER NOT NULL DEFAULT 1,
  next_proforma_number INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insertar configuración por defecto
INSERT INTO public.invoice_settings (company_name, company_email)
VALUES ('Novativa', 'soporte@novativa.org');

-- Habilitar RLS
ALTER TABLE public.invoice_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_settings ENABLE ROW LEVEL SECURITY;

-- Políticas RLS (permitir acceso a usuarios admin)
CREATE POLICY "Allow all operations on invoice_products" 
ON public.invoice_products 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow all operations on invoices" 
ON public.invoices 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow all operations on invoice_items" 
ON public.invoice_items 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow all operations on invoice_settings" 
ON public.invoice_settings 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Funciones para actualizar timestamps
CREATE OR REPLACE FUNCTION public.update_invoice_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para timestamps
CREATE TRIGGER update_invoice_products_updated_at
  BEFORE UPDATE ON public.invoice_products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_invoice_updated_at();

CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON public.invoices
  FOR EACH ROW
  EXECUTE FUNCTION public.update_invoice_updated_at();

CREATE TRIGGER update_invoice_settings_updated_at
  BEFORE UPDATE ON public.invoice_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_invoice_updated_at();

-- Función para generar número de factura
CREATE OR REPLACE FUNCTION public.generate_invoice_number(invoice_type TEXT DEFAULT 'invoice')
RETURNS TEXT AS $$
DECLARE
    settings_row RECORD;
    new_number INTEGER;
    prefix TEXT;
BEGIN
    -- Obtener configuración actual
    SELECT * INTO settings_row FROM public.invoice_settings LIMIT 1;
    
    IF invoice_type = 'proforma' THEN
        new_number := settings_row.next_proforma_number;
        prefix := settings_row.proforma_prefix;
        
        -- Incrementar contador
        UPDATE public.invoice_settings 
        SET next_proforma_number = next_proforma_number + 1
        WHERE id = settings_row.id;
    ELSE
        new_number := settings_row.next_invoice_number;
        prefix := settings_row.invoice_prefix;
        
        -- Incrementar contador
        UPDATE public.invoice_settings 
        SET next_invoice_number = next_invoice_number + 1
        WHERE id = settings_row.id;
    END IF;
    
    RETURN prefix || '-' || LPAD(new_number::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;