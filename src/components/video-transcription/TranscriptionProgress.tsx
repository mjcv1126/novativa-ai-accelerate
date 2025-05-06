
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface TranscriptionProgressProps {
  isLoading: boolean;
  progress: number;
}

export const TranscriptionProgress: React.FC<TranscriptionProgressProps> = ({ 
  isLoading, 
  progress 
}) => {
  if (!isLoading) return null;
  
  return (
    <div className="w-full mt-4">
      <Progress value={progress} className="h-2.5 bg-gray-200" />
      <p className="text-center text-sm text-gray-500 mt-2">
        {progress < 100 ? 'Procesando video...' : 'Completado'}
      </p>
    </div>
  );
};
