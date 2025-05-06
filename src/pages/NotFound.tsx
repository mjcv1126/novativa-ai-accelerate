
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import LouisebotWidget from '@/components/shared/LouisebotWidget';
import { Link } from "react-router-dom";
import { Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Try to clear cache
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
  }, [location.pathname]);

  const handleRefresh = () => {
    // Set flag to force reload
    sessionStorage.setItem('purge-cache', 'true');
    window.location.href = location.pathname;
  };

  return (
    <>
      <LouisebotWidget />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="text-center max-w-lg bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-4 text-red-600">404</h1>
          <p className="text-xl text-gray-800 mb-2">Página no encontrada</p>
          <p className="text-gray-600 mb-6">
            Lo sentimos, no pudimos encontrar la página que estás buscando: 
            <span className="font-mono bg-gray-100 px-2 py-1 rounded ml-1">{location.pathname}</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="default" className="w-full sm:w-auto flex items-center gap-2">
                <Home size={16} /> Ir al inicio
              </Button>
            </Link>
            
            <Button variant="outline" onClick={handleRefresh} className="w-full sm:w-auto flex items-center gap-2">
              <RefreshCw size={16} /> Recargar página
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
