
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 shadow-md backdrop-blur-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/9cce1d6a-72e1-493f-bb16-901571c7e858.png" 
            alt="Novativa Logo" 
            className="h-12 md:h-14 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-800 hover:text-novativa-teal font-medium transition-colors">
            Inicio
          </Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className="text-gray-800 hover:text-[#bc3e06] focus:text-[#bc3e06] font-medium data-[state=open]:text-[#bc3e06]"
                >
                  Servicios
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/servicios/novachannel"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[#bc3e06] to-novativa-orange p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            NovaChannel
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Plataforma integral de comunicación multicanal potenciada por IA
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/servicios/agentes-ia"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#bc3e06]/10 hover:text-[#bc3e06] focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium">Agentes IA Web</div>
                          <p className="text-sm leading-snug text-muted-foreground">
                            Chatbots y asistentes virtuales inteligentes
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/servicios/generacion-contenido"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#bc3e06]/10 hover:text-[#bc3e06] focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium">Generación de Contenido</div>
                          <p className="text-sm leading-snug text-muted-foreground">
                            Creación automática de contenido con IA
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/servicios/desarrollo-ia"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#bc3e06]/10 hover:text-[#bc3e06] focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium">Desarrollo IA</div>
                          <p className="text-sm leading-snug text-muted-foreground">
                            Soluciones personalizadas con IA
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
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
            <a href="https://tidycal.com/novativa" target="_blank" rel="noopener noreferrer">
              Agenda una demo
            </a>
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
            <div className="px-4 py-2">
              <div className="font-medium text-gray-800 mb-2">Servicios</div>
              <div className="ml-4 space-y-2">
                <Link 
                  to="/servicios/novachannel" 
                  className="block text-gray-600 hover:text-[#bc3e06]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  NovaChannel
                </Link>
                <Link 
                  to="/servicios/agentes-ia" 
                  className="block text-gray-600 hover:text-[#bc3e06]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Agentes IA Web
                </Link>
                <Link 
                  to="/servicios/generacion-contenido" 
                  className="block text-gray-600 hover:text-[#bc3e06]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Generación de Contenido
                </Link>
                <Link 
                  to="/servicios/desarrollo-ia" 
                  className="block text-gray-600 hover:text-[#bc3e06]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Desarrollo IA
                </Link>
              </div>
            </div>
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
              <a href="https://tidycal.com/novativa" target="_blank" rel="noopener noreferrer">
                Agenda una demo
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
