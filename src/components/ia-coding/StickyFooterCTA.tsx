
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, X } from 'lucide-react';
import { fbTrack } from '@/utils/fbPixel';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const StickyFooterCTA = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { t, language } = useLanguage();
  
  const handleScheduleClick = () => {
    if (!termsAccepted) {
      toast({
        title: language === 'es' ? "Términos y Condiciones" : "Terms and Conditions",
        description: language === 'es' 
          ? "Por favor, acepta nuestros términos y condiciones para continuar."
          : "Please accept our terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }

    // Track the click event with Facebook Pixel
    fbTrack('IADevelopmentScheduleClick');

    // Navigate to formulario instead of TidyCal
    window.location.href = '/formulario';
  };
  
  if (!isVisible) return null;
  
  return <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-novativa-darkTeal to-novativa-teal py-4 shadow-lg z-50 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 relative">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors duration-200"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4 text-white" />
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <h3 className="text-white text-base font-medium">
            {language === 'es' ? '¿Listo para empezar tu proyecto con IA?' : 'Ready to start your AI project?'}
          </h3>
          <p className="text-white/80 text-xs md:text-sm">
            {language === 'es' ? 'Agenda una videollamada y cuéntanos sobre tu idea' : 'Schedule a video call and tell us about your idea'}
          </p>
        </div>
        
        <div className="flex flex-col w-full md:w-auto">
          <Button onClick={handleScheduleClick} size="default" className="bg-novativa-orange hover:bg-novativa-orange/90 text-white px-4">
            <Calendar className="mr-2 h-4 w-4" />
            {language === 'es' ? 'Agendar Reunión' : 'Schedule Meeting'}
          </Button>
        </div>
      </div>
    </div>;
};
export default StickyFooterCTA;
