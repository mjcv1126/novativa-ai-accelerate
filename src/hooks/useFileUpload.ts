
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UploadedFile, FileFormData } from '@/types/fileUpload';

export const useFileUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('uploaded_files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      console.error('Error fetching files:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los archivos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (data: FileFormData) => {
    if (!data.file) {
      toast({
        title: "Error",
        description: "Por favor selecciona un archivo",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    
    try {
      const fileExt = data.file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      console.log(`Iniciando subida de archivo: ${data.file.name} (${(data.file.size / 1024 / 1024).toFixed(1)}MB)`);

      // Simular progreso para archivos grandes
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 500);

      // Subir archivo a storage
      const { error: uploadError } = await supabase.storage
        .from('user-uploads')
        .upload(filePath, data.file, {
          cacheControl: '3600',
          upsert: false
        });

      clearInterval(progressInterval);
      setUploadProgress(95);

      if (uploadError) {
        console.error('Error uploading to storage:', uploadError);
        throw uploadError;
      }

      // Guardar metadatos en la tabla
      const { error: dbError } = await supabase
        .from('uploaded_files')
        .insert({
          name: data.name,
          description: data.description,
          file_name: data.file.name,
          file_path: filePath,
          file_type: data.file.type,
          file_size: data.file.size,
        });

      if (dbError) throw dbError;

      setUploadProgress(100);

      toast({
        title: "Éxito",
        description: "Archivo subido correctamente",
      });

      fetchFiles();
      return true;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al subir el archivo",
        variant: "destructive",
      });
      return false;
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const updateFile = async (fileId: string, data: FileFormData) => {
    try {
      const { error } = await supabase
        .from('uploaded_files')
        .update({
          name: data.name,
          description: data.description,
          updated_at: new Date().toISOString(),
        })
        .eq('id', fileId);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Archivo actualizado correctamente",
      });

      fetchFiles();
      return true;
    } catch (error) {
      console.error('Error updating file:', error);
      toast({
        title: "Error",
        description: "Error al actualizar el archivo",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteFile = async (file: UploadedFile) => {
    try {
      // Eliminar archivo del storage
      const { error: storageError } = await supabase.storage
        .from('user-uploads')
        .remove([file.file_path]);

      if (storageError) throw storageError;

      // Eliminar metadatos de la tabla
      const { error: dbError } = await supabase
        .from('uploaded_files')
        .delete()
        .eq('id', file.id);

      if (dbError) throw dbError;

      toast({
        title: "Éxito",
        description: "Archivo eliminado correctamente",
      });

      fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: "Error",
        description: "Error al eliminar el archivo",
        variant: "destructive",
      });
    }
  };

  const shareFile = async (file: UploadedFile) => {
    try {
      const { data } = await supabase.storage
        .from('user-uploads')
        .getPublicUrl(file.file_path);

      navigator.clipboard.writeText(data.publicUrl);
      toast({
        title: "Enlace copiado",
        description: "El enlace del archivo se ha copiado al portapapeles",
      });
    } catch (error) {
      console.error('Error getting public URL:', error);
      toast({
        title: "Error",
        description: "Error al obtener el enlace del archivo",
        variant: "destructive",
      });
    }
  };

  return {
    files,
    loading,
    uploading,
    uploadProgress,
    fetchFiles,
    uploadFile,
    updateFile,
    deleteFile,
    shareFile,
  };
};
