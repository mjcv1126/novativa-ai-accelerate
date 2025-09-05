import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Smartphone, Zap } from 'lucide-react';

const ServicesOverview = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Nuestros Servicios de IA
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Ofrecemos dos líneas principales de servicios para transformar tu negocio con inteligencia artificial
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Desarrollo de Apps */}
          <div className="group bg-gradient-to-br from-blue-900/30 to-blue-800/30 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-4 rounded-xl w-fit mb-6 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300">
              <Smartphone className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300" size={32} />
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-100 transition-colors duration-300">
              Desarrollo de Apps con IA
            </h3>
            
            <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
              Creamos aplicaciones web y móviles potenciadas por inteligencia artificial. Desde dashboards inteligentes hasta apps móviles con funcionalidades de IA integradas.
            </p>
            
            <ul className="space-y-3 mb-8 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 mt-1">✓</span>
                <span>Aplicaciones web responsivas con IA</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 mt-1">✓</span>
                <span>Apps móviles nativas e híbridas</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 mt-1">✓</span>
                <span>Dashboards inteligentes y analíticos</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 mt-1">✓</span>
                <span>Integración con APIs y servicios</span>
              </li>
            </ul>
            
            <Button 
              onClick={() => scrollToSection('app-development')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300 group-hover:scale-105"
            >
              Más Información
              <ArrowDown className="ml-2 h-4 w-4 animate-bounce" />
            </Button>
          </div>

          {/* Automatizaciones */}
          <div className="group bg-gradient-to-br from-purple-900/30 to-purple-800/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-4 rounded-xl w-fit mb-6 group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-all duration-300">
              <Zap className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300" size={32} />
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-100 transition-colors duration-300">
              Automatizaciones Inteligentes
            </h3>
            
            <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
              Optimizamos tus procesos empresariales con automatizaciones avanzadas que integran IA para reducir costos y aumentar la eficiencia operativa.
            </p>
            
            <ul className="space-y-3 mb-8 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2 mt-1">✓</span>
                <span>Flujos de trabajo automatizados</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2 mt-1">✓</span>
                <span>Chatbots y asistentes virtuales</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2 mt-1">✓</span>
                <span>Procesamiento automático de datos</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2 mt-1">✓</span>
                <span>Integración con sistemas existentes</span>
              </li>
            </ul>
            
            <Button 
              onClick={() => scrollToSection('automations')}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white transition-all duration-300 group-hover:scale-105"
            >
              Más Información
              <ArrowDown className="ml-2 h-4 w-4 animate-bounce" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;