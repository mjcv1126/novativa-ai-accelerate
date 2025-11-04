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
  const {
    language,
    setLanguage,
    t
  } = useLanguage();
  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  // Floating variant (appears on the side of the screen)
  if (variant === 'floating') {
    return <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40">
        
      </div>;
  }

  // Icon only variant
  if (variant === 'icon') {
    return;
  }

  // Subtle text variant
  if (variant === 'subtle') {
    return <button onClick={toggleLanguage} className={`flex items-center gap-1.5 text-sm font-medium ${className}`}>
        <Globe className="h-4 w-4" />
        <span>{t('language.current')}</span>
      </button>;
  }

  // Default button variant
  return <Button variant="outline" size="sm" onClick={toggleLanguage} className={`flex items-center gap-1.5 ${className}`}>
      <Globe className="h-4 w-4" />
      <span>{t('language.switch')}</span>
    </Button>;
};
export default LanguageToggle;