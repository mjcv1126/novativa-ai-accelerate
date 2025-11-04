
import { supabase } from '@/integrations/supabase/client';

// SECURITY FIX: Removed all hardcoded credentials
// Use Supabase authentication with proper password hashing

export const adminAuthService = {
  login: async (email: string, password: string) => {
    console.log('adminAuthService.login - Starting login for:', email);
    try {
      // Use Supabase authentication only - no hardcoded credentials
      console.log('adminAuthService.login - Trying Supabase auth');
      const result = await supabase.auth.signInWithPassword({ email, password });
      
      if (result.error) {
        console.error('adminAuthService.login - Error:', result.error);
        return { data: null, error: result.error };
      }
      
      if (result.data?.user) {
        // Don't store role in localStorage - it comes from user_roles table via RLS
        const userSession = {
          id: result.data.user.id,
          email: result.data.user.email
        };
        localStorage.setItem('admin_session', JSON.stringify(userSession));
        return { data: userSession, error: null };
      }

      console.log('adminAuthService.login - Invalid credentials');
      return { data: null, error: { message: 'Credenciales incorrectas' } };
    } catch (error: any) {
      console.error('adminAuthService.login - Error:', error);
      return { data: null, error: { message: 'Error inesperado al iniciar sesión' } };
    }
  },

  logout: async () => {
    console.log('adminAuthService.logout - Starting logout');
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('admin_session');
      console.log('adminAuthService.logout - Logout successful');
      return { error: null };
    } catch (error) {
      console.error('adminAuthService.logout - Error:', error);
      return { error: { message: 'Error al cerrar sesión' } };
    }
  },

  checkSession: async () => {
    console.log('adminAuthService.checkSession - Starting session check');
    try {
      // Check Supabase session only
      const result = await supabase.auth.getSession();
      console.log('adminAuthService.checkSession - Supabase result:', result);
      
      if (result.data?.session?.user) {
        const userSession = {
          id: result.data.session.user.id,
          email: result.data.session.user.email
        };
        localStorage.setItem('admin_session', JSON.stringify(userSession));
        
        return { data: { session: { user: userSession } }, error: null };
      }
      
      console.log('adminAuthService.checkSession - No session found');
      localStorage.removeItem('admin_session');
      return { data: { session: null }, error: null };
    } catch (error) {
      console.error('adminAuthService.checkSession - Error:', error);
      localStorage.removeItem('admin_session');
      return { data: { session: null }, error };
    }
  },

  resetPassword: async (email: string) => {
    console.log('adminAuthService.resetPassword - Email:', email);
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/login`,
    });
  },

  verifyResetCode: async (email: string, code: string) => {
    console.log('adminAuthService.verifyResetCode - Email:', email, 'Code:', code);
    return { error: null };
  },

  updatePassword: async (email: string, code: string, newPassword: string) => {
    console.log('adminAuthService.updatePassword - Email:', email);
    return await supabase.auth.updateUser({ password: newPassword });
  }
};
