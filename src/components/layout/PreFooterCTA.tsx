
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const PreFooterCTA = () => {
  const { t } = useLanguage();
  
  const openTidyCal = () => {
    window.open('https://tidycal.com/novativa/demo-gratis', '_blank');
  };

  return (
    <section className="bg-gradient-to-r from-novativa-teal/10 to-novativa-orange/10 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="text-lg text-gray-700 mb-6">
              {t('hero.subtitle')}
            </p>
          </div>
          <Button 
            onClick={openTidyCal} 
            size="lg" 
            className="bg-novativa-teal hover:bg-novativa-darkTeal text-white px-6 py-3 text-lg"
          >
            <Calendar className="w-5 h-5 mr-2" />
            {t('hero.cta')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PreFooterCTA;
