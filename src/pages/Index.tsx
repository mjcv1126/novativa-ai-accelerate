
import { Helmet } from 'react-helmet-async';
import Home from './Home';
import LouisebotWidget from '@/components/shared/LouisebotWidget';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Novativa - Agencia IA y de Automatización que acelera tu negocio</title>
        <meta name="description" content="Novativa es una agencia especializada en inteligencia artificial y automatización que acelera y potencia el crecimiento de tu negocio con soluciones innovadoras." />
        <meta name="keywords" content="novativa, inteligencia artificial, IA, automatización, chatbots, agentes IA, NovaChannel, generación de contenido, desarrollo IA" />
        <meta property="og:title" content="Novativa - Agencia IA y de Automatización" />
        <meta property="og:description" content="Soluciones de IA y automatización personalizadas para acelerar el crecimiento de tu negocio." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novativa.ai" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Novativa - Agencia IA y de Automatización" />
        <meta name="twitter:description" content="Soluciones de IA y automatización personalizadas para acelerar el crecimiento de tu negocio." />
        <link rel="canonical" href="https://novativa.ai" />
      </Helmet>
      <LouisebotWidget />
      <Home />
    </>
  );
};

export default Index;
