
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Tag, 
  BarChart, 
  Code, 
  LogOut
} from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

type NavItem = {
  title: string;
  path: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { title: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { title: 'Posts', path: '/admin/posts', icon: FileText },
  { title: 'Categorías', path: '/admin/categories', icon: Tag },
  { title: 'Analítica', path: '/admin/analytics', icon: BarChart },
  { title: 'Scripts', path: '/admin/scripts', icon: Code },
];

const AdminSidebar = () => {
  const { logout } = useAdminAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Collapsible
      open={!collapsed}
      onOpenChange={(open) => setCollapsed(!open)}
      className={cn(
        'bg-white border-r transition-all duration-300 h-screen',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && (
            <NavLink to="/admin" className="flex items-center">
              <img 
                src="/lovable-uploads/9cce1d6a-72e1-493f-bb16-901571c7e858.png" 
                alt="Novativa Logo" 
                className="h-8 w-auto" 
              />
              <span className="ml-2 font-bold text-lg">Admin</span>
            </NavLink>
          )}
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto">
              {collapsed ? (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.5 2L14 7.5L8.5 13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1 7.5H14" stroke="currentColor" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5 2L1 7.5L6.5 13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1 7.5H14" stroke="currentColor" strokeLinecap="round" />
                </svg>
              )}
            </Button>
          </CollapsibleTrigger>
        </div>

        <ScrollArea className="flex-1">
          <CollapsibleContent className="flex-1" forceMount>
            <nav className="flex flex-col p-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                    isActive 
                      ? 'bg-novativa-teal/10 text-novativa-teal font-medium' 
                      : 'text-gray-700 hover:bg-gray-100',
                    collapsed && 'justify-center'
                  )}
                  end={item.path === '/admin'}
                >
                  <item.icon className={cn('h-5 w-5', collapsed ? 'mx-auto' : '')} />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              ))}
            </nav>
          </CollapsibleContent>
        </ScrollArea>

        <div className="p-2 border-t mt-auto">
          <Button
            variant="ghost"
            onClick={logout}
            className={cn(
              'w-full flex items-center gap-3 justify-start text-red-500 hover:bg-red-50 hover:text-red-600',
              collapsed && 'justify-center'
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Cerrar sesión</span>}
          </Button>
        </div>
      </div>
    </Collapsible>
  );
};

export default AdminSidebar;
