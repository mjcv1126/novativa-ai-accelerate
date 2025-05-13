
import { useToast as useToastOriginal } from "@/components/ui/toast";
import { toast as toastOriginal } from "@/components/ui/toast";
import { useLanguage } from '@/contexts/LanguageContext';

export const useToast = () => {
  const originalToast = useToastOriginal();
  const { language } = useLanguage();
  
  // Add language context to the toast
  return {
    ...originalToast,
    language
  };
};

export const toast = toastOriginal;
