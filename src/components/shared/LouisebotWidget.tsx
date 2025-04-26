
import { useEffect, useRef } from 'react';

const LouisebotWidget = () => {
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) {
      console.log('LOUISEBOT-WIDGET: Widget already loaded, skipping...');
      return;
    }

    const loadWidget = () => {
      try {
        const code = '2109831b-449d-4c25-90a5-69b408c277c0';
        const url = 'https://cdn.1cdn.app/application/LB/23082315255659_LB_widget.js';
        
        // Store code in localStorage instead of accessing it on every render
        if (!localStorage.getItem('ps_widget')) {
          localStorage.setItem('ps_widget', code);
        }
        
        // Check if script is already loaded to prevent duplicates
        if (!document.querySelector(`script[src="${url}"]`)) {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.async = true;
          script.src = url;
          
          scriptRef.current = script;
          document.getElementsByTagName('head')[0].appendChild(script);
        }
        
        hasLoaded.current = true;
        console.log('LOUISEBOT-WIDGET: Script loaded successfully');
      } catch (error) {
        console.error('LOUISEBOT-WIDGET: Error loading widget:', error);
      }
    };

    // Delay widget loading slightly to prioritize main page content
    const timer = setTimeout(() => {
      loadWidget();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default LouisebotWidget;
