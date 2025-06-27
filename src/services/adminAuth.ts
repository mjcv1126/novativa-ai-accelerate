
import { createClient } from '@supabase/supabase-js';

// Credenciales de administrador por defecto
const ADMIN_EMAIL = 'soporte@novativa.org';
const ADMIN_PASSWORD = 'Novativa2025$';

// Configuración de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gktrnjjbhqxkbcvonzxv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrdHJuampiaHF4a2Jjdm9uenh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1OTIyMTEsImV4cCI6MjA2MTE2ODIxMX0.emSsCTQYloww4wrKZXQrro-5oAyJbMQ-3DLj0z8LD7Q';

let supabaseClient: any = null;

try {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  console.log('adminAuth - Supabase client created successfully');
} catch (error) {
  console.error('adminAuth - Failed to create Supabase client:', error);
}

// Función para verificar usuarios locales
const checkLocalUser = (email: string, password: string) => {
  const localUsers = JSON.parse(localStorage.getItem('admin_users') || '[]');
  return localUsers.find((user: any) => user.email === email && user.password === password);
};

export const adminAuthService = {
  login: async (email: string, password: string) => {
    console.log('adminAuthService.login - Starting login for:', email);
    try {
      // Verificar credenciales del admin principal
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const mockUser = {
          id: '1',
          email: ADMIN_EMAIL,
          role: 'super_admin'
        };
        localStorage.setItem('admin_user', JSON.stringify(mockUser));
        console.log('adminAuthService.login - Super admin auth successful');
        return { data: mockUser, error: null };
      }

      // Verificar usuarios locales creados
      const localUser = checkLocalUser(email, password);
      if (localUser) {
        const userSession = {
          id: localUser.id,
          email: localUser.email,
          role: localUser.role
        };
        localStorage.setItem('admin_user', JSON.stringify(userSession));
        console.log('adminAuthService.login - Local user auth successful');
        return { data: userSession, error: null };
      }

      // Intentar con Supabase si está disponible
      if (supabaseClient) {
        console.log('adminAuthService.login - Trying Supabase auth');
        const result = await supabaseClient.auth.signInWithPassword({ email, password });
        console.log('adminAuthService.login - Supabase result:', result);
        return result;
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
      if (supabaseClient) {
        await supabaseClient.auth.signOut();
      }
      localStorage.removeItem('admin_user');
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
      // Primero revisar localStorage
      const storedUser = localStorage.getItem('admin_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        console.log('adminAuthService.checkSession - Found user in localStorage:', user);
        return { data: { session: { user } }, error: null };
      }
      
      // Si hay Supabase disponible, revisar sesión
      if (supabaseClient) {
        console.log('adminAuthService.checkSession - Checking Supabase session');
        const result = await supabaseClient.auth.getSession();
        console.log('adminAuthService.checkSession - Supabase result:', result);
        return result;
      }
      
      console.log('adminAuthService.checkSession - No session found');
      return { data: { session: null }, error: null };
    } catch (error) {
      console.error('adminAuthService.checkSession - Error:', error);
      return { data: { session: null }, error };
    }
  },

  resetPassword: async (email: string) => {
    console.log('adminAuthService.resetPassword - Email:', email);
    if (!supabaseClient) {
      return email === ADMIN_EMAIL
        ? { error: null }
        : { error: { message: 'Email no encontrado' } };
    }

    return await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/login`,
    });
  },

  verifyResetCode: async (email: string, code: string) => {
    console.log('adminAuthService.verifyResetCode - Email:', email, 'Code:', code);
    if (!supabaseClient) {
      return email === ADMIN_EMAIL && code === '123456'
        ? { error: null }
        : { error: { message: 'Código inválido' } };
    }
    return { error: null };
  },

  updatePassword: async (email: string, code: string, newPassword: string) => {
    console.log('adminAuthService.updatePassword - Email:', email);
    if (!supabaseClient) {
      return email === ADMIN_EMAIL && code === '123456'
        ? { error: null }
        : { error: { message: 'No se pudo actualizar la contraseña' } };
    }
    return await supabaseClient.auth.updateUser({ password: newPassword });
  }
};
