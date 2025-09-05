import React from 'react';
import { Monitor, Code, Database, Smartphone, Palette, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AppDevelopmentSection = () => {
  const features = [
    {
      icon: Monitor,
      title: "Aplicaciones Web Inteligentes",
      description: "Desarrollamos plataformas web con IA integrada para análisis predictivo, recomendaciones automáticas y procesamiento inteligente de datos."
    },
    {
      icon: Smartphone,
      title: "Apps Móviles con IA",
      description: "Creamos aplicaciones móviles nativas e híbridas que aprovechan el poder de la IA para ofrecer experiencias personalizadas."
    },
    {
      icon: Database,
      title: "Dashboards Analíticos",
      description: "Construimos paneles de control inteligentes que transforman datos complejos en insights accionables con visualizaciones interactivas."
    },
    {
      icon: Code,
      title: "APIs y Microservicios",
      description: "Desarrollamos arquitecturas escalables con APIs robustas y microservicios que integran capacidades de IA de forma modular."
    },
    {
      icon: Palette,
      title: "UX/UI Intuitivo",
      description: "Diseñamos interfaces de usuario que hacen que la IA sea accesible y fácil de usar para cualquier tipo de usuario."
    },
    {
      icon: Globe,
      title: "Integración Completa",
      description: "Conectamos tu nueva aplicación con sistemas existentes y servicios de terceros para un ecosistema tecnológico cohesivo."
    }
  ];

  return (
    <section id="app-development" className="py-20 bg-gradient-to-br from-blue-900/20 via-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Desarrollo de Aplicaciones con IA
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Creamos aplicaciones web y móviles que incorporan inteligencia artificial para resolver problemas complejos 
            y ofrecer experiencias de usuario excepcionales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-gradient-to-br from-blue-800/30 to-blue-900/30 backdrop-blur-sm border border-blue-600/30 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 p-3 rounded-lg w-fit mb-4 group-hover:from-blue-500/30 group-hover:to-cyan-600/30 transition-all duration-300">
                <feature.icon className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-100 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-white">
              ¿Tienes una Idea de Aplicación?
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Convirtamos tu visión en realidad. Nuestro equipo especializado te acompañará desde el concepto hasta el lanzamiento.
            </p>
            <Button 
              asChild
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <Link to="/formulario">
                Consulta Gratuita para tu App
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDevelopmentSection;