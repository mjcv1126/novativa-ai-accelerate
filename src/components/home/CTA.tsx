
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal text-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para transformar tu negocio?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Impulsa tu empresa con nuestras soluciones de inteligencia artificial y automatización.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              asChild
              className="bg-novativa-orange hover:bg-novativa-lightOrange px-6 py-6 text-white"
              size="lg"
            >
              <Link to="/contacto">
                Solicita una demostración gratuita
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-gray-600 hover:bg-white hover:text-novativa-teal px-6 py-6"
              size="lg"
            >
              <Link to="/precios">
                Ver planes y precios
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
