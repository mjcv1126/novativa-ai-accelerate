
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
  
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-novativa-teal to-novativa-orange text-white shadow-lg ${
      isMobile ? 'border-t border-white/10' : 'shadow-2xl border-t-4 border-white/20'
    }`}>
      <div className={`container mx-auto ${isMobile ? 'px-3 py-2' : 'px-4 py-4'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <div className="flex items-center gap-2">
              <div className={`bg-white rounded-lg flex items-center justify-center p-1 ${
                isMobile ? 'w-8 h-8' : 'w-12 h-12 p-2'
              }`}>
                <img 
                  src="/lovable-uploads/c57ce69a-26ba-4ac5-8b0a-58d5fdac7ff7.png" 
                  alt="NovaMedic Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className={`font-bold leading-tight ${
                  isMobile ? 'text-sm' : 'text-lg'
                }`}>
                  {isMobile ? '50% OFF NOVAMEDIC' : '¡50% DE DESCUENTO EN NOVAMEDIC!'}
                </div>
                <div className={`opacity-90 leading-tight ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}>
                  {isMobile ? 'Plataforma IA para salud' : 'Plataforma integral para profesionales de salud con IA'}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleCTAClick} 
              size={isMobile ? "sm" : "lg"}
              className={`bg-white text-novativa-teal hover:bg-gray-100 font-bold shadow-lg transition-all hover:scale-105 ${
                isMobile ? 'text-xs px-3 py-2' : 'text-sm px-6 py-3'
              }`}
            >
              {isMobile ? '50% Desc.' : 'Obtener 50% Descuento'}
            </Button>
            
            <button 
              onClick={handleDismiss} 
              className={`hover:bg-white/20 rounded-full transition-colors ${
                isMobile ? 'p-1' : 'p-2'
              }`}
              aria-label="Cerrar"
            >
              <X className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovaMedicStickyFooterCTA;
