-- Actualizar nombres descriptivos para archivos migrados
UPDATE public.uploaded_files 
SET name = CASE 
  WHEN file_type LIKE 'audio/%' THEN 'Audio ' || TO_CHAR(created_at, 'DD/MM/YYYY HH24:MI')
  WHEN file_type LIKE 'video/%' THEN 'Video ' || TO_CHAR(created_at, 'DD/MM/YYYY HH24:MI')
  WHEN file_type LIKE 'image/%' THEN 'Imagen ' || TO_CHAR(created_at, 'DD/MM/YYYY HH24:MI')
  WHEN file_type = 'application/pdf' THEN 'Documento PDF ' || TO_CHAR(created_at, 'DD/MM/YYYY HH24:MI')
  WHEN file_type LIKE 'application/vnd.openxmlformats-officedocument%' THEN 'Documento Office ' || TO_CHAR(created_at, 'DD/MM/YYYY HH24:MI')
  ELSE 'Archivo ' || TO_CHAR(created_at, 'DD/MM/YYYY HH24:MI')
END,
description = CASE 
  WHEN description = 'Archivo migrado automáticamente' THEN 
    'Migrado automáticamente - ' || 
    CASE 
      WHEN file_type LIKE 'audio/%' THEN 'Archivo de audio'
      WHEN file_type LIKE 'video/%' THEN 'Archivo de video'
      WHEN file_type LIKE 'image/%' THEN 'Archivo de imagen'
      WHEN file_type = 'application/pdf' THEN 'Documento PDF'
      WHEN file_type LIKE 'application/vnd.openxmlformats-officedocument%' THEN 'Documento de Office'
      ELSE 'Archivo'
    END
  ELSE description
END
WHERE description = 'Archivo migrado automáticamente' OR name ~ '^[0-9]+\.(mp3|mp4|jpg|png|pdf|pptx)$';