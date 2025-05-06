
import React from 'react';
import Layout from '@/components/layout/Layout';
import { VideoTranscriber } from '@/components/video-transcription/VideoTranscriber';
import { Helmet } from 'react-helmet-async';

const VideoTranscription = () => {
  return (
    <Layout>
      <Helmet>
        <title>Transcripción de Video - Novativa</title>
        <meta name="description" content="Transcribe tus videos a texto fácilmente usando IA" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Transcripción de Video a Texto</h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Sube tu archivo de video y nuestra IA lo convertirá en texto que podrás copiar y usar donde quieras.
        </p>
        
        <div className="max-w-3xl mx-auto">
          <VideoTranscriber />
        </div>
      </div>
    </Layout>
  );
};

export default VideoTranscription;
