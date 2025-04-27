
import React from 'react';

const ImplementationSection = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Proceso de Implementación Detallado</h2>
      <div className="space-y-4 text-gray-600">
        <p>Nuestro proceso de implementación está diseñado para garantizar una transición suave y exitosa:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Evaluación Inicial (1-2 días)
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>Análisis de necesidades específicas</li>
              <li>Evaluación de infraestructura actual</li>
              <li>Identificación de puntos de mejora</li>
            </ul>
          </li>
          <li>Diseño de Solución (2-3 días)
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>Arquitectura personalizada</li>
              <li>Plan de integración</li>
              <li>Definición de KPIs</li>
            </ul>
          </li>
          <li>Implementación (1-4 semanas)
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>Configuración del sistema</li>
              <li>Integración con sistemas existentes</li>
              <li>Pruebas de calidad</li>
            </ul>
          </li>
          <li>Capacitación (1 semana)
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>Entrenamiento del personal</li>
              <li>Documentación detallada</li>
              <li>Recursos de apoyo</li>
            </ul>
          </li>
          <li>Seguimiento y Optimización (Continuo)
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>Monitoreo de rendimiento</li>
              <li>Ajustes y optimizaciones</li>
              <li>Soporte continuo</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default ImplementationSection;
