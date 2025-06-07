
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { useForm } from 'react-hook-form';
import { Upload } from 'lucide-react';
import { FileFormData, UploadedFile } from '@/types/fileUpload';

interface FileUploadFormProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  editingFile: UploadedFile | null;
  setEditingFile: (file: UploadedFile | null) => void;
  uploading: boolean;
  uploadProgress: number;
  onSubmit: (data: FileFormData) => Promise<boolean>;
}

export const FileUploadForm = ({
  isDialogOpen,
  setIsDialogOpen,
  editingFile,
  setEditingFile,
  uploading,
  uploadProgress,
  onSubmit,
}: FileUploadFormProps) => {
  const form = useForm<FileFormData>({
    defaultValues: {
      name: '',
      description: '',
      file: null,
    },
  });

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

  const handleSubmit = async (data: FileFormData) => {
    const success = await onSubmit(data);
    if (success) {
      form.reset();
      setIsDialogOpen(false);
      setEditingFile(null);
    }
  };

  return (
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
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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

            {uploading && uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subiendo archivo...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}

            <div className="flex gap-2">
              <Button type="submit" disabled={uploading} className="flex-1">
                {uploading ? 'Subiendo...' : editingFile ? 'Actualizar' : 'Subir'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={uploading}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
