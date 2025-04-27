
import React from 'react';

const PricingSection = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Planes y Precios para NovaChannel</h2>
      <div className="space-y-4 text-gray-600">
        <p>Los siguientes planes son específicos para NovaChannel, nuestra solución de atención al cliente basada en IA:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Plan Demo: Gratis para pruebas iniciales</li>
          <li>Plan Starter: $49/mes - Ideal para pequeñas empresas</li>
          <li>Plan Elite: $60/mes - Para empresas en crecimiento</li>
          <li>Plan Diamante: $99/mes - Solución empresarial completa</li>
        </ul>
        <p className="mt-4 italic text-sm">
          Nota: Para otras soluciones como Generación de Contenido, Desarrollo con IA y servicios personalizados, 
          los precios se determinan según las necesidades específicas de cada cliente. 
          Le recomendamos agendar una consulta para obtener una cotización personalizada.
        </p>
      </div>
    </div>
  );
};

export default PricingSection;
