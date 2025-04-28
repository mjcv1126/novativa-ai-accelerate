
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'es' | 'en';

// Define the context shape
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'es',
  setLanguage: () => {},
  t: (key) => key,
});

// Translations object with nested structure
const translations = {
  es: {
    navigation: {
      home: 'Inicio',
      services: 'Servicios',
      pricing: 'Precios',
      contact: 'Contacto',
      blog: 'Blog',
      scheduleDemo: 'Agenda una demo'
    },
    hero: {
      title: 'Soluciones de IA y Automatización Para Tu Negocio',
      subtitle: 'Transforma tu negocio con soluciones de inteligencia artificial y automatización personalizadas.',
      cta: 'Agendar Demo Gratis'
    },
    services: {
      title: 'Nuestros Servicios',
      aiAgents: 'Agentes IA Web',
      content: 'Generación de Contenido',
      development: 'Desarrollo IA',
      apps: 'Aplicaciones Móviles',
      contactCenter: 'Contact Center Humano'
    },
    cta: {
      title: '¿Listo para transformar tu negocio?',
      subtitle: 'Impulsa tu empresa con nuestras soluciones de inteligencia artificial y automatización.',
      scheduleDemo: 'Solicita una demostración gratuita',
      viewPricing: 'Ver planes y precios'
    },
    contact: {
      title: 'Contacta con Novativa',
      subtitle: 'Agenda una reunión con nosotros y descubre cómo podemos transformar tu negocio con soluciones de inteligencia artificial.',
      quickResponse: '¿Necesitas una respuesta rápida?',
      scheduleNow: 'Agenda una reunión ahora'
    },
    common: {
      readMore: 'Leer más',
      learnMore: 'Aprender más',
      contactUs: 'Contáctanos',
      freeDemo: 'Demo Gratis',
      languageSelector: 'Seleccionar idioma'
    }
  },
  en: {
    navigation: {
      home: 'Home',
      services: 'Services',
      pricing: 'Pricing',
      contact: 'Contact',
      blog: 'Blog',
      scheduleDemo: 'Schedule a demo'
    },
    hero: {
      title: 'AI and Automation Solutions For Your Business',
      subtitle: 'Transform your business with customized artificial intelligence and automation solutions.',
      cta: 'Schedule a Free Demo'
    },
    services: {
      title: 'Our Services',
      aiAgents: 'AI Web Agents',
      content: 'Content Generation',
      development: 'AI Development',
      apps: 'Mobile Applications',
      contactCenter: 'Human Contact Center'
    },
    cta: {
      title: 'Ready to transform your business?',
      subtitle: 'Boost your company with our artificial intelligence and automation solutions.',
      scheduleDemo: 'Request a free demonstration',
      viewPricing: 'View plans and pricing'
    },
    contact: {
      title: 'Contact Novativa',
      subtitle: 'Schedule a meeting with us and discover how we can transform your business with artificial intelligence solutions.',
      quickResponse: 'Need a quick response?',
      scheduleNow: 'Schedule a meeting now'
    },
    common: {
      readMore: 'Read more',
      learnMore: 'Learn more',
      contactUs: 'Contact us',
      freeDemo: 'Free Demo',
      languageSelector: 'Select language'
    }
  }
};

// Helper function to get a nested translation by key path
function getNestedTranslation(obj: any, path: string, params?: Record<string, string>): string {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return path; // Return the key if translation not found
    }
  }
  
  if (typeof result === 'string') {
    // Replace params in the string if provided
    if (params) {
      let finalString = result;
      Object.entries(params).forEach(([key, value]) => {
        finalString = finalString.replace(new RegExp(`{{${key}}}`, 'g'), value);
      });
      return finalString;
    }
    return result;
  }
  
  return path; // Return the key if result is not a string
}

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get initial language from localStorage or default to Spanish
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'es';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  // Function to change language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Translation function
  const t = (key: string, params?: Record<string, string>): string => {
    return getNestedTranslation(translations[language], key, params);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
