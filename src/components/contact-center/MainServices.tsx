
import React from 'react';
import { useInView } from '@/hooks/useInView';
import { useLanguage } from '@/contexts/LanguageContext';

const ServiceList = ({ title, items, delay }: { title: string; items: string[]; delay: string }) => {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay }}
      className={`transition-all duration-700 transform ${
        isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}
    >
      <h3 className="text-xl font-semibold pt-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <div className="w-2 h-2 bg-[#1A1F2C] rounded-full"></div>
            </div>
            <p className="ml-3 text-gray-600">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MainServices = () => {
  const { language } = useLanguage();
  
  const services = {
    es: {
      customerService: {
        title: "Servicio al Cliente",
        items: [
          "Atención de consultas y reclamos",
          "Seguimiento de casos",
          "Soporte post-venta"
        ]
      },
      telemarketing: {
        title: "Telemarketing",
        items: [
          "Campañas de ventas salientes",
          "Generación de leads",
          "Encuestas de satisfacción"
        ]
      },
      collections: {
        title: "Gestión de Cobros",
        items: [
          "Recordatorio de pagos",
          "Negociación de pagos",
          "Seguimiento de acuerdos"
        ]
      },
      marketResearch: {
        title: "Investigación de Mercado",
        items: [
          "Estudios de mercado",
          "Análisis de competencia",
          "Feedback de clientes"
        ]
      }
    },
    en: {
      customerService: {
        title: "Customer Service",
        items: [
          "Inquiry and complaint handling",
          "Case follow-up",
          "After-sales support"
        ]
      },
      telemarketing: {
        title: "Telemarketing",
        items: [
          "Outbound sales campaigns",
          "Lead generation",
          "Satisfaction surveys"
        ]
      },
      collections: {
        title: "Collections Management",
        items: [
          "Payment reminders",
          "Payment negotiations",
          "Agreement follow-up"
        ]
      },
      marketResearch: {
        title: "Market Research",
        items: [
          "Market studies",
          "Competition analysis",
          "Customer feedback"
        ]
      }
    }
  };

  const currentServices = language === 'es' ? services.es : services.en;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {language === 'es' ? 'Servicios Principales' : 'Main Services'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <ServiceList {...currentServices.customerService} delay="0ms" />
            <ServiceList {...currentServices.telemarketing} delay="200ms" />
          </div>
          <div className="space-y-6">
            <ServiceList {...currentServices.collections} delay="400ms" />
            <ServiceList {...currentServices.marketResearch} delay="600ms" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainServices;
