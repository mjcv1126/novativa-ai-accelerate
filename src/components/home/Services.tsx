
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const serviceCategories = [
    {
      title: 'Asistentes Virtuales',
      description: 'Chatbots inteligentes para atender consultas de clientes 24/7',
      features: [
        'Respuestas en tiempo real',
        'Integración con WhatsApp y Redes Sociales',
        'Transferencia a agentes humanos'
      ],
      link: '/servicios/agentes-ia'
    },
    {
      title: 'Automatización de Procesos',
      description: 'Optimice sus operaciones empresariales con flujos automatizados',
      features: [
        'Reducción de tareas manuales',
        'Integración con sistemas existentes',
        'Análisis y reportes automáticos'
      ],
      link: '/servicios/contenido'
    },
    {
      title: 'Desarrollo de Aplicaciones',
      description: 'Soluciones personalizadas con IA integrada para necesidades específicas',
      features: [
        'Aplicaciones web y móviles',
        'Paneles de control y analítica',
        'Integración con APIs de terceros'
      ],
      link: '/iacoding'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Servicios</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ofrecemos soluciones completas para integrar inteligencia artificial en su negocio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                
                <ul className="mb-6 space-y-2">
                  {category.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-novativa-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to={category.link} 
                  className="text-novativa-teal hover:text-novativa-darkTeal font-medium inline-flex items-center"
                >
                  Saber más 
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
