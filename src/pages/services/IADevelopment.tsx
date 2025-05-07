
import React from 'react';
import { Code, Smartphone, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const IADevelopment = () => {
  const { language } = useLanguage();
  
  const content = {
    es: {
      title: "Desarrollo con IA",
      subtitle: "Creamos soluciones web y móviles personalizadas potenciadas por inteligencia artificial",
      webDev: {
        title: "Desarrollo Web con IA",
        description: "Creación de aplicaciones web personalizadas con integración de IA para optimizar tus procesos y mejorar la experiencia de usuario.",
        features: [
          "Desarrollo web con funcionalidades de IA",
          "Integración con APIs de inteligencia artificial",
          "Optimización de procesos con machine learning",
          "Consultoría y mejora continua"
        ]
      },
      mobileDev: {
        title: "Desarrollo Móvil con IA",
        description: "Desarrollo de aplicaciones móviles nativas e híbridas con capacidades de inteligencia artificial para iOS y Android.",
        features: [
          "Apps nativas con componentes de IA",
          "Desarrollo multiplataforma (iOS/Android)",
          "Integración de machine learning móvil",
          "Optimización de rendimiento con IA"
        ]
      },
      agents: {
        title: "Agentes Autónomos",
        description: "Desarrollo de agentes de IA para automatización de procesos complejos que actúan de forma autónoma para resolver tareas específicas.",
        features: [
          "Automatización de procesos de negocio",
          "Agentes de toma de decisiones",
          "Integración con sistemas existentes",
          "Optimización continua del rendimiento"
        ]
      },
      cta: {
        title: "¿Listo para innovar con IA?",
        subtitle: "Agenda una demostración y descubre cómo podemos transformar tu negocio con soluciones de IA para web y móvil",
        button: "Agenda una demostración gratuita"
      }
    },
    en: {
      title: "AI Development",
      subtitle: "We create custom web and mobile solutions powered by artificial intelligence",
      webDev: {
        title: "AI-Powered Web Development",
        description: "Creation of custom web applications with AI integration to optimize your processes and improve user experience.",
        features: [
          "Web development with AI functionalities",
          "Integration with artificial intelligence APIs",
          "Process optimization with machine learning",
          "Consulting and continuous improvement"
        ]
      },
      mobileDev: {
        title: "AI Mobile Development",
        description: "Development of native and hybrid mobile applications with artificial intelligence capabilities for iOS and Android.",
        features: [
          "Native apps with AI components",
          "Cross-platform development (iOS/Android)",
          "Mobile machine learning integration",
          "Performance optimization with AI"
        ]
      },
      agents: {
        title: "Autonomous Agents",
        description: "Development of AI agents for complex process automation that act autonomously to solve specific tasks.",
        features: [
          "Business process automation",
          "Decision-making agents",
          "Integration with existing systems",
          "Continuous performance optimization"
        ]
      },
      cta: {
        title: "Ready to innovate with AI?",
        subtitle: "Schedule a demonstration and discover how we can transform your business with AI solutions for web and mobile",
        button: "Schedule a free demonstration"
      }
    }
  };

  const currentContent = language === 'es' ? content.es : content.en;

  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {currentContent.title}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {currentContent.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-novativa-teal/10 p-3 rounded-full w-fit mb-6">
                <Code className="text-novativa-teal" size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-4">{currentContent.webDev.title}</h2>
              <p className="text-gray-600 mb-6">
                {currentContent.webDev.description}
              </p>
              <ul className="space-y-2 mb-6">
                {currentContent.webDev.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-novativa-teal mr-2"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-novativa-orange/10 p-3 rounded-full w-fit mb-6">
                <Smartphone className="text-novativa-orange" size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-4">{currentContent.mobileDev.title}</h2>
              <p className="text-gray-600 mb-6">
                {currentContent.mobileDev.description}
              </p>
              <ul className="space-y-2 mb-6">
                {currentContent.mobileDev.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-novativa-orange mr-2"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-novativa-darkTeal/10 p-3 rounded-full w-fit mb-6">
                <Laptop className="text-novativa-darkTeal" size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-4">{currentContent.agents.title}</h2>
              <p className="text-gray-600 mb-6">
                {currentContent.agents.description}
              </p>
              <ul className="space-y-2 mb-6">
                {currentContent.agents.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-novativa-darkTeal mr-2"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{currentContent.cta.title}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {currentContent.cta.subtitle}
          </p>
          <Button
            size="lg"
            className="bg-novativa-orange hover:bg-novativa-lightOrange text-white"
            onClick={() => {
              window.location.href = language === 'es' ? '/agenda' : '/schedule';
            }}
          >
            {currentContent.cta.button}
          </Button>
        </div>
      </section>
    </>
  );
};

export default IADevelopment;
