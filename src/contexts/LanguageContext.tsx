
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, LanguageContextType } from '@/types/language';
import { translations } from '@/translations';
import { useLanguageSwitcher } from '@/hooks/useLanguageSwitcher';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage first
    const savedLanguage = localStorage.getItem('language') as Language;
    // Always default to Spanish if no saved preference
    if (!savedLanguage) {
      return 'es';
    }
    return savedLanguage === 'en' ? 'en' : 'es';
  });

  // Use the hook to manage language preferences in localStorage and document
  useLanguageSwitcher(language);

  const t = (key: string): string => {
    return translations[language][key] || key;
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
