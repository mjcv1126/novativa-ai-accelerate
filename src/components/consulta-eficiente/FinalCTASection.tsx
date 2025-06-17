
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, Heart, ArrowRight, Timer, Clock } from 'lucide-react';

interface FinalCTASectionProps {
  openTidyCal: () => void;
}

const FinalCTASection: React.FC<FinalCTASectionProps> = ({ openTidyCal }) => {
  const handleFormularioClick = () => {
    window.location.href = '/formulario';
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-novativa-teal/10 to-novativa-orange/10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-novativa-orange mx-auto mb-6 sm:mb-8 animate-heart" />
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 text-gray-900 px-2">
            Transformá tu Consulta <br />
            <span className="text-novativa-orange">Hoy Mismo</span>
          </h2>
          <p className="text-lg sm:text-xl mb-8 sm:mb-12 text-gray-600 leading-relaxed px-2">
            Descubrí cómo NovaMedic puede revolucionar tu práctica médica. <br className="hidden sm:block" />
            Agenda una demo personalizada y ve el futuro de la medicina en acción.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 px-2">
            <div className="flex items-center text-base sm:text-lg text-gray-700">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-3 animate-pulse-custom" />
              <span>Soporte especializado</span>
            </div>
            <div className="flex items-center text-base sm:text-lg text-gray-700">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-3 animate-pulse-custom" />
              <span>ROI garantizado</span>
            </div>
          </div>

          {/* Nueva sección de tiempo de implementación */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-lg max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-novativa-teal mr-3 animate-pulse-custom" />
              <h3 className="text-xl sm:text-2xl font-bold text-novativa-teal">Tiempo de Implementación</h3>
            </div>
            <p className="text-gray-700 mb-4 text-sm sm:text-base leading-relaxed">
              La implementación de NovaMedic toma entre <strong>10 y 40 días hábiles</strong>, dependiendo del tamaño y complejidad de su clínica.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              NovaMedic se adapta completamente a sus procesos, no al revés. Nuestro equipo lo acompaña en cada paso para asegurar una integración fluida y 100% funcional desde el inicio.
            </p>
          </div>
          
          <div className="space-y-6 px-2">
            <Button onClick={handleFormularioClick} size="lg" className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white px-8 sm:px-12 py-6 sm:py-8 text-lg sm:text-xl font-semibold group shadow-lg w-full sm:w-auto">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2 animate-swing" />
              Agenda tu Demo Gratuita
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 group-hover:translate-x-1 transition-transform animate-bounce-custom" />
            </Button>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-lg max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Timer className="w-6 h-6 sm:w-8 sm:h-8 text-novativa-teal mr-3 animate-pulse-custom" />
                <span className="text-base sm:text-lg font-semibold text-gray-800">¡Solo toma 15 minutos!</span>
              </div>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                En nuestra demo verás exactamente cómo NovaMedic se adapta a tu especialidad y práctica médica.
              </p>
              <Button onClick={handleFormularioClick} variant="outline" className="w-full border-2 border-novativa-teal text-novativa-teal hover:bg-novativa-teal hover:text-white transition-all duration-300">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Reservar Mi Lugar Ahora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
