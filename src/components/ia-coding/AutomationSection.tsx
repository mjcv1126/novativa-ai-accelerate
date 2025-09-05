import React from 'react';
import { Bot, Workflow, Zap, Clock, Target, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AutomationSection = () => {
  const automations = [
    {
      icon: Bot,
      title: "Asistentes IA Integrados",
      description: "Desarrollamos aplicaciones con asistentes virtuales que automatizan la atención al cliente y procesos internos."
    },
    {
      icon: Workflow,
      title: "Flujos Automatizados",
      description: "Creamos sistemas que conectan automáticamente tus herramientas y procesan datos sin intervención manual."
    },
    {
      icon: Zap,
      title: "Automatización de Procesos",
      description: "Optimizamos tus operaciones con IA que identifica patrones y ejecuta tareas repetitivas automáticamente."
    },
    {
      icon: Clock,
      title: "Ahorro de Tiempo",
      description: "Reduce hasta un 80% el tiempo en tareas operativas con nuestras soluciones de automatización inteligente."
    },
    {
      icon: Target,
      title: "Precisión Mejorada",
      description: "Minimiza errores humanos con sistemas automatizados que procesan información con exactitud."
    },
    {
      icon: GitBranch,
      title: "Integración Completa",
      description: "Conectamos todos tus sistemas existentes en un flujo automatizado coherente y eficiente."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Automatizaciones y Flujos Inteligentes
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Transformamos tu negocio con automatizaciones avanzadas que integran IA en cada proceso, 
            optimizando operaciones y liberando a tu equipo para tareas estratégicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {automations.map((automation, index) => (
            <div 
              key={index}
              className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-3 rounded-lg w-fit mb-4 group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all duration-300">
                <automation.icon className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-100 transition-colors duration-300">
                {automation.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {automation.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-white">
              ¿Listo para Automatizar tu Negocio?
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Agenda una consulta gratuita y descubre cómo nuestras automatizaciones pueden revolucionar tu empresa.
            </p>
            <Button 
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <Link to="/formulario">
                Solicitar Consulta Gratuita
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationSection;