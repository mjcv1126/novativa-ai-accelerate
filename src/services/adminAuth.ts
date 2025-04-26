
import { createClient } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';

// Credenciales de administrador por defecto
const ADMIN_EMAIL = 'soporte@novativa.org';
const ADMIN_PASSWORD = 'Novativa2025$';

// Configuración de Supabase
const supabaseUrl = window.env?.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = window.env?.SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl ? createClient(supabaseUrl, supabaseAnonKey) : null;

export const adminAuthService = {
  login: async (email: string, password: string) => {
    try {
      if (!supabase) {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          const mockUser = {
            id: '1',
            email: ADMIN_EMAIL,
            role: 'admin'
          };
          localStorage.setItem('admin_user', JSON.stringify(mockUser));
          return { data: mockUser, error: null };
        }
        return { data: null, error: { message: 'Credenciales incorrectas' } };
      }

      return await supabase.auth.signInWithPassword({ email, password });
    } catch (error: any) {
      console.error('Login error:', error);
      return { data: null, error: { message: 'Error inesperado al iniciar sesión' } };
    }
  },

  logout: async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
      localStorage.removeItem('admin_user');
      return { error: null };
    } catch (error) {
      console.error('Logout error:', error);
      return { error: { message: 'Error al cerrar sesión' } };
    }
  },

  resetPassword: async (email: string) => {
    if (!supabase) {
      return email === ADMIN_EMAIL
        ? { error: null }
        : { error: { message: 'Email no encontrado' } };
    }

    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/login`,
    });
  },

  verifyResetCode: async (email: string, code: string) => {
    if (!supabase) {
      return email === ADMIN_EMAIL && code === '123456'
        ? { error: null }
        : { error: { message: 'Código inválido' } };
    }
    return { error: null };
  },

  updatePassword: async (email: string, code: string, newPassword: string) => {
    if (!supabase) {
      return email === ADMIN_EMAIL && code === '123456'
        ? { error: null }
        : { error: { message: 'No se pudo actualizar la contraseña' } };
    }
    return await supabase.auth.updateUser({ password: newPassword });
  },

  checkSession: async () => {
    try {
      if (!supabase) {
        const storedUser = localStorage.getItem('admin_user');
        return storedUser
          ? { data: { session: { user: JSON.parse(storedUser) } }, error: null }
          : { data: { session: null }, error: null };
      }
      return await supabase.auth.getSession();
    } catch (error) {
      console.error('Error checking session:', error);
      return { data: { session: null }, error };
    }
  }
};
