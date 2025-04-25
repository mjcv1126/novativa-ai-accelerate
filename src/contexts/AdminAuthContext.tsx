import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Check if we have valid Supabase credentials
const supabaseUrl = window.env?.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = window.env?.SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Define the hardcoded admin credentials
const ADMIN_EMAIL = 'soporte@novativa.org';
const ADMIN_PASSWORD = 'Novativa2025$';

// Make sure we have a URL before creating the client
const supabase = supabaseUrl 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

interface AdminAuthContextType {
  user: any;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  resetPassword: (email: string) => Promise<{ error: any }>;
  verifyResetCode: (email: string, code: string) => Promise<{ error: any }>;
  updatePassword: (email: string, code: string, newPassword: string) => Promise<{ error: any }>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  isLoading: true,
  login: async () => ({ error: null }),
  logout: async () => {},
  isAuthenticated: false,
  resetPassword: async () => ({ error: null }),
  verifyResetCode: async () => ({ error: null }),
  updatePassword: async () => ({ error: null }),
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(!!supabase);

  useEffect(() => {
    // Si Supabase no está configurado, marcar la carga como completa
    if (!supabase) {
      console.error("Supabase no está configurado correctamente. Por favor, configura SUPABASE_URL y SUPABASE_ANON_KEY.");
      setIsLoading(false);
      return;
    }

    // Verificar la sesión actual
    const checkSession = async () => {
      try {
        // Forzar una nueva verificación de sesión
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error al verificar la sesión:", error);
          setUser(null);
          return;
        }
        
        if (data?.session) {
          setUser(data.session.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error inesperado al verificar la sesión:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();

    // Escuchar cambios en el estado de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Cambio en el estado de autenticación:", event);
        
        if (event === 'SIGNED_OUT') {
          setUser(null);
          // Limpiar cualquier dato en caché
          localStorage.removeItem('admin_user');
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setUser(session?.user || null);
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Fallback authentication when Supabase is not configured
      if (!supabase) {
        // Check if credentials match hardcoded admin values
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          // Set a mock user object
          const mockUser = {
            id: '1',
            email: ADMIN_EMAIL,
            role: 'admin'
          };
          
          // Store in localStorage to persist session
          localStorage.setItem('admin_user', JSON.stringify(mockUser));
          
          setUser(mockUser);
          navigate('/admin');
          return { error: null };
        } else {
          return { error: { message: 'Credenciales incorrectas' } };
        }
      }
      
      // If Supabase is configured, use it for authentication
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) {
        return { error };
      }
      
      if (data?.user) {
        setUser(data.user);
        navigate('/admin');
        return { error: null };
      }
      
      return { error: { message: 'Error de autenticación' } };
    } catch (error) {
      console.error('Login error:', error);
      return { error: { message: 'Error inesperado' } };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    } else {
      // Clear local storage for fallback authentication
      localStorage.removeItem('admin_user');
      setUser(null);
    }
    navigate('/admin/login');
  };

  // Check for stored user on load when no Supabase
  useEffect(() => {
    if (!supabase && !user) {
      const storedUser = localStorage.getItem('admin_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    }
  }, [user]);

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      
      if (!supabase) {
        // Simular envío de código para el modo de fallback
        if (email === ADMIN_EMAIL) {
          console.log('Código de recuperación enviado a:', email);
          return { error: null };
        }
        return { error: { message: 'Email no encontrado' } };
      }
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/login`,
      });
      
      return { error };
    } catch (error) {
      console.error('Reset password error:', error);
      return { error: { message: 'Error al enviar el código de recuperación' } };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyResetCode = async (email: string, code: string) => {
    try {
      setIsLoading(true);
      
      if (!supabase) {
        // Simular verificación de código para el modo de fallback
        if (email === ADMIN_EMAIL && code === '123456') {
          return { error: null };
        }
        return { error: { message: 'Código inválido' } };
      }
      
      // En un entorno real, aquí verificarías el código con Supabase
      return { error: null };
    } catch (error) {
      console.error('Verify code error:', error);
      return { error: { message: 'Error al verificar el código' } };
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (email: string, code: string, newPassword: string) => {
    try {
      setIsLoading(true);
      
      if (!supabase) {
        // Simular actualización de contraseña para el modo de fallback
        if (email === ADMIN_EMAIL && code === '123456') {
          // En un entorno real, aquí actualizarías la contraseña en la base de datos
          console.log('Contraseña actualizada para:', email);
          return { error: null };
        }
        return { error: { message: 'No se pudo actualizar la contraseña' } };
      }
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      return { error };
    } catch (error) {
      console.error('Update password error:', error);
      return { error: { message: 'Error al actualizar la contraseña' } };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
        resetPassword,
        verifyResetCode,
        updatePassword,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const withAdminAuth = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    const { user, isLoading } = useAdminAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoading && !user) {
        navigate('/admin/login');
      }
    }, [user, isLoading, navigate]);

    if (isLoading) {
      return <div className="flex h-screen items-center justify-center">Cargando...</div>;
    }

    return user ? <Component {...props} /> : null;
  };
};
