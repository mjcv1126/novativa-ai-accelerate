
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.pricing': 'Precios',
    'nav.contact': 'Contacto',
    'nav.schedule': 'AGENDA UN DEMO GRATIS',
    
    // Services
    'services.aiAgents': 'Agentes IA Web',
    'services.contentGeneration': 'Generación de Contenido',
    'services.iaDevelopment': 'Desarrollo IA',
    'services.mobileApps': 'Aplicaciones Móviles',
    'services.novaChannel': 'NovaChannel',
    'services.contactCenter': 'Contact Center Humano',
    'services.videoTranscription': 'Transcripción de Video',
    
    // Footer
    'footer.solutions': 'Soluciones de inteligencia artificial y automatización para potenciar tu negocio. Nos especializamos en transformar ideas en soluciones tecnológicas innovadoras.',
    'footer.services': 'Servicios',
    'footer.company': 'Empresa',
    'footer.legal': 'Legal',
    'footer.termsConditions': 'Términos y Condiciones',
    'footer.refundPolicy': 'Política de Reembolso',
    'footer.scheduleDemo': 'Agendar Demo',
    'footer.copyright': 'Todos los derechos reservados.',
    'footer.videoTranscription': 'Transcripción de Video',
    
    // Schedule Confirmation
    'schedule.seeYou': '¡Nos vemos en la videollamada! 🚀',
    'schedule.explore': 'Exploraremos juntos cómo implementar soluciones de',
    'schedule.ai': 'inteligencia artificial',
    'schedule.automation': 'automatización',
    'schedule.inYourCompany': 'en tu empresa.',
    'schedule.chatbot': 'Chatbot IA',
    'schedule.automation2': 'Automatización',

    // Language Toggle
    'language.switch': 'English',
    'language.current': 'ES'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',
    'nav.schedule': 'SCHEDULE A FREE DEMO',
    
    // Services
    'services.aiAgents': 'AI Web Agents',
    'services.contentGeneration': 'Content Generation',
    'services.iaDevelopment': 'AI Development',
    'services.mobileApps': 'Mobile Applications',
    'services.novaChannel': 'NovaChannel',
    'services.contactCenter': 'Human Contact Center',
    'services.videoTranscription': 'Video Transcription',
    
    // Footer
    'footer.solutions': 'Artificial intelligence and automation solutions to power your business. We specialize in transforming ideas into innovative technological solutions.',
    'footer.services': 'Services',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.termsConditions': 'Terms and Conditions',
    'footer.refundPolicy': 'Refund Policy',
    'footer.scheduleDemo': 'Schedule Demo',
    'footer.copyright': 'All rights reserved.',
    'footer.videoTranscription': 'Video Transcription',
    
    // Schedule Confirmation
    'schedule.seeYou': 'See you on the video call! 🚀',
    'schedule.explore': 'Together we will explore how to implement',
    'schedule.ai': 'artificial intelligence',
    'schedule.automation': 'automation',
    'schedule.inYourCompany': 'solutions in your company.',
    'schedule.chatbot': 'AI Chatbot',
    'schedule.automation2': 'Automation',

    // Language Toggle
    'language.switch': 'Español',
    'language.current': 'EN'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage first
    const savedLanguage = localStorage.getItem('language') as Language;
    // If no saved preference, use browser language
    if (!savedLanguage) {
      return navigator.language.startsWith('es') ? 'es' : 'en';
    }
    return savedLanguage === 'en' ? 'en' : 'es';
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
    // Add a data attribute to the body for CSS targeting if needed
    document.documentElement.setAttribute('data-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
