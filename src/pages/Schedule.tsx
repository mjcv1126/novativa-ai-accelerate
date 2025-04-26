
import React, { useEffect } from 'react';
import LouisebotWidget from '@/components/shared/LouisebotWidget';
import { Helmet } from 'react-helmet-async';
import { setAntiCacheHeaders, forcePageRefresh } from '@/utils/antiCacheHeaders';
import { toast } from '@/components/ui/sonner';

const TIDYCAL_URL = 'https://tidycal.com/novativa';

const Schedule = () => {
  useEffect(() => {
    // Apply anti-cache headers
    setAntiCacheHeaders();
    
    // Force refresh if loaded from cache
    forcePageRefresh();
    
    // Improved TidyCal script loading with cache busting
    const loadTidycalScript = () => {
      // First remove any existing script to prevent duplicates
      const existingScript = document.querySelector('script[src*="asset-tidycal.b-cdn.net/js/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      // Create and load a new script with cache busting
      const script = document.createElement('script');
      script.src = `https://asset-tidycal.b-cdn.net/js/embed.js?v=${new Date().getTime()}`;
      script.async = true;
      script.onload = () => {
        console.log('TidyCal script loaded successfully');
        // Force reinitialize if needed
        if (window.TidyCal && typeof window.TidyCal.init === 'function') {
          window.TidyCal.init();
        }
      };
      script.onerror = (error) => {
        console.error('Error loading TidyCal script:', error);
        toast.error('Error al cargar el calendario. Por favor, recarga la página.');
      };
      
      document.body.appendChild(script);
    };
    
    // Small timeout to ensure DOM is fully rendered
    setTimeout(loadTidycalScript, 300);
    
    return () => {
      // Cleanup not needed as script remains for better performance
    };
  }, []);

  return (
    <>
      <Helmet>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate, max-age=0" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="-1" />
        <title>Agenda tu Demo Gratuito | Novativa IA</title>
        <meta name="description" content="Agenda una demostración gratuita con nuestro equipo y descubre cómo Novativa IA puede transformar tu negocio con inteligencia artificial." />
      </Helmet>
      <LouisebotWidget />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="w-full bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Agenda tu Demostración Gratuita</h1>
            <div 
              className="tidycal-embed" 
              data-path="novativa/demo-gratis"
              style={{ minHeight: '700px', width: '100%' }}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Schedule;
