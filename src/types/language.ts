
export type Language = 'es' | 'en';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export interface TranslationRecord {
  [key: string]: string;
}

export interface TranslationsData {
  es: TranslationRecord;
  en: TranslationRecord;
}
