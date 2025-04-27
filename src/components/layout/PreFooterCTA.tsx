
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const PreFooterCTA = () => {
  const openTidyCal = () => {
    window.open('https://tidycal.com/novativa/demo-gratis', '_blank');
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para impulsar tu negocio?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Agenda una demostración gratuita y descubre cómo nuestras soluciones pueden ayudarte a crecer.
          </p>
          <Button
            onClick={openTidyCal}
            className="bg-novativa-teal hover:bg-novativa-lightTeal font-medium px-6 py-3 rounded-lg transition-all flex items-center gap-2 mx-auto"
          >
            <Calendar size={20} />
            Agendar demostración
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PreFooterCTA;
