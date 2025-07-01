
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Clock } from 'lucide-react';

interface NovaMedicExitPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const NovaMedicExitPopup: React.FC<NovaMedicExitPopupProps> = ({ isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60); // 3 horas en segundos

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCTAClick = () => {
    window.open('https://novativa.org/novamedic', '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-gradient-to-br from-novativa-teal to-novativa-orange text-white border-0">
        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          <DialogHeader className="text-center mb-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 p-3">
              <img 
                src="/lovable-uploads/c57ce69a-26ba-4ac5-8b0a-58d5fdac7ff7.png" 
                alt="NovaMedic Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <DialogTitle className="text-2xl font-bold text-white">
              ¡Espera! Oferta Exclusiva 🎉
            </DialogTitle>
          </DialogHeader>

          <div className="text-center space-y-6">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">50% DE DESCUENTO</h3>
              <p className="text-white/90">
                En NovaMedic - La plataforma integral para profesionales de salud con Inteligencia Artificial
              </p>
            </div>

            <div className="bg-red-500/90 rounded-lg p-4 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              <div className="text-center">
                <div className="text-sm font-medium">Esta oferta vence en:</div>
                <div className="text-2xl font-bold font-mono">
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleCTAClick}
                size="lg" 
                className="w-full bg-white text-novativa-teal hover:bg-gray-100 font-bold text-lg py-3 shadow-lg transition-all hover:scale-105"
              >
                🚀 Obtener 50% Descuento Ahora
              </Button>
              
              <button
                onClick={onClose}
                className="w-full text-white/80 hover:text-white text-sm underline transition-colors"
              >
                No gracias, continuar leyendo
              </button>
            </div>

            <div className="text-xs text-white/70 text-center">
              * Oferta válida por tiempo limitado para nuevos usuarios
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovaMedicExitPopup;
