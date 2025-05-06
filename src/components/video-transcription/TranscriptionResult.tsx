
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Copy } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface TranscriptionResultProps {
  transcription: string;
}

export const TranscriptionResult: React.FC<TranscriptionResultProps> = ({ transcription }) => {
  if (!transcription) return null;
  
  const handleCopyText = () => {
    navigator.clipboard.writeText(transcription);
    toast({
      title: "Texto copiado",
      description: "El texto ha sido copiado al portapapeles.",
    });
  };
  
  return (
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
  );
};
