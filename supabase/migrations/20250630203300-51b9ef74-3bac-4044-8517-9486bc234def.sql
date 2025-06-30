
-- Eliminar actividades duplicadas manteniendo solo la más reciente de cada booking_id
WITH duplicates AS (
  SELECT 
    id,
    tidycal_booking_id,
    ROW_NUMBER() OVER (PARTITION BY tidycal_booking_id ORDER BY created_at DESC) as rn
  FROM contact_activities 
  WHERE tidycal_booking_id IS NOT NULL
)
DELETE FROM contact_activities 
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);
