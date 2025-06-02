
import React, { useEffect, useState } from 'react';
import HeroSection from '@/components/social-media-ai/HeroSection';
import PricingComparison from '@/components/social-media-ai/PricingComparison';
import ServiceExamples from '@/components/social-media-ai/ServiceExamples';
import FeaturesList from '@/components/social-media-ai/FeaturesList';
import Benefits from '@/components/social-media-ai/Benefits';
import ScheduleDemo from '@/components/social-media-ai/ScheduleDemo';
import StickyHeaderCTA from '@/components/social-media-ai/StickyHeaderCTA';
import { useLanguage } from '@/contexts/LanguageContext';

const SocialMediaAI = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden pb-16">
      <StickyHeaderCTA />
      <HeroSection isVisible={isVisible} />
      <PricingComparison />
      <ServiceExamples />
      <FeaturesList />
      <Benefits />
      <ScheduleDemo />
    </div>
  );
};

export default SocialMediaAI;
