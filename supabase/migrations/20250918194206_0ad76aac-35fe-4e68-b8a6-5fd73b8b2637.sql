-- Corregir problemas de seguridad críticos después de la migración

-- Habilitar RLS en tablas que tienen políticas pero no tienen RLS habilitado
-- Esto corrige los errores "Policy Exists RLS Disabled"

-- Habilitar RLS en las tablas que lo necesitan
DO $$
BEGIN
    -- Verificar si las tablas existen antes de habilitar RLS
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'workflow_executions' AND table_schema = 'public') THEN
        ALTER TABLE public.workflow_executions ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'workflow_steps' AND table_schema = 'public') THEN
        ALTER TABLE public.workflow_steps ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'workflows' AND table_schema = 'public') THEN
        ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'step_executions' AND table_schema = 'public') THEN
        ALTER TABLE public.step_executions ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'triggers' AND table_schema = 'public') THEN
        ALTER TABLE public.triggers ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;