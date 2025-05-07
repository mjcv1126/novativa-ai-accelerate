
import React from 'react';
import { TrendingUp, Clock, LineChart, ShieldCheck, RefreshCw, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Benefits = () => {
  const { language } = useLanguage();
  
  const benefits = {
    es: [
      {
        icon: TrendingUp,
        title: "Aumento de Ventas",
        description: "Incrementa tus conversiones con atención personalizada y recomendaciones precisas basadas en IA."
      },
      {
        icon: Clock,
        title: "Ahorro de Tiempo",
        description: "Automatiza tareas repetitivas para que tu equipo pueda enfocarse en actividades de mayor valor."
      },
      {
        icon: LineChart,
        title: "Decisiones Informadas",
        description: "Obtén insights valiosos de tus datos para tomar mejores decisiones estratégicas."
      },
      {
        icon: ShieldCheck,
        title: "Mayor Seguridad",
        description: "Implementa sistemas de detección y prevención de fraudes con tecnología avanzada."
      },
      {
        icon: RefreshCw,
        title: "Escalabilidad",
        description: "Nuestras soluciones crecen con tu negocio, adaptándose a nuevas necesidades y volúmenes."
      },
      {
        icon: Users,
        title: "Mejor Experiencia",
        description: "Ofrece una atención al cliente excepcional disponible 24/7 con respuestas instantáneas."
      }
    ],
    en: [
      {
        icon: TrendingUp,
        title: "Increased Sales",
        description: "Boost your conversions with personalized attention and precise AI-based recommendations."
      },
      {
        icon: Clock,
        title: "Time Savings",
        description: "Automate repetitive tasks so your team can focus on higher-value activities."
      },
      {
        icon: LineChart,
        title: "Informed Decisions",
        description: "Get valuable insights from your data to make better strategic decisions."
      },
      {
        icon: ShieldCheck,
        title: "Enhanced Security",
        description: "Implement fraud detection and prevention systems with advanced technology."
      },
      {
        icon: RefreshCw,
        title: "Scalability",
        description: "Our solutions grow with your business, adapting to new needs and volumes."
      },
      {
        icon: Users,
        title: "Better Experience",
        description: "Offer exceptional customer service available 24/7 with instant responses."
      }
    ]
  };

  const currentBenefits = language === 'es' ? benefits.es : benefits.en;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'es' ? 'Beneficios de Nuestras Soluciones' : 'Benefits of Our Solutions'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'es'
              ? 'Descubre cómo nuestra tecnología puede transformar tu negocio y maximizar tu potencial'
              : 'Discover how our technology can transform your business and maximize your potential'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {currentBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex">
                <div className="mr-4">
                  <div className="bg-novativa-teal/10 rounded-lg p-3 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-novativa-teal" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
