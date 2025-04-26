
import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Calendar, Youtube } from 'lucide-react';
import { TiktokIcon } from '@/components/shared/TiktokIcon';
import LouisebotWidget from '@/components/shared/LouisebotWidget';
import { Helmet } from 'react-helmet-async';
import { setAntiCacheHeaders } from '@/utils/antiCacheHeaders';
import { toast } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactMeetingCalendar from '@/components/contact/ContactMeetingCalendar';

const Contact = () => {
  const [hasRefreshed, setHasRefreshed] = useState(false);

  useEffect(() => {
    setAntiCacheHeaders();
    
    const shouldRefresh = !sessionStorage.getItem('contactPageRefreshed');
    if (shouldRefresh && !hasRefreshed) {
      sessionStorage.setItem('contactPageRefreshed', 'true');
      setHasRefreshed(true);
      window.location.reload();
      return;
    }
    
    const loadTidycalScript = () => {
      const existingScript = document.querySelector('script[src*="asset-tidycal.b-cdn.net/js/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.src = `https://asset-tidycal.b-cdn.net/js/embed.js?v=${new Date().getTime()}`;
      script.async = true;
      script.onload = () => {
        console.log('TidyCal script loaded successfully');
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
    
    setTimeout(loadTidycalScript, 300);
  }, [hasRefreshed]);

  const openTidyCal = () => {
    window.open('https://tidycal.com/novativa/demo-gratis', '_blank');
  };

  return (
    <>
      <Helmet>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate, max-age=0" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="-1" />
      </Helmet>
      <LouisebotWidget />
      
      <section className="py-8 bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] text-white sticky top-0 z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <h3 className="text-xl font-bold">¿Necesitas una respuesta rápida?</h3>
            <Button 
              onClick={openTidyCal}
              className="bg-white text-[#1A1F2C] hover:bg-gray-100 transition-colors px-6 py-2 rounded-md font-semibold flex items-center gap-2"
              size="lg"
            >
              <Calendar className="w-5 h-5" /> 
              Agenda una reunión ahora
            </Button>
          </div>
        </div>
      </section>
      
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
            <ContactInfo />
            <ContactMeetingCalendar />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
