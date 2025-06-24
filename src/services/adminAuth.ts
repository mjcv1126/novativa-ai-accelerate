
import { createClient } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';

// Credenciales de administrador por defecto
const ADMIN_EMAIL = 'soporte@novativa.org';
const ADMIN_PASSWORD = 'Novativa2025$';

// Configuración de Supabase
const supabaseUrl = window.env?.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = window.env?.SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Usar las credenciales hardcodeadas si no están disponibles las variables de entorno
const FALLBACK_SUPABASE_URL = 'https://gktrnjjbhqxkbcvonzxv.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrdHJuampiaHF4a2Jjdm9uenh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1OTIyMTEsImV4cCI6MjA2MTE2ODIxMX0.emSsCTQYloww4wrKZXQrro-5oAyJbMQ-3DLj0z8LD7Q';

const finalSupabaseUrl = supabaseUrl || FALLBACK_SUPABASE_URL;
const finalSupabaseAnonKey = supabaseAnonKey || FALLBACK_SUPABASE_ANON_KEY;

console.log('adminAuth - Using Supabase URL:', finalSupabaseUrl);
console.log('adminAuth - Has Supabase key:', !!finalSupabaseAnonKey);

const supabase = finalSupabaseUrl ? createClient(finalSupabaseUrl, finalSupabaseAnonKey) : null;

export const adminAuthService = {
  login: async (email: string, password: string) => {
    console.log('adminAuthService.login - Starting login for:', email);
    try {
      if (!supabase) {
        console.log('adminAuthService.login - No Supabase client, using fallback auth');
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          const mockUser = {
            id: '1',
            email: ADMIN_EMAIL,
            role: 'admin'
          };
          localStorage.setItem('admin_user', JSON.stringify(mockUser));
          console.log('adminAuthService.login - Fallback auth successful');
          return { data: mockUser, error: null };
        }
        console.log('adminAuthService.login - Fallback auth failed');
        return { data: null, error: { message: 'Credenciales incorrectas' } };
      }

      console.log('adminAuthService.login - Using Supabase auth');
      const result = await supabase.auth.signInWithPassword({ email, password });
      console.log('adminAuthService.login - Supabase result:', result);
      return result;
    } catch (error: any) {
      console.error('adminAuthService.login - Error:', error);
      return { data: null, error: { message: 'Error inesperado al iniciar sesión' } };
    }
  },

  logout: async () => {
    console.log('adminAuthService.logout - Starting logout');
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
      localStorage.removeItem('admin_user');
      console.log('adminAuthService.logout - Logout successful');
      return { error: null };
    } catch (error) {
      console.error('adminAuthService.logout - Error:', error);
      return { error: { message: 'Error al cerrar sesión' } };
    }
  },

  resetPassword: async (email: string) => {
    console.log('adminAuthService.resetPassword - Email:', email);
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
    console.log('adminAuthService.verifyResetCode - Email:', email, 'Code:', code);
    if (!supabase) {
      return email === ADMIN_EMAIL && code === '123456'
        ? { error: null }
        : { error: { message: 'Código inválido' } };
    }
    return { error: null };
  },

  updatePassword: async (email: string, code: string, newPassword: string) => {
    console.log('adminAuthService.updatePassword - Email:', email);
    if (!supabase) {
      return email === ADMIN_EMAIL && code === '123456'
        ? { error: null }
        : { error: { message: 'No se pudo actualizar la contraseña' } };
    }
    return await supabase.auth.updateUser({ password: newPassword });
  },

  checkSession: async () => {
    console.log('adminAuthService.checkSession - Starting session check');
    try {
      if (!supabase) {
        console.log('adminAuthService.checkSession - No Supabase, checking localStorage');
        const storedUser = localStorage.getItem('admin_user');
        const result = storedUser
          ? { data: { session: { user: JSON.parse(storedUser) } }, error: null }
          : { data: { session: null }, error: null };
        console.log('adminAuthService.checkSession - LocalStorage result:', result);
        return result;
      }
      
      console.log('adminAuthService.checkSession - Using Supabase');
      const result = await supabase.auth.getSession();
      console.log('adminAuthService.checkSession - Supabase result:', result);
      return result;
    } catch (error) {
      console.error('adminAuthService.checkSession - Error:', error);
      return { data: { session: null }, error };
    }
  }
};
