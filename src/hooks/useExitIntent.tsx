
import { useEffect, useState } from 'react';

export const useExitIntent = () => {
  const [showExitIntent, setShowExitIntent] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Solo activar si el mouse sale por la parte superior de la pantalla
      if (e.clientY <= 0) {
        setShowExitIntent(true);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Pequeño delay antes de mostrar el popup cuando cambia de pestaña
        timeoutId = setTimeout(() => {
          setShowExitIntent(true);
        }, 1000);
      }
    };

    // Agregar event listeners
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const dismissExitIntent = () => {
    setShowExitIntent(false);
  };

  return { showExitIntent, dismissExitIntent };
};
