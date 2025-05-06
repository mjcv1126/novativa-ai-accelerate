
/**
 * Cache management utilities for the application
 */

/**
 * Purges all application caches, browser storage, and attempts to clear
 * service workers if present
 */
export const purgeAllCache = async (): Promise<{ success: boolean; message: string }> => {
  try {
    // Clear all caches
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
    }

    // Clear local storage
    localStorage.clear();
    
    // Clear session storage (except for critical items)
    const authUser = sessionStorage.getItem('admin_user');
    sessionStorage.clear();
    if (authUser) {
      sessionStorage.setItem('admin_user', authUser);
    }
    
    // Set flag to force reload on next navigation
    sessionStorage.setItem('purge-cache', 'true');
    
    // Add cache-busting parameter to all script and style tags
    const timestamp = new Date().getTime();
    document.querySelectorAll('script, link[rel="stylesheet"]').forEach(el => {
      const currentSrc = el.getAttribute('src') || el.getAttribute('href') || '';
      if (currentSrc && !currentSrc.includes('?v=')) {
        const newSrc = `${currentSrc}${currentSrc.includes('?') ? '&' : '?'}v=${timestamp}`;
        if (el.tagName === 'SCRIPT') {
          el.setAttribute('src', newSrc);
        } else {
          el.setAttribute('href', newSrc);
        }
      }
    });
    
    // Attempt to unregister service workers if present
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (let registration of registrations) {
        await registration.unregister();
      }
    }

    return { success: true, message: 'Caché del sitio purgado exitosamente.' };
  } catch (error) {
    console.error('Error purging cache:', error);
    return { 
      success: false, 
      message: `Error al purgar el caché: ${error instanceof Error ? error.message : 'Error desconocido'}` 
    };
  }
};

/**
 * Updates all HTTP cache control headers for the current page
 */
export const setNoCacheHeaders = (): void => {
  // Import from antiCacheHeaders utility
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
 * Forces a hard refresh of the current page
 */
export const forcePageRefresh = (): void => {
  window.location.reload();
};
