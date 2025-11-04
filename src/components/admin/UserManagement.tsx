
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import { Plus, Shield, Trash, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  email: string;
  password?: string;
  role: string;
  created_at: string;
  last_sign_in_at?: string;
}

export const UserManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin'
  });

  const loadUsers = async () => {
    try {
      setLoading(true);
      const localUsers = JSON.parse(localStorage.getItem('admin_users') || '[]');
      
      // Crear usuario dcuellar si no existe o actualizar contraseña
      let dcuellarUser = localUsers.find((user: AdminUser) => user.email === 'dcuellar@novativa.org');
      if (!dcuellarUser) {
        dcuellarUser = {
          id: 'dcuellar-user-1',
          email: 'dcuellar@novativa.org',
          password: 'Novativa2025$',
          role: 'admin',
          created_at: new Date().toISOString()
        };
        localUsers.push(dcuellarUser);
        localStorage.setItem('admin_users', JSON.stringify(localUsers));
      } else if (dcuellarUser.password !== 'Novativa2025$') {
        dcuellarUser.password = 'Novativa2025$';
        localStorage.setItem('admin_users', JSON.stringify(localUsers));
      }

      setUsers([
        {
          id: '1',
          email: 'soporte@novativa.org',
          role: 'super_admin',
          created_at: new Date().toISOString(),
          last_sign_in_at: new Date().toISOString()
        },
        ...localUsers
      ]);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los usuarios",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const newUser: AdminUser = {
        id: Math.random().toString(36).substring(7),
        email: formData.email,
        password: formData.password,
        role: formData.role,
        created_at: new Date().toISOString()
      };

      const existingUsers = JSON.parse(localStorage.getItem('admin_users') || '[]');
      
      // Verificar si el usuario ya existe
      const userExists = existingUsers.find((user: AdminUser) => user.email === formData.email);
      if (userExists) {
        toast({
          title: "Error",
          description: "Ya existe un usuario con este email",
          variant: "destructive",
        });
        return;
      }

      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('admin_users', JSON.stringify(updatedUsers));

      toast({
        title: "Usuario creado",
        description: `Usuario ${formData.email} creado exitosamente`,
      });

      setFormData({ email: '', password: '', role: 'admin' });
      setIsDialogOpen(false);
      loadUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: "Error",
        description: "No se pudo crear el usuario",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar al usuario ${userEmail}?`)) {
      return;
    }

    try {
      const existingUsers = JSON.parse(localStorage.getItem('admin_users') || '[]');
      const filteredUsers = existingUsers.filter((user: AdminUser) => user.id !== userId);
      localStorage.setItem('admin_users', JSON.stringify(filteredUsers));

      toast({
        title: "Usuario eliminado",
        description: `Usuario ${userEmail} eliminado exitosamente`,
      });

      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el usuario",
        variant: "destructive",
      });
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-red-100 text-red-800';
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Gestión de Usuarios Admin
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Crear Usuario
              </Button>
            </DialogTrigger>
            
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Nuevo Usuario Admin</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="admin@novativa.org"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Contraseña segura"
                    required
                    minLength={6}
                  />
                </div>
                
                <div>
                  <Label htmlFor="role">Rol</Label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    Crear Usuario
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[400px]">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Cargando usuarios...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No hay usuarios registrados</p>
            </div>
          ) : (
            <div className="space-y-3">
              {users.map((user) => (
                <Card key={user.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <User className="h-8 w-8 text-gray-400" />
                      <div>
                        <div className="font-medium">{user.email}</div>
                        <div className="text-sm text-gray-500">
                          Creado: {new Date(user.created_at).toLocaleDateString('es-ES')}
                        </div>
                        {user.last_sign_in_at && (
                          <div className="text-sm text-gray-500">
                            Último acceso: {new Date(user.last_sign_in_at).toLocaleDateString('es-ES')}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                      </Badge>
                      
                      {user.role !== 'super_admin' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id, user.email)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
