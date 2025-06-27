
import { useState } from 'react';
import { X, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import NovativaLogo from '@/components/shared/NovativaLogo';

interface MobileNavProps {
  setOpen?: (open: boolean) => void;
  onOpenChange?: (open: boolean) => void;
}

export function MobileNav({ setOpen, onOpenChange }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    setOpen?.(newState);
    onOpenChange?.(newState);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setOpen?.(false);
    onOpenChange?.(false);
  };

  const menuItems = [
    { href: '/', label: 'Inicio' },
    { href: '/blog', label: 'Blog' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/precios', label: 'Precios' },
    { href: '/novachannel', label: 'NovaChannel' },
    { href: '/iacoding', label: 'IA Coding' },
    { href: '/transcripcion', label: 'Transcripción' },
    { href: '/contacto', label: 'Contacto' },
  ];

  return (
    <div className="md:hidden">
      <button
        className="inline-flex items-center justify-center rounded-md p-2 text-gray-700"
        onClick={handleToggle}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <NovativaLogo />
            <button
              className="rounded-md p-2 text-gray-700"
              onClick={handleToggle}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="grid gap-2 px-4 pb-8 pt-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center rounded-md px-4 py-3 text-base font-medium transition-colors hover:bg-gray-100",
                  pathname === item.href || (item.href === '/blog' && pathname.startsWith('/blog'))
                    ? "bg-gray-100 text-novativa-orange"
                    : "text-gray-700"
                )}
                onClick={handleLinkClick}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

export default MobileNav;
