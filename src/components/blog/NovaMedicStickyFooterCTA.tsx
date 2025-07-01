
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const NovaMedicStickyFooterCTA: React.FC = () => {
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-novativa-teal to-novativa-orange text-white shadow-2xl border-t-4 border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2">
                <img 
                  src="/lovable-uploads/c57ce69a-26ba-4ac5-8b0a-58d5fdac7ff7.png" 
                  alt="NovaMedic Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-lg leading-tight">
                  ¡50% DE DESCUENTO EN NOVAMEDIC!
                </div>
                <div className="text-sm opacity-90 leading-tight">
                  Plataforma integral para profesionales de salud con IA
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleCTAClick} 
              size="lg" 
              className="bg-white text-novativa-teal hover:bg-gray-100 font-bold text-sm px-6 py-3 shadow-lg transition-all hover:scale-105"
            >
              Obtener 50% Descuento
            </Button>
            
            <button 
              onClick={handleDismiss} 
              className="p-2 hover:bg-white/20 rounded-full transition-colors" 
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovaMedicStickyFooterCTA;
