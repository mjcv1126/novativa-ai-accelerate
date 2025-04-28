
import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MobileNavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <SheetClose asChild>
    <Link to={to} className="block py-3 text-lg">
      {children}
    </Link>
  </SheetClose>
);

interface Props {
  className?: string;
}

const MobileNav: React.FC<Props> = ({ className }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className={cn("lg:hidden", className)}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader className="mb-6">
          <SheetTitle>Menú</SheetTitle>
          <SheetDescription>
            Explora nuestros servicios y soluciones de IA
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col divide-y">
          <MobileNavLink to="/">Inicio</MobileNavLink>
          <MobileNavLink to="/servicios">Servicios</MobileNavLink>
          <MobileNavLink to="/precios">Precios</MobileNavLink>
          <MobileNavLink to="/contacto">Contacto</MobileNavLink>
        </div>
        <SheetFooter className="mt-6 flex-col gap-2 sm:flex-row">
          <SheetClose asChild>
            <Button className="w-full" asChild>
              <Link to="/contacto">
                ¿Listo para empezar?
              </Link>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
