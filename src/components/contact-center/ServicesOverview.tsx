
import React from 'react';
import { Phone, MessageSquare, HeadphonesIcon, MailOpen } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description }: { 
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="w-12 h-12 bg-[#1A1F2C]/10 rounded-lg flex items-center justify-center mb-4">
      <Icon className="text-[#1A1F2C]" size={24} />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ServicesOverview = () => {
  const services = [
    {
      icon: Phone,
      title: "Atención Telefónica",
      description: "Agentes capacitados para manejar llamadas de servicio al cliente, ventas y soporte técnico."
    },
    {
      icon: MessageSquare,
      title: "Chat en Vivo",
      description: "Soporte en tiempo real a través de chat con agentes expertos en servicio al cliente."
    },
    {
      icon: HeadphonesIcon,
      title: "Soporte 24/7",
      description: "Atención continua los 365 días del año con personal altamente capacitado."
    },
    {
      icon: MailOpen,
      title: "Email Support",
      description: "Gestión profesional de correos electrónicos con tiempos de respuesta garantizados."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#1A1F2C] to-[#2C3E50] bg-clip-text text-transparent">
            Servicio al Cliente de Calidad Superior
          </h2>
          <p className="text-lg text-gray-600">
            Combinamos la calidez del trato humano con la eficiencia de la tecnología para ofrecer una experiencia de atención al cliente excepcional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;

