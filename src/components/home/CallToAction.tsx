
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CallToAction = () => {
  const { language } = useLanguage();
  
  const handleScheduleDemo = () => {
    window.open('https://tidycal.com/novativa/demo-gratis', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal text-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'es' ? '¿Listo para transformar tu negocio?' : 'Ready to transform your business?'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {language === 'es'
              ? 'Impulsa tu empresa con nuestras soluciones de inteligencia artificial y automatización.'
              : 'Boost your company with our artificial intelligence and automation solutions.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={handleScheduleDemo} 
              size="lg"
              className="bg-white text-novativa-teal hover:bg-gray-100"
            >
              <Calendar className="mr-2 h-5 w-5" />
              {language === 'es' ? 'Agendar Una Demo Gratis' : 'Schedule A Free Demo'}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-novativa-teal"
              asChild
            >
              <Link to={language === 'es' ? '/contacto' : '/contact'}>
                {language === 'es' ? 'Contactar con Ventas' : 'Contact Sales'}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
