
import React from 'react';
import { Zap, Target, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturesList = () => {
  const { language } = useLanguage();
  
  const features = {
    es: [
      {
        icon: <Zap className="text-blue-400 h-8 w-8" />,
        title: "Automatización Total",
        description: "Gestión completa de redes sociales sin intervención manual"
      },
      {
        icon: <Target className="text-purple-400 h-8 w-8" />,
        title: "Estrategia Inteligente",
        description: "Análisis de datos y tendencias para máximo impacto"
      },
      {
        icon: <Star className="text-yellow-400 h-8 w-8" />,
        title: "Resultados Garantizados",
        description: "Mejora comprobada en engagement y conversiones"
      }
    ],
    en: [
      {
        icon: <Zap className="text-blue-400 h-8 w-8" />,
        title: "Total Automation",
        description: "Complete social media management without manual intervention"
      },
      {
        icon: <Target className="text-purple-400 h-8 w-8" />,
        title: "Intelligent Strategy",
        description: "Data analysis and trends for maximum impact"
      },
      {
        icon: <Star className="text-yellow-400 h-8 w-8" />,
        title: "Guaranteed Results",
        description: "Proven improvement in engagement and conversions"
      }
    ]
  };
  
  const currentFeatures = language === 'es' ? features.es : features.en;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentFeatures.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="bg-black/30 p-4 rounded-full w-fit mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesList;
