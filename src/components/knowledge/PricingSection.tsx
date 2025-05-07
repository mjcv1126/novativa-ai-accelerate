
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const PricingSection = () => {
  const { language } = useLanguage();
  
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        {language === 'es' 
          ? 'Planes y Precios para NovaChannel' 
          : 'NovaChannel Plans and Pricing'}
      </h2>
      <div className="space-y-4 text-gray-600">
        <p>
          {language === 'es' 
            ? 'Los siguientes planes son específicos para NovaChannel, nuestra solución de atención al cliente basada en IA:' 
            : 'The following plans are specific to NovaChannel, our AI-based customer service solution:'}
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            {language === 'es' 
              ? 'Plan Demo: Gratis para pruebas iniciales' 
              : 'Demo Plan: Free for initial tests'}
          </li>
          <li>
            {language === 'es' 
              ? 'Plan Starter: $49/mes - Ideal para pequeñas empresas' 
              : 'Starter Plan: $49/month - Ideal for small businesses'}
          </li>
          <li>
            {language === 'es' 
              ? 'Plan Elite: $60/mes - Para empresas en crecimiento' 
              : 'Elite Plan: $60/month - For growing companies'}
          </li>
          <li>
            {language === 'es' 
              ? 'Plan Diamante: $99/mes - Solución empresarial completa' 
              : 'Diamond Plan: $99/month - Complete business solution'}
          </li>
        </ul>
        <p className="mt-4 italic text-sm">
          {language === 'es' 
            ? 'Nota: Para otras soluciones como Generación de Contenido, Desarrollo con IA y servicios personalizados, los precios se determinan según las necesidades específicas de cada cliente. Le recomendamos agendar una consulta para obtener una cotización personalizada.' 
            : 'Note: For other solutions such as Content Generation, AI Development, and custom services, prices are determined according to the specific needs of each client. We recommend scheduling a consultation for a personalized quote.'}
        </p>
      </div>
    </div>
  );
};

export default PricingSection;
