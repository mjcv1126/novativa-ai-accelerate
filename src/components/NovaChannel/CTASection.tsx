
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          ¡Revoluciona tu comunicación hoy! 🚀
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
          Únete a las empresas que ya transformaron su manera de conectar con clientes
        </p>
        <Button
          asChild
          size="lg"
          className="bg-novativa-orange hover:bg-novativa-lightOrange text-white px-8 py-6 text-lg rounded-full transition-transform hover:scale-105 shadow-lg"
        >
          <a href="https://tidycal.com/novativa" target="_blank" rel="noopener noreferrer">
            Agenda una Demo Personalizada 🎯
          </a>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
