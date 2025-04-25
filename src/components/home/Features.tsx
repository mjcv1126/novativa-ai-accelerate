
import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Settings, BarChart3, PenTool, CheckCircle2, Zap, ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, className = '' }) => (
  <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
    <div className={`${className} p-3 rounded-full w-fit mb-6`}>
      <Icon className={className.includes('orange') ? 'text-novativa-orange' : 'text-novativa-teal'} size={28} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <Link 
      to="/servicios" 
      className="text-novativa-teal hover:text-novativa-lightTeal flex items-center font-medium"
    >
      Conocer más <ArrowRight size={16} className="ml-1" />
    </Link>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: Bot,
      title: "Agentes IA Avanzados",
      description: "Chatbots y asistentes virtuales que responden consultas de forma natural y eficiente.",
      className: "bg-novativa-teal/10"
    },
    {
      icon: Zap,
      title: "Automatización de Procesos",
      description: "Optimiza tus flujos de trabajo y reduce costos con nuestras soluciones de automatización.",
      className: "bg-novativa-orange/10"
    },
    {
      icon: PenTool,
      title: "Generación de Contenido",
      description: "Crea contenido de alta calidad automáticamente para tu sitio web y redes sociales.",
      className: "bg-novativa-teal/10"
    },
    {
      icon: Settings,
      title: "Desarrollo IA Personalizado",
      description: "Aplicaciones web y móviles con inteligencia artificial integrada para tu negocio.",
      className: "bg-novativa-orange/10"
    },
    {
      icon: BarChart3,
      title: "Análisis Inteligente de Datos",
      description: "Extrae información valiosa de tus datos para tomar decisiones estratégicas.",
      className: "bg-novativa-teal/10"
    },
    {
      icon: CheckCircle2,
      title: "Soporte Prioritario",
      description: "Atención personalizada y soporte técnico para todas nuestras soluciones.",
      className: "bg-novativa-orange/10"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué elegir <span className="text-novativa-teal">Novativa</span>?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Potenciamos tu negocio con soluciones de inteligencia artificial y automatización personalizadas para tus necesidades.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
