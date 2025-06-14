
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const ScheduleDemo = () => {
  const handleScheduleClick = () => {
    window.location.href = '/formulario';
  };

  return (
    <section id="schedule" className="py-20 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-t from-novativa-teal/10 to-transparent" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para darle vida a tu idea?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Agenda una videollamada y cuéntanos un poco de tu idea y juntos lo traemos a la vida
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-gray-900/50 p-6 rounded-xl backdrop-blur text-center">
          <Button 
            onClick={handleScheduleClick}
            size="lg"
            className="bg-novativa-orange hover:bg-novativa-lightOrange text-white px-8 py-6 text-lg"
          >
            <Calendar className="mr-2 h-6 w-6" />
            Agendar Reunión
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ScheduleDemo;
