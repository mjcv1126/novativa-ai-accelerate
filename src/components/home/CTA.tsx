
import React from 'react';

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
            <a
              href="/agenda"
              className="inline-flex items-center justify-center gap-2 bg-novativa-orange hover:bg-novativa-lightOrange px-6 py-6 rounded-md text-white font-medium transition-colors text-lg"
            >
              Solicita una demostración gratuita
            </a>
            <a
              href="/precios"
              className="inline-flex items-center justify-center gap-2 border border-white bg-transparent hover:bg-white hover:text-novativa-teal px-6 py-6 rounded-md text-white font-medium transition-colors text-lg"
            >
              Ver planes y precios
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
