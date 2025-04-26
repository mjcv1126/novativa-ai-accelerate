
import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Calendar, Youtube } from 'lucide-react';
import { TiktokIcon } from '@/components/shared/TiktokIcon';
import { Link } from 'react-router-dom';
import LouisebotWidget from '@/components/shared/LouisebotWidget';
import { Helmet } from 'react-helmet-async';
import { setAntiCacheHeaders } from '@/utils/antiCacheHeaders';
import { toast } from '@/components/ui/sonner';

const Contact = () => {
  const [hasRefreshed, setHasRefreshed] = useState(false);

  useEffect(() => {
    // Apply anti-cache headers
    setAntiCacheHeaders();
    
    // One-time refresh logic
    const shouldRefresh = !sessionStorage.getItem('contactPageRefreshed');
    if (shouldRefresh && !hasRefreshed) {
      sessionStorage.setItem('contactPageRefreshed', 'true');
      setHasRefreshed(true);
      window.location.reload();
      return;
    }
    
    // Improved TidyCal script loading with cache busting
    const loadTidycalScript = () => {
      // First remove any existing script to prevent duplicates
      const existingScript = document.querySelector('script[src*="asset-tidycal.b-cdn.net/js/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      // Create and load a new script with cache busting
      const script = document.createElement('script');
      script.src = `https://asset-tidycal.b-cdn.net/js/embed.js?v=${new Date().getTime()}`;
      script.async = true;
      script.onload = () => {
        console.log('TidyCal script loaded successfully');
        // Force reinitialize if needed
        if (window.TidyCal && typeof window.TidyCal.init === 'function') {
          window.TidyCal.init();
        }
      };
      script.onerror = (error) => {
        console.error('Error loading TidyCal script:', error);
        toast.error('Error al cargar el calendario. Por favor, recarga la página.');
      };
      
      document.body.appendChild(script);
    };
    
    // Small timeout to ensure DOM is fully rendered
    setTimeout(loadTidycalScript, 300);
    
    return () => {
      // Cleanup not needed as script remains for better performance
    };
  }, [hasRefreshed]);

  return (
    <>
      <Helmet>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate, max-age=0" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="-1" />
      </Helmet>
      <LouisebotWidget />
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contacta con <span className="text-novativa-teal">Novativa</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Agenda una reunión con nosotros y descubre cómo podemos transformar tu negocio con soluciones de inteligencia artificial.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-50 rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-8">Información de Contacto</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-novativa-teal/10 p-3 rounded-full mr-4">
                    <MapPin className="text-novativa-teal" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Dirección</h3>
                    <p className="text-gray-600">
                      San José, Costa Rica | Miami, Florida | San Pedro Sula, Honduras
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-novativa-teal/10 p-3 rounded-full mr-4">
                    <Phone className="text-novativa-teal" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Teléfono</h3>
                    <a 
                      href="https://api.whatsapp.com/send?phone=50432142996" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-600 hover:text-[#7E69AB] transition-colors"
                    >
                      +504 3214-2996
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-novativa-teal/10 p-3 rounded-full mr-4">
                    <Mail className="text-novativa-teal" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-gray-600">soporte@novativa.org</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-novativa-teal/10 p-3 rounded-full mr-4">
                    <Clock className="text-novativa-teal" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Horario de Atención</h3>
                    <p className="text-gray-600">Lunes - Viernes: 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="font-bold text-lg mb-4">Síguenos en Redes Sociales</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.facebook.com/novativa.ai" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-novativa-teal/10 hover:bg-novativa-teal/20 p-3 rounded-full transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-novativa-teal" />
                  </a>
                  <a 
                    href="https://www.instagram.com/novativa.ai" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-novativa-teal/10 hover:bg-novativa-teal/20 p-3 rounded-full transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-novativa-teal" />
                  </a>
                  <a 
                    href="https://www.tiktok.com/@novativa.ai" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-novativa-teal/10 hover:bg-novativa-teal/20 p-3 rounded-full transition-colors"
                  >
                    <TiktokIcon className="w-5 h-5 text-novativa-teal" />
                  </a>
                  <a 
                    href="https://www.youtube.com/@novativa.ai" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-novativa-teal/10 hover:bg-novativa-teal/20 p-3 rounded-full transition-colors"
                  >
                    <Youtube className="w-5 h-5 text-novativa-teal" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-center">Agenda una Reunión</h2>
              <div className="tidycal-embed" data-path="novativa/demo-gratis"></div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gradient-to-r from-novativa-orange to-novativa-lightOrange text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para descubrir el potencial de la IA?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Programa una demostración gratuita y descubre cómo Novativa puede transformar tu negocio.
          </p>
          <Link 
            to="/agenda"
            className="inline-flex items-center gap-2 bg-white text-novativa-orange hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
          >
            <Calendar className="h-5 w-5" /> Agenda una Cita
          </Link>
        </div>
      </section>
    </>
  );
};

export default Contact;
