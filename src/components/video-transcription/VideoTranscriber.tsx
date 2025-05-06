
import React from 'react';
import { Button } from '@/components/ui/button';
import { VideoFileUploader } from './VideoFileUploader';
import { TranscriptionProgress } from './TranscriptionProgress';
import { TranscriptionResult } from './TranscriptionResult';
import { useVideoTranscription } from './useVideoTranscription';

export const VideoTranscriber = () => {
  const {
    file,
    transcription,
    isLoading,
    progress,
    videoPreview,
    handleFileChange,
    handleTranscribe
  } = useVideoTranscription();

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      <VideoFileUploader 
        file={file}
        videoPreview={videoPreview}
        isLoading={isLoading}
        onFileChange={handleFileChange}
      />
      
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
      
      {/* Progress Bar */}
      <TranscriptionProgress 
        isLoading={isLoading} 
        progress={progress} 
      />
      
      {/* Transcription Result */}
      <TranscriptionResult transcription={transcription} />
    </div>
  );
};
