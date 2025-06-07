
import React, { useState, useEffect } from 'react';
import { FileUploadForm } from '@/components/file-upload/FileUploadForm';
import { FileTable } from '@/components/file-upload/FileTable';
import { useFileUpload } from '@/hooks/useFileUpload';
import { UploadedFile, FileFormData } from '@/types/fileUpload';

const FileUpload = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFile, setEditingFile] = useState<UploadedFile | null>(null);
  
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

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleSubmit = async (data: FileFormData): Promise<boolean> => {
    if (editingFile) {
      return await updateFile(editingFile.id, data);
    } else {
      return await uploadFile(data);
    }
  };

  const openEditDialog = (file: UploadedFile) => {
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
