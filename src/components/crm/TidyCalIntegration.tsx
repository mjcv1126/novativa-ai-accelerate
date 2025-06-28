
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, RefreshCw, ExternalLink, Activity } from 'lucide-react';
import { useTidyCal } from '@/hooks/crm/useTidyCal';
import { TidyCalPollingStatus } from './TidyCalPollingStatus';
import { TidyCalSetupButton } from './TidyCalSetupButton';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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
  const { getTidyCalBookings, syncBookingToContact } = useTidyCal();

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await getTidyCalBookings();
      if (data?.data) {
        setBookings(data.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSyncBooking = async (bookingId: number) => {
    await syncBookingToContact(bookingId.toString());
    // Optionally reload bookings or update UI
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Integración TidyCal
          </div>
          <div className="flex items-center gap-2">
            <TidyCalSetupButton />
            <Button
              variant="outline"
              size="sm"
              onClick={loadBookings}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://tidycal.com/novativa', '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="automation" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="automation" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Sincronización Automática
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Reservas Manuales
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="automation" className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">
              <p>La sincronización automática se ejecuta cada 15 minutos y procesa automáticamente todas las nuevas reservas de TidyCal.</p>
            </div>
            <TidyCalPollingStatus />
          </TabsContent>
          
          <TabsContent value="bookings" className="space-y-4">
            <div className="text-sm text-gray-600">
              <p>Próximas citas programadas en TidyCal. Puedes sincronizar manualmente reservas específicas si es necesario.</p>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Cargando reservas...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">No hay reservas próximas</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{booking.booking_type.title}</h4>
                          {booking.cancelled_at && (
                            <Badge variant="destructive">Cancelada</Badge>
                          )}
                        </div>
                        
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{booking.contact.name}</span>
                            <span className="text-gray-400">({booking.contact.email})</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {format(new Date(booking.starts_at), 'dd MMM yyyy', { locale: es })}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>
                              {format(new Date(booking.starts_at), 'HH:mm')} - {format(new Date(booking.ends_at), 'HH:mm')}
                            </span>
                            <span className="text-gray-400">({booking.timezone})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSyncBooking(booking.id)}
                        >
                          Sincronizar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
