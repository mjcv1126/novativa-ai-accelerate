import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import DesktopNav from './navigation/DesktopNav';
import MobileNav from './navigation/MobileNav';
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
  return <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="mr-6">
              <img alt="Novativa" className="h-10" src="/lovable-uploads/876bbab1-6c0b-4434-ba8d-c6e774f6d16d.png" />
            </Link>
            <DesktopNav />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/contacto">
              <Button className="bg-novativa-orange hover:bg-novativa-darkOrange">
                Contáctanos
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && <MobileNav onClose={() => setIsMenuOpen(false)} />}
    </header>;
};
export default Navbar;