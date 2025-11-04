
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { adminAuthService } from '@/services/adminAuth';
import { supabase } from '@/integrations/supabase/client';
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

  console.log('AdminAuthProvider - Current state:', state);

  const checkSession = useCallback(async () => {
    console.log('AdminAuthProvider.checkSession - Starting');
    try {
      const { data, error } = await adminAuthService.checkSession();
      
      console.log('AdminAuthProvider.checkSession - Result:', { data, error });
      
      if (error) {
        console.error("Error al verificar la sesión:", error);
        setState({ user: null, isAuthenticated: false, isLoading: false });
        return;
      }
      
      if (data?.session?.user) {
        console.log('AdminAuthProvider.checkSession - User found:', data.session.user);
        // SECURITY FIX: Removed hardcoded org_id
        // Access control now handled by RLS policies checking org_members table
        
        setState({
          user: data.session.user,
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        console.log('AdminAuthProvider.checkSession - No user found');
        setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch (error) {
      console.error('AdminAuthProvider.checkSession - Unexpected error:', error);
      setState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  useEffect(() => {
    console.log('AdminAuthProvider - Initial mount, checking session');
    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    console.log('AdminAuthProvider.login - Attempting login for:', email);
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const { data, error } = await adminAuthService.login(email, password);
      
      if (error) {
        console.error('AdminAuthProvider.login - Error:', error);
        toast.error(error.message || 'Error al iniciar sesión');
        setState(prev => ({ ...prev, isLoading: false }));
        return { error };
      }
      
      if (data) {
        console.log('AdminAuthProvider.login - Success:', data);
        // SECURITY FIX: Removed hardcoded org_id
        // Access control now handled by RLS policies checking org_members table
        
        setState({
          user: data,
          isAuthenticated: true,
          isLoading: false
        });
        toast.success('Inicio de sesión exitoso');
        
        // Navigate to dashboard after successful login
        navigate('/admin/dashboard');
      }
      
      return { error: null };
    } catch (error) {
      console.error('AdminAuthProvider.login - Unexpected error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      return { error: { message: 'Error inesperado al iniciar sesión' } };
    }
  };

  const logout = async () => {
    console.log('AdminAuthProvider.logout - Attempting logout');
    try {
      const { error } = await adminAuthService.logout();
      if (error) {
        console.error('AdminAuthProvider.logout - Error:', error);
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
    } catch (error) {
      console.error('AdminAuthProvider.logout - Unexpected error:', error);
    }
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
