
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { VideoTranscriber } from '@/components/video-transcription/VideoTranscriber';
import { Helmet } from 'react-helmet-async';
import { setAntiCacheHeaders } from '@/utils/antiCacheHeaders';
import { useLanguage } from '@/contexts/LanguageContext';

const VideoTranscription = () => {
  const { t, language } = useLanguage();
  
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
    <Layout>
      <Helmet>
        <title>{t('services.videoTranscription')} - Novativa</title>
        <meta name="description" content={t('transcription.subtitle')} />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate, max-age=0" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="-1" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">{t('transcription.title')}</h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          {t('transcription.subtitle')}
        </p>
        
        <div className="max-w-3xl mx-auto">
          <VideoTranscriber />
        </div>
      </div>
    </Layout>
  );
};

export default VideoTranscription;
