
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Mic, Share2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContentGenerationSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-white" id="ia-contenido">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 rounded-xl overflow-hidden shadow-xl">
            <img 
              alt="IA para Generación de Contenido" 
              className="w-full h-auto object-cover" 
              src="https://cdn-site-assets.veed.io/cdn-cgi/image/width=1536,quality=75,format=auto/AI_Avatar_6a9e429709/AI_Avatar_6a9e429709.png" 
            />
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold mb-6 text-novativa-teal">IA para Generación de Contenido</h2>
            <p className="text-lg text-gray-600 mb-8">
              Crea contenido de alta calidad automáticamente para tu sitio web, blog, redes sociales y más.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FileText className="text-novativa-orange" size={20} />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">Clonación de Avatar</h3>
                  <p className="text-gray-600">Generamos un avatar identico a ti o la persona de tu preferencia que mantiene el tono y estilo de tu marca.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Mic className="text-novativa-orange" size={20} />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">Clonación de Voz</h3>
                  <p className="text-gray-600">
                    Crea contenido de audio con una voz que suene igual a la tuya o a tu voz de marca.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Share2 className="text-novativa-orange" size={20} />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">Automatizaciones para Redes Sociales</h3>
                  <p className="text-gray-600">
                    Creación y programación automática de contenido para todas tus plataformas.
                  </p>
                </div>
              </div>
            </div>
            
            <Button asChild className="bg-novativa-teal hover:bg-novativa-lightTeal">
              <Link to="/contacto">
                Conocer más
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentGenerationSection;
