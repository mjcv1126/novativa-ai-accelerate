
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const StickyHeaderCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScheduleClick = () => {
    document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
  };

  const content = {
    es: "Agenda una Consultoría Gratuita",
    en: "Schedule a Free Consultation"
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 p-3 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto flex justify-center">
        <Button 
          onClick={handleScheduleClick}
          className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
        >
          <Calendar className="mr-2 h-4 w-4" />
          {language === 'es' ? content.es : content.en}
        </Button>
      </div>
    </div>
  );
};

export default StickyHeaderCTA;
