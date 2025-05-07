
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { ref, isInView } = useInView();
  const { language } = useLanguage();

  return (
    <section className="pt-32 pb-16 bg-gradient-to-r from-[#1A1F2C] to-[#2C3E50] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px]" />
      <div 
        ref={ref}
        className={`container mx-auto px-4 relative transition-all duration-1000 transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white bg-clip-text">
            {language === 'es' ? 'Contact Center Humano' : 'Human Contact Center'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'es' 
              ? 'La perfecta combinación de atención humana personalizada con la eficiencia de la IA'
              : 'The perfect combination of personalized human attention with AI efficiency'}
          </p>
        </div>
        <div className="flex justify-center">
          <Button asChild size="lg" className="bg-white text-[#1A1F2C] hover:bg-gray-100">
            <Link to={language === 'es' ? '/contacto' : '/contact'}>
              {language === 'es' ? 'Solicitar Información' : 'Request Information'}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
