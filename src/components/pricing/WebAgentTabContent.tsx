
import React from 'react';
import { ServiceCard } from './ServiceCard';

export const WebAgentTabContent: React.FC = () => {
  return (
    <>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-4">Agente IA Web</h3>
        <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
          Implementa asistentes virtuales inteligentes en tu sitio web para captar leads y mejorar la experiencia de usuario.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ServiceCard
          title="Chatbot para captación de leads"
          tooltip="Implementamos un chatbot inteligente diseñado para captar información de tus visitantes y convertir tráfico web en leads."
          features={[
            "Personalización con tu marca e identidad visual",
            "Integración con tu CRM o herramienta de gestión",
            "Flujos de conversación personalizados",
            "Entrenamiento con información de tu negocio"
          ]}
          buttonText="Solicitar presupuesto"
          buttonLink="/agenda?servicio=chatbot"
        />
        
        <ServiceCard
          title="Videobot + Agente IA"
          tooltip="Combinación de video interactivo con un agente de IA para una experiencia más inmersiva y personalizada."
          features={[
            "Presentador virtual para tu sitio web",
            "Interacción multimedia con los visitantes",
            "Personalizable según tu imagen corporativa",
            "Integración con tus sistemas"
          ]}
          buttonText="Solicitar presupuesto"
          buttonLink="/agenda?servicio=videobot"
          buttonVariant="orange"
        />
      </div>
      
      <div className="mt-8">
        <p className="text-center text-sm text-gray-600 mt-6">
          * Los precios varían según los requisitos específicos y la complejidad del proyecto. Contáctanos para obtener un presupuesto personalizado.
        </p>
      </div>
    </>
  );
};
