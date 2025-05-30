
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, Heart, ArrowRight, Timer } from 'lucide-react';

interface FinalCTASectionProps {
  openTidyCal: () => void;
}

const FinalCTASection: React.FC<FinalCTASectionProps> = ({ openTidyCal }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-novativa-teal/10 to-novativa-orange/10">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <Heart className="w-16 h-16 text-novativa-orange mx-auto mb-8 animate-heart" />
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">
            Transformá tu Consulta <br />
            <span className="text-novativa-orange">Hoy Mismo</span>
          </h2>
          <p className="text-xl mb-12 text-gray-600 leading-relaxed">
            Descubrí cómo NovaMedic puede revolucionar tu práctica médica. <br />
            Agenda una demo personalizada y ve el futuro de la medicina en acción.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
            <div className="flex items-center text-lg text-gray-700">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3 animate-pulse-custom" />
              <span>Setup en 24 horas</span>
            </div>
            <div className="flex items-center text-lg text-gray-700">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3 animate-pulse-custom" />
              <span>Soporte especializado</span>
            </div>
            <div className="flex items-center text-lg text-gray-700">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3 animate-pulse-custom" />
              <span>ROI garantizado</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <Button onClick={openTidyCal} size="lg" className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white px-12 py-8 text-xl font-semibold group shadow-lg">
              <Calendar className="w-6 h-6 mr-2 animate-swing" />
              Agenda tu Demo Gratuita
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform animate-bounce-custom" />
            </Button>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Timer className="w-8 h-8 text-novativa-teal mr-3 animate-pulse-custom" />
                <span className="text-lg font-semibold text-gray-800">¡Solo toma 15 minutos!</span>
              </div>
              <p className="text-gray-600 mb-6">
                En nuestra demo verás exactamente cómo NovaMedic se adapta a tu especialidad y práctica médica.
              </p>
              <Button onClick={openTidyCal} variant="outline" className="w-full border-2 border-novativa-teal text-novativa-teal hover:bg-novativa-teal hover:text-white transition-all duration-300">
                <Calendar className="w-5 h-5 mr-2" />
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
