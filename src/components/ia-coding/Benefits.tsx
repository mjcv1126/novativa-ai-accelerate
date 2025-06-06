
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Benefits = () => {
  const { language } = useLanguage();
  
  const benefits = {
    es: [
      {
        title: "Desarrollo Ultra Rápido",
        description: "Reducimos tiempos hasta en un 70% con IA"
      },
      {
        title: "Costos Optimizados",
        description: "Ahorra hasta un 60% en costos de desarrollo"
      },
      {
        title: "Alta Calidad",
        description: "Código limpio y mantenible generado por IA"
      },
      {
        title: "Innovación Constante",
        description: "Siempre usando las últimas tecnologías"
      }
    ],
    en: [
      {
        title: "Ultra Fast Development",
        description: "We reduce development times by up to 70% with AI"
      },
      {
        title: "Optimized Costs",
        description: "Save up to 60% on development costs"
      },
      {
        title: "High Quality",
        description: "Clean and maintainable code generated by AI"
      },
      {
        title: "Constant Innovation",
        description: "Always using the latest technologies"
      }
    ]
  };

  const currentBenefits = language === 'es' ? benefits.es : benefits.en;
  
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          {language === 'es' ? 'Beneficios del Desarrollo con IA' : 'Benefits of AI Development'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentBenefits.map((benefit, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800 hover:border-novativa-orange/50 transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent">
                {benefit.title}
              </h3>
              <p className="text-gray-300">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white text-xl px-10 py-8"
            onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Star className="mr-2 h-6 w-6" />
            {language === 'es' ? '¡Comienza Tu Proyecto Ahora!' : 'Start Your Project Now!'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
