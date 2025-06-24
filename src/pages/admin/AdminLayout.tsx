
import React, { useEffect, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { AdminDataProvider } from '@/contexts/AdminDataContext';
import { CustomCSSProvider } from '@/contexts/CustomCSSContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { Helmet } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { isAuthenticated, isLoading } = useAdminAuth();

  console.log('AdminLayout - Rendering with state:', { isAuthenticated, isLoading });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-novativa-teal" />
        <span className="ml-2 text-lg">Cargando panel administrativo...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('AdminLayout - Not authenticated, redirecting to login');
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Panel Admin | Novativa</title>
      </Helmet>
      <AdminDataProvider>
        <CustomCSSProvider>
          <div className="flex h-screen bg-gray-100">
            <div className="w-64 bg-white shadow-lg">
              <AdminSidebar />
            </div>
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
