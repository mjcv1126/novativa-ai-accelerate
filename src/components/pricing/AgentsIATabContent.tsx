
import React from 'react';
import PricingTable from './PricingTable';
import { BillingToggle } from './BillingToggle';

type AgentsIATabContentProps = {
  billingCycle: 'monthly' | 'annual';
  setBillingCycle: (cycle: 'monthly' | 'annual') => void;
};

export const AgentsIATabContent: React.FC<AgentsIATabContentProps> = ({
  billingCycle,
  setBillingCycle
}) => {
  return (
    <div className="mb-8 text-center relative">
      <BillingToggle 
        billingCycle={billingCycle} 
        setBillingCycle={setBillingCycle} 
      />
      
      <div className="relative">
        <p className="text-gray-600 mb-6">
          Nuestros planes Agentes IA + NovaChannel incluyen todas las herramientas necesarias para gestionar la comunicación con tus clientes mediante IA.
        </p>
      </div>
    
      <PricingTable billingCycle={billingCycle} />
      
      <div className="text-center mt-6 text-gray-600 text-sm">
        <p>Todos los precios están en dólares americanos (USD). Para facturación en moneda local, contáctanos.</p>
        <p className="mt-2">Si eliges el plan anual, el servicio de Setup Inicial + Creación de Flujos Automatizados es gratis.</p>
      </div>
    </div>
  );
};

