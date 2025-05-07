
import React from 'react';
import LouisebotWidget from '@/components/shared/LouisebotWidget';
import ScreenshotCarousel from '@/components/NovaChannel/ScreenshotCarousel';
import HeroSection from '@/components/NovaChannel/HeroSection';
import FeaturesSection from '@/components/NovaChannel/FeaturesSection';
import BenefitsSection from '@/components/NovaChannel/BenefitsSection';
import CTASection from '@/components/NovaChannel/CTASection';
import PricingTable from '@/components/pricing/PricingTable';
import { useLanguage } from '@/contexts/LanguageContext';

const NovaChannel = () => {
  const { t, language } = useLanguage();
  
  return (
    <>
      <LouisebotWidget />
      <HeroSection />
      
      <div className="max-w-5xl mx-auto px-4 -mt-16 relative z-20">
        <ScreenshotCarousel />
      </div>

      <FeaturesSection />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
            {language === 'es' ? 'Planes y Precios 💎' : 'Plans and Pricing 💎'}
          </h2>
          <PricingTable billingCycle="monthly" />
        </div>
      </section>

      <BenefitsSection />
      <CTASection />
    </>
  );
};

export default NovaChannel;
