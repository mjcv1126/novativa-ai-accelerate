
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Upload, Edit, Share2, Trash2, File, Video, Image, Music } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  id: string;
  name: string;
  description: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
}

interface FileFormData {
  name: string;
  description: string;
  file: File | null;
}

const FileUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFile, setEditingFile] = useState<UploadedFile | null>(null);
  const { toast } = useToast();

  const form = useForm<FileFormData>({
    defaultValues: {
      name: '',
      description: '',
      file: null,
    },
  });

  useEffect(() => {
    fetchFiles();
  }, []);

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
    try {
      const fileExt = data.file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Subir archivo a storage
      const { error: uploadError } = await supabase.storage
        .from('user-uploads')
        .upload(filePath, data.file);

      if (uploadError) throw uploadError;

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

      toast({
        title: "Éxito",
        description: "Archivo subido correctamente",
      });

      form.reset();
      setIsDialogOpen(false);
      fetchFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Error al subir el archivo",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const updateFile = async (data: FileFormData) => {
    if (!editingFile) return;

    try {
      const { error } = await supabase
        .from('uploaded_files')
        .update({
          name: data.name,
          description: data.description,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingFile.id);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Archivo actualizado correctamente",
      });

      setEditingFile(null);
      setIsDialogOpen(false);
      form.reset();
      fetchFiles();
    } catch (error) {
      console.error('Error updating file:', error);
      toast({
        title: "Error",
        description: "Error al actualizar el archivo",
        variant: "destructive",
      });
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('video/')) return <Video className="h-4 w-4" />;
    if (fileType.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (fileType.startsWith('audio/')) return <Music className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const openEditDialog = (file: UploadedFile) => {
    setEditingFile(file);
    form.setValue('name', file.name);
    form.setValue('description', file.description || '');
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingFile(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const onSubmit = (data: FileFormData) => {
    if (editingFile) {
      updateFile(data);
    } else {
      uploadFile(data);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestión de Archivos</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog} className="bg-novativa-orange hover:bg-novativa-darkOrange">
              <Upload className="h-4 w-4 mr-2" />
              Subir Archivo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingFile ? 'Editar Archivo' : 'Subir Nuevo Archivo'}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: 'El nombre es requerido' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre del archivo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Descripción del archivo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!editingFile && (
                  <FormField
                    control={form.control}
                    name="file"
                    rules={{ required: 'El archivo es requerido' }}
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel>Archivo</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".jpg,.jpeg,.png,.gif,.mp4,.mp3,.wav,.doc,.docx,.pdf,.ppt,.pptx,.txt,.zip,.rar"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              onChange(file);
                            }}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="flex gap-2">
                  <Button type="submit" disabled={uploading} className="flex-1">
                    {uploading ? 'Subiendo...' : editingFile ? 'Actualizar' : 'Subir'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Tamaño</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Cargando archivos...
                </TableCell>
              </TableRow>
            ) : files.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No hay archivos subidos
                </TableCell>
              </TableRow>
            ) : (
              files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>
                    {getFileIcon(file.file_type)}
                  </TableCell>
                  <TableCell className="font-medium">{file.name}</TableCell>
                  <TableCell>{file.description || '-'}</TableCell>
                  <TableCell>{formatFileSize(file.file_size)}</TableCell>
                  <TableCell>
                    {new Date(file.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(file)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => shareFile(file)}
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteFile(file)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FileUpload;
