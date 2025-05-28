
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from "@/components/ui/table";

type PlanPricing = {
  monthly: string;
  annual: string;
  buttonVariant?: 'default' | 'outline';
  buttonText: string;
};

type PricingRowProps = {
  billingCycle: 'monthly' | 'annual';
  plans: {
    diamante: PlanPricing;
    elite: PlanPricing;
    starter: PlanPricing;
    demo: PlanPricing;
  };
};

export const PricingRow: React.FC<PricingRowProps> = ({ billingCycle, plans }) => {
  const handleNovaChannelClick = () => {
    window.open('https://chat.novativa.org', '_blank');
  };

  return (
    <TableRow>
      <TableCell className="font-medium">Precio Mensual</TableCell>
      {Object.entries(plans).map(([plan, pricing]) => (
        <TableCell key={plan} className="text-center">
          <span className={`text-2xl font-bold ${plan === 'starter' ? 'text-novativa-orange' : plan === 'demo' ? '' : 'text-novativa-teal'}`}>
            {billingCycle === 'monthly' ? pricing.monthly : pricing.annual}
          </span>
          {pricing.monthly !== 'Gratis' && (
            <span className="block text-sm text-gray-500">/mes</span>
          )}
          <Button 
            variant={pricing.buttonVariant || 'default'}
            className={
              pricing.buttonVariant === 'outline' 
                ? "border-novativa-teal text-novativa-teal hover:bg-novativa-teal/10 w-full mt-2"
                : plan === 'starter'
                ? "bg-novativa-orange hover:bg-novativa-lightOrange w-full mt-2"
                : "bg-novativa-teal hover:bg-novativa-lightTeal w-full mt-2"
            }
            onClick={handleNovaChannelClick}
          >
            {pricing.buttonText}
          </Button>
        </TableCell>
      ))}
    </TableRow>
  );
};
