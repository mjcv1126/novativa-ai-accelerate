
/**
 * Anti-cache headers utility for pages that need to be refreshed
 */

export const setAntiCacheHeaders = (): void => {
  const metaTags = [
    { httpEquiv: 'Cache-Control', content: 'no-cache, no-store, must-revalidate, max-age=0' },
    { httpEquiv: 'Pragma', content: 'no-cache' },
    { httpEquiv: 'Expires', content: '-1' }
  ];

  metaTags.forEach(tag => {
    let metaTag = document.querySelector(`meta[http-equiv="${tag.httpEquiv}"]`);
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('http-equiv', tag.httpEquiv);
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', tag.content);
  });
  
  // Add cache-busting query parameter to all scripts
  const scripts = document.getElementsByTagName('script');
  Array.from(scripts).forEach(script => {
    if (script.src && !script.src.includes('?')) {
      script.src = `${script.src}?v=${new Date().getTime()}`;
    }
  });
  
  // Hide Lovable badge
  setTimeout(() => {
    // Use multiple approaches to hide the badge
    const styles = `
      #lovable-badge, 
      [data-lovable-badge], 
      .lovable-badge, 
      div[id*="lovable"],
      div[class*="lovable"],
      .gpt-engineer-badge,
      [data-gpt-engineer-badge],
      div[id*="gpt-engineer"],
      div[class*="gpt-engineer"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        position: absolute !important;
        width: 0 !important;
        height: 0 !important;
        pointer-events: none !important;
        clip: rect(0, 0, 0, 0) !important;
        border: 0 !important;
        overflow: hidden !important;
      }
    `;
    
    // Add the styles to the document
    const styleEl = document.createElement('style');
    styleEl.innerHTML = styles;
    document.head.appendChild(styleEl);
    
    // Also try to remove elements directly
    ['lovable-badge', 'gpt-engineer-badge'].forEach(className => {
      const elements = document.querySelectorAll(`[id*="${className}"], [class*="${className}"], [data-${className}]`);
      elements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
          el.style.visibility = 'hidden';
          el.style.opacity = '0';
          el.style.position = 'absolute';
          el.style.width = '0';
          el.style.height = '0';
          el.style.pointerEvents = 'none';
          
          // Try to remove it completely if possible
          if (el.parentNode) {
            try {
              el.parentNode.removeChild(el);
            } catch (e) {
              console.log('Could not remove element, using CSS hiding instead');
            }
          }
        }
      });
    });
  }, 500); // Small delay to ensure DOM is loaded
};

/**
 * Force page refresh if it was loaded from cache
 */
export const forcePageRefresh = (): void => {
  // Force an immediate page refresh
  window.location.reload();
};
