
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Clock, CheckCircle, AlertCircle, XCircle, Activity, Shield } from 'lucide-react';
import { useTidyCalPolling } from '@/hooks/crm/useTidyCalPolling';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const TidyCalPollingStatus = () => {
  const { 
    triggerPolling, 
    getLastSyncStatus, 
    syncLogs, 
    processedBookings,
    loading,
    authError
  } = useTidyCalPolling();

  const lastSync = getLastSyncStatus();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'partial_success':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'running':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'partial_success':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSyncStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'partial_success':
        return 'Parcial';
      case 'failed':
        return 'Fallida';
      case 'running':
        return 'En progreso';
      default:
        return 'Desconocido';
    }
  };

  if (authError) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-amber-600">
            <Shield className="h-5 w-5" />
            <div>
              <p className="font-medium">Acceso Restringido</p>
              <p className="text-sm text-gray-600">
                Necesitas estar autenticado para ver el historial de sincronización.
                La funcionalidad de sincronización automática sigue funcionando en segundo plano.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Estado de Sincronización Automática
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={triggerPolling}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Sincronizando...' : 'Sincronizar Ahora'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {lastSync ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(lastSync.status)}
                  <span className="font-medium">Última sincronización:</span>
                  <Badge className={getStatusColor(lastSync.status)}>
                    {getSyncStatusText(lastSync.status)}
                  </Badge>
                </div>
                <span className="text-sm text-gray-500">
                  {format(new Date(lastSync.date), 'dd MMM yyyy HH:mm', { locale: es })}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Procesados: {lastSync.processed}</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span>Fallidos: {lastSync.failed}</span>
                </div>
              </div>

              {lastSync.error && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                  <strong>Error:</strong> {lastSync.error}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-500">No hay sincronizaciones previas</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Sync History */}
      {syncLogs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Historial de Sincronizaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {syncLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(log.status)}
                    <span className="text-sm">
                      {format(new Date(log.sync_started_at), 'dd MMM HH:mm', { locale: es })}
                    </span>
                    <Badge className={getStatusColor(log.status)}>
                      {getSyncStatusText(log.status)}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    {log.bookings_processed}P / {log.bookings_failed}F
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Processed Bookings */}
      {processedBookings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bookings Procesados Recientemente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {processedBookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{booking.contact_name}</div>
                    <div className="text-xs text-gray-500">{booking.contact_email}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500">
                      {format(new Date(booking.booking_starts_at), 'dd MMM HH:mm', { locale: es })}
                    </div>
                    <Badge 
                      className={booking.sync_status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                    >
                      {booking.sync_status === 'success' ? 'Éxito' : 'Error'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
