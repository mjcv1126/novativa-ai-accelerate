
import React from 'react';
import KnowledgeHeader from '@/components/knowledge/KnowledgeHeader';
import NovaChannelSection from '@/components/knowledge/NovaChannelSection';
import ContentGenerationSection from '@/components/knowledge/ContentGenerationSection';
import AIDevelopmentSection from '@/components/knowledge/AIDevelopmentSection';
import PricingSection from '@/components/knowledge/PricingSection';
import ImplementationSection from '@/components/knowledge/ImplementationSection';
import SupportSection from '@/components/knowledge/SupportSection';

const KnowledgeBase = () => {
  return (
    <>
      <KnowledgeHeader />
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-12">
            <NovaChannelSection />
            <ContentGenerationSection />
            <AIDevelopmentSection />
            <PricingSection />
            <ImplementationSection />
            <SupportSection />
          </div>
        </div>
      </section>
    </>
  );
};

export default KnowledgeBase;
