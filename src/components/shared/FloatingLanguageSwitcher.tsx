
import React, { useState, useRef, useEffect } from 'react';
import { Flag } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const FloatingLanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollTop = useRef(0);
  
  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };
  
  // Hide switcher on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY;
      if (st > lastScrollTop.current) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      lastScrollTop.current = st <= 0 ? 0 : st;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={cn(
        "fixed left-4 top-1/3 transform -translate-y-1/2 z-50 transition-all duration-300",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        "group"
      )}
    >
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button 
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group-hover:bg-white"
            aria-label="Cambiar idioma"
          >
            <span className="text-lg">{currentLanguage?.flag}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="center" 
          className="mt-2 bg-white/95 backdrop-blur-sm border border-gray-100 shadow-lg rounded-lg p-1 w-40"
        >
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-md transition-colors ${
                language === lang.code ? 'bg-gray-100/80 font-medium' : 'hover:bg-gray-100/50'
              }`}
              onClick={() => handleLanguageSelect(lang.code as Language)}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FloatingLanguageSwitcher;
