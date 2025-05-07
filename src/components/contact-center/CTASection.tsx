
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/contexts/LanguageContext';

const CTASection = () => {
  const { ref, isInView } = useInView();
  const { t, language } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-r from-[#1A1F2C] to-[#2C3E50] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px]" />
      <div 
        ref={ref}
        className={`container mx-auto px-4 text-center relative transition-all duration-700 transform ${
          isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-white">
          {language === 'es' 
            ? '¿Listo para mejorar tu servicio al cliente?' 
            : 'Ready to improve your customer service?'}
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
          {language === 'es'
            ? 'Contáctanos hoy mismo para una consulta personalizada y descubre cómo podemos ayudarte.'
            : 'Contact us today for a personalized consultation and discover how we can help you.'}
        </p>
        <Button asChild size="lg" className="bg-white text-[#1A1F2C] hover:bg-gray-100">
          <Link to={language === 'es' ? '/contacto' : '/contact'}>
            {language === 'es' ? 'Solicitar Información' : 'Request Information'}
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
