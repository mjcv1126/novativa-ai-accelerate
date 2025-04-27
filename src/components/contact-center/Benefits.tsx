
import React from 'react';
import { Shield, BarChart, Clock } from 'lucide-react';

const BenefitCard = ({ icon: Icon, title, description }: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="text-center">
    <div className="w-16 h-16 mx-auto mb-4 bg-[#1A1F2C]/10 rounded-full flex items-center justify-center">
      <Icon className="text-[#1A1F2C]" size={32} />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Benefits = () => {
  const benefits = [
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
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Beneficios de Nuestro Contact Center</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;

