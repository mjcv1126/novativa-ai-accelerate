import React from 'react';
import { Link } from 'react-router-dom';
import ScheduleDialog from '@/components/shared/ScheduleDialog';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

const DesktopNav = () => {
  return <div className="hidden md:flex items-center space-x-8">
      <Link to="/" className="text-gray-800 hover:text-novativa-teal font-medium transition-colors">
        Inicio
      </Link>
      
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-800 hover:text-novativa-teal font-medium transition-colors">
              Servicios
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
                        Plataforma integral de comunicación multicanal potenciada por IA
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/servicios/agentes-ia" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#bc3e06]/10 hover:text-[#bc3e06] focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium">Agentes IA Web</div>
                      <p className="text-sm leading-snug text-muted-foreground">
                        Chatbots y asistentes virtuales inteligentes
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/servicios/contenido" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#bc3e06]/10 hover:text-[#bc3e06] focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium">Generación de Contenido</div>
                      <p className="text-sm leading-snug text-muted-foreground">
                        Creación automática de contenido con IA
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/iacoding" 
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#bc3e06]/10 hover:text-[#bc3e06] focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium">Desarrollo IA</div>
                      <p className="text-sm leading-snug text-muted-foreground">
                        Soluciones personalizadas con IA
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
        Precios
      </Link>
      <Link to="/blog" className="text-gray-800 hover:text-novativa-teal font-medium transition-colors">
        Blog
      </Link>
      <Link to="/contacto" className="text-gray-800 hover:text-novativa-teal font-medium transition-colors">
        Contacto
      </Link>
      <ScheduleDialog className="bg-gradient-to-r from-novativa-orange to-novativa-lightOrange hover:opacity-90 transition-opacity">
        AGENDA UN DEMO GRATIS
      </ScheduleDialog>
    </div>;
};

export default DesktopNav;
