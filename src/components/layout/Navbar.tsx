
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-md backdrop-blur-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/4ca26889-5685-42df-b0a0-4032951f24ee.png" 
            alt="Novativa Logo" 
            className="h-12 md:h-14 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-800 hover:text-novativa-teal font-medium transition-colors">
            Inicio
          </Link>
          <Link to="/servicios" className="text-gray-800 hover:text-novativa-teal font-medium transition-colors">
            Servicios
          </Link>
          <Link to="/precios" className="text-gray-800 hover:text-novativa-teal font-medium transition-colors">
            Precios
          </Link>
          <Link to="/blog" className="text-gray-800 hover:text-novativa-teal font-medium transition-colors">
            Blog
          </Link>
          <Link to="/contacto" className="text-gray-800 hover:text-novativa-teal font-medium transition-colors">
            Contacto
          </Link>
          <Button
            asChild
            className="bg-gradient-to-r from-novativa-orange to-novativa-lightOrange hover:opacity-90 transition-opacity"
          >
            <Link to="/contacto">
              Comienza ahora
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-800 hover:text-novativa-teal px-4 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              to="/servicios" 
              className="text-gray-800 hover:text-novativa-teal px-4 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios
            </Link>
            <Link 
              to="/precios" 
              className="text-gray-800 hover:text-novativa-teal px-4 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Precios
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-800 hover:text-novativa-teal px-4 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/contacto" 
              className="text-gray-800 hover:text-novativa-teal px-4 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
            <Button
              asChild
              className="bg-gradient-to-r from-novativa-orange to-novativa-lightOrange hover:opacity-90 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/contacto">
                Comienza ahora
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
