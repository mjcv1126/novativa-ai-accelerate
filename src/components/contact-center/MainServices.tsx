
import React from 'react';

const ServiceList = ({ title, items }: { title: string; items: string[] }) => (
  <>
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
  </>
);

const MainServices = () => {
  const services = {
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
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Servicios Principales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <ServiceList {...services.customerService} />
            <ServiceList {...services.telemarketing} />
          </div>
          <div className="space-y-6">
            <ServiceList {...services.collections} />
            <ServiceList {...services.marketResearch} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainServices;

