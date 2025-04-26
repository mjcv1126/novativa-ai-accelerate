
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const PreFooterCTA = () => {
  const openTidyCal = () => {
    window.open('https://tidycal.com/novativa/demo-gratis', '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          ¿Listo para impulsar tu negocio con IA?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Descubre cómo podemos transformar tu empresa con soluciones de IA personalizadas
        </p>
        <Button
          onClick={openTidyCal}
          size="lg"
          className="bg-white text-[#1A1F2C] hover:bg-gray-100 transition-colors px-8 py-6 text-lg font-semibold"
        >
          <Calendar className="w-6 h-6 mr-2" />
          Agenda una demo gratis
        </Button>
      </div>
    </section>
  );
};

export default PreFooterCTA;
