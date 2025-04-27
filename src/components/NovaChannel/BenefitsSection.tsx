
import React from 'react';
import { Users, Clock, Star, Rocket } from 'lucide-react';

const BenefitCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-novativa-teal to-novativa-orange mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
          ¿Por qué elegir NovaChannel? 🤔
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <BenefitCard
            icon={<Users className="h-10 w-10 text-white" />}
            title="Gestión Unificada"
            description="Maneja todos tus canales desde un solo dashboard intuitivo"
          />
          <BenefitCard
            icon={<Clock className="h-10 w-10 text-white" />}
            title="Servicio 24/7"
            description="Atención ininterrumpida con respuestas automáticas inteligentes"
          />
          <BenefitCard
            icon={<Star className="h-10 w-10 text-white" />}
            title="Experiencia Premium"
            description="Interacciones personalizadas que encantan a tus clientes"
          />
          <BenefitCard
            icon={<Rocket className="h-10 w-10 text-white" />}
            title="Escalabilidad Total"
            description="Crece sin límites con una plataforma que se adapta a ti"
          />
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
