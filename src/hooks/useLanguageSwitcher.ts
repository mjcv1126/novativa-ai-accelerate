
import { useEffect } from 'react';
import { Language } from '@/types/language';

/**
 * Hook that manages the language preference in localStorage and document attributes
 * @param language Current language state
 */
export const useLanguageSwitcher = (language: Language) => {
  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('language', language);
    
    // Add a data attribute to the document element for CSS targeting if needed
    document.documentElement.setAttribute('data-language', language);
  }, [language]);
};
