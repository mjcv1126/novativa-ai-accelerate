
import React from 'react';
import { Calendar, Brain, Clock, PenTool, BarChart3, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ServiceExamples = () => {
  const { language } = useLanguage();
  
  const services = [
    {
      icon: <Calendar className="text-blue-400 h-12 w-12" />,
      title: "📊 Planificación de contenido mensual automatizada",
      description: "Creamos un calendario editorial basado en tu rubro, objetivos y fechas clave, sin improvisaciones."
    },
    {
      icon: <Brain className="text-purple-400 h-12 w-12" />,
      title: "🧠 Estrategia basada en datos",
      description: "Analizamos tu audiencia, tendencias y métricas para diseñar una estrategia que conecta y convierte."
    },
    {
      icon: <Clock className="text-blue-400 h-12 w-12" />,
      title: "📆 Programación inteligente de publicaciones",
      description: "La IA agenda todo tu contenido en los horarios de mayor impacto en cada red social."
    },
    {
      icon: <PenTool className="text-purple-400 h-12 w-12" />,
      title: "✍️ Generación automática de copys y creativos",
      description: "Textos persuasivos, hashtags optimizados y diseños adaptados a cada plataforma, generados con IA."
    },
    {
      icon: <BarChart3 className="text-blue-400 h-12 w-12" />,
      title: "📈 Monitoreo y ajustes constantes",
      description: "Analizamos el rendimiento de cada post y ajustamos la estrategia mes a mes para escalar resultados."
    },
    {
      icon: <Target className="text-purple-400 h-12 w-12" />,
      title: "🧩 Integración con campañas de ventas y lanzamientos",
      description: "Coordinamos tus redes con promociones, eventos o productos nuevos para potenciar tus objetivos comerciales."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Servicios de Gestión con IA
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
