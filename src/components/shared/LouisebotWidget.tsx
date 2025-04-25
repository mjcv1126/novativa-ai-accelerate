
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
        
        // Store code in localStorage
        localStorage.setItem('ps_widget', code);
        
        // Create and append script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = url;
        
        scriptRef.current = script;
        document.getElementsByTagName('head')[0].appendChild(script);
        
        hasLoaded.current = true;
        
        console.log('LOUISEBOT-WIDGET: Script loaded successfully');
        console.log('Widget Code:', code);
        console.log('Widget URL:', url);
      } catch (error) {
        console.error('LOUISEBOT-WIDGET: Error loading widget:', error);
      }
    };

    loadWidget();

    // No cleanup function - we want the widget to persist
  }, []);

  return null;
};

export default LouisebotWidget;

