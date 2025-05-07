
import React from 'react';
import HeroSection from '@/components/contact-center/HeroSection';
import ServicesOverview from '@/components/contact-center/ServicesOverview';
import MainServices from '@/components/contact-center/MainServices';
import Benefits from '@/components/contact-center/Benefits';
import CTASection from '@/components/contact-center/CTASection';

const ContactCenter = () => {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <MainServices />
      <Benefits />
      <CTASection />
    </>
  );
};

export default ContactCenter;
