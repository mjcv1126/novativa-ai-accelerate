
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { adminAuthService } from '@/services/adminAuth';
import type { AdminAuthContextType, AdminAuthState } from '@/types/adminAuth';

const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => ({ error: null }),
  logout: async () => {},
  resetPassword: async () => ({ error: null }),
  verifyResetCode: async () => ({ error: null }),
  updatePassword: async () => ({ error: null }),
  checkSession: async () => {},
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });
  const navigate = useNavigate();

  const checkSession = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    const { data, error } = await adminAuthService.checkSession();
    
    if (error) {
      console.error("Error al verificar la sesión:", error);
      setState(prev => ({ ...prev, user: null, isAuthenticated: false }));
      return;
    }
    
    if (data?.session?.user) {
      setState(prev => ({
        ...prev,
        user: data.session.user,
        isAuthenticated: true
      }));
    } else {
      setState(prev => ({ ...prev, user: null, isAuthenticated: false }));
    }
    setState(prev => ({ ...prev, isLoading: false }));
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = async (email: string, password: string) => {
    const { data, error } = await adminAuthService.login(email, password);
    
    if (error) {
      toast.error(error.message || 'Error al iniciar sesión');
      return { error };
    }
    
    if (data) {
      setState(prev => ({
        ...prev,
        user: data,
        isAuthenticated: true
      }));
      toast.success('Inicio de sesión exitoso');
      navigate('/admin');
    }
    
    return { error: null };
  };

  const logout = async () => {
    const { error } = await adminAuthService.logout();
    if (error) {
      toast.error(error.message || 'Error al cerrar sesión');
      return;
    }
    
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false
    });
    
    toast.success('Sesión cerrada exitosamente');
    navigate('/admin/login');
  };

  const authValues: AdminAuthContextType = {
    ...state,
    login,
    logout,
    checkSession,
    resetPassword: adminAuthService.resetPassword,
    verifyResetCode: adminAuthService.verifyResetCode,
    updatePassword: adminAuthService.updatePassword,
  };

  return (
    <AdminAuthContext.Provider value={authValues}>
      {children}
    </AdminAuthContext.Provider>
  );
};
