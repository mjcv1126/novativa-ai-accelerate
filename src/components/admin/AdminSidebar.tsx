
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, LayoutDashboard, FileText, Tag, Settings, Code, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={cn(
        "bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border h-screen transition-all",
        collapsed ? "w-[60px]" : "w-[250px]"
      )}
    >
      <div className="flex items-center justify-between h-16 px-3 border-b border-sidebar-border">
        <div className={cn("overflow-hidden", collapsed && "hidden")}>
          <h1 className="font-bold text-lg">Novativa Admin</h1>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-sidebar-accent"
        >
          <ChevronLeft className={cn("w-5 h-5 transition-transform", collapsed && "rotate-180")}/>
        </button>
      </div>

      <nav className="p-2">
        <ul className="space-y-1">
          <NavItem to="/admin/dashboard" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" collapsed={collapsed} />
          
          <div className={cn("px-3 py-2 text-xs uppercase text-sidebar-foreground/50", collapsed && "hidden")}>
            Blog
          </div>
          
          <NavItem to="/admin/blog/posts" icon={<FileText className="w-5 h-5" />} label="Artículos" collapsed={collapsed} />
          <NavItem to="/admin/blog/categories" icon={<Tag className="w-5 h-5" />} label="Categorías" collapsed={collapsed} />
          
          <div className={cn("px-3 py-2 text-xs uppercase text-sidebar-foreground/50", collapsed && "hidden")}>
            Configuración
          </div>
          
          <NavItem to="/admin/scripts" icon={<Code className="w-5 h-5" />} label="Scripts" collapsed={collapsed} />
          <NavItem to="/admin/custom-css" icon={<Palette className="w-5 h-5" />} label="CSS Personalizado" collapsed={collapsed} />
          <NavItem to="/admin/dashboard" icon={<Settings className="w-5 h-5" />} label="Configuración" collapsed={collapsed} />
        </ul>
      </nav>
    </aside>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

const NavItem = ({ to, icon, label, collapsed }: NavItemProps) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
            isActive
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80 hover:text-sidebar-accent-foreground",
            collapsed && "justify-center"
          )
        }
      >
        {icon}
        <span className={cn("whitespace-nowrap", collapsed && "hidden")}>{label}</span>
      </NavLink>
    </li>
  );
};

export default AdminSidebar;
