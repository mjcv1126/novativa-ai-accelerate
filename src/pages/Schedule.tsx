import React, { useState, useEffect } from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import LouisebotWidget from '@/components/shared/LouisebotWidget';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Extender la interfaz Window para incluir TidyCal
declare global {
  interface Window {
    TidyCal?: {
      init: () => void;
    };
  }
}

const TIDYCAL_URL = 'https://tidycal.com/novativa';

const Schedule = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    // Forzar refresh y limpiar caché
    if (!sessionStorage.getItem('schedulePageLoaded')) {
      sessionStorage.setItem('schedulePageLoaded', 'true');
      // Forzar recarga sin caché
      window.location.reload();
    }

    // Limpiar el flag cuando se desmonta el componente
    return () => {
      sessionStorage.removeItem('schedulePageLoaded');
    };
  }, []);

  const loadTidycal = () => {
    setIsLoading(true);
    setLoadError(false);

    try {
    const script = document.createElement('script');
    script.src = 'https://asset-tidycal.b-cdn.net/js/embed.js';
    script.async = true;

      // Manejar el éxito de carga
      script.onload = () => {
        setIsLoading(false);
        // Intentar inicializar Tidycal
        try {
          if (window.TidyCal) {
            window.TidyCal.init();
          }
        } catch (error) {
          console.error('Error al inicializar TidyCal:', error);
          setLoadError(true);
        }
      };

      // Manejar errores de carga
      script.onerror = () => {
        console.error('Error al cargar el script de TidyCal');
        setLoadError(true);
        setIsLoading(false);
        if (retryCount < MAX_RETRIES) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            if (script.parentNode) {
              script.parentNode.removeChild(script);
            }
            loadTidycal();
          }, 2000); // Reintento después de 2 segundos
        }
      };

    document.body.appendChild(script);
      return script;
    } catch (error) {
      console.error('Error al configurar TidyCal:', error);
      setLoadError(true);
      setIsLoading(false);
      return null;
    }
  };

  React.useEffect(() => {
    const script = loadTidycal();
    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleRetry = () => {
    setRetryCount(0);
    loadTidycal();
  };

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
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-novativa-teal mb-4" />
                <p className="text-gray-600">Cargando calendario...</p>
              </div>
            )}
            
            {loadError && retryCount >= MAX_RETRIES && (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">Lo sentimos, hubo un problema al cargar el calendario.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleRetry}
                    className="bg-novativa-teal hover:bg-novativa-darkTeal text-white"
                  >
                    Intentar nuevamente
                  </Button>
                  <Button
                    onClick={handleRedirect}
                    variant="outline"
                    className="inline-flex items-center gap-2"
                  >
                    Ir a Tidycal directamente <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
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
