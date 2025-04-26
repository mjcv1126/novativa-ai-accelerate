
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Bell, LogOut, Search, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AdminHeader = () => {
  const { user, logout } = useAdminAuth();
  const email = user?.email || '';
  
  return (
    <header className="bg-white border-b py-3 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/9cce1d6a-72e1-493f-bb16-901571c7e858.png" 
            alt="Logo" 
            className="h-8 md:h-10 w-auto"
          />
        </Link>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Search className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Bell className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full bg-gray-100">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start">
              <span className="font-medium">{email}</span>
              <span className="text-xs text-gray-500">Administrador</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => logout()} className="text-red-500 focus:text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
