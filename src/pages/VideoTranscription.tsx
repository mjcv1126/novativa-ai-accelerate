
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { VideoTranscriber } from '@/components/video-transcription/VideoTranscriber';
import { useLanguage } from '@/contexts/LanguageContext';

const VideoTranscription = () => {
  const { language } = useLanguage();
  
  return (
    <Layout>
      <Helmet>
        <title>
          {language === 'es' ? 'Transcripción de Video - Novativa' : 'Video Transcription - Novativa'}
        </title>
        <meta 
          name="description" 
          content={language === 'es' 
            ? 'Convierte tus videos a texto con nuestra herramienta de transcripción de video potenciada por IA.'
            : 'Convert your videos to text with our AI-powered video transcription tool.'}
        />
      </Helmet>
      
      <section className="pt-32 pb-16 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {language === 'es' ? 'Transcripción de Video a Texto' : 'Video to Text Transcription'}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {language === 'es'
                ? 'Sube tu archivo de video y nuestra IA lo convertirá en texto que podrás copiar y usar donde quieras.'
                : 'Upload your video file and our AI will convert it to text that you can copy and use wherever you want.'}
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <VideoTranscriber />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VideoTranscription;
