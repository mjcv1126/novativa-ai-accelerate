
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { fbTrack } from '@/utils/fbPixel';

const StickyFooterCTA = () => {
  const handleScheduleClick = () => {
    // Track the click event with Facebook Pixel
    fbTrack('IADevelopmentScheduleClick');
    
    // Open TidyCal meeting link in a new tab
    window.open('https://tidycal.com/novativa/desarrollo-ia', '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-novativa-darkTeal to-novativa-teal py-2 shadow-lg z-50 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div>
          <h3 className="text-white text-base font-medium">¿Listo para empezar tu proyecto con IA?</h3>
          <p className="text-white/80 text-xs hidden md:block">Agenda una videollamada y cuéntanos sobre tu idea</p>
        </div>
        <Button
          onClick={handleScheduleClick}
          size="default" 
          className="bg-novativa-orange hover:bg-novativa-orange/90 text-white px-4 w-full sm:w-auto"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Agendar Reunión
        </Button>
      </div>
    </div>
  );
};

export default StickyFooterCTA;
