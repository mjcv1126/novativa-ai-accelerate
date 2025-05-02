
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { fbTrack } from '@/utils/fbPixel';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const StickyFooterCTA = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleScheduleClick = () => {
    if (!termsAccepted) {
      toast({
        title: "Términos y Condiciones",
        description: "Por favor, acepta nuestros términos y condiciones para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    // Track the click event with Facebook Pixel
    fbTrack('IADevelopmentScheduleClick');
    
    // Open TidyCal meeting link in a new tab
    window.open('https://tidycal.com/novativa/desarrollo-ia', '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-novativa-darkTeal to-novativa-teal py-4 shadow-lg z-50 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <h3 className="text-white text-base font-medium">¿Listo para empezar tu proyecto con IA?</h3>
          <p className="text-white/80 text-xs md:text-sm">Agenda una videollamada y cuéntanos sobre tu idea</p>
        </div>
        
        <div className="flex flex-col w-full md:w-auto">
          <div className="flex items-center space-x-2 mb-3">
            <Checkbox 
              id="termsAccepted" 
              checked={termsAccepted} 
              onCheckedChange={(value) => setTermsAccepted(value === true)}
              className="data-[state=checked]:bg-novativa-orange border-white"
            />
            <label htmlFor="termsAccepted" className="text-xs text-white leading-none">
              Acepto los <Link to="/terminos-condiciones" className="underline hover:text-novativa-orange">Términos y Condiciones</Link> y la <Link to="/politica-reembolso" className="underline hover:text-novativa-orange">Política de Reembolso</Link>
            </label>
          </div>
          
          <Button
            onClick={handleScheduleClick}
            size="default" 
            className="bg-novativa-orange hover:bg-novativa-orange/90 text-white px-4"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Agendar Reunión
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyFooterCTA;
