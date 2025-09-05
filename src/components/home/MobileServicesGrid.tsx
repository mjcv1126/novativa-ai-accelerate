import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Workflow, Cpu, Video, Stethoscope, Activity, Share2, PhoneCall } from 'lucide-react';

const MobileServicesGrid = () => {
  const services = [
    {
      icon: Brain,
      title: "Agentes IA",
      description: "Chatbots inteligentes",
      route: "/novachannel",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Workflow,
      title: "Automatizaciones",
      description: "Procesos optimizados",
      route: "/iacoding",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Cpu,
      title: "Desarrollo Apps",
      description: "Apps con IA",
      route: "/iacoding",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Video,
      title: "Generación Contenido",
      description: "Videos y textos IA",
      route: "/servicios/contenido",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Stethoscope,
      title: "NovaMedic",
      description: "IA para salud",
      route: "/consulta-eficiente",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Activity,
      title: "NovaFitness",
      description: "IA para fitness",
      route: "/social-media-ai",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: Share2,
      title: "Redes Sociales",
      description: "Gestión con IA",
      route: "/social-media-ai",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: PhoneCall,
      title: "Agentes Telefónicos",
      description: "Próximamente",
      route: "#",
      color: "from-gray-400 to-gray-500",
      disabled: true
    }
  ];

  return (
    <section className="md:hidden py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Nuestros Servicios
        </h2>
        
        <div className="grid grid-cols-2 gap-3">
          {services.map((service, index) => {
            if (service.disabled) {
              return (
                <div 
                  key={index}
                  className="group bg-white rounded-xl p-4 shadow-md border border-gray-100 opacity-60 cursor-not-allowed"
                >
                  <div className={`bg-gradient-to-br ${service.color} p-3 rounded-lg w-fit mx-auto mb-3 transition-transform duration-300`}>
                    <service.icon className="text-white" size={20} />
                  </div>
                  
                  <h3 className="text-xs font-bold text-center mb-1 text-gray-500 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-xs text-center text-gray-400 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              );
            }
            
            return (
              <Link
                key={index}
                to={service.route}
                className="group bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
              >
                <div className={`bg-gradient-to-br ${service.color} p-3 rounded-lg w-fit mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="text-white" size={20} />
                </div>
                
                <h3 className="text-xs font-bold text-center mb-1 text-gray-900 group-hover:text-novativa-teal transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-xs text-center text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MobileServicesGrid;