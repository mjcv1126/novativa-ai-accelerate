
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, X } from 'lucide-react';

const StickyFooterCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  
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
    window.location.href = '/formulario';
  };
  
  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };
  
  if (!isVisible || isDismissed) {
    return null;
  }
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-novativa-teal to-novativa-orange text-white shadow-2xl border-b-4 border-white/20">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-sm sm:text-lg leading-tight">
                  ¡50% DE DESCUENTO!
                </div>
                <div className="text-xs sm:text-sm opacity-90 leading-tight">Programa Early Bird para Médicos Especialistas</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <Button onClick={handleCTAClick} size="sm" className="bg-white text-novativa-teal hover:bg-gray-100 font-bold text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3 shadow-lg transition-all hover:scale-105">
              Obtener Descuento
            </Button>
            
            <button onClick={handleDismiss} className="p-1 sm:p-2 hover:bg-white/20 rounded-full transition-colors" aria-label="Cerrar">
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyFooterCTA;
