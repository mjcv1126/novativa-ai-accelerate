-- Migrar archivos existentes del storage a la tabla uploaded_files
INSERT INTO public.uploaded_files (
  name,
  description,
  file_name,
  file_path, 
  file_type,
  file_size,
  created_at,
  updated_at
)
SELECT 
  -- Extraer nombre del archivo sin la ruta uploads/
  CASE 
    WHEN name LIKE 'uploads/%' THEN RIGHT(name, LENGTH(name) - 8)
    ELSE name 
  END as name,
  'Archivo migrado automáticamente' as description,
  CASE 
    WHEN name LIKE 'uploads/%' THEN RIGHT(name, LENGTH(name) - 8)
    ELSE name 
  END as file_name,
  name as file_path,
  COALESCE((metadata->>'mimetype')::text, 'application/octet-stream') as file_type,
  COALESCE((metadata->>'size')::text::integer, 0) as file_size,
  created_at,
  updated_at
FROM storage.objects 
WHERE bucket_id = 'user-uploads'
AND NOT EXISTS (
  SELECT 1 FROM public.uploaded_files uf 
  WHERE uf.file_path = storage.objects.name
);