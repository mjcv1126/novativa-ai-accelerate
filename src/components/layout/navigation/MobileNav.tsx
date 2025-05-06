
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface MobileNavProps {
  onClose: () => void;
}

const MobileNav = ({ onClose }: MobileNavProps) => {
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
              to="/iacoding" 
              className="block text-gray-600 hover:text-[#bc3e06]"
              onClick={onClose}
            >
              Desarrollo IA
            </Link>
            <Link 
              to="/servicios/contact-center" 
              className="block text-gray-600 hover:text-[#bc3e06]"
              onClick={onClose}
            >
              Contact Center Humano
            </Link>
            <Link 
              to="/transcripcion" 
              className="block text-gray-600 hover:text-[#bc3e06]"
              onClick={onClose}
            >
              Transcripción de Video
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
          onClick={() => handleNavigation('/contacto')}
        >
          Contacto
        </a>
        <Button
          className="bg-gradient-to-r from-novativa-orange to-novativa-lightOrange hover:opacity-90 transition-opacity"
          onClick={() => handleNavigation('/agenda')}
        >
          Agenda una demo
        </Button>
      </div>
    </div>
  );
};

export default MobileNav;
