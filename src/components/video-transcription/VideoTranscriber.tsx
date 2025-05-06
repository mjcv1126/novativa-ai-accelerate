
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Copy } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { supabase } from "@/integrations/supabase/client";

export const VideoTranscriber = () => {
  const [file, setFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

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
      
      setFile(selectedFile);
      setTranscription('');
    }
  };

  const handleCopyText = () => {
    if (transcription) {
      navigator.clipboard.writeText(transcription);
      toast({
        title: "Texto copiado",
        description: "El texto ha sido copiado al portapapeles.",
      });
    }
  };

  const handleTranscribe = async () => {
    if (!file) return;
    
    setIsLoading(true);
    setProgress(0);
    
    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('video', file);
      
      // Simulate progress (in a real app, you'd get this from the API if supported)
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return newProgress;
        });
      }, 500);
      
      // Send the file to the Supabase edge function
      const { data, error } = await supabase.functions.invoke("video-to-text", {
        body: formData,
      });
      
      clearInterval(progressInterval);
      
      if (error) {
        throw new Error(error.message || 'Error al transcribir el video');
      }
      
      setTranscription(data.text);
      setProgress(100);
      
      toast({
        title: "Transcripción completada",
        description: "Tu video ha sido transcrito exitosamente.",
      });
    } catch (error) {
      console.error('Error transcribing video:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Ocurrió un error al transcribir el video.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      <Card className="border-dashed border-2">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <div className="mb-6">
            <Upload size={48} className="text-gray-400" />
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
      
      {/* Transcribe Button */}
      <div className="flex justify-center">
        <Button 
          onClick={handleTranscribe} 
          disabled={!file || isLoading} 
          className="px-8 bg-novativa-teal hover:bg-novativa-darkTeal"
        >
          {isLoading ? 'Transcribiendo...' : 'Transcribir Video'}
        </Button>
      </div>
      
      {/* Progress Bar (shown while loading) */}
      {isLoading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
          <div 
            className="bg-novativa-teal h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
          <p className="text-center text-sm text-gray-500 mt-2">
            {progress < 100 ? 'Procesando video...' : 'Completado'}
          </p>
        </div>
      )}
      
      {/* Transcription Result */}
      {transcription && (
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Transcripción</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopyText}
                className="flex items-center gap-1"
              >
                <Copy size={14} />
                Copiar
              </Button>
            </div>
            <div className="bg-gray-50 p-4 rounded-md max-h-[400px] overflow-y-auto whitespace-pre-wrap">
              {transcription}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
