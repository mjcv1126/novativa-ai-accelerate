
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { TidyCalIntegration } from '@/components/crm/TidyCalIntegration';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { List, Kanban, Calendar, RefreshCw, Phone } from 'lucide-react';

type ViewMode = 'list' | 'kanban' | 'calendar';

const AdminBookings = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [loading, setLoading] = useState(false);

  // Mock data for calls/bookings - you can replace this with real data
  const mockBookings = [
    {
      id: '1',
      title: 'Consulta inicial',
      client: 'Juan Pérez',
      phone: '+1234567890',
      date: '2025-06-28',
      time: '10:00',
      status: 'confirmed'
    },
    {
      id: '2',
      title: 'Seguimiento comercial',
      client: 'María García',
      phone: '+1234567891',
      date: '2025-06-28',
      time: '14:30',
      status: 'pending'
    }
  ];

  const renderListView = () => (
    <div className="space-y-4">
      {mockBookings.map((booking) => (
        <Card key={booking.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-blue-500" />
                <div>
                  <h3 className="font-medium">{booking.title}</h3>
                  <p className="text-sm text-gray-600">{booking.client}</p>
                  <p className="text-sm text-gray-500">{booking.phone}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{booking.date}</p>
                <p className="text-sm text-gray-600">{booking.time}</p>
                <span className={`inline-block px-2 py-1 rounded text-xs ${
                  booking.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {booking.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderKanbanView = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pendientes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockBookings.filter(b => b.status === 'pending').map((booking) => (
            <div key={booking.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <h4 className="font-medium">{booking.title}</h4>
              <p className="text-sm text-gray-600">{booking.client}</p>
              <p className="text-xs text-gray-500">{booking.date} - {booking.time}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Confirmadas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockBookings.filter(b => b.status === 'confirmed').map((booking) => (
            <div key={booking.id} className="p-3 bg-green-50 border border-green-200 rounded">
              <h4 className="font-medium">{booking.title}</h4>
              <p className="text-sm text-gray-600">{booking.client}</p>
              <p className="text-xs text-gray-500">{booking.date} - {booking.time}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Completadas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center py-8 text-gray-500">
            <Phone className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No hay llamadas completadas</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCalendarView = () => (
    <Card>
      <CardContent className="p-6">
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Vista de Calendario</h3>
          <p className="text-gray-600">
            La vista de calendario se implementará próximamente con una integración completa.
          </p>
        </div>
      </CardContent>
    </Card>
  );

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
            <p className="text-gray-600 text-sm">Administra tus reservas, llamadas y citas</p>
          </div>
        </div>

        {/* TidyCal Integration */}
        <TidyCalIntegration />

        {/* Stats Cards */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Card className="w-32 sm:w-36 lg:w-40">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">
                Total Bookings
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold">{mockBookings.length}</div>
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
                {mockBookings.filter(b => b.status === 'confirmed').length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="w-32 sm:w-36 lg:w-40">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">
                Pendientes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-600">
                {mockBookings.filter(b => b.status === 'pending').length}
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
            onClick={() => setLoading(!loading)}
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
              {viewMode === 'list' && renderListView()}
              {viewMode === 'kanban' && renderKanbanView()}
              {viewMode === 'calendar' && renderCalendarView()}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminBookings;
