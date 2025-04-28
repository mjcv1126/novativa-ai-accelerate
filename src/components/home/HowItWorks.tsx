
import React from 'react';
import { MessageSquare, Settings, BarChart3, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Consulta Inicial",
      description: "Conversamos sobre tus necesidades y objetivos de negocio para entender cómo podemos ayudarte."
    },
    {
      icon: Settings,
      title: "Personalización",
      description: "Desarrollamos una solución a medida adaptada específicamente a los requerimientos de tu empresa."
    },
    {
      icon: BarChart3,
      title: "Implementación",
      description: "Integramos la solución en tu sistema existente y capacitamos a tu equipo para maximizar su uso."
    },
    {
      icon: CheckCircle,
      title: "Resultados",
      description: "Mide el impacto de nuestras soluciones y observa cómo mejoran tus métricas de negocio."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Cómo Funciona?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nuestro proceso está diseñado para implementar soluciones de IA efectivas con el mínimo esfuerzo de tu parte
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full w-16 h-16 mx-auto flex items-center justify-center shadow-md mb-4">
                  <Icon className="h-8 w-8 text-novativa-teal" />
                </div>
                <div className="relative">
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-0 -right-4 left-1/2 border-t-2 border-dashed border-gray-300" style={{ top: '-2rem' }}></div>
                  )}
                  <span className="bg-novativa-teal text-white text-lg font-bold rounded-full w-8 h-8 flex items-center justify-center mb-3 mx-auto">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
