
import React from 'react';

type PricingBannerProps = {
  billingCycle: 'monthly' | 'annual';
};

export const PricingBanner: React.FC<PricingBannerProps> = ({ billingCycle }) => {
  if (billingCycle !== 'annual') return null;
  
  return (
    <div className="bg-green-100 text-green-800 text-center py-2 text-sm">
      ¡Paga anualmente y obtén la instalación GRATIS! Ahorra $100 USD
    </div>
  );
};
