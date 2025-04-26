
import React, { useEffect } from 'react';

interface TidyCalEmbedProps {
  path: string;
  className?: string;
}

const TidyCalEmbed: React.FC<TidyCalEmbedProps> = ({ path, className = '' }) => {
  useEffect(() => {
    // Load TidyCal script
    const loadTidycalScript = () => {
      // Remove any existing script to prevent duplicates
      const existingScript = document.querySelector('script[src*="asset-tidycal.b-cdn.net/js/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      // Create and load new script with cache busting
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
      
      document.body.appendChild(script);
    };
    
    // Load the script with a small delay to ensure the DOM is ready
    setTimeout(loadTidycalScript, 300);
    
    return () => {
      // No cleanup needed
    };
  }, [path]);

  return (
    <div className={`tidycal-embed ${className}`} data-path={`novativa/${path}`} style={{ minHeight: '600px', width: '100%' }}></div>
  );
};

export default TidyCalEmbed;
