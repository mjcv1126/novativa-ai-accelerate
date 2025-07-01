import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
const NovaMedicStickyFooterCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Mostrar después de hacer scroll por al menos una pantalla completa
      if (scrollPosition > windowHeight && !isDismissed) {
        setIsVisible(true);
      } else if (scrollPosition <= windowHeight) {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);
  const handleCTAClick = () => {
    window.open('https://novativa.org/novamedic', '_blank');
  };
  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };
  if (!isVisible || isDismissed) {
    return null;
  }
  return <div className={`fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-novativa-teal to-novativa-orange text-white shadow-lg ${isMobile ? 'border-t border-white/10' : 'shadow-2xl border-t-4 border-white/20'}`}>
      <div className={`container mx-auto ${isMobile ? 'px-2 py-1.5' : 'px-4 py-4'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            {/* Button first on mobile */}
            {isMobile ? <>
                <Button onClick={handleCTAClick} size="sm" className="bg-white text-novativa-teal hover:bg-gray-100 font-bold shadow-lg transition-all hover:scale-105 text-xs px-2 py-1">OFERTA</Button>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="font-bold leading-tight text-xs truncate">
                    50% OFF NOVAMEDIC
                  </div>
                  <div className="opacity-90 leading-tight text-xs truncate">
                    Plataforma IA para salud
                  </div>
                </div>
                <div className="bg-white rounded-lg flex items-center justify-center p-0.5 w-6 h-6 flex-shrink-0">
                  <img src="/lovable-uploads/c57ce69a-26ba-4ac5-8b0a-58d5fdac7ff7.png" alt="NovaMedic Logo" className="w-full h-full object-contain" />
                </div>
              </> :
          // Desktop layout (original order)
          <div className="flex items-center gap-2">
                <div className="bg-white rounded-lg flex items-center justify-center p-2 w-12 h-12">
                  <img src="/lovable-uploads/c57ce69a-26ba-4ac5-8b0a-58d5fdac7ff7.png" alt="NovaMedic Logo" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <div className="font-bold leading-tight text-lg">
                    ¡50% DE DESCUENTO EN NOVAMEDIC!
                  </div>
                  <div className="opacity-90 leading-tight text-sm">
                    Plataforma integral para profesionales de salud con IA
                  </div>
                </div>
              </div>}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Button on desktop only */}
            {!isMobile && <Button onClick={handleCTAClick} size="lg" className="bg-white text-novativa-teal hover:bg-gray-100 font-bold shadow-lg transition-all hover:scale-105 text-sm px-6 py-3">
                Obtener 50% Descuento
              </Button>}
            
            <button onClick={handleDismiss} className={`hover:bg-white/20 rounded-full transition-colors ${isMobile ? 'p-1' : 'p-2'}`} aria-label="Cerrar">
              <X className={isMobile ? 'w-3 h-3' : 'w-5 h-5'} />
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default NovaMedicStickyFooterCTA;