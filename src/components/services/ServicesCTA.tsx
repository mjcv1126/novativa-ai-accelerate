
import React from 'react';
import ScheduleDialog from '@/components/shared/ScheduleDialog';
import { useLanguage } from '@/contexts/LanguageContext';

const ServicesCTA = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">¿Listo para impulsar tu negocio con IA?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Agenda una demostración y descubre cómo nuestras soluciones pueden transformar tu empresa.
        </p>
        <ScheduleDialog className="bg-novativa-orange hover:bg-novativa-lightOrange text-white px-6" size="lg">
          Agenda una demostración gratuita
        </ScheduleDialog>
      </div>
    </section>
  );
};

export default ServicesCTA;
