
import React from 'react';
import { Link } from 'react-router-dom';
import NovativaLogo from '@/components/shared/NovativaLogo';
import { Button } from '@/components/ui/button';
import { Calendar, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <NovativaLogo variant="light" />
            <p className="mt-4 mb-6 text-gray-400 max-w-md">
              Soluciones de inteligencia artificial y automatización para potenciar tu negocio. Nos especializamos en transformar ideas en soluciones tecnológicas innovadoras.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/novativa_ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Twitter aria-hidden="true" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://facebook.com/novativa.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Facebook aria-hidden="true" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com/novativa.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Instagram aria-hidden="true" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://linkedin.com/company/novativa-ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Linkedin aria-hidden="true" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/servicios/agentes-ia" className="hover:text-white transition-colors">Agentes de IA</Link>
              </li>
              <li>
                <Link to="/servicios/contenido" className="hover:text-white transition-colors">Generación de Contenido</Link>
              </li>
              <li>
                <Link to="/iacoding" className="hover:text-white transition-colors">Desarrollo de IA</Link>
              </li>
              <li>
                <Link to="/servicios/apps" className="hover:text-white transition-colors">Aplicaciones Móviles</Link>
              </li>
              <li>
                <Link to="/novachannel" className="hover:text-white transition-colors">NovaChannel</Link>
              </li>
              <li>
                <Link to="/servicios/contact-center" className="hover:text-white transition-colors">Contact Center IA</Link>
              </li>
              <li>
                <Link to="/transcripcion" className="hover:text-white transition-colors">Transcripción de Video</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/servicios" className="hover:text-white transition-colors">Servicios</Link>
              </li>
              <li>
                <Link to="/precios" className="hover:text-white transition-colors">Precios</Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-white transition-colors">Contacto</Link>
              </li>
              <li>
                <Link to="/knowledge" className="hover:text-white transition-colors">Knowledge Base</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terminos-condiciones" className="hover:text-white transition-colors">Términos y Condiciones</Link>
              </li>
              <li>
                <Link to="/politica-reembolso" className="hover:text-white transition-colors">Política de Reembolso</Link>
              </li>
            </ul>
            
            <div className="mt-8">
              <Button className="w-full bg-novativa-teal hover:bg-novativa-lightTeal flex items-center gap-2" asChild>
                <a href="https://tidycal.com/novativa/demo-gratis" target="_blank" rel="noopener noreferrer">
                  <Calendar className="h-4 w-4" />
                  <span>Agendar Demo</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-center text-gray-400">
          <p>&copy; {currentYear} Novativa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
