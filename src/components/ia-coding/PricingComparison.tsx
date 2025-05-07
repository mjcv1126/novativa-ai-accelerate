
import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const PricingComparison = () => {
  const { language } = useLanguage();
  
  const content = {
    es: {
      title: "Ahorra hasta un ",
      highlight: "70%",
      titleEnd: " en Desarrollo",
      traditional: {
        title: "Desarrollo Tradicional",
        price: "$15,000 - $40,000",
        features: [
          "Tiempos de desarrollo extensos",
          "Costos de personal elevados",
          "Procesos manuales lentos"
        ]
      },
      ai: {
        title: "Desarrollo con IA",
        price: "$1,500 - $15,000",
        features: [
          "Desarrollo ultra rápido",
          "Costos optimizados",
          "Soluciones innovadoras"
        ]
      },
      cta: "¡Empieza Tu Proyecto Ahora!"
    },
    en: {
      title: "Save up to ",
      highlight: "70%",
      titleEnd: " on Development",
      traditional: {
        title: "Traditional Development",
        price: "$15,000 - $40,000",
        features: [
          "Extended development times",
          "High personnel costs",
          "Slow manual processes"
        ]
      },
      ai: {
        title: "AI Development",
        price: "$1,500 - $15,000",
        features: [
          "Ultra-fast development",
          "Optimized costs",
          "Innovative solutions"
        ]
      },
      cta: "Start Your Project Now!"
    }
  };
  
  const currentContent = language === 'es' ? content.es : content.en;
  
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-novativa-teal/10 via-transparent to-novativa-orange/10 opacity-30" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          {currentContent.title}
          <span className="text-novativa-teal animate-pulse">{currentContent.highlight}</span>
          {currentContent.titleEnd}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur p-8 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-gray-400">{currentContent.traditional.title}</h3>
            <p className="text-4xl font-bold mb-6 text-gray-200">{currentContent.traditional.price}</p>
            <ul className="space-y-4 text-gray-300">
              {currentContent.traditional.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-novativa-teal to-novativa-darkTeal p-8 rounded-xl relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-novativa-teal/20 to-novativa-orange/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            <h3 className="text-xl font-semibold mb-4">{currentContent.ai.title}</h3>
            <p className="text-4xl font-bold mb-6">{currentContent.ai.price}</p>
            <ul className="space-y-4">
              {currentContent.ai.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:from-novativa-lightTeal hover:to-novativa-lightOrange text-white text-lg px-8 py-6"
            onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Rocket className="mr-2 h-5 w-5" />
            {currentContent.cta}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingComparison;
