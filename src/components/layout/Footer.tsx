import React from 'react';
import { Link } from 'react-router-dom';
import NovativaLogo from '@/components/shared/NovativaLogo';
import { Button } from '@/components/ui/button';
import { Calendar, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/shared/LanguageToggle';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const {
    t,
    language
  } = useLanguage();

  // Determine correct path based on language
  const transcriptionPath = language === 'es' ? '/transcripcion' : '/transcription';
  return <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <NovativaLogo variant="light" />
            <p className="mt-4 mb-6 text-gray-400 max-w-md">
              {t('footer.solutions')}
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
            <h3 className="text-white font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/servicios/agentes-ia" className="hover:text-white transition-colors">{t('services.aiAgents')}</Link>
              </li>
              <li>
                <Link to="/servicios/contenido" className="hover:text-white transition-colors">{t('services.contentGeneration')}</Link>
              </li>
              <li>
                <Link to="/iacoding" className="hover:text-white transition-colors">{t('services.iaDevelopment')}</Link>
              </li>
              <li>
                <Link to="/servicios/apps" className="hover:text-white transition-colors">{t('services.mobileApps')}</Link>
              </li>
              <li>
                <Link to="/novachannel" className="hover:text-white transition-colors">NovaChannel</Link>
              </li>
              <li>
                <Link to="/servicios/contact-center" className="hover:text-white transition-colors">{t('services.contactCenter')}</Link>
              </li>
              
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/servicios" className="hover:text-white transition-colors">{t('nav.services')}</Link>
              </li>
              <li>
                <Link to="/precios" className="hover:text-white transition-colors">{t('nav.pricing')}</Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-white transition-colors">{t('nav.contact')}</Link>
              </li>
              
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terminos-condiciones" className="hover:text-white transition-colors">{t('footer.termsConditions')}</Link>
              </li>
              <li>
                <Link to="/politica-reembolso" className="hover:text-white transition-colors">{t('footer.refundPolicy')}</Link>
              </li>
              
            </ul>
            
            <div className="mt-8">
              <Button className="w-full bg-novativa-teal hover:bg-novativa-lightTeal flex items-center gap-2" asChild>
                <a href="/formulario" rel="noopener noreferrer">
                  <Calendar className="h-4 w-4" />
                  <span>{t('footer.scheduleDemo')}</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-center text-gray-400">
          <p>&copy; {currentYear} Novativa. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>;
};
export default Footer;