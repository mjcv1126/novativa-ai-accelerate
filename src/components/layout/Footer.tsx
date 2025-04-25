import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { TiktokIcon } from '@/components/shared/TiktokIcon';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/lovable-uploads/221f5f0b-c84b-48c0-a0c8-1be5c060bcc6.png" 
                alt="Novativa Logo" 
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-gray-300 mb-6">
              Aceleramos tu negocio con soluciones de IA y automatización personalizadas.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/novativa" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-300 hover:text-novativa-lightTeal transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/novativa" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-300 hover:text-novativa-lightTeal transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@novativa" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-gray-300 hover:text-novativa-lightTeal transition-colors">
                <TiktokIcon className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@novativa" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-300 hover:text-novativa-lightTeal transition-colors">
                <Youtube size={20} />
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
                <span className="text-gray-300">
                  San José, Costa Rica | Miami, Florida | San Pedro Sula, Honduras
                </span>
              </li>
              <li className="flex">
                <Mail className="mr-3 text-novativa-orange flex-shrink-0" size={20} />
                <a 
                  href="mailto:soporte@novativa.org" 
                  className="text-gray-300 hover:text-novativa-lightTeal transition-colors"
                >
                  soporte@novativa.org
                </a>
              </li>
              <li className="flex">
                <Phone className="mr-3 text-novativa-orange flex-shrink-0" size={20} />
                <a 
                  href="https://api.whatsapp.com/send?phone=50432142996" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-[#7E69AB] transition-colors"
                >
                  +504 3214-2996
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
