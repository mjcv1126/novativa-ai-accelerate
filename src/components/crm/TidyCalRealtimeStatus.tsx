
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, RefreshCw, Zap, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useTidyCalRealtime } from '@/hooks/crm/useTidyCalRealtime';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const TidyCalRealtimeStatus = () => {
  const { 
    syncStatus, 
    realtimeData, 
    triggerManualSync, 
    getSyncStatus,
    connect,
    disconnect 
  } = useTidyCalRealtime();

  const getConnectionIcon = () => {
    if (syncStatus.connected) {
      return <Wifi className="h-4 w-4 text-green-500" />;
    }
    return <WifiOff className="h-4 w-4 text-red-500" />;
  };

  const getConnectionBadge = () => {
    if (syncStatus.connected) {
      return <Badge className="bg-green-100 text-green-800">Conectado</Badge>;
    }
    return <Badge className="bg-red-100 text-red-800">Desconectado</Badge>;
  };

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <span>Sincronización en Tiempo Real</span>
            </div>
            <div className="flex items-center gap-2">
              {getConnectionIcon()}
              {getConnectionBadge()}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Estado de conexión:</span>
              <span className={`text-sm font-medium ${syncStatus.connected ? 'text-green-600' : 'text-red-600'}`}>
                {syncStatus.connected ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            
            {syncStatus.lastSync && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Última sincronización:</span>
                <span className="text-sm font-medium">
                  {format(syncStatus.lastSync, 'dd MMM HH:mm', { locale: es })}
                </span>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={triggerManualSync}
                disabled={!syncStatus.connected || syncStatus.isProcessing}
              >
                <RefreshCw className={`h-4 w-4 ${syncStatus.isProcessing ? 'animate-spin' : ''}`} />
                <span className="ml-1">
                  {syncStatus.isProcessing ? 'Sincronizando...' : 'Sincronizar'}
                </span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={getSyncStatus}
                disabled={!syncStatus.connected}
              >
                <Clock className="h-4 w-4" />
                <span className="ml-1">Estado</span>
              </Button>

              {syncStatus.connected ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={disconnect}
                >
                  <WifiOff className="h-4 w-4" />
                  <span className="ml-1">Desconectar</span>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={connect}
                >
                  <Wifi className="h-4 w-4" />
                  <span className="ml-1">Conectar</span>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Updates */}
      {realtimeData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Actualizaciones en Tiempo Real</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {realtimeData.map((update, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="font-medium text-sm">{update.contact_name}</div>
                      <div className="text-xs text-gray-500">{update.booking_type?.title}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {format(new Date(update.timestamp), 'HH:mm:ss')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-800 mb-2">Sincronización en Tiempo Real</p>
              <ul className="text-blue-700 space-y-1 text-xs">
                <li>• Las nuevas reservas se sincronizan automáticamente</li>
                <li>• Los cambios aparecen instantáneamente sin recargar</li>
                <li>• La conexión se mantiene activa automáticamente</li>
                <li>• Configura webhooks en TidyCal para máxima eficiencia</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
