
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
  
  // Hide Lovable badge in a safer way
  setTimeout(() => {
    try {
      const badgeStyles = document.createElement('style');
      badgeStyles.textContent = `
        [id*="lovable-badge"], 
        [class*="lovable-badge"],
        [data-lovable-badge],
        [class*="gpt-engineer-badge"],
        [id*="gpt-engineer-badge"],
        [data-gpt-engineer-badge"] {
          display: none !important;
          opacity: 0 !important;
        }
      `;
      document.head.appendChild(badgeStyles);
      
      // Attempt to hide badges without causing errors
      const possibleBadges = document.querySelectorAll('[id*="lovable"], [class*="lovable"], [data-lovable], [id*="gpt-engineer"], [class*="gpt-engineer"], [data-gpt-engineer]');
      possibleBadges.forEach(badge => {
        if (badge instanceof HTMLElement) {
          badge.style.display = 'none';
          badge.style.opacity = '0';
        }
      });
    } catch (e) {
      console.log('Error hiding badge, but continuing website operation');
    }
  }, 1000);
};

/**
 * Force page refresh if it was loaded from cache
 */
export const forcePageRefresh = (): void => {
  // Force an immediate page refresh
  window.location.reload();
};
