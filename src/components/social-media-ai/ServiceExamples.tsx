
import React from 'react';
import { Calendar, Brain, Clock, PenTool, BarChart3, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ServiceExamples = () => {
  const { language } = useLanguage();
  
  const services = [
    {
      icon: <Calendar className="text-blue-400 h-12 w-12" />,
      title: "📊 Gestión estratégica integral con IA",
      description: "Planificación completa de contenido basada en análisis predictivo, objetivos comerciales y tendencias del mercado."
    },
    {
      icon: <Brain className="text-purple-400 h-12 w-12" />,
      title: "🧠 Estrategia basada en inteligencia de datos",
      description: "Análisis profundo de audiencia, competencia y métricas para diseñar estrategias que maximizan ROI y engagement."
    },
    {
      icon: <Clock className="text-blue-400 h-12 w-12" />,
      title: "📆 Automatización y programación inteligente",
      description: "La IA gestiona horarios óptimos, frecuencia de publicación y distribución multicanal para máximo alcance."
    },
    {
      icon: <PenTool className="text-purple-400 h-12 w-12" />,
      title: "✍️ Creación de contenido multimedia",
      description: "Generación automática de textos, hashtags, diseños, videos y audio adaptados a cada plataforma y audiencia."
    },
    {
      icon: <BarChart3 className="text-blue-400 h-12 w-12" />,
      title: "📈 Análisis predictivo y optimización continua",
      description: "Monitoreo en tiempo real con ajustes automáticos basados en performance y tendencias emergentes."
    },
    {
      icon: <Target className="text-purple-400 h-12 w-12" />,
      title: "🚀 Integración comercial y conversiones",
      description: "Sincronización con embudos de venta, lanzamientos y campañas para maximizar conversiones y ventas."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Gestión Estratégica con Inteligencia Artificial
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-blue-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="bg-black/30 p-4 rounded-full w-fit mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-300">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceExamples;
