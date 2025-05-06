
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageToggleProps {
  variant?: 'default' | 'subtle' | 'icon';
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
