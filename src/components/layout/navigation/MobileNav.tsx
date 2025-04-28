
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const { t } = useLanguage();

  // Function to handle navigation with refresh for specific routes
  const handleNavigation = (path: string) => {
    onClose();
    if (path === '/contacto') {
      // For these routes, force a page refresh
      window.location.href = path;
    } else if (path === '/agenda') {
      // Redirect to TidyCal
      window.location.href = 'https://tidycal.com/novativa/demo-gratis';
      return;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg animate-fade-in">
      <div className="container mx-auto py-4 flex flex-col space-y-4">
        <div className="flex justify-end px-4">
          <LanguageSwitcher />
        </div>

        <Link 
          to="/" 
          className="text-gray-800 hover:text-novativa-teal px-4 py-2 rounded-md"
          onClick={onClose}
        >
          {t('navigation.home')}
        </Link>
        <div className="px-4 py-2">
          <div className="font-medium text-gray-800 mb-2">{t('navigation.services')}</div>
          <div className="ml-4 space-y-2">
            <Link 
              to="/novachannel" 
              className="block text-gray-600 hover:text-[#bc3e06]"
              onClick={onClose}
            >
              NovaChannel
            </Link>
            <Link 
              to="/servicios/agentes-ia" 
              className="block text-gray-600 hover:text-[#bc3e06]"
              onClick={onClose}
            >
              {t('services.aiAgents')}
            </Link>
            <Link 
              to="/servicios/contenido" 
              className="block text-gray-600 hover:text-[#bc3e06]"
              onClick={onClose}
            >
              {t('services.content')}
            </Link>
            <Link 
              to="/iacoding" 
              className="block text-gray-600 hover:text-[#bc3e06]"
              onClick={onClose}
            >
              {t('services.development')}
            </Link>
            <Link 
              to="/servicios/contact-center" 
              className="block text-gray-600 hover:text-[#bc3e06]"
              onClick={onClose}
            >
              {t('services.contactCenter')}
            </Link>
          </div>
        </div>
        <Link 
          to="/precios" 
          className="text-gray-800 hover:text-novativa-teal px-4 py-2 rounded-md"
          onClick={onClose}
        >
          {t('navigation.pricing')}
        </Link>
        <Link 
          to="/blog" 
          className="text-gray-800 hover:text-novativa-teal px-4 py-2 rounded-md"
          onClick={onClose}
        >
          {t('navigation.blog')}
        </Link>
        <a 
          href="/contacto" 
          className="text-gray-800 hover:text-novativa-teal px-4 py-2 rounded-md"
          onClick={() => handleNavigation('/contacto')}
        >
          {t('navigation.contact')}
        </a>
        <Button
          className="bg-gradient-to-r from-novativa-orange to-novativa-lightOrange hover:opacity-90 transition-opacity"
          onClick={() => handleNavigation('/agenda')}
        >
          {t('navigation.scheduleDemo')}
        </Button>
      </div>
    </div>
  );
};

export default MobileNav;
