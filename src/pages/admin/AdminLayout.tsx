
import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { AdminDataProvider } from '@/contexts/AdminDataContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { Helmet } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminLayout = () => {
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
    
    // Agregar headers para evitar el caché
    const metaTags = document.querySelectorAll('meta[http-equiv="Cache-Control"]');
    if (metaTags.length === 0) {
      const meta = document.createElement('meta');
      meta.httpEquiv = "Cache-Control";
      meta.content = "no-cache, no-store, must-revalidate";
      document.head.appendChild(meta);
      
      const metaPragma = document.createElement('meta');
      metaPragma.httpEquiv = "Pragma";
      metaPragma.content = "no-cache";
      document.head.appendChild(metaPragma);
      
      const metaExpires = document.createElement('meta');
      metaExpires.httpEquiv = "Expires";
      metaExpires.content = "0";
      document.head.appendChild(metaExpires);
    }
    
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
        <div className="flex h-screen bg-gray-100">
          <AdminSidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <AdminHeader />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </AdminDataProvider>
    </>
  );
};

export default AdminLayout;
