
import React, { useEffect } from 'react';
import { Globe } from 'lucide-react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: {
          new (options: any, element: string): any;
          InlineLayout: {
            SIMPLE: number;
          };
        };
      };
    };
  }
}

const GoogleTranslateWidget = () => {
  useEffect(() => {
    // Cargar el script de Google Translate
    const addScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    // Inicializar el widget cuando el script esté cargado
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'es',
          includedLanguages: 'en,es,fr,de', // Español, Inglés, Francés, Alemán
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    // Asegurarse de que el script se carga solo una vez
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      addScript();
    }

    return () => {
      // Limpiar cuando el componente se desmonte
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <div className="google-translate-widget fixed left-4 top-28 z-50">
      <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:shadow-lg transition-all">
        <Globe className="h-5 w-5 mr-1 text-novativa-teal" />
        <div id="google_translate_element" className="text-sm"></div>
      </div>

      {/* Estilos personalizados para hacer el widget más minimalista */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Ocultar el logo y el marco de Google */
        .goog-te-gadget-simple {
          background-color: transparent !important;
          border: none !important;
          padding: 0 !important;
          font-size: 0.875rem !important;
          display: flex !important;
          align-items: center !important;
        }
        
        .goog-te-gadget-icon {
          display: none !important;
        }
        
        .goog-te-menu-value {
          color: #333 !important;
          font-family: 'Inter', sans-serif !important;
        }
        
        .goog-te-menu-value span:first-child {
          font-weight: 500 !important;
        }
        
        /* Ocultar elementos innecesarios */
        .goog-te-gadget img, 
        .goog-te-banner-frame,
        .skiptranslate {
          display: none !important;
        }
        
        body {
          top: 0 !important;
        }
      `}} />
    </div>
  );
};

export default GoogleTranslateWidget;
