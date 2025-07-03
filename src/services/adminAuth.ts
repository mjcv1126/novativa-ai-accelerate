
import { supabase } from '@/integrations/supabase/client';

// Credenciales de administrador por defecto
const ADMIN_EMAIL = 'soporte@novativa.org';
const ADMIN_PASSWORD = 'Novativa2025$';

// Inicializar usuarios locales con dcuellar
const initializeLocalUsers = () => {
  const existingUsers = JSON.parse(localStorage.getItem('admin_users') || '[]');
  const dcuellarUser = existingUsers.find((user: any) => user.email === 'dcuellar@novativa.org');
  
  if (!dcuellarUser) {
    const newUser = {
      id: 'dcuellar-user-1',
      email: 'dcuellar@novativa.org',
      password: 'Novativa2025$',
      role: 'admin',
      created_at: new Date().toISOString()
    };
    existingUsers.push(newUser);
    localStorage.setItem('admin_users', JSON.stringify(existingUsers));
    console.log('adminAuth - Created dcuellar user with correct password');
  } else if (dcuellarUser.password !== 'Novativa2025$') {
    // Actualizar contraseña si es diferente
    dcuellarUser.password = 'Novativa2025$';
    localStorage.setItem('admin_users', JSON.stringify(existingUsers));
    console.log('adminAuth - Updated dcuellar password');
  }
};

// Inicializar al cargar el módulo
initializeLocalUsers();

// Función para verificar usuarios locales
const checkLocalUser = (email: string, password: string) => {
  const localUsers = JSON.parse(localStorage.getItem('admin_users') || '[]');
  const user = localUsers.find((user: any) => user.email === email && user.password === password);
  console.log('adminAuth - Checking local user:', email, 'Found:', !!user);
  return user;
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
        console.log('adminAuthService.login - Local user auth successful:', userSession);
        return { data: userSession, error: null };
      }

      // Intentar con Supabase si está disponible
      console.log('adminAuthService.login - Trying Supabase auth');
      const result = await supabase.auth.signInWithPassword({ email, password });
      console.log('adminAuthService.login - Supabase result:', result);
      
      if (result.data?.user) {
        const userSession = {
          id: result.data.user.id,
          email: result.data.user.email,
          role: 'admin'
        };
        localStorage.setItem('admin_user', JSON.stringify(userSession));
        return { data: userSession, error: null };
      }
      
      if (result.error) {
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
      await supabase.auth.signOut();
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
      // Verificar localStorage primero (para usuarios mock/locales)
      const storedUser = localStorage.getItem('admin_user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          console.log('adminAuthService.checkSession - Found stored user:', user);
          return { data: { session: { user } }, error: null };
        } catch (parseError) {
          console.error('adminAuthService.checkSession - Parse error:', parseError);
          localStorage.removeItem('admin_user');
        }
      }
      
      // Verificar sesión de Supabase
      console.log('adminAuthService.checkSession - Checking Supabase session');
      const result = await supabase.auth.getSession();
      console.log('adminAuthService.checkSession - Supabase result:', result);
      
      if (result.data?.session?.user) {
        const userSession = {
          id: result.data.session.user.id,
          email: result.data.session.user.email,
          role: 'admin'
        };
        localStorage.setItem('admin_user', JSON.stringify(userSession));
        return { data: { session: { user: userSession } }, error: null };
      }
      
      console.log('adminAuthService.checkSession - No session found');
      return { data: { session: null }, error: null };
    } catch (error) {
      console.error('adminAuthService.checkSession - Error:', error);
      localStorage.removeItem('admin_user');
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
