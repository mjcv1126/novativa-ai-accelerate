
import React, { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import LouisebotWidget from '@/components/shared/LouisebotWidget';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';

const TIDYCAL_URL = 'https://tidycal.com/novativa';

const Schedule = () => {
  useEffect(() => {
    // Prevent caching and force refresh
    if (!sessionStorage.getItem('schedulePageLoaded')) {
      sessionStorage.setItem('schedulePageLoaded', 'true');
      window.location.reload();
    }

    // Cleanup on unmount
    return () => {
      sessionStorage.removeItem('schedulePageLoaded');
    };
  }, []);

  const handleRedirect = () => {
    window.open(TIDYCAL_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Helmet>
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
      </Helmet>
      <LouisebotWidget />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="w-full bg-white p-8 rounded-xl shadow-lg">
            <div 
              className="tidycal-embed" 
              data-path="novativa/demo-gratis"
              style={{ minHeight: '600px', width: '100%' }}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Schedule;
