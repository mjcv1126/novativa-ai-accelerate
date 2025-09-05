
import React from 'react';
import Hero from '@/components/home/Hero';
import MobileServicesGrid from '@/components/home/MobileServicesGrid';
import Features from '@/components/home/Features';
import Services from '@/components/home/Services';
import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';
import HowItWorks from '@/components/home/HowItWorks';
import Benefits from '@/components/home/Benefits';
import FAQ from '@/components/home/FAQ';
import LouisebotWidget from '@/components/shared/LouisebotWidget';
import { Helmet } from 'react-helmet-async';
import HomeTabs from '@/components/home/HomeTabs';
import { useLanguage } from '@/contexts/LanguageContext';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  
  const metaDescription = language === 'es' 
    ? "Transforma tu negocio con soluciones de inteligencia artificial y automatización personalizadas. Aumenta tus ventas y mejora la experiencia del cliente."
    : "Transform your business with custom artificial intelligence and automation solutions. Increase your sales and improve customer experience.";

  const title = language === 'es'
    ? "Novativa | Soluciones de IA y Automatización Para Tu Negocio"
    : "Novativa | AI and Automation Solutions For Your Business";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta 
          name="description" 
          content={metaDescription}
        />
      </Helmet>
      <LouisebotWidget />
      <Hero />
      <MobileServicesGrid />
      <HomeTabs />
      <Features />
      <Services />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <FAQ />
      <CallToAction />
    </>
  );
};

export default Home;
