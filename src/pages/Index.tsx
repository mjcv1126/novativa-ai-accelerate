import { Helmet } from 'react-helmet-async';
import Home from './Home';

const Index = () => {
  // Pre-connect to domain for faster resource loading
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];

  return (
    <>
      <Helmet>
        {/* Preconnect to critical domains */}
        {preconnectDomains.map(domain => (
          <link key={domain} rel="preconnect" href={domain} crossOrigin="anonymous" />
        ))}
        
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
      <Home />
    </>
  );
};

export default Index;
