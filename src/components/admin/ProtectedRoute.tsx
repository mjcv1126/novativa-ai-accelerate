
import React, { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Loader2 } from 'lucide-react';

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole?: string;
};

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, checkSession, user } = useAdminAuth();
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

  // Verificar el rol si es requerido
  if (requiredRole) {
    const currentUser = user || JSON.parse(localStorage.getItem('admin_user') || '{}');
    const userRole = currentUser?.role || 'admin';
    
    if (userRole !== requiredRole) {
      return (
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceso Denegado</h2>
            <p className="text-gray-600">No tienes permisos para acceder a esta página.</p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
