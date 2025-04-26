
import React from 'react';
import { Button } from '@/components/ui/button';

type BillingToggleProps = {
  billingCycle: 'monthly' | 'annual';
  setBillingCycle: (cycle: 'monthly' | 'annual') => void;
};

export const BillingToggle: React.FC<BillingToggleProps> = ({ 
  billingCycle, 
  setBillingCycle 
}) => {
  return (
    <div className="inline-flex items-center p-1 bg-gray-100 rounded-lg mb-8">
      <Button
        variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
        className={billingCycle === 'monthly' ? 'bg-novativa-teal text-white' : 'text-gray-600'}
        onClick={() => setBillingCycle('monthly')}
      >
        Mensual
      </Button>
      <Button
        variant={billingCycle === 'annual' ? 'default' : 'ghost'}
        className={billingCycle === 'annual' ? 'bg-novativa-teal text-white' : 'text-gray-600'}
        onClick={() => setBillingCycle('annual')}
      >
        Anual (15% descuento)
      </Button>
    </div>
  );
};
