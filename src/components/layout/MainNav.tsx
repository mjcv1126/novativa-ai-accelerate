
import React from 'react';
import { Link } from 'react-router-dom';
import NavItems from './NavItems';
import MobileNav from './MobileNav';
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import { Bot, Cloud, Code, MessageSquare, Smartphone } from 'lucide-react';
import NovativaLogo from '@/components/shared/NovativaLogo';

const MainNav = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6 md:gap-10">
        <Link to="/" className="items-center space-x-2 md:flex">
          <NovativaLogo size="small" />
        </Link>
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Servicios</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[550px] gap-3 p-4 md:w-[600px] md:grid-cols-2">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/servicios/agentes-ia" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="flex items-center gap-2 text-sm font-medium leading-none">
                          <Bot className="h-5 w-5 text-novativa-teal" />
                          <span>Agentes de IA</span>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground pt-1">
                          Asistentes inteligentes que automatizan tareas repetitivas y mejoran la productividad
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/servicios/contenido" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="flex items-center gap-2 text-sm font-medium leading-none">
                          <MessageSquare className="h-5 w-5 text-novativa-teal" />
                          <span>Generación de Contenido</span>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground pt-1">
                          Creación de contenido optimizado para SEO, redes sociales y más
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/iacoding" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="flex items-center gap-2 text-sm font-medium leading-none">
                          <Code className="h-5 w-5 text-novativa-teal" />
                          <span>Desarrollo de IA</span>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground pt-1">
                          Desarrollo personalizado de soluciones de inteligencia artificial
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/servicios/apps" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="flex items-center gap-2 text-sm font-medium leading-none">
                          <Smartphone className="h-5 w-5 text-novativa-teal" />
                          <span>Aplicaciones Móviles</span>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground pt-1">
                          Desarrollo de aplicaciones móviles nativas y cross-platform con IA integrada
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="md:col-span-2">
                    <NavigationMenuLink asChild>
                      <Link to="/novachannel" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="flex items-center gap-2 text-sm font-medium leading-none">
                          <Cloud className="h-5 w-5 text-novativa-orange" />
                          <span className="font-bold text-novativa-orange">NovaChannel</span>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground pt-1">
                          Plataforma integral de marketing automatizado con IA para gestionar múltiples canales
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/precios" className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              )}>
                Precios
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/knowledge" className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              )}>
                Knowledge Base
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild className="hidden lg:flex">
          <Link to="/contacto">
            Contacto
          </Link>
        </Button>
        <Button size="sm" className="hidden lg:flex bg-novativa-teal hover:bg-novativa-lightTeal" asChild>
          <a href="https://tidycal.com/novativa/demo-gratis" target="_blank" rel="noopener noreferrer">
            Demo Gratis
          </a>
        </Button>
        <MobileNav className="lg:hidden" />
      </div>
    </div>
  );
};

export default MainNav;
