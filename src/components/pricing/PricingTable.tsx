
import React from 'react';
import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { TableHeader } from './TableHeader';
import { PricingRow } from './PricingRow';
import { PlatformIntegrations } from './PlatformIntegrations';
import { PricingTableRow } from './PricingTableRow';
import { PricingBanner } from './PricingBanner';
import { InstallationNotes } from './InstallationNotes';

type PricingTableProps = {
  billingCycle: 'monthly' | 'annual';
};

const PricingTable: React.FC<PricingTableProps> = ({ billingCycle }) => {
  const pricingPlans = {
    diamante: {
      monthly: '$99.00',
      annual: '$84.15',
      buttonText: 'Seleccionar'
    },
    elite: {
      monthly: '$60.00',
      annual: '$51.00',
      buttonText: 'Seleccionar'
    },
    starter: {
      monthly: '$49.00',
      annual: '$41.65',
      buttonText: 'Seleccionar'
    },
    demo: {
      monthly: 'Gratis',
      annual: 'Gratis',
      buttonText: 'Probar',
      buttonVariant: 'outline' as const
    }
  };

  return (
    <div className="relative">
      <div className="relative overflow-x-auto rounded-lg border">
        <PricingBanner billingCycle={billingCycle} />
        
        <Table>
          <TableHeader />
          <TableBody>
            <PricingTableRow 
              feature="Usuarios Activos / Mes"
              values={['14,000', '5,000', '3,000', '50']}
            />
            <PricingTableRow 
              feature="Bots/Flujos Automatizados"
              values={['20', '15', '10', '5']}
            />
            <PricingTableRow 
              feature="Creación de Formularios y Bloques"
              values={['Ilimitados', 'Ilimitados', 'Ilimitados', 'Ilimitados']}
            />
            <PricingTableRow 
              feature="NovaChannel: OmniChannel LiveChat"
              values={[true, true, true, true]}
            />
            <PricingTableRow 
              feature="Webhooks y API's Disponible"
              values={[true, true, true, true]}
            />
            <PricingTableRow 
              feature="Agentes para LiveChat"
              values={['5', '3', '2', 'N/A']}
            />
            <PricingTableRow 
              feature="Usuarios Administradores"
              values={['3', '2', '1', 'N/A']}
            />
            <PricingTableRow 
              feature="Historial de Chat"
              values={['65 días', '65 días', '65 días', '15 días']}
            />
            <PricingTableRow 
              feature="Onboarding de Implementación"
              values={['1 hora', '1 hora', 'N/A', 'N/A']}
            />
            
            <PlatformIntegrations />
            <PricingRow billingCycle={billingCycle} plans={pricingPlans} />
          </TableBody>
        </Table>
        
        <InstallationNotes billingCycle={billingCycle} />
      </div>
    </div>
  );
};

export default PricingTable;
