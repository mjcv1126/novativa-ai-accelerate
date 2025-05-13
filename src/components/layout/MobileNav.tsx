
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface MobileNavProps {
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ onClose }) => {
  const { language } = useLanguage();
  
  const navItems = [
    {
      title: language === 'es' ? 'Inicio' : 'Home',
      href: '/',
    },
    {
      title: language === 'es' ? 'Servicios' : 'Services',
      href: language === 'es' ? '/servicios' : '/services',
    },
    {
      title: language === 'es' ? 'Precios' : 'Pricing',
      href: language === 'es' ? '/precios' : '/pricing',
    },
    {
      title: 'NovaChannel',
      href: '/novachannel',
    },
    {
      title: language === 'es' ? 'Transcripción' : 'Transcription',
      href: language === 'es' ? '/transcripcion' : '/transcription',
    },
    {
      title: language === 'es' ? 'Contacto' : 'Contact',
      href: language === 'es' ? '/contacto' : '/contact',
    }
  ];

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg py-4">
      <div className="container mx-auto px-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.href}
                className="block py-2 hover:text-novativa-orange"
                onClick={onClose}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileNav;
