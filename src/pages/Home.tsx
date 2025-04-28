
import React from 'react';
import Hero from '@/components/home/Hero';
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
  const { language } = useLanguage();

  const metaDescriptions = {
    es: "Transforma tu negocio con soluciones de inteligencia artificial y automatización personalizadas. Aumenta tus ventas y mejora la experiencia del cliente.",
    en: "Transform your business with customized AI and automation solutions. Increase your sales and enhance customer experience."
  };

  const titles = {
    es: "Novativa | Soluciones de IA y Automatización Para Tu Negocio",
    en: "Novativa | AI and Automation Solutions For Your Business"
  };

  return (
    <>
      <Helmet>
        <title>{titles[language]}</title>
        <meta 
          name="description" 
          content={metaDescriptions[language]}
        />
        <html lang={language} />
      </Helmet>
      <LouisebotWidget />
      <Hero />
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
