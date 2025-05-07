
import React from 'react';
import { Zap, Code, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturesList = () => {
  const { language } = useLanguage();
  
  const features = {
    es: [
      {
        icon: <Zap className="text-novativa-teal h-8 w-8" />,
        title: "Desarrollo Ultra Rápido",
        description: "Reducimos tiempos de desarrollo hasta en un 70% con IA"
      },
      {
        icon: <Code className="text-novativa-orange h-8 w-8" />,
        title: "Código Inteligente",
        description: "Soluciones innovadoras usando las últimas tecnologías"
      },
      {
        icon: <Star className="text-yellow-400 h-8 w-8" />,
        title: "Calidad Garantizada",
        description: "Apps elegantes y confiables a una fracción del costo"
      }
    ],
    en: [
      {
        icon: <Zap className="text-novativa-teal h-8 w-8" />,
        title: "Ultra Fast Development",
        description: "We reduce development times by up to 70% with AI"
      },
      {
        icon: <Code className="text-novativa-orange h-8 w-8" />,
        title: "Intelligent Code",
        description: "Innovative solutions using the latest technologies"
      },
      {
        icon: <Star className="text-yellow-400 h-8 w-8" />,
        title: "Guaranteed Quality",
        description: "Elegant and reliable apps at a fraction of the cost"
      }
    ]
  };
  
  const currentFeatures = language === 'es' ? features.es : features.en;

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentFeatures.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="absolute inset-0 bg-novativa-teal/10 opacity-0 group-hover:opacity-100 transition-opacity" />
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
