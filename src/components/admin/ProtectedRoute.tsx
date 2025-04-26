
import React, { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Loader2 } from 'lucide-react';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, checkSession } = useAdminAuth();
  const location = useLocation();

  useEffect(() => {
    // Verificar la sesión al montar el componente
    checkSession();
  }, [checkSession]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-novativa-teal" />
        <span className="ml-2 text-lg font-medium">Verificando sesión...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Guardar la ruta actual para redirigir después del login
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
