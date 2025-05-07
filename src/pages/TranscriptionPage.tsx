
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import VideoTranscription from './VideoTranscription';

const TranscriptionPage = () => {
  const { language } = useLanguage();
  
  return <VideoTranscription />;
};

export default TranscriptionPage;
