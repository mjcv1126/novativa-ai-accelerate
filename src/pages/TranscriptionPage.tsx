
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import VideoTranscription from './VideoTranscription';

// Esta página sirve como un "router" para dirigir al componente correcto según el idioma
const TranscriptionPage = () => {
  // Simplemente devuelve el componente VideoTranscription, ya que internamente ya maneja el idioma
  return <VideoTranscription />;
};

export default TranscriptionPage;
