
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CallToAction = () => {
  const { t, language } = useLanguage();
  
  const handleScheduleDemo = () => {
    window.location.href = '/formulario';
  };

  return (
    <section className="py-20 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal text-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('home.cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={handleScheduleDemo} 
              size="lg"
              className="bg-white text-novativa-teal hover:bg-gray-100"
            >
              <Calendar className="mr-2 h-5 w-5" />
              {t('home.cta.button')}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-novativa-teal"
              asChild
            >
              <Link to={language === 'es' ? '/contacto' : '/contact'}>
                {t('pricing.cta.button')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
