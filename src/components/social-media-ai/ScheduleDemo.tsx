
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ScheduleDemo = () => {
  const { language } = useLanguage();
  
  const content = {
    es: {
      title: "¿Listo para transformar tus redes sociales?",
      subtitle: "Agenda una consultoría gratuita y descubre cómo la IA puede revolucionar tu presencia digital",
      benefits: [
        "Análisis gratuito de tus redes actuales",
        "Estrategia personalizada para tu negocio", 
        "Demostración en vivo de la plataforma",
        "Plan de acción inmediato"
      ],
      cta: "Agenda tu Consultoría Gratuita"
    },
    en: {
      title: "Ready to transform your social media?",
      subtitle: "Schedule a free consultation and discover how AI can revolutionize your digital presence",
      benefits: [
        "Free analysis of your current social media",
        "Personalized strategy for your business",
        "Live platform demonstration", 
        "Immediate action plan"
      ],
      cta: "Schedule your Free Consultation"
    }
  };
  
  const currentContent = language === 'es' ? content.es : content.en;
  
  return (
    <section id="schedule" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {currentContent.title}
          </h2>
          <p className="text-xl mb-12 text-white/90">
            {currentContent.subtitle}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {currentContent.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-left">
                <CheckCircle className="text-green-300 mr-3 h-6 w-6 flex-shrink-0" />
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>
          
          <Button 
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 text-sm md:text-xl px-8 md:px-12 py-6 md:py-8 font-bold shadow-2xl"
            onClick={() => {
              window.location.href = '/formulario';
            }}
          >
            <Calendar className="mr-2 md:mr-3 h-4 w-4 md:h-6 md:w-6" />
            {currentContent.cta}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ScheduleDemo;
