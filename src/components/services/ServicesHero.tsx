
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ServicesHero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="pt-32 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('services.page.title')} <span className="text-novativa-teal">{t('services.page.title')}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.page.subtitle')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
