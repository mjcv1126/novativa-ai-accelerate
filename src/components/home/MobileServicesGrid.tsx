import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Workflow, Cpu, Video, Stethoscope, Activity, Share2, PhoneCall, Users, BarChart3 } from 'lucide-react';

const MobileServicesGrid = () => {
  const services = [
    {
      icon: Brain,
      title: "Agentes IA",
      description: "Para WhatsApp y redes que responden como humanos",
      route: "/novachannel",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Workflow,
      title: "Automatizaciones",
      description: "Optimiza procesos y elimina tareas repetitivas",
      route: "/iacoding",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Cpu,
      title: "Desarrollo Apps",
      description: "Apps móviles y web con IA integrada",
      route: "/iacoding",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Video,
      title: "Generación Contenido",
      description: "Videos, imágenes y textos con tu avatar",
      route: "/servicios/contenido",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Stethoscope,
      title: "NovaMedic",
      description: "Asistente IA para consultas médicas",
      route: "/consulta-eficiente",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Activity,
      title: "NovaFitness",
      description: "Entrenador personal con IA",
      route: "/social-media-ai",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: Share2,
      title: "Redes Sociales",
      description: "Gestión de redes sociales con IA para maximizar rendimiento",
      route: "https://novativa.org/servicios/redes-sociales-ia",
      color: "from-pink-500 to-pink-600",
      external: true
    },
    {
      icon: PhoneCall,
      title: "Agentes Telefónicos IA",
      description: "Llamadas automatizadas que venden como expertos",
      route: "#",
      color: "from-gray-400 to-gray-500",
      disabled: true
    },
    {
      icon: Users,
      title: "Influencers IA",
      description: "Avatares digitales que crean contenido viral",
      route: "#",
      color: "from-indigo-400 to-indigo-500",
      disabled: true
    },
    {
      icon: BarChart3,
      title: "NovaInsights",
      description: "Business Intelligence e investigación con IA",
      route: "#",
      color: "from-emerald-400 to-emerald-500",
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
                  className="group bg-white rounded-xl p-4 shadow-md border border-gray-100 opacity-60 cursor-not-allowed relative overflow-hidden"
                >
                  {/* Próximamente ribbon */}
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg transform rotate-12 translate-x-1 -translate-y-1">
                    Próximamente
                  </div>
                  
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
            
            if (service.external) {
              return (
                <a
                  key={index}
                  href={service.route}
                  target="_blank"
                  rel="noopener noreferrer"
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
                </a>
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