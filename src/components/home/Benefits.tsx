
import React from 'react';
import { TrendingUp, Clock, LineChart, ShieldCheck, RefreshCw, Users } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Aumento de Ventas",
      description: "Incrementa tus conversiones con atención personalizada y recomendaciones precisas basadas en IA."
    },
    {
      icon: Clock,
      title: "Ahorro de Tiempo",
      description: "Automatiza tareas repetitivas para que tu equipo pueda enfocarse en actividades de mayor valor."
    },
    {
      icon: LineChart,
      title: "Decisiones Informadas",
      description: "Obtén insights valiosos de tus datos para tomar mejores decisiones estratégicas."
    },
    {
      icon: ShieldCheck,
      title: "Mayor Seguridad",
      description: "Implementa sistemas de detección y prevención de fraudes con tecnología avanzada."
    },
    {
      icon: RefreshCw,
      title: "Escalabilidad",
      description: "Nuestras soluciones crecen con tu negocio, adaptándose a nuevas necesidades y volúmenes."
    },
    {
      icon: Users,
      title: "Mejor Experiencia",
      description: "Ofrece una atención al cliente excepcional disponible 24/7 con respuestas instantáneas."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Beneficios de Nuestras Soluciones</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre cómo nuestra tecnología puede transformar tu negocio y maximizar tu potencial
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex">
                <div className="mr-4">
                  <div className="bg-novativa-teal/10 rounded-lg p-3 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-novativa-teal" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
