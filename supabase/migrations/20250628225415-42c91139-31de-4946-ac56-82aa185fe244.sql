
-- Agregar columna para conectar actividades con bookings de TidyCal
ALTER TABLE contact_activities 
ADD COLUMN tidycal_booking_id INTEGER,
ADD COLUMN tidycal_booking_reference TEXT;

-- Crear índice para mejorar rendimiento de búsquedas
CREATE INDEX idx_contact_activities_tidycal_booking_id 
ON contact_activities(tidycal_booking_id);

-- Actualizar la tabla de reglas de automatización TidyCal (si no existe, crearla)
CREATE TABLE IF NOT EXISTS tidycal_automation_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  trigger_condition TEXT NOT NULL CHECK (trigger_condition IN (
    'contact_exists_future_call',
    'contact_exists_past_call', 
    'contact_not_exists_past_call',
    'new_contact_future_call',
    'booking_cancelled',
    'booking_rescheduled'
  )),
  target_stage_id UUID REFERENCES crm_stages(id),
  create_activity BOOLEAN DEFAULT true,
  activity_title TEXT,
  activity_description TEXT,
  contact_action TEXT DEFAULT 'none' CHECK (contact_action IN ('none', 'create', 'update', 'delete')),
  contact_action_data TEXT,
  cancel_previous_activity BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Crear tabla para tracking de reglas aplicadas
CREATE TABLE IF NOT EXISTS tidycal_rule_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_id UUID REFERENCES tidycal_automation_rules(id),
  tidycal_booking_id INTEGER NOT NULL,
  contact_id UUID REFERENCES contacts(id),
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  execution_result TEXT,
  error_message TEXT
);

-- Insertar reglas por defecto si no existen
INSERT INTO tidycal_automation_rules (
  name, description, trigger_condition, target_stage_id, create_activity, 
  activity_title, activity_description, cancel_previous_activity
) 
SELECT 
  'Llamada Programada', 
  'Cuando se programa una nueva llamada', 
  'new_contact_future_call',
  (SELECT id FROM crm_stages WHERE position = 2 LIMIT 1),
  true,
  'Llamada programada desde TidyCal',
  'Llamada programada automáticamente desde TidyCal',
  false
WHERE NOT EXISTS (SELECT 1 FROM tidycal_automation_rules WHERE trigger_condition = 'new_contact_future_call');

INSERT INTO tidycal_automation_rules (
  name, description, trigger_condition, target_stage_id, create_activity, 
  activity_title, activity_description, cancel_previous_activity
) 
SELECT 
  'Llamada Cancelada', 
  'Cuando se cancela una llamada programada', 
  'booking_cancelled',
  (SELECT id FROM crm_stages WHERE position = 4 LIMIT 1),
  true,
  'Llamada cancelada',
  'Llamada cancelada desde TidyCal',
  true
WHERE NOT EXISTS (SELECT 1 FROM tidycal_automation_rules WHERE trigger_condition = 'booking_cancelled');

-- Actualizar función para manejar actualizaciones automáticas
CREATE OR REPLACE FUNCTION update_tidycal_automation_rules_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para actualizar timestamp
DROP TRIGGER IF EXISTS update_tidycal_automation_rules_updated_at_trigger 
ON tidycal_automation_rules;

CREATE TRIGGER update_tidycal_automation_rules_updated_at_trigger
    BEFORE UPDATE ON tidycal_automation_rules
    FOR EACH ROW
    EXECUTE FUNCTION update_tidycal_automation_rules_updated_at();
