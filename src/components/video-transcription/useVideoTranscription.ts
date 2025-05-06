
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from "@/integrations/supabase/client";

export const useVideoTranscription = () => {
  const [file, setFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      setFile(selectedFile);
      setTranscription('');
      
      // Generate video preview URL
      const videoURL = URL.createObjectURL(selectedFile);
      setVideoPreview(videoURL);
    }
  };

  const handleTranscribe = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "No hay video para transcribir",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setProgress(0);
    
    try {
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

      console.log("Enviando video para transcripción...");
      
      // Convert file to base64 to send to the edge function
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      
      reader.onload = async () => {
        try {
          const arrayBuffer = reader.result as ArrayBuffer;
          const bytes = new Uint8Array(arrayBuffer);
          const binaryString = Array.from(bytes).map(byte => String.fromCharCode(byte)).join('');
          const base64 = btoa(binaryString);
          
          // Send the base64 encoded file to the Supabase edge function
          const { data, error } = await supabase.functions.invoke("video-to-text", {
            body: { videoBase64: base64, fileName: file.name },
          });
          
          clearInterval(progressInterval);
          
          if (error) {
            console.error("Error en la respuesta de la función:", error);
            throw new Error(error.message || 'Error al transcribir el video');
          }
          
          console.log("Respuesta de la función:", data);
          
          if (!data || !data.text) {
            throw new Error('No se recibió transcripción del servidor');
          }
          
          setTranscription(data.text);
          setProgress(100);
          
          toast({
            title: "Transcripción completada",
            description: "Tu video ha sido transcrito exitosamente.",
          });
        } catch (innerError) {
          console.error('Error procesando el video:', innerError);
          toast({
            title: "Error",
            description: innerError instanceof Error ? innerError.message : "Ocurrió un error al procesar el video.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };
      
      reader.onerror = (event) => {
        clearInterval(progressInterval);
        console.error('Error leyendo el archivo:', event);
        setIsLoading(false);
        toast({
          title: "Error",
          description: "No se pudo leer el archivo de video.",
          variant: "destructive",
        });
      };
    } catch (error) {
      console.error('Error transcribiendo video:', error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Ocurrió un error al transcribir el video.",
        variant: "destructive",
      });
    }
  };

  return {
    file,
    transcription,
    isLoading,
    progress,
    videoPreview,
    handleFileChange,
    handleTranscribe
  };
};
