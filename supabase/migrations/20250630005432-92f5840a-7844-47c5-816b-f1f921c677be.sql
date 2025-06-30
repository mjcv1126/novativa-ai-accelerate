
-- Agregar campos de valor del lead a la tabla contacts
ALTER TABLE contacts 
ADD COLUMN lead_value DECIMAL(10,2),
ADD COLUMN lead_value_currency TEXT DEFAULT 'USD',
ADD COLUMN payment_type TEXT CHECK (payment_type IN ('one_time', 'recurring')),
ADD COLUMN loss_reason TEXT;

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_contacts_lead_value ON contacts(lead_value);
CREATE INDEX idx_contacts_payment_type ON contacts(payment_type);
