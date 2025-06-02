
import React from 'react';
import { Link } from 'react-router-dom';
import ScheduleDialog from '@/components/shared/ScheduleDialog';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import LanguageToggle from '@/components/shared/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

const DesktopNav = () => {
  const { t } = useLanguage();
  
  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link to="/" className="text-gray-800 hover:text-novativa-teal font-medium transition-colors">
        {t('nav.home')}
      </Link>
      
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-800 hover:text-novativa-teal font-medium transition-colors">
              {t('nav.services')}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link to="/novachannel" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[#bc3e06] to-novativa-orange p-6 no-underline outline-none focus:shadow-md">
                      <div className="mb-2 mt-4 text-lg font-medium text-white">
                        NovaChannel
                      </div>
                      <p className="text-sm leading-tight text-white/90">
                        {t('language') === 'es' ? 'Plataforma integral de comunicación multicanal potenciada por IA' : 'Comprehensive AI-powered multichannel communication platform'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/novamedic" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#bc3e06]/10 hover:text-[#bc3e06] focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium">NovaMedic</div>
                      <p className="text-sm leading-snug text-muted-foreground">
                        {t('language') === 'es' ? 'Plataforma de IA para atención médica' : 'AI platform for medical care'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/servicios/contact-center" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#bc3e06]/10 hover:text-[#bc3e06] focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium">{t('services.contactCenter')}</div>
                      <p className="text-sm leading-snug text-muted-foreground">
                        {t('language') === 'es' ? 'Servicio de atención al cliente profesional' : 'Professional customer service'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/servicios/agentes-ia" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#bc3e06]/10 hover:text-[#bc3e06] focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium">{t('services.aiAgents')}</div>
                      <p className="text-sm leading-snug text-muted-foreground">
                        {t('language') === 'es' ? 'Chatbots y asistentes virtuales inteligentes' : 'Chatbots and intelligent virtual assistants'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/servicios/contenido" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#bc3e06]/10 hover:text-[#bc3e06] focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium">{t('services.contentGeneration')}</div>
                      <p className="text-sm leading-snug text-muted-foreground">
                        {t('language') === 'es' ? 'Creación automática de contenido con IA' : 'Automatic content creation with AI'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/iacoding" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#bc3e06]/10 hover:text-[#bc3e06] focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium">{t('services.iaDevelopment')}</div>
                      <p className="text-sm leading-snug text-muted-foreground">
                        {t('language') === 'es' ? 'Soluciones personalizadas con IA' : 'Custom AI solutions'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/transcripcion" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#bc3e06]/10 hover:text-[#bc3e06] focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium">{t('services.videoTranscription')}</div>
                      <p className="text-sm leading-snug text-muted-foreground">
                        {t('language') === 'es' ? 'Transcripción automática de videos' : 'Automatic video transcription'}
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
        {t('nav.pricing')}
      </Link>
      
      <Link to="/contacto" className="text-gray-800 hover:text-novativa-teal font-medium transition-colors">
        {t('nav.contact')}
      </Link>
      
      <LanguageToggle variant="icon" />
      
      <ScheduleDialog className="bg-gradient-to-r from-novativa-orange to-novativa-lightOrange hover:opacity-90 transition-opacity">
        {t('nav.schedule')}
      </ScheduleDialog>
    </div>
  );
};

export default DesktopNav;
