
import React, { useEffect, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { AdminDataProvider } from '@/contexts/AdminDataContext';
import { CustomCSSProvider } from '@/contexts/CustomCSSContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { Helmet } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { isAuthenticated, isLoading, checkSession } = useAdminAuth();

  // Verificar autenticación al cargar
  useEffect(() => {
    const verifyAuth = async () => {
      await checkSession();
    };
    
    verifyAuth();
  }, [checkSession]);

  // Función para evitar el caché
  useEffect(() => {
    // Desactivar el caché del navegador para esta página
    window.onpageshow = function(event) {
      if (event.persisted) {
        window.location.reload();
      }
    };
    
    // Añadir meta tags para evitar el caché (asegurando que se aplica a todas las páginas admin)
    const addNoCacheHeaders = () => {
      document.querySelector('meta[http-equiv="Cache-Control"]')?.remove();
      document.querySelector('meta[http-equiv="Pragma"]')?.remove();
      document.querySelector('meta[http-equiv="Expires"]')?.remove();
      
      const metaCache = document.createElement('meta');
      metaCache.httpEquiv = "Cache-Control";
      metaCache.content = "no-cache, no-store, must-revalidate";
      document.head.appendChild(metaCache);
      
      const metaPragma = document.createElement('meta');
      metaPragma.httpEquiv = "Pragma";
      metaPragma.content = "no-cache";
      document.head.appendChild(metaPragma);
      
      const metaExpires = document.createElement('meta');
      metaExpires.httpEquiv = "Expires";
      metaExpires.content = "0";
      document.head.appendChild(metaExpires);
    };
    
    addNoCacheHeaders();
    
    // Mostrar un mensaje de bienvenida una vez autenticado
    if (isAuthenticated && !isLoading) {
      toast.success('Bienvenido al panel administrativo');
    }
    
    // Limpiar al desmontar
    return () => {
      window.onpageshow = null;
    };
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-novativa-teal" />
        <span className="ml-2 text-lg">Cargando panel administrativo...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Panel Admin | Novativa</title>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Helmet>
      <AdminDataProvider>
        <CustomCSSProvider>
          <div className="flex h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <AdminHeader />
              <main className="flex-1 overflow-y-auto p-4 md:p-6">
                {children}
              </main>
            </div>
          </div>
        </CustomCSSProvider>
      </AdminDataProvider>
    </>
  );
};

export default AdminLayout;
