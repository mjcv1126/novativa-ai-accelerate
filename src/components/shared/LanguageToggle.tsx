
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  variant?: 'default' | 'subtle' | 'icon' | 'floating';
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  variant = 'default',
  className = ''
}) => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  // Floating variant (appears on the side of the screen)
  if (variant === 'floating') {
    return (
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40">
        <Button 
          variant="default"
          size="sm" 
          onClick={toggleLanguage}
          className={cn(
            "flex items-center gap-1.5 rounded-l-md rounded-r-none bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg py-5",
            className
          )}
        >
          <Languages className="h-5 w-5" />
          <span className="font-bold">{language === 'es' ? 'EN' : 'ES'}</span>
        </Button>
      </div>
    );
  }

  // Icon only variant
  if (variant === 'icon') {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleLanguage}
        className={`rounded-full ${className}`}
        title={t('language.switch')}
      >
        <Globe className="h-5 w-5" />
        <span className="sr-only">{t('language.switch')}</span>
      </Button>
    );
  }

  // Subtle text variant
  if (variant === 'subtle') {
    return (
      <button 
        onClick={toggleLanguage} 
        className={`flex items-center gap-1.5 text-sm font-medium ${className}`}
      >
        <Globe className="h-4 w-4" />
        <span>{t('language.current')}</span>
      </button>
    );
  }

  // Default button variant
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage}
      className={`flex items-center gap-1.5 ${className}`}
    >
      <Globe className="h-4 w-4" />
      <span>{t('language.switch')}</span>
    </Button>
  );
};

export default LanguageToggle;
