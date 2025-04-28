
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Code, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  active: boolean;
}

const SidebarItem = ({ href, icon, title, active }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
        active ? "bg-gray-100 text-gray-900" : ""
      )}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
};

const AdminSidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Administración
        </h2>
        <div className="space-y-1">
          <SidebarItem
            href="/admin/dashboard"
            icon={<LayoutDashboard className="h-5 w-5" />}
            title="Dashboard"
            active={pathname === '/admin/dashboard'}
          />
          <SidebarItem
            href="/admin/scripts"
            icon={<Code className="h-5 w-5" />}
            title="Scripts"
            active={pathname === '/admin/scripts'}
          />
          <SidebarItem
            href="/admin/custom-css"
            icon={<Palette className="h-5 w-5" />}
            title="CSS Personalizado"
            active={pathname === '/admin/custom-css'}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
