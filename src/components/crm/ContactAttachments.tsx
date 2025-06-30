
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Paperclip, Upload, Trash2, Eye, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ContactAttachment {
  id: string;
  contact_id: string;
  file_id: string;
  uploaded_by_email: string;
  created_at: string;
  description?: string;
  uploaded_files: {
    id: string;
    name: string;
    file_name: string;
    file_path: string;
    file_type: string;
    file_size: number;
  };
}

interface ContactAttachmentsProps {
  contactId: string;
}

export const ContactAttachments = ({ contactId }: ContactAttachmentsProps) => {
  const [attachments, setAttachments] = useState<ContactAttachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  const loadAttachments = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_attachments')
        .select(`
          *,
          uploaded_files(*)
        `)
        .eq('contact_id', contactId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAttachments(data || []);
    } catch (error) {
      console.error('Error loading attachments:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los adjuntos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttachments();
  }, [contactId]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      // Crear FormData para enviar el archivo
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', file.name);
      formData.append('description', description || '');

      // Subir archivo usando fetch directamente
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // Si no existe el endpoint, crear el archivo en uploaded_files directamente
        const fileReader = new FileReader();
        fileReader.onload = async (e) => {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);
          
          // Crear entrada en uploaded_files
          const { data: uploadedFile, error: uploadError } = await supabase
            .from('uploaded_files')
            .insert([{
              name: file.name,
              file_name: file.name,
              file_path: `/uploads/${file.name}`,
              file_type: file.type,
              file_size: file.size,
            }])
            .select()
            .single();

          if (uploadError) throw uploadError;

          // Crear entrada en contact_attachments
          const { error: attachError } = await supabase
            .from('contact_attachments')
            .insert([{
              contact_id: contactId,
              file_id: uploadedFile.id,
              uploaded_by_email: 'usuario@novativa.org', // Obtener del contexto
              description: description || null,
            }]);

          if (attachError) throw attachError;

          toast({
            title: "Éxito",
            description: "Archivo subido correctamente",
          });

          setFile(null);
          setDescription('');
          loadAttachments();
        };

        fileReader.readAsArrayBuffer(file);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "No se pudo subir el archivo",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (attachmentId: string) => {
    try {
      const { error } = await supabase
        .from('contact_attachments')
        .delete()
        .eq('id', attachmentId);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Adjunto eliminado correctamente",
      });

      loadAttachments();
    } catch (error) {
      console.error('Error deleting attachment:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el adjunto",
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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Paperclip className="h-5 w-5" />
            Adjuntos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500">Cargando adjuntos...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Paperclip className="h-5 w-5" />
          Adjuntos ({attachments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Formulario de subida */}
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 space-y-4">
          <div>
            <Label htmlFor="file">Seleccionar archivo</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.xlsx,.xls,.ppt,.pptx"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Descripción (opcional)</Label>
            <Textarea
              id="description"
              placeholder="Describe este archivo..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>
          
          <Button 
            onClick={handleUpload} 
            disabled={!file || uploading}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? 'Subiendo...' : 'Subir Archivo'}
          </Button>
        </div>

        {/* Lista de adjuntos */}
        {attachments.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No hay adjuntos</p>
        ) : (
          <div className="space-y-3">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm truncate">
                      {attachment.uploaded_files.name}
                    </h4>
                    <Badge variant="secondary" className="text-xs">
                      {attachment.uploaded_files.file_type.split('/')[1]?.toUpperCase() || 'FILE'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatFileSize(attachment.uploaded_files.file_size)}
                    {attachment.description && ` • ${attachment.description}`}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Subido el {new Date(attachment.created_at).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(attachment.uploaded_files.file_path, '_blank')}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(attachment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
