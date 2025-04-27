
import React from 'react';

const SupportSection = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Soporte Técnico</h2>
      <div className="space-y-4 text-gray-600">
        <p>Nuestro soporte técnico incluye:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Soporte por email y chat en horario laboral</li>
          <li>Documentación técnica detallada</li>
          <li>Capacitación inicial del equipo</li>
          <li>Mantenimiento preventivo mensual</li>
          <li>Actualizaciones regulares del sistema</li>
        </ul>
      </div>
    </div>
  );
};

export default SupportSection;
