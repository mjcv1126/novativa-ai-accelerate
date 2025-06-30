
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Paperclip, Upload, Trash2, FileText, Image, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ContactAttachment {
  id: string;
  contact_id: string;
  file_id: string;
  uploaded_by_email: string;
  created_at: string;
  description?: string;
  uploaded_file: {
    name: string;
    file_name: string;
    file_type: string;
    file_size: number;
    file_path: string;
  };
}

interface ContactAttachmentsProps {
  contactId: string;
}

export const ContactAttachments = ({ contactId }: ContactAttachmentsProps) => {
  const [attachments, setAttachments] = useState<ContactAttachment[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchAttachments = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_attachments')
        .select(`
          *,
          uploaded_file:uploaded_files(*)
        `)
        .eq('contact_id', contactId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAttachments(data || []);
    } catch (error) {
      console.error('Error fetching attachments:', error);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      // Subir archivo
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', file.name);
      formData.append('description', description || '');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error uploading file');
      }

      const uploadResult = await response.json();

      // Crear enlace de adjunto
      const { error: attachError } = await supabase
        .from('contact_attachments')
        .insert([{
          contact_id: contactId,
          file_id: uploadResult.id,
          uploaded_by_email: 'admin@example.com', // Obtener del contexto de usuario
          description: description || null
        }]);

      if (attachError) throw attachError;

      toast({
        title: "Éxito",
        description: "Archivo adjuntado correctamente",
      });

      setFile(null);
      setDescription('');
      setIsDialogOpen(false);
      fetchAttachments();
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

  const handleDeleteAttachment = async (attachmentId: string) => {
    try {
      const { error } = await supabase
        .from('contact_attachments')
        .delete()
        .eq('id', attachmentId);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Archivo eliminado correctamente",
      });

      fetchAttachments();
    } catch (error) {
      console.error('Error deleting attachment:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el archivo",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAttachments();
  }, [contactId]);

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Paperclip className="h-5 w-5" />
            <span>Adjuntos ({attachments.length})</span>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-1" />
                Subir
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Subir Archivo</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file">Archivo</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    accept="image/*,.pdf,.doc,.docx,.txt"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descripción (opcional)</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción del archivo..."
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleFileUpload}
                    disabled={!file || uploading}
                    className="flex-1"
                  >
                    {uploading ? 'Subiendo...' : 'Subir Archivo'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {attachments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No hay archivos adjuntos</p>
        ) : (
          <div className="space-y-2">
            {attachments.map((attachment) => (
              <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  {getFileIcon(attachment.uploaded_file.file_type)}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{attachment.uploaded_file.name}</div>
                    <div className="text-sm text-gray-500">
                      {formatFileSize(attachment.uploaded_file.file_size)} • {format(new Date(attachment.created_at), 'dd MMM yyyy', { locale: es })}
                    </div>
                    {attachment.description && (
                      <div className="text-sm text-gray-600 mt-1">{attachment.description}</div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(attachment.uploaded_file.file_path, '_blank')}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteAttachment(attachment.id)}
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
