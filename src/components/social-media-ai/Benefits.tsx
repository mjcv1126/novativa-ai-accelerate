
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Benefits = () => {
  const { language } = useLanguage();
  
  const benefits = {
    es: [
      {
        icon: <TrendingUp className="text-blue-400 h-8 w-8" />,
        title: "Aumento del Engagement",
        description: "Incrementa hasta 300% la interacción con tu audiencia"
      },
      {
        icon: <Clock className="text-purple-400 h-8 w-8" />,
        title: "Ahorro de Tiempo",
        description: "Libera 20+ horas semanales de trabajo manual"
      },
      {
        icon: <DollarSign className="text-green-400 h-8 w-8" />,
        title: "ROI Optimizado",
        description: "Mejora el retorno de inversión en un 250%"
      },
      {
        icon: <Star className="text-yellow-400 h-8 w-8" />,
        title: "Contenido de Calidad",
        description: "Genera contenido profesional las 24/7"
      }
    ],
    en: [
      {
        icon: <TrendingUp className="text-blue-400 h-8 w-8" />,
        title: "Increased Engagement",
        description: "Boost audience interaction by up to 300%"
      },
      {
        icon: <Clock className="text-purple-400 h-8 w-8" />,
        title: "Time Savings",
        description: "Free up 20+ hours of manual work per week"
      },
      {
        icon: <DollarSign className="text-green-400 h-8 w-8" />,
        title: "Optimized ROI",
        description: "Improve return on investment by 250%"
      },
      {
        icon: <Star className="text-yellow-400 h-8 w-8" />,
        title: "Quality Content",
        description: "Generate professional content 24/7"
      }
    ]
  };

  const currentBenefits = language === 'es' ? benefits.es : benefits.en;
  
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          {language === 'es' ? 'Beneficios de la Gestión con IA' : 'Benefits of AI Management'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentBenefits.map((benefit, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="bg-black/30 p-3 rounded-full w-fit mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
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
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white text-xl px-10 py-8"
            onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Star className="mr-2 h-6 w-6" />
            {language === 'es' ? '¡Transforma tus Redes Ahora!' : 'Transform Your Social Media Now!'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
