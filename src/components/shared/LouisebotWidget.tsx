
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const LouisebotWidget = () => {
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const hasLoaded = useRef(false);
  const location = useLocation();

  useEffect(() => {
    // Don't load widget on formulario page
    if (location.pathname === '/formulario') {
      console.log('LOUISEBOT-WIDGET: Skipping widget load on formulario page');
      return;
    }

    // Don't load widget on blog pages containing "novamedic"
    if (location.pathname.includes('/blog/') && location.pathname.includes('novamedic')) {
      console.log('LOUISEBOT-WIDGET: Skipping widget load on NovaMedic blog page');
      return;
    }

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

    // Add custom styles to position the widget in the middle of the screen on mobile
    const addWidgetStyles = () => {
      const existingStyle = document.getElementById('louisebot-widget-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      const style = document.createElement('style');
      style.id = 'louisebot-widget-styles';
      style.textContent = `
        /* Position widget on desktop - above footer */
        #ps_widget,
        #ps_widget div,
        #ps_widget iframe {
          bottom: 150px !important;
          z-index: 40 !important;
        }
        
        /* Position widget in middle of mobile screen */
        @media (max-width: 768px) {
          #ps_widget,
          #ps_widget div,
          #ps_widget iframe {
            bottom: 50vh !important;
            top: auto !important;
            right: 16px !important;
            left: auto !important;
            transform: translateY(50%) !important;
            position: fixed !important;
          }
        }
        
        /* Ensure the widget iframe has proper positioning */
        #ps_widget iframe {
          position: fixed !important;
        }
      `;
      document.head.appendChild(style);
    };

    // Apply styles immediately and repeatedly to ensure they stick
    addWidgetStyles();
    setTimeout(addWidgetStyles, 2000);
    setTimeout(addWidgetStyles, 5000);
    setTimeout(addWidgetStyles, 10000);

    // Also apply styles when the widget element appears
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && (node as Element).id === 'ps_widget') {
              setTimeout(addWidgetStyles, 100);
              setTimeout(addWidgetStyles, 500);
              setTimeout(addWidgetStyles, 1000);
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
};

export default LouisebotWidget;
