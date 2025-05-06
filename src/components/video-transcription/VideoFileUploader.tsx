
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';

interface VideoFileUploaderProps {
  file: File | null;
  videoPreview: string | null;
  isLoading: boolean;
  onFileChange: (file: File | null) => void;
}

export const VideoFileUploader: React.FC<VideoFileUploaderProps> = ({ 
  file, 
  videoPreview, 
  isLoading, 
  onFileChange 
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check if file is a video
      if (!selectedFile.type.startsWith('video/')) {
        toast({
          title: "Archivo no válido",
          description: "Por favor, sube un archivo de video.",
          variant: "destructive",
        });
        return;
      }
      
      // Check if file is too large (100MB max)
      if (selectedFile.size > 100 * 1024 * 1024) {
        toast({
          title: "Archivo demasiado grande",
          description: "El tamaño máximo permitido es 100MB.",
          variant: "destructive",
        });
        return;
      }
      
      onFileChange(selectedFile);
      
      toast({
        title: "Video cargado",
        description: "Ahora puedes transcribir el video.",
      });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('video/')) {
        onFileChange(droppedFile);
        toast({
          title: "Video cargado",
          description: "Ahora puedes transcribir el video.",
        });
      } else {
        toast({
          title: "Archivo no válido",
          description: "Por favor, sube un archivo de video.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Card className="border-dashed border-2">
      <CardContent 
        className="flex flex-col items-center justify-center py-10"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="mb-6">
          {videoPreview ? (
            <div className="relative w-64 h-36 mx-auto mb-4">
              <video 
                src={videoPreview} 
                className="w-full h-full object-cover rounded-lg" 
                controls
              />
            </div>
          ) : (
            <Upload size={48} className="text-gray-400" />
          )}
        </div>
        
        <div className="text-center mb-4">
          <h3 className="text-lg font-medium">
            {file ? file.name : 'Arrastra tu video o haz clic para seleccionar'}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {file 
              ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` 
              : 'Formatos soportados: MP4, MOV, AVI, WMV (Máx. 100MB)'}
          </p>
        </div>
        
        <Input
          type="file"
          id="video-upload"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <label htmlFor="video-upload">
          <Button 
            variant="outline" 
            className="cursor-pointer"
            type="button"
            disabled={isLoading}
          >
            Seleccionar archivo
          </Button>
        </label>
      </CardContent>
    </Card>
  );
};
