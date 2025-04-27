
import React from 'react';

const AIDevelopmentSection = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Desarrollo con IA</h2>
      <div className="space-y-4 text-gray-600">
        <p>Nuestro enfoque de desarrollo potenciado por IA revoluciona la creación de software empresarial.</p>
        <p>Ventajas clave:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Desarrollo Acelerado
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>Reducción del tiempo de desarrollo hasta en un 70%</li>
              <li>Generación automática de código optimizado</li>
              <li>Pruebas automatizadas con IA</li>
            </ul>
          </li>
          <li>Integración Inteligente
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>Conexión seamless con sistemas existentes</li>
              <li>APIs inteligentes y auto-documentadas</li>
              <li>Migración asistida por IA</li>
            </ul>
          </li>
          <li>Optimización Continua
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>Monitoreo predictivo de rendimiento</li>
              <li>Detección temprana de problemas</li>
              <li>Sugerencias de mejora automáticas</li>
            </ul>
          </li>
          <li>Mantenimiento Inteligente
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>Actualizaciones automáticas de seguridad</li>
              <li>Optimización continua del código</li>
              <li>Documentación actualizada automáticamente</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AIDevelopmentSection;
