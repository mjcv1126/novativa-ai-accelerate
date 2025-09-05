
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TypingAnimation from '@/components/shared/TypingAnimation';
import HeroChat from '@/components/chat/HeroChat';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t, language } = useLanguage();
  
  const typingPhrases = language === 'es' ? [
    "Automatización de procesos.",
    "Chatbots inteligentes.",
    "Análisis de datos con IA.",
    "Desarrollo con inteligencia artificial.",
    "Generación de contenido automático."
  ] : [
    "Process automation.",
    "Intelligent chatbots.",
    "AI data analysis.",
    "Development with artificial intelligence.",
    "Automatic content generation."
  ];

  return (
    <section className="pt-20 md:pt-32 pb-8 md:pb-20 relative overflow-hidden min-h-[85vh] md:min-h-auto flex items-center">
      <div 
        className="absolute inset-0 bg-gradient-radial from-novativa-teal/10 to-transparent -z-10"
        aria-hidden="true"
      ></div>
      
      <div className="container mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              {language === 'es' 
                ? <>Acelera Tu Negocio Con <span className="text-novativa-teal">Inteligencia Artificial</span></>
                : <>Accelerate Your Business With <span className="text-novativa-teal">Artificial Intelligence</span></>
              }
            </h1>
            <div className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 h-8 md:h-10">
              <TypingAnimation phrases={typingPhrases} className="inline-block" />
            </div>
          </div>
          <div className="relative">
            <HeroChat />
            <div 
              className="absolute top-12 -left-12 -z-0 w-64 h-64 bg-novativa-orange/20 rounded-full blur-3xl"
              aria-hidden="true"
            ></div>
            <div 
              className="absolute bottom-0 right-0 -z-0 w-40 h-40 bg-novativa-teal/20 rounded-full blur-2xl"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
