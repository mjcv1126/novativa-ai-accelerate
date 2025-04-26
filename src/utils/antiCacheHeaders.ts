
/**
 * Anti-cache headers utility for pages that need to be refreshed
 */

export const setAntiCacheHeaders = (): void => {
  const metaTags = [
    { httpEquiv: 'Cache-Control', content: 'no-cache, no-store, must-revalidate' },
    { httpEquiv: 'Pragma', content: 'no-cache' },
    { httpEquiv: 'Expires', content: '0' }
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
};

/**
 * Force page refresh if it was loaded from cache
 */
export const forcePageRefresh = (): void => {
  // Check if page was loaded from cache
  if (performance.navigation.type === 2) {
    // Reload the page
    window.location.reload();
  }
};
