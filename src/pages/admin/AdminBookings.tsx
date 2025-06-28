
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { TidyCalIntegration } from '@/components/crm/TidyCalIntegration';
import { BookingsList } from '@/components/crm/BookingsList';
import { BookingsCalendar } from '@/components/crm/BookingsCalendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { List, Kanban, Calendar, RefreshCw, Phone } from 'lucide-react';
import { useTidyCal } from '@/hooks/crm/useTidyCal';

type ViewMode = 'list' | 'kanban' | 'calendar';

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

const AdminBookings = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [bookings, setBookings] = useState<TidyCalBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getTidyCalBookings } = useTidyCal();

  const loadBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('📅 Cargando bookings desde AdminBookings...');
      const data = await getTidyCalBookings();
      
      if (data?.error) {
        setError(data.error.message || 'Error al cargar bookings');
        return;
      }
      
      if (data?.data) {
        console.log(`✅ ${data.data.length} bookings cargados en AdminBookings`);
        setBookings(data.data);
      } else {
        setBookings([]);
      }
    } catch (err: any) {
      console.error('💥 Error loading bookings en AdminBookings:', err);
      setError('Error al cargar las reservas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const getBookingStatus = (booking: TidyCalBooking) => {
    if (booking.cancelled_at) return 'cancelled';
    
    const startTime = new Date(booking.starts_at);
    const now = new Date();
    
    if (startTime < now) return 'completed';
    return 'confirmed';
  };

  const renderKanbanView = () => {
    const confirmedBookings = bookings.filter(b => getBookingStatus(b) === 'confirmed');
    const completedBookings = bookings.filter(b => getBookingStatus(b) === 'completed');
    const cancelledBookings = bookings.filter(b => getBookingStatus(b) === 'cancelled');

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Confirmadas ({confirmedBookings.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {confirmedBookings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Phone className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No hay reservas confirmadas</p>
              </div>
            ) : (
              confirmedBookings.map((booking) => (
                <div key={booking.id} className="p-3 bg-green-50 border border-green-200 rounded">
                  <h4 className="font-medium text-sm">{booking.booking_type.title}</h4>
                  <p className="text-sm text-gray-600">{booking.contact.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(booking.starts_at).toLocaleDateString('es-ES', { 
                      day: '2-digit', 
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              Completadas ({completedBookings.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {completedBookings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Phone className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No hay reservas completadas</p>
              </div>
            ) : (
              completedBookings.map((booking) => (
                <div key={booking.id} className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <h4 className="font-medium text-sm">{booking.booking_type.title}</h4>
                  <p className="text-sm text-gray-600">{booking.contact.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(booking.starts_at).toLocaleDateString('es-ES', { 
                      day: '2-digit', 
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              Canceladas ({cancelledBookings.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {cancelledBookings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Phone className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No hay reservas canceladas</p>
              </div>
            ) : (
              cancelledBookings.map((booking) => (
                <div key={booking.id} className="p-3 bg-red-50 border border-red-200 rounded">
                  <h4 className="font-medium text-sm">{booking.booking_type.title}</h4>
                  <p className="text-sm text-gray-600">{booking.contact.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(booking.starts_at).toLocaleDateString('es-ES', { 
                      day: '2-digit', 
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  // Stats calculations
  const totalBookings = bookings.length;
  const confirmedCount = bookings.filter(b => getBookingStatus(b) === 'confirmed').length;
  const completedCount = bookings.filter(b => getBookingStatus(b) === 'completed').length;
  const cancelledCount = bookings.filter(b => getBookingStatus(b) === 'cancelled').length;

  return (
    <>
      <Helmet>
        <title>Bookings | Panel Admin Novativa</title>
      </Helmet>
      
      <div className="space-y-6 max-w-full">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Gestión de Bookings</h1>
            <p className="text-gray-600 text-sm">Administra tus reservas, llamadas y citas de TidyCal</p>
          </div>
        </div>

        {/* TidyCal Integration */}
        <TidyCalIntegration />

        {/* Error Display */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <p className="text-red-800 text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Card className="w-32 sm:w-36 lg:w-40">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">
                Total Bookings
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold">{totalBookings}</div>
            </CardContent>
          </Card>
          
          <Card className="w-32 sm:w-36 lg:w-40">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">
                Confirmadas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
                {confirmedCount}
              </div>
            </CardContent>
          </Card>
          
          <Card className="w-32 sm:w-36 lg:w-40">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">
                Completadas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                {completedCount}
              </div>
            </CardContent>
          </Card>

          <Card className="w-32 sm:w-36 lg:w-40">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">
                Canceladas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600">
                {cancelledCount}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* View Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)} className="w-full sm:w-auto">
            <TabsList className="grid w-full grid-cols-3 sm:w-auto">
              <TabsTrigger value="list" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">Lista</span>
              </TabsTrigger>
              <TabsTrigger value="kanban" className="flex items-center gap-2">
                <Kanban className="h-4 w-4" />
                <span className="hidden sm:inline">Kanban</span>
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Calendario</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            variant="outline"
            size="sm"
            onClick={loadBookings}
            disabled={loading}
            className="flex-shrink-0"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="ml-1">Actualizar</span>
          </Button>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Cargando bookings...</p>
            </div>
          ) : (
            <>
              {viewMode === 'list' && <BookingsList bookings={bookings} />}
              {viewMode === 'kanban' && renderKanbanView()}
              {viewMode === 'calendar' && <BookingsCalendar bookings={bookings} />}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminBookings;
