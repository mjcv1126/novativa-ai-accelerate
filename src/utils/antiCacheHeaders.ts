
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
};

/**
 * Force page refresh if it was loaded from cache
 */
export const forcePageRefresh = (): void => {
  if (performance.getEntriesByType('navigation').length > 0) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation.type === 'back_forward') {
      window.location.reload();
    }
  } else if (performance.navigation && performance.navigation.type === 2) {
    window.location.reload();
  }
};
