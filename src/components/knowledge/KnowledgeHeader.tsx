
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const KnowledgeHeader = () => {
  const { language } = useLanguage();
  
  return (
    <section className="pt-32 pb-16 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {language === 'es' ? 'Centro de Conocimiento Novativa' : 'Novativa Knowledge Center'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'es' 
              ? 'Información detallada sobre nuestros servicios, soluciones y procesos' 
              : 'Detailed information about our services, solutions, and processes'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeHeader;
