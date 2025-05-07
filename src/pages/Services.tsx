
import React from 'react';
import ServicesHero from '@/components/services/ServicesHero';
import AIAgentSection from '@/components/services/AIAgentSection';
import NovaChannelPlans from '@/components/services/NovaChannelPlans';
import ContentGenerationSection from '@/components/services/ContentGenerationSection';
import DevelopmentSection from '@/components/services/DevelopmentSection';
import ServicesCTA from '@/components/services/ServicesCTA';

const Services = () => {
  return (
    <>
      <ServicesHero />
      <AIAgentSection />
      <NovaChannelPlans />
      <ContentGenerationSection />
      <DevelopmentSection />
      <ServicesCTA />
    </>
  );
};

export default Services;
