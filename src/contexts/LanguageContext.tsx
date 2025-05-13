
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, LanguageContextType } from '@/types/language';
import { translations } from '@/translations';
import { useLanguageSwitcher } from '@/hooks/useLanguageSwitcher';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage first
    const savedLanguage = localStorage.getItem('language') as Language;
    // If no saved preference, use Spanish as default (instead of checking browser language)
    if (!savedLanguage) {
      return 'es';
    }
    return savedLanguage === 'en' ? 'en' : 'es';
  });

  // Use the hook to manage language preferences in localStorage and document
  useLanguageSwitcher(language);

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

// Re-export translations for direct access if needed
export { translations };
