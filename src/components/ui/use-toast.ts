
import { useToast, toast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';

// Re-export the toast functions with language context
export const useToastWithLanguage = () => {
  const originalToast = useToast();
  const { language } = useLanguage();
  
  // Add language context to the toast
  return {
    ...originalToast,
    language
  };
};

// Export the original functions too
export { useToast, toast };
