
import React, { useEffect, useState } from 'react';
import HeroSection from '@/components/ia-coding/HeroSection';
import PricingComparison from '@/components/ia-coding/PricingComparison';
import AppExamples from '@/components/ia-coding/AppExamples';
import FeaturesList from '@/components/ia-coding/FeaturesList';
import Benefits from '@/components/ia-coding/Benefits';
import ScheduleDemo from '@/components/ia-coding/ScheduleDemo';
import StickyHeaderCTA from '@/components/ia-coding/StickyFooterCTA';
import { useLanguage } from '@/contexts/LanguageContext';

const IACoding = () => {
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
      <AppExamples />
      <FeaturesList />
      <Benefits />
      <ScheduleDemo />
    </div>
  );
};

export default IACoding;
