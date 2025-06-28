
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
  Calendar
} from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { user } = useAdminAuth();

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
      title: 'Actividades',
      icon: Calendar,
      path: '/admin/activities',
      roles: ['admin', 'super_admin']
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

  // Filtrar elementos del menú según el rol del usuario
  const menuItems = allMenuItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Panel Admin</h2>
        {currentUser?.email && (
          <p className="text-sm text-gray-600 mt-1">{currentUser.email}</p>
        )}
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-novativa-teal text-white border-r-2 border-novativa-lightTeal'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
