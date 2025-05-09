
import React from 'react';
import { Shield, BarChart, Clock } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/contexts/LanguageContext';

const BenefitCard = ({ icon: Icon, title, description, delay }: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: string;
}) => {
  const { ref, isInView } = useInView();
  
  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay }}
      className={`text-center transition-all duration-700 transform ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="w-16 h-16 mx-auto mb-4 bg-[#1A1F2C]/10 rounded-full flex items-center justify-center">
        <Icon className="text-[#1A1F2C]" size={32} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Benefits = () => {
  const { language } = useLanguage();
  
  const benefits = {
    es: [
      {
        icon: Shield,
        title: "Reducción de Costos",
        description: "Elimina gastos de infraestructura y reduce el pasivo laboral al tercerizar tu servicio al cliente."
      },
      {
        icon: BarChart,
        title: "Métricas en Tiempo Real",
        description: "Monitoreo constante del desempeño y satisfacción del cliente con reportes detallados."
      },
      {
        icon: Clock,
        title: "Disponibilidad 24/7",
        description: "Atención continua adaptada a tus necesidades y zona horaria."
      }
    ],
    en: [
      {
        icon: Shield,
        title: "Cost Reduction",
        description: "Eliminate infrastructure expenses and reduce labor liabilities by outsourcing your customer service."
      },
      {
        icon: BarChart,
        title: "Real-time Metrics",
        description: "Constant monitoring of performance and customer satisfaction with detailed reports."
      },
      {
        icon: Clock,
        title: "24/7 Availability",
        description: "Continuous service adapted to your needs and time zone."
      }
    ]
  };

  const currentBenefits = language === 'es' ? benefits.es : benefits.en;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          {language === 'es' ? 'Beneficios de Nuestro Contact Center' : 'Benefits of Our Contact Center'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentBenefits.map((benefit, index) => (
            <BenefitCard 
              key={index} 
              {...benefit} 
              delay={`${index * 200}ms`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
