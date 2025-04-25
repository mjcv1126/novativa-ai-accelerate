
import { useEffect } from 'react';

const LouisebotWidget = () => {
  useEffect(() => {
    const loadWidget = () => {
      const script = document.createElement('script');
      const code = '2109831b-449d-4c25-90a5-69b408c277c0';
      const url = 'https://cdn.1cdn.app/application/LB/23082315255659_LB_widget.js';
      
      script.type = 'text/javascript';
      script.async = true;
      script.src = url;
      
      localStorage.setItem('ps_widget', code);
      document.getElementsByTagName('head')[0].appendChild(script);
      
      console.log('LOUISEBOT-WIDGET: Script loaded in page');
      console.log('Widget Code:', code);
      console.log('Widget URL:', url);
    };

    loadWidget();
    
    return () => {
      // Cleanup if needed
      const existingScript = document.querySelector('script[src*="LB_widget.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
};

export default LouisebotWidget;
