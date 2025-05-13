
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const DesktopNav = () => {
  const location = useLocation();
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
    <nav className="hidden md:flex md:gap-6 lg:gap-10">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.href}
          className={`text-sm font-medium transition-colors hover:text-novativa-orange ${
            location.pathname === item.href
              ? "text-novativa-orange"
              : "text-gray-600"
          }`}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNav;
