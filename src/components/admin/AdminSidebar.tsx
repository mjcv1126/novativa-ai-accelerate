
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Code, 
  Palette,
  FileUpload,
  Video,
  Shield
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin/dashboard'
    },
    {
      title: 'CRM',
      icon: Users,
      path: '/admin/crm'
    },
    {
      title: 'Usuarios',
      icon: Shield,
      path: '/admin/users'
    },
    {
      title: 'Blog',
      icon: FileText,
      path: '/admin/blog'
    },
    {
      title: 'Archivos',
      icon: FileUpload,
      path: '/admin/files'
    },
    {
      title: 'Transcripción',
      icon: Video,
      path: '/admin/transcription'
    },
    {
      title: 'Scripts',
      icon: Code,
      path: '/admin/scripts'
    },
    {
      title: 'CSS Personalizado',
      icon: Palette,
      path: '/admin/custom-css'
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Panel Admin</h2>
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
