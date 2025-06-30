
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Code, 
  Palette,
  Upload,
  Video,
  Shield,
  Calendar,
  CalendarCheck,
  Zap,
  LogOut,
  ExternalLink,
  Mail,
  MessageSquare,
  Heart
} from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const AdminSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAdminAuth();
  const { state } = useSidebar();

  // Obtener información del usuario desde localStorage si no está disponible en el contexto
  const currentUser = user || JSON.parse(localStorage.getItem('admin_user') || '{}');
  const userRole = currentUser?.role || 'admin';

  const allMenuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin/dashboard',
      roles: ['admin', 'super_admin']
    },
    {
      title: 'CRM',
      icon: Users,
      path: '/admin/crm',
      roles: ['admin', 'super_admin']
    },
    {
      title: 'Bookings',
      icon: CalendarCheck,
      path: '/admin/bookings',
      roles: ['admin', 'super_admin']
    },
    {
      title: 'Actividades',
      icon: Calendar,
      path: '/admin/activities',
      roles: ['admin', 'super_admin']
    },
    {
      title: 'Automatizaciones',
      icon: Zap,
      path: '/admin/automations',
      roles: ['super_admin'] // Only super_admin can see this
    },
    {
      title: 'Usuarios',
      icon: Shield,
      path: '/admin/users',
      roles: ['super_admin']
    },
    {
      title: 'Blog',
      icon: FileText,
      path: '/admin/blog',
      roles: ['admin', 'super_admin']
    },
    {
      title: 'Archivos',
      icon: Upload,
      path: '/admin/files',
      roles: ['super_admin']
    },
    {
      title: 'Transcripción',
      icon: Video,
      path: '/admin/transcription',
      roles: ['admin', 'super_admin']
    },
    {
      title: 'Scripts',
      icon: Code,
      path: '/admin/scripts',
      roles: ['super_admin']
    },
    {
      title: 'CSS Personalizado',
      icon: Palette,
      path: '/admin/custom-css',
      roles: ['super_admin']
    }
  ];

  // Enlaces externos disponibles para todos los usuarios admin
  const externalLinks = [
    {
      title: 'NovaChannel',
      icon: MessageSquare,
      url: 'https://chat.novativa.org/login',
      roles: ['admin', 'super_admin']
    },
    {
      title: 'TidyCal',
      icon: CalendarCheck,
      url: 'https://tidycal.com/dashboard/booking-types',
      roles: ['admin', 'super_admin']
    },
    {
      title: 'Email',
      icon: Mail,
      url: 'https://mail.hostinger.com/?_task=mail&_mbox=INBOX',
      roles: ['admin', 'super_admin']
    },
    {
      title: 'Novamedic',
      icon: Heart,
      url: 'https://medic.novativa.org/',
      roles: ['admin', 'super_admin']
    }
  ];

  // Filtrar elementos del menú según el rol del usuario
  const menuItems = allMenuItems.filter(item => item.roles.includes(userRole));
  const filteredExternalLinks = externalLinks.filter(item => item.roles.includes(userRole));

  const isActive = (path: string) => location.pathname === path;

  const handleExternalLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-novativa-teal text-white text-sm font-bold">
            N
          </div>
          {state === "expanded" && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Panel Admin</span>
              {currentUser?.email && (
                <span className="text-xs text-gray-500 truncate max-w-[180px]">
                  {currentUser.email}
                </span>
              )}
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={active}
                      tooltip={state === "collapsed" ? item.title : undefined}
                    >
                      <Link to={item.path} className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Enlaces Externos */}
        <SidebarGroup>
          <SidebarGroupLabel>Enlaces Externos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredExternalLinks.map((link) => {
                const Icon = link.icon;
                
                return (
                  <SidebarMenuItem key={link.url}>
                    <SidebarMenuButton 
                      onClick={() => handleExternalLinkClick(link.url)}
                      tooltip={state === "collapsed" ? link.title : undefined}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{link.title}</span>
                      <ExternalLink className="h-3 w-3 ml-auto opacity-60" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              tooltip={state === "collapsed" ? "Cerrar Sesión" : undefined}
            >
              <Button
                variant="ghost"
                onClick={logout}
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
