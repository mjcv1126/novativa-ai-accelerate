
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Phone, User, Clock } from 'lucide-react';

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

interface BookingsCalendarProps {
  bookings: TidyCalBooking[];
}

export const BookingsCalendar: React.FC<BookingsCalendarProps> = ({ bookings }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getBookingStatus = (booking: TidyCalBooking) => {
    if (booking.cancelled_at) return 'cancelled';
    
    const startTime = new Date(booking.starts_at);
    const now = new Date();
    
    if (startTime < now) return 'completed';
    return 'confirmed';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'completed':
        return 'Completada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return 'Pendiente';
    }
  };

  // Get bookings for the selected date
  const selectedDateBookings = selectedDate 
    ? bookings.filter(booking => 
        isSameDay(new Date(booking.starts_at), selectedDate)
      )
    : [];

  // Get dates that have bookings
  const datesWithBookings = bookings.map(booking => new Date(booking.starts_at));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Calendario de Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={es}
            modifiers={{
              hasBookings: datesWithBookings
            }}
            modifiersStyles={{
              hasBookings: {
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                fontWeight: 'bold'
              }
            }}
            className="rounded-md border"
          />
          <div className="mt-4 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-100 rounded border"></div>
              Días con bookings programados
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bookings for selected date */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedDate 
              ? `Bookings para ${format(selectedDate, 'dd MMMM yyyy', { locale: es })}`
              : 'Selecciona una fecha'
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDateBookings.length === 0 ? (
            <div className="text-center py-8">
              <Phone className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No hay bookings para esta fecha</p>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedDateBookings.map((booking) => {
                const status = getBookingStatus(booking);
                return (
                  <div key={booking.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-blue-500" />
                        <div>
                          <h4 className="font-medium">{booking.booking_type.title}</h4>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {booking.contact.name}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(status)}>
                        {getStatusText(status)}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {format(new Date(booking.starts_at), 'HH:mm')} - {format(new Date(booking.ends_at), 'HH:mm')}
                      </p>
                      <p>📧 {booking.contact.email}</p>
                      {booking.contact.phone_number && (
                        <p>📞 {booking.contact.phone_number}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
