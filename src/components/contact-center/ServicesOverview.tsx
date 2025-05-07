
import React from 'react';
import { Phone, MessageSquare, HeadphonesIcon, MailOpen } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/contexts/LanguageContext';

const ServiceCard = ({ icon: Icon, title, description, delay }: { 
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
      className={`p-6 bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-700 transform ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="w-12 h-12 bg-[#1A1F2C]/10 rounded-lg flex items-center justify-center mb-4">
        <Icon className="text-[#1A1F2C]" size={24} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const ServicesOverview = () => {
  const { language } = useLanguage();
  
  const services = {
    es: [
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
    ],
    en: [
      {
        icon: Phone,
        title: "Telephone Support",
        description: "Trained agents to handle customer service calls, sales and technical support."
      },
      {
        icon: MessageSquare,
        title: "Live Chat",
        description: "Real-time support via chat with agents who are experts in customer service."
      },
      {
        icon: HeadphonesIcon,
        title: "24/7 Support",
        description: "Continuous service 365 days a year with highly trained staff."
      },
      {
        icon: MailOpen,
        title: "Email Support",
        description: "Professional email management with guaranteed response times."
      }
    ]
  };

  const currentServices = language === 'es' ? services.es : services.en;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#1A1F2C] to-[#2C3E50] bg-clip-text text-transparent">
            {language === 'es' ? 'Servicio al Cliente de Calidad Superior' : 'Superior Quality Customer Service'}
          </h2>
          <p className="text-lg text-gray-600">
            {language === 'es'
              ? 'Combinamos la calidez del trato humano con la eficiencia de la tecnología para ofrecer una experiencia de atención al cliente excepcional'
              : 'We combine the warmth of human interaction with the efficiency of technology to deliver an exceptional customer service experience'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {currentServices.map((service, index) => (
            <ServiceCard 
              key={index} 
              {...service} 
              delay={`${index * 100}ms`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
