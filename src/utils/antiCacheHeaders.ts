
/**
 * Anti-cache headers utility for admin pages
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
