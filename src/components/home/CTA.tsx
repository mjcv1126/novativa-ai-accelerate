
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const CTA = () => {
  const { t, language } = useLanguage();
  
  const openTidyCal = () => {
    window.open('https://tidycal.com/novativa/demo-gratis', '_blank');
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
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={openTidyCal}
              className="inline-flex items-center justify-center gap-2 bg-novativa-orange hover:bg-novativa-lightOrange px-6 py-6 rounded-md text-white font-medium transition-colors text-lg"
            >
              {t('home.cta.button')}
            </button>
            <a
              href={language === 'es' ? '/precios' : '/pricing'}
              className="inline-flex items-center justify-center gap-2 border border-white bg-transparent hover:bg-white hover:text-novativa-teal px-6 py-6 rounded-md text-white font-medium transition-colors text-lg"
            >
              {language === 'es' ? 'Ver planes y precios' : 'View plans and pricing'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
