
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ServiceCard } from './ServiceCard';

export const OtherServicesTabContent: React.FC = () => {
  return (
    <>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-4">Otros Servicios</h3>
        <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
          Soluciones personalizadas para necesidades específicas de tu negocio
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ServiceCard
          title="IA para Generación de Contenido"
          tooltip="Soluciones avanzadas para generar contenido mediante inteligencia artificial"
          features={[
            "Clonación de estilo de escritura",
            "Clonación de voz",
            "Automatizaciones para redes sociales"
          ]}
          buttonText="Solicitar presupuesto"
          buttonLink="/agenda?servicio=contenido"
        />
        
        <ServiceCard
          title="Desarrollo con IA"
          tooltip="Soluciones de desarrollo potenciadas por inteligencia artificial"
          features={[
            "Aplicaciones web personalizadas",
            "Integración de IA en sistemas existentes",
            "Desarrollo de soluciones a medida"
          ]}
          buttonText="Solicitar presupuesto"
          buttonLink="/agenda?servicio=desarrollo"
        />
        
        <ServiceCard
          title="Agentes Autónomos"
          tooltip="Agentes IA autónomos para automatización avanzada"
          features={[
            "Automatización de procesos complejos",
            "Agentes de toma de decisiones",
            "Optimización continua del rendimiento"
          ]}
          buttonText="Solicitar presupuesto"
          buttonLink="/agenda?servicio=agentes"
          buttonVariant="orange"
        />
      </div>
      
      <div className="text-center mt-8">
        <p className="text-gray-600">
          ¿Tienes una necesidad específica no listada? Contáctanos para discutir una solución personalizada.
        </p>
        <Button 
          asChild
          variant="outline"
          className="mt-4 border-novativa-teal text-novativa-teal hover:bg-novativa-teal/10"
        >
          <Link to="/agenda">
            Consulta personalizada
          </Link>
        </Button>
      </div>
    </>
  );
};
