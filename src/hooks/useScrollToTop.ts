
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force immediate scroll to top with multiple methods
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Also force after a small delay to ensure it works
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
    
    // For specific routes that have caching issues, force a reload if coming from certain pages
    const lastPage = sessionStorage.getItem('last-viewed-page');
    const problematicRoutes = ['/transcripcion'];
    
    if (problematicRoutes.includes(pathname) && lastPage && lastPage !== pathname) {
      // Only reload if we're not already on this page (to prevent infinite reload)
      window.location.reload();
    }
    
    // Store current page for future reference
    sessionStorage.setItem('last-viewed-page', pathname);
  }, [pathname]);
};
