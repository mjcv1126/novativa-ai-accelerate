
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

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Novativa | Soluciones de IA y Automatización Para Tu Negocio</title>
        <meta 
          name="description" 
          content="Transforma tu negocio con soluciones de inteligencia artificial y automatización personalizadas. Aumenta tus ventas y mejora la experiencia del cliente."
        />
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
