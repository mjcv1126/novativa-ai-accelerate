
import React from 'react';
import { Link } from 'react-router-dom';
import ScheduleDialog from '@/components/shared/ScheduleDialog';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import LanguageToggle from '@/components/shared/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, Share2, FileText, Code, Phone, Stethoscope, Megaphone, Dumbbell } from 'lucide-react';

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
              <div className="w-[600px] p-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Primera columna */}
                  <div className="space-y-1">
                    <NavigationMenuLink asChild>
                      <Link to="/novachannel" className="flex items-center space-x-3 select-none rounded-md bg-gradient-to-b from-[#bc3e06] to-novativa-orange p-4 no-underline outline-none focus:shadow-md text-white">
                        <MessageCircle className="h-6 w-6" />
                        <div>
                          <div className="text-lg font-medium">
                            NovaChannel
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            {t('language') === 'es' ? 'Plataforma integral de comunicación multicanal' : 'Comprehensive multichannel communication platform'}
                          </p>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    
                    <NavigationMenuLink asChild>
                      <Link to="/novamedic" className="flex items-center space-x-3 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#bc3e06]/10 hover:text-[#bc3e06] focus:bg-accent focus:text-accent-foreground">
                        <Stethoscope className="h-5 w-5" />
                        <div>
                          <div className="text-sm font-medium">NovaMedic</div>
                          <p className="text-sm leading-snug text-muted-foreground">
                            {t('language') === 'es' ? 'Plataforma de IA para atención médica' : 'AI platform for medical care'}
                          </p>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    
                    <NavigationMenuLink asChild>
                      <a href="https://fit.novativa.org/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#bc3e06]/10 hover:text-[#bc3e06] focus:bg-accent focus:text-accent-foreground">
                        <Dumbbell className="h-5 w-5" />
                        <div>
                          <div className="text-sm font-medium">NovaFitness</div>
                          <p className="text-sm leading-snug text-muted-foreground">
                            {t('language') === 'es' ? 'App para coaches y gimnasios' : 'App for coaches and gyms'}
                          </p>
                        </div>
                      </a>
                    </NavigationMenuLink>
                    
                    <NavigationMenuLink asChild>
                      <Link to="/servicios/redes-sociales-ia" className="flex items-center space-x-3 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#bc3e06]/10 hover:text-[#bc3e06] focus:bg-accent focus:text-accent-foreground">
                        <Megaphone className="h-5 w-5" />
                        <div>
                          <div className="text-sm font-medium">Redes Sociales IA</div>
                          <p className="text-sm leading-snug text-muted-foreground">
                            {t('language') === 'es' ? 'Gestión inteligente de contenido social' : 'Intelligent social content management'}
                          </p>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                  
                  {/* Segunda columna */}
                  <div className="space-y-1">
                    <NavigationMenuLink asChild>
                      <Link to="/servicios/contact-center" className="flex items-center space-x-3 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#bc3e06]/10 hover:text-[#bc3e06] focus:bg-accent focus:text-accent-foreground">
                        <Phone className="h-5 w-5" />
                        <div>
                          <div className="text-sm font-medium">{t('services.contactCenter')}</div>
                          <p className="text-sm leading-snug text-muted-foreground">
                            {t('language') === 'es' ? 'Servicio de atención al cliente profesional' : 'Professional customer service'}
                          </p>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    
                    <NavigationMenuLink asChild>
                      <Link to="/servicios/contenido" className="flex items-center space-x-3 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#bc3e06]/10 hover:text-[#bc3e06] focus:bg-accent focus:text-accent-foreground">
                        <FileText className="h-5 w-5" />
                        <div>
                          <div className="text-sm font-medium">{t('services.contentGeneration')}</div>
                          <p className="text-sm leading-snug text-muted-foreground">
                            {t('language') === 'es' ? 'Creación automática de contenido con IA' : 'Automatic content creation with AI'}
                          </p>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    
                    <NavigationMenuLink asChild>
                      <Link to="/iacoding" className="flex items-center space-x-3 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#bc3e06]/10 hover:text-[#bc3e06] focus:bg-accent focus:text-accent-foreground">
                        <Code className="h-5 w-5" />
                        <div>
                          <div className="text-sm font-medium">{t('services.iaDevelopment')}</div>
                          <p className="text-sm leading-snug text-muted-foreground">
                            {t('language') === 'es' ? 'Soluciones personalizadas con IA' : 'Custom AI solutions'}
                          </p>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </div>
              </div>
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
