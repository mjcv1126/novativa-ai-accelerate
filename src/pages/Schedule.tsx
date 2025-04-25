
import React from 'react';
import { Calendar } from 'lucide-react';
import LouisebotWidget from '@/components/shared/LouisebotWidget';

const Schedule = () => {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://asset-tidycal.b-cdn.net/js/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <LouisebotWidget />
      <section className="pt-32 pb-16 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Agenda una Demo con Novativa
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Selecciona el horario que mejor te convenga para conocer nuestras soluciones de IA
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <div className="tidycal-embed" data-path="novativa"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Schedule;
