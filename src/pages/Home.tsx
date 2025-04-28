
import React, { useEffect } from 'react';
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
  const { language, t } = useLanguage();

  const metaDescriptions = {
    es: "Transforma tu negocio con soluciones de inteligencia artificial y automatización personalizadas. Aumenta tus ventas y mejora la experiencia del cliente.",
    en: "Transform your business with customized AI and automation solutions. Increase your sales and enhance customer experience.",
    fr: "Transformez votre entreprise avec des solutions d'intelligence artificielle et d'automatisation personnalisées. Augmentez vos ventes et améliorez l'expérience client.",
    de: "Transformieren Sie Ihr Unternehmen mit maßgeschneiderten KI- und Automatisierungslösungen. Steigern Sie Ihren Umsatz und verbessern Sie das Kundenerlebnis."
  };
  
  // Force re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      // This effect will re-render the component when language changes
      console.log('Language changed to:', language);
    };
    
    window.addEventListener('language-changed', handleLanguageChange);
    return () => window.removeEventListener('language-changed', handleLanguageChange);
  }, [language]);

  return (
    <>
      <Helmet>
        <title>{t('hero.title')}</title>
        <meta 
          name="description" 
          content={metaDescriptions[language] || metaDescriptions.es}
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
