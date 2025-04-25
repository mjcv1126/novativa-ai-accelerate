
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Hook for use within Router context
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

// Component that uses the hook
export const ScrollToTop = () => {
  useScrollToTop();
  return null;
};
