
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const CTASection = () => {
  const { language } = useLanguage();
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          {language === 'es' 
            ? '¡Revoluciona tu comunicación hoy! 🚀' 
            : 'Revolutionize your communication today! 🚀'
          }
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
          {language === 'es'
            ? 'Únete a las empresas que ya transformaron su manera de conectar con clientes'
            : 'Join the companies that have already transformed their way of connecting with customers'
          }
        </p>
        <Button
          asChild
          size="lg"
          className="bg-novativa-orange hover:bg-novativa-lightOrange text-white px-8 py-6 text-lg rounded-xl transition-all hover:scale-105 shadow-lg animate-pulse-slow border-2 border-novativa-orange"
        >
          <a href="https://chat.novativa.org/register" target="_blank" rel="noopener noreferrer">
            {language === 'es' 
              ? 'Agenda una Demo Personalizada 🎯' 
              : 'Schedule a Personalized Demo 🎯'
            }
          </a>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
