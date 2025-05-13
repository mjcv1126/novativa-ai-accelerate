
import { Helmet } from 'react-helmet-async';
import Home from './Home';
import WelcomeDialog from '@/components/shared/WelcomeDialog';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  // Pre-connect to domain for faster resource loading
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];
  
  const { language } = useLanguage();

  return (
    <>
      <Helmet>
        {/* Preconnect to critical domains */}
        {preconnectDomains.map(domain => (
          <link key={domain} rel="preconnect" href={domain} crossOrigin="anonymous" />
        ))}
        
        <title>
          {language === 'es' 
            ? 'Novativa - Agencia IA y de Automatización que acelera tu negocio'
            : 'Novativa - AI and Automation Agency that accelerates your business'}
        </title>
        <meta 
          name="description" 
          content={language === 'es' 
            ? 'Novativa es una agencia especializada en inteligencia artificial y automatización que acelera y potencia el crecimiento de tu negocio con soluciones innovadoras.'
            : 'Novativa is an agency specialized in artificial intelligence and automation that accelerates and enhances your business growth with innovative solutions.'} 
        />
        <meta 
          name="keywords" 
          content={language === 'es' 
            ? 'novativa, inteligencia artificial, IA, automatización, chatbots, agentes IA, NovaChannel, generación de contenido, desarrollo IA'
            : 'novativa, artificial intelligence, AI, automation, chatbots, AI agents, NovaChannel, content generation, AI development'} 
        />
        <meta 
          property="og:title" 
          content={language === 'es' 
            ? 'Novativa - Agencia IA y de Automatización'
            : 'Novativa - AI and Automation Agency'} 
        />
        <meta 
          property="og:description" 
          content={language === 'es' 
            ? 'Soluciones de IA y automatización personalizadas para acelerar el crecimiento de tu negocio.'
            : 'Customized AI and automation solutions to accelerate your business growth.'} 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novativa.ai" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta 
          name="twitter:title" 
          content={language === 'es' 
            ? 'Novativa - Agencia IA y de Automatización'
            : 'Novativa - AI and Automation Agency'} 
        />
        <meta 
          name="twitter:description" 
          content={language === 'es' 
            ? 'Soluciones de IA y automatización personalizadas para acelerar el crecimiento de tu negocio.'
            : 'Customized AI and automation solutions to accelerate your business growth.'} 
        />
        <link rel="canonical" href="https://novativa.ai" />
      </Helmet>
      <WelcomeDialog />
      <Home />
    </>
  );
};

export default Index;
