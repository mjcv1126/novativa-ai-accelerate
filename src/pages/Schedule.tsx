
import React, { useEffect } from 'react';
import LouisebotWidget from '@/components/shared/LouisebotWidget';
import { Helmet } from 'react-helmet-async';

const TIDYCAL_URL = 'https://tidycal.com/novativa';

const Schedule = () => {
  useEffect(() => {
    // Load Tidycal script only once when component mounts
    const script = document.createElement('script');
    script.src = 'https://asset-tidycal.b-cdn.net/js/embed.js';
    script.async = true;
    
    // Check if script is already loaded to prevent duplicates
    if (!document.querySelector('script[src="https://asset-tidycal.b-cdn.net/js/embed.js"]')) {
      document.body.appendChild(script);
    }

    return () => {
      // No need to remove script on unmount - it can be reused on revisits
    };
  }, []);

  return (
    <>
      <Helmet>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
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
