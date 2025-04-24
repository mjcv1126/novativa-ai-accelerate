
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/lovable-uploads/4ca26889-5685-42df-b0a0-4032951f24ee.png" 
                alt="Novativa Logo" 
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-gray-300 mb-6">
              Aceleramos tu negocio con soluciones de IA y automatización personalizadas.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" aria-label="Facebook" className="text-gray-300 hover:text-novativa-lightTeal transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-gray-300 hover:text-novativa-lightTeal transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="text-gray-300 hover:text-novativa-lightTeal transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="text-gray-300 hover:text-novativa-lightTeal transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 border-l-4 border-novativa-orange pl-3">Servicios</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/servicios" className="text-gray-300 hover:text-novativa-lightTeal transition-colors">
                  Agentes IA Web
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-gray-300 hover:text-novativa-lightTeal transition-colors">
                  Agentes IA + NovaChannel
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-gray-300 hover:text-novativa-lightTeal transition-colors">
                  IA para Generación de Contenido
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-gray-300 hover:text-novativa-lightTeal transition-colors">
                  Desarrollo con IA
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-gray-300 hover:text-novativa-lightTeal transition-colors">
                  Agentes Autónomos
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 border-l-4 border-novativa-orange pl-3">Enlaces</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-novativa-lightTeal transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-gray-300 hover:text-novativa-lightTeal transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/precios" className="text-gray-300 hover:text-novativa-lightTeal transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-novativa-lightTeal transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-300 hover:text-novativa-lightTeal transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 border-l-4 border-novativa-orange pl-3">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="mr-3 text-novativa-orange flex-shrink-0" size={20} />
                <span className="text-gray-300">San José, Costa Rica</span>
              </li>
              <li className="flex">
                <Mail className="mr-3 text-novativa-orange flex-shrink-0" size={20} />
                <a href="mailto:info@novativa.ai" className="text-gray-300 hover:text-novativa-lightTeal transition-colors">
                  info@novativa.ai
                </a>
              </li>
              <li className="flex">
                <Phone className="mr-3 text-novativa-orange flex-shrink-0" size={20} />
                <a href="tel:+50622222222" className="text-gray-300 hover:text-novativa-lightTeal transition-colors">
                  +506 2222-2222
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Novativa. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link to="/politica-privacidad" className="text-gray-400 hover:text-novativa-lightTeal text-sm transition-colors">
                Política de Privacidad
              </Link>
              <Link to="/terminos-servicio" className="text-gray-400 hover:text-novativa-lightTeal text-sm transition-colors">
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
