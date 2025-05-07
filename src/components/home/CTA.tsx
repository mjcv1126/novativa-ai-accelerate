
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const CTA = () => {
  const { language } = useLanguage();
  
  const openTidyCal = () => {
    window.open('https://tidycal.com/novativa/demo-gratis', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal text-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'es' ? '¿Listo para transformar tu negocio?' : 'Ready to transform your business?'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {language === 'es'
              ? 'Impulsa tu empresa con nuestras soluciones de inteligencia artificial y automatización.'
              : 'Boost your company with our artificial intelligence and automation solutions.'}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={openTidyCal}
              className="inline-flex items-center justify-center gap-2 bg-novativa-orange hover:bg-novativa-lightOrange px-6 py-6 rounded-md text-white font-medium transition-colors text-lg"
            >
              {language === 'es' 
                ? 'Solicita una demostración gratuita' 
                : 'Request a free demonstration'}
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
