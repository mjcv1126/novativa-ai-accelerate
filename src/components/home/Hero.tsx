
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TypingAnimation from '@/components/shared/TypingAnimation';
import HeroChat from '@/components/chat/HeroChat';

const Hero = () => {
  const typingPhrases = [
    "Automatización de procesos.",
    "Chatbots inteligentes.",
    "Análisis de datos con IA.",
    "Desarrollo con inteligencia artificial.",
    "Generación de contenido automático."
  ];

  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-radial from-novativa-teal/10 to-transparent -z-10"
        aria-hidden="true"
      ></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Acelera Tu Negocio Con <span className="text-novativa-teal">Inteligencia Artificial</span>
            </h1>
            <div className="text-xl md:text-2xl text-gray-600 mb-8 h-10">
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
