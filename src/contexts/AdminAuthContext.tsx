
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
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  isLoading: true,
  login: async () => ({ error: null }),
  logout: async () => {},
  isAuthenticated: false,
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(!!supabase);

  useEffect(() => {
    // If Supabase is not properly configured, mark loading as complete
    if (!supabase) {
      console.error("Supabase is not properly configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY.");
      setIsLoading(false);
      return;
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);
        setIsLoading(false);
      }
    );

    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Fallback authentication when Supabase is not configured
      if (!supabase) {
        setIsLoading(true);
        
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
          setIsLoading(false);
          navigate('/admin');
          return { error: null };
        } else {
          setIsLoading(false);
          return { error: { message: 'Credenciales incorrectas' } };
        }
      }
      
      // If Supabase is configured, use it for authentication
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error) {
        navigate('/admin');
      }
      return { error };
    } catch (error) {
      return { error };
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

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
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
