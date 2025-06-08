
import React, { useState, useEffect } from 'react';
import { FileUploadForm } from '@/components/file-upload/FileUploadForm';
import { FileTable } from '@/components/file-upload/FileTable';
import { useFileUpload } from '@/hooks/useFileUpload';
import { UploadedFile, FileFormData } from '@/types/fileUpload';

const FileUpload = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFile, setEditingFile] = useState<UploadedFile | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  
  const {
    files,
    loading,
    uploading,
    uploadProgress,
    fetchFiles,
    uploadFile,
    updateFile,
    deleteFile,
    shareFile,
  } = useFileUpload();

  // Solo cargar archivos una vez al montar el componente
  useEffect(() => {
    if (!hasInitialized) {
      console.log('Initializing FileUpload component...');
      fetchFiles();
      setHasInitialized(true);
    }
  }, [hasInitialized, fetchFiles]);

  const handleSubmit = async (data: FileFormData): Promise<boolean> => {
    console.log('Submitting form:', { editing: !!editingFile, data });
    
    let success = false;
    if (editingFile) {
      success = await updateFile(editingFile.id, data);
    } else {
      success = await uploadFile(data);
    }

    // Solo cerrar el dialog si la operación fue exitosa
    if (success) {
      setIsDialogOpen(false);
      setEditingFile(null);
    }
    
    return success;
  };

  const openEditDialog = (file: UploadedFile) => {
    console.log('Opening edit dialog for file:', file.id);
    setEditingFile(file);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestión de Archivos</h1>
        <FileUploadForm
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          editingFile={editingFile}
          setEditingFile={setEditingFile}
          uploading={uploading}
          uploadProgress={uploadProgress}
          onSubmit={handleSubmit}
        />
      </div>

      <FileTable
        files={files}
        loading={loading}
        onEdit={openEditDialog}
        onShare={shareFile}
        onDelete={deleteFile}
      />
    </div>
  );
};

export default FileUpload;
