
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  // Function to handle navigation with refresh for specific routes
  const handleNavigation = (path: string) => {
    onClose();
    if (path === '/contacto' || path === '/agenda') {
      // For these routes, force a page refresh
      window.location.href = path;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg animate-fade-in">
      <div className="container mx-auto py-4 flex flex-col space-y-4">
        <Link 
          to="/" 
          className="text-gray-800 hover:text-novativa-teal px-4 py-2 rounded-md"
          onClick={onClose}
        >
          Inicio
        </Link>
        <div className="px-4 py-2">
          <div className="font-medium text-gray-800 mb-2">Servicios</div>
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
              Agentes IA Web
            </Link>
            <Link 
              to="/servicios/contenido" 
              className="block text-gray-600 hover:text-[#bc3e06]"
              onClick={onClose}
            >
              Generación de Contenido
            </Link>
            <Link 
              to="/servicios/desarrollo" 
              className="block text-gray-600 hover:text-[#bc3e06]"
              onClick={onClose}
            >
              Desarrollo IA
            </Link>
          </div>
        </div>
        <Link 
          to="/precios" 
          className="text-gray-800 hover:text-novativa-teal px-4 py-2 rounded-md"
          onClick={onClose}
        >
          Precios
        </Link>
        <Link 
          to="/blog" 
          className="text-gray-800 hover:text-novativa-teal px-4 py-2 rounded-md"
          onClick={onClose}
        >
          Blog
        </Link>
        <a 
          href="/contacto" 
          className="text-gray-800 hover:text-novativa-teal px-4 py-2 rounded-md"
          onClick={onClose}
        >
          Contacto
        </a>
        <Button
          asChild
          className="bg-gradient-to-r from-novativa-orange to-novativa-lightOrange hover:opacity-90 transition-opacity"
        >
          <a href="/agenda">
            Agenda una demo
          </a>
        </Button>
      </div>
    </div>
  );
};

export default MobileNav;
