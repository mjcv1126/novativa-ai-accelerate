
import React from 'react';
import { Button } from '@/components/ui/button';

const PricingCTA = () => {
  const handleContactClick = () => {
    window.location.href = '/formulario';
  };

  const handleServicesClick = () => {
    window.location.href = '/servicios';
  };

  return (
    <section className="py-16 bg-gradient-to-r from-novativa-orange to-novativa-lightOrange text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">¿Listo para potenciar tu negocio?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Comienza hoy mismo con nuestras soluciones de IA y automatización. ¡El primer paso hacia la transformación digital de tu empresa!
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button
            onClick={handleContactClick}
            className="bg-white text-novativa-orange hover:bg-gray-100"
            size="lg"
          >
            Contáctanos Ahora
          </Button>
          <Button
            onClick={handleServicesClick}
            variant="outline"
            className="border-white text-white hover:bg-white/10"
            size="lg"
          >
            Explorar Servicios
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingCTA;
