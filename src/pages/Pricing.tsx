
import React from 'react';
import PricingHero from '@/components/pricing/PricingHero';
import PricingTabs from '@/components/pricing/PricingTabs';
import PricingFAQ from '@/components/pricing/PricingFAQ';
import PricingCTA from '@/components/pricing/PricingCTA';

const Pricing = () => {
  return (
    <>
      <PricingHero />
      <PricingTabs />
      <PricingFAQ />
      <PricingCTA />
    </>
  );
};

export default Pricing;
