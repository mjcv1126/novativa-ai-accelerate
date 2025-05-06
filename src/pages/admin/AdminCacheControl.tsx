
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { purgeAllCache } from '@/utils/cacheManager';

const AdminCacheControl = () => {
  const [isPurging, setIsPurging] = useState(false);
  
  const handlePurgeCache = async () => {
    try {
      setIsPurging(true);
      const result = await purgeAllCache();
      
      if (result.success) {
        toast({
          title: "Caché purgado",
          description: result.message,
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error inesperado al purgar el caché.",
        variant: "destructive",
      });
    } finally {
      setIsPurging(false);
    }
  };
  
  const handleHardRefresh = () => {
    toast({
      title: "Recargando",
      description: "La página se recargará completamente en 3 segundos...",
    });
    
    setTimeout(() => {
      window.location.reload(true);
    }, 3000);
  };

  return (
    <>
      <Helmet>
        <title>Control de Caché | Admin Panel</title>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Helmet>
      
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Control de Caché</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Administración de Caché</CardTitle>
            <CardDescription>
              Purga el caché del sitio para asegurar que los visitantes vean siempre la versión más reciente.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium mb-4">Purgar Caché del Sitio</h3>
              <p className="text-gray-600 mb-6">
                Esta acción limpiará todo el caché del navegador relacionado con el sitio, incluyendo recursos estáticos, 
                datos de sesión y caché del service worker. Se recomienda purgar el caché después de realizar cambios importantes 
                en el sitio.
              </p>
              <Button 
                variant="destructive" 
                size="lg"
                disabled={isPurging}
                onClick={handlePurgeCache}
                className="flex items-center gap-2"
              >
                {isPurging ? <RefreshCw className="animate-spin" /> : <Trash2 />}
                {isPurging ? 'Purgando caché...' : 'Purgar todo el caché'}
              </Button>
            </div>
            
            <div className="p-6 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium mb-4">Recargar Página</h3>
              <p className="text-gray-600 mb-6">
                Fuerza una recarga completa de la página actual, ignorando cualquier contenido en caché.
                Útil para verificar cambios recientes.
              </p>
              <Button 
                variant="outline" 
                onClick={handleHardRefresh}
                className="flex items-center gap-2"
              >
                <RefreshCw />
                Recargar página completa
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Información de Caché</CardTitle>
            <CardDescription>
              Métricas e información del sistema de caché actual.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500">Mecanismo de control de caché</h4>
                  <p className="text-lg font-semibold">HTTP Headers + LocalStorage</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500">Estado de Service Worker</h4>
                  <p className="text-lg font-semibold">
                    {'serviceWorker' in navigator ? 'Disponible' : 'No disponible'}
                  </p>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Headers de control de caché</h4>
                <code className="block p-3 bg-gray-100 text-xs rounded overflow-x-auto">
                  Cache-Control: no-cache, no-store, must-revalidate<br />
                  Pragma: no-cache<br />
                  Expires: 0
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminCacheControl;
