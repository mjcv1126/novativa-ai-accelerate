import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
const PricingComparison = () => {
  const {
    language
  } = useLanguage();
  const content = {
    es: {
      title: "Ahorra hasta un ",
      highlight: "80%",
      titleEnd: " en Gestión de Redes",
      traditional: {
        title: "Gestión Tradicional",
        price: "$3,000 - $8,000/mes",
        features: ["😰 Community manager tiempo completo", "💸 Diseñador gráfico adicional", "🐌 Planificación manual y lenta", "📊 Análisis básico de métricas"]
      },
      ai: {
        title: "Gestión con IA",
        price: "$500 - $2,000/mes",
        features: ["Automatización completa", "Contenido generado por IA", "Estrategia basada en datos", "Monitoreo y ajustes constantes"]
      },
      cta: "¡Transforma tus Redes Sociales Ahora!"
    },
    en: {
      title: "Save up to ",
      highlight: "80%",
      titleEnd: " on Social Media Management",
      traditional: {
        title: "Traditional Management",
        price: "$3,000 - $8,000/month",
        features: ["😰 Full-time community manager", "💸 Additional graphic designer", "🐌 Manual and slow planning", "📊 Basic metrics analysis"]
      },
      ai: {
        title: "AI Management",
        price: "$500 - $2,000/month",
        features: ["Complete automation", "AI-generated content", "Data-driven strategy", "Constant monitoring and adjustments"]
      },
      cta: "Transform Your Social Media Now!"
    }
  };
  const currentContent = language === 'es' ? content.es : content.en;
  return <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 opacity-30" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          {currentContent.title}
          <span className="text-blue-400 animate-pulse">{currentContent.highlight}</span>
          {currentContent.titleEnd}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur p-8 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-gray-400">{currentContent.traditional.title}</h3>
            <p className="text-4xl font-bold mb-6 text-gray-200">{currentContent.traditional.price}</p>
            <ul className="space-y-4 text-gray-300">
              {currentContent.traditional.features.map((feature, index) => <li key={index} className="flex items-center">
                  <X className="w-4 h-4 text-red-500 mr-3 flex-shrink-0" />
                  {feature}
                </li>)}
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-xl relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            <h3 className="text-xl font-semibold mb-4">{currentContent.ai.title}</h3>
            <p className="text-4xl font-bold mb-6">{currentContent.ai.price}</p>
            <ul className="space-y-4">
              {currentContent.ai.features.map((feature, index) => <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  {feature}
                </li>)}
            </ul>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" onClick={() => document.getElementById('schedule')?.scrollIntoView({
          behavior: 'smooth'
        })} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-sm">
            <Rocket className="mr-2 h-5 w-5" />
            {currentContent.cta}
          </Button>
        </div>
      </div>
    </section>;
};
export default PricingComparison;