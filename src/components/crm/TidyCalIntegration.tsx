
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, RefreshCw, ExternalLink, Activity, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useTidyCal } from '@/hooks/crm/useTidyCal';
import { TidyCalPollingStatus } from './TidyCalPollingStatus';
import { TidyCalSetupButton } from './TidyCalSetupButton';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from '@/components/ui/use-toast';

interface TidyCalBooking {
  id: number;
  starts_at: string;
  ends_at: string;
  timezone: string;
  cancelled_at?: string;
  contact: {
    id: number;
    name: string;
    email: string;
    phone_number?: string;
  };
  booking_type: {
    id: number;
    title: string;
    duration_minutes: number;
  };
}

export const TidyCalIntegration = () => {
  const [bookings, setBookings] = useState<TidyCalBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenStatus, setTokenStatus] = useState<'unknown' | 'testing' | 'valid' | 'invalid'>('unknown');
  const [syncingBookingId, setSyncingBookingId] = useState<number | null>(null);
  const { getTidyCalBookings, syncBookingToContact } = useTidyCal();

  const testTokenConnection = async () => {
    setTokenStatus('testing');
    try {
      console.log('🔍 Testing TidyCal token connection...');
      const data = await getTidyCalBookings();
      if (data?.data || data?.error?.message?.includes('401')) {
        if (data?.error?.message?.includes('401')) {
          setTokenStatus('invalid');
          setError('Token inválido o sin permisos. El token necesita permisos de lectura para bookings.');
        } else {
          setTokenStatus('valid');
          console.log('✅ Token válido, conexión exitosa');
        }
      } else {
        setTokenStatus('invalid');
        setError('No se pudo validar el token de TidyCal');
      }
    } catch (err) {
      console.error('❌ Error testing token:', err);
      setTokenStatus('invalid');
      setError('Error al validar el token de TidyCal');
    }
  };

  const loadBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('📅 Cargando bookings de TidyCal...');
      const data = await getTidyCalBookings();
      
      console.log('📊 Respuesta de TidyCal:', data);
      
      if (data?.error) {
        console.error('❌ Error en la respuesta:', data.error);
        if (data.error.message?.includes('401') || data.error.message?.includes('Unauthorized')) {
          setError('Token de TidyCal inválido o expirado. Verifica que el token tenga permisos de lectura para bookings.');
          setTokenStatus('invalid');
        } else {
          setError(`Error de TidyCal: ${data.error.message}`);
        }
        return;
      }
      
      if (data?.data) {
        console.log(`✅ ${data.data.length} bookings cargados exitosamente`);
        setBookings(data.data);
        setTokenStatus('valid');
      } else {
        console.warn('⚠️ No data returned from TidyCal API');
        setError('No se recibieron datos de TidyCal. Verifica la configuración del token.');
        setTokenStatus('invalid');
      }
    } catch (err: any) {
      console.error('💥 Error loading bookings:', err);
      if (err.message?.includes('401') || err.message?.includes('Unauthorized')) {
        setError('Token de TidyCal no autorizado. Asegúrate de que el token tenga permisos para leer bookings.');
        setTokenStatus('invalid');
      } else {
        setError('Error al cargar las reservas. Verifica que el token de TidyCal esté configurado correctamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSyncBooking = async (bookingId: number) => {
    setSyncingBookingId(bookingId);
    try {
      const result = await syncBookingToContact(bookingId.toString());
      if (result) {
        toast({
          title: "Sincronización exitosa",
          description: `Booking #${bookingId} sincronizado correctamente al CRM`,
        });
      }
    } catch (error) {
      console.error('Error syncing booking:', error);
      toast({
        title: "Error de sincronización",
        description: `No se pudo sincronizar el booking #${bookingId}`,
        variant: "destructive",
      });
    } finally {
      setSyncingBookingId(null);
    }
  };

  useEffect(() => {
    testTokenConnection();
  }, []);

  const getTokenStatusIcon = () => {
    switch (tokenStatus) {
      case 'testing':
        return <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />;
      case 'valid':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'invalid':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTokenStatusText = () => {
    switch (tokenStatus) {
      case 'testing':
        return 'Validando...';
      case 'valid':
        return 'Token válido';
      case 'invalid':
        return 'Token inválido';
      default:
        return 'Token no verificado';
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 flex-shrink-0" />
              <span className="text-lg">Integración TidyCal</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-2">
              <div className="flex items-center gap-2 text-sm min-w-0">
                {getTokenStatusIcon()}
                <span className={`truncate ${tokenStatus === 'valid' ? 'text-green-600' : tokenStatus === 'invalid' ? 'text-red-600' : 'text-gray-600'}`}>
                  {getTokenStatusText()}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <TidyCalSetupButton />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={testTokenConnection}
                  disabled={tokenStatus === 'testing'}
                  className="flex-shrink-0"
                >
                  <RefreshCw className={`h-4 w-4 ${tokenStatus === 'testing' ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline ml-1">Validar Token</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://tidycal.com/novativa', '_blank')}
                  className="flex-shrink-0"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <Tabs defaultValue="automation" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="automation" className="flex items-center gap-2 text-xs sm:text-sm px-2">
                <Activity className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">Automática</span>
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-2 text-xs sm:text-sm px-2">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">Manual</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="automation" className="space-y-4 mt-0">
              <div className="text-sm text-gray-600 mb-4">
                <p>La sincronización automática se ejecuta cada 15 minutos.</p>
              </div>
              <TidyCalPollingStatus />
            </TabsContent>
            
            <TabsContent value="bookings" className="space-y-4 mt-0">
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <p>Próximas citas de TidyCal para sincronización manual.</p>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadBookings}
                    disabled={loading || tokenStatus === 'invalid'}
                    className="flex-shrink-0"
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    <span className="ml-1">Cargar</span>
                  </Button>
                </div>
              </div>
              
              {error && (
                <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm">
                  <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-red-800 mb-1">Error de configuración</p>
                    <p className="text-red-700 mb-2 break-words">{error}</p>
                    <div className="text-red-600 text-xs space-y-1">
                      <p>• Token <code className="bg-red-100 px-1 rounded text-xs">Tidycal_Token</code> en Supabase</p>
                      <p>• Permisos: <code className="bg-red-100 px-1 rounded text-xs">bookings:read</code></p>
                    </div>
                  </div>
                </div>
              )}
              
              {loading ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">Cargando...</p>
                </div>
              ) : bookings.length === 0 && !error ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">No hay reservas próximas</p>
                </div>
              ) : !error && bookings.length > 0 ? (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-3">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium text-sm truncate">{booking.booking_type.title}</h4>
                              {booking.cancelled_at && (
                                <Badge variant="destructive" className="text-xs">Cancelada</Badge>
                              )}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSyncBooking(booking.id)}
                            disabled={syncingBookingId === booking.id}
                            className="flex-shrink-0 text-xs px-2"
                          >
                            {syncingBookingId === booking.id ? (
                              <RefreshCw className="h-3 w-3 animate-spin" />
                            ) : (
                              'Sync'
                            )}
                          </Button>
                        </div>
                        
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate font-medium">{booking.contact.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="truncate text-gray-500">{booking.contact.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3 flex-shrink-0" />
                            <span>{format(new Date(booking.starts_at), 'dd MMM yyyy', { locale: es })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 flex-shrink-0" />
                            <span>
                              {format(new Date(booking.starts_at), 'HH:mm')} - {format(new Date(booking.ends_at), 'HH:mm')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
