import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Zap, Smartphone, PenTool, Heart, Dumbbell } from 'lucide-react';

const MobileServicesGrid = () => {
  const services = [
    {
      icon: Bot,
      title: "Agentes IA",
      description: "Chatbots inteligentes",
      route: "/novachannel",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "Automatizaciones",
      description: "Procesos optimizados",
      route: "/iacoding",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Smartphone,
      title: "Desarrollo Apps",
      description: "Apps con IA",
      route: "/iacoding",
      color: "from-green-500 to-green-600"
    },
    {
      icon: PenTool,
      title: "Generación Contenido",
      description: "Videos y textos IA",
      route: "/servicios/contenido",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Heart,
      title: "NovaMedic",
      description: "IA para salud",
      route: "/consulta-eficiente",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Dumbbell,
      title: "NovaFitness",
      description: "IA para fitness",
      route: "/social-media-ai",
      color: "from-teal-500 to-teal-600"
    }
  ];

  return (
    <section className="md:hidden py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Nuestros Servicios
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.route}
              className="group bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
            >
              <div className={`bg-gradient-to-br ${service.color} p-3 rounded-lg w-fit mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="text-white" size={24} />
              </div>
              
              <h3 className="text-sm font-bold text-center mb-1 text-gray-900 group-hover:text-novativa-teal transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-xs text-gray-600 text-center group-hover:text-gray-700 transition-colors duration-300">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileServicesGrid;