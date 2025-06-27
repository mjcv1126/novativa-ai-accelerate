
import React, { useEffect } from 'react';
import { VideoTranscriber } from '@/components/video-transcription/VideoTranscriber';
import { Helmet } from 'react-helmet-async';
import { setAntiCacheHeaders } from '@/utils/antiCacheHeaders';

const TranscriptionPage = () => {
  // Apply anti-cache measures when the component mounts
  useEffect(() => {
    setAntiCacheHeaders();
    // Force reload if loaded from cache
    const pageLoadTime = Date.now();
    if (performance.navigation.type === 2) { // Back/forward navigation
      window.location.reload();
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Transcripción de Videos | Panel Admin Novativa</title>
        <meta name="description" content="Herramienta de transcripción de videos para administradores" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate, max-age=0" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="-1" />
      </Helmet>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Transcripción de Videos</h1>
        <p className="text-gray-600 max-w-2xl">
          Convierte tus videos en texto de forma automática usando inteligencia artificial.
        </p>
        
        <div className="max-w-3xl">
          <VideoTranscriber />
        </div>
      </div>
    </>
  );
};

export default TranscriptionPage;
