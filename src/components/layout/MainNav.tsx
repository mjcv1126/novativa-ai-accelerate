
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface NavItem {
  title: string;
  href: string;
  external?: boolean;
}

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const location = useLocation();
  const pathname = location.pathname;

  const defaultItems: NavItem[] = [
    {
      title: "Inicio",
      href: "/",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Servicios",
      href: "/servicios",
    },
    {
      title: "Precios",
      href: "/precios",
    },
    {
      title: "NovaChannel",
      href: "/novachannel",
    },
    {
      title: "IA Coding",
      href: "/iacoding",
    },
    {
      title: "Transcripción",
      href: "/transcripcion",
    },
    {
      title: "Contacto",
      href: "/contacto",
    }
  ];

  const navItems = items || defaultItems;

  return (
    <nav className="hidden md:flex md:gap-6 lg:gap-10">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-novativa-orange",
            pathname === item.href || (item.href === '/blog' && pathname.startsWith('/blog'))
              ? "text-novativa-orange"
              : "text-gray-600"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export default MainNav;
