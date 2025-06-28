
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, isToday, isTomorrow, isThisWeek, addWeeks, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { es } from 'date-fns/locale';
import { Phone, User, Clock, Calendar } from 'lucide-react';

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

interface BookingsListProps {
  bookings: TidyCalBooking[];
}

export const BookingsList: React.FC<BookingsListProps> = ({ bookings }) => {
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

  // Custom function to check if date is in next week or beyond
  const isNextWeekOrBeyond = (date: Date) => {
    const nextWeekStart = startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 });
    return date >= nextWeekStart;
  };

  // Organize bookings by time periods
  const organizeBookings = () => {
    const today: TidyCalBooking[] = [];
    const tomorrow: TidyCalBooking[] = [];
    const thisWeek: TidyCalBooking[] = [];
    const nextWeeks: TidyCalBooking[] = [];

    bookings.forEach(booking => {
      const bookingDate = new Date(booking.starts_at);
      
      if (isToday(bookingDate)) {
        today.push(booking);
      } else if (isTomorrow(bookingDate)) {
        tomorrow.push(booking);
      } else if (isThisWeek(bookingDate, { weekStartsOn: 1 })) {
        thisWeek.push(booking);
      } else if (isNextWeekOrBeyond(bookingDate)) {
        nextWeeks.push(booking);
      }
    });

    // Sort each group by time
    const sortByTime = (a: TidyCalBooking, b: TidyCalBooking) => 
      new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime();

    return {
      today: today.sort(sortByTime),
      tomorrow: tomorrow.sort(sortByTime),
      thisWeek: thisWeek.sort(sortByTime),
      nextWeeks: nextWeeks.sort(sortByTime)
    };
  };

  const renderBookingCard = (booking: TidyCalBooking) => {
    const status = getBookingStatus(booking);
    return (
      <Card key={booking.id} className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-blue-500" />
              <div>
                <h3 className="font-medium">{booking.booking_type.title}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {booking.contact.name}
                </p>
                <p className="text-sm text-gray-500">📧 {booking.contact.email}</p>
                {booking.contact.phone_number && (
                  <p className="text-sm text-gray-500">📞 {booking.contact.phone_number}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">
                {format(new Date(booking.starts_at), 'dd MMM yyyy', { locale: es })}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {format(new Date(booking.starts_at), 'HH:mm')} - {format(new Date(booking.ends_at), 'HH:mm')}
              </p>
              <Badge className={`mt-1 ${getStatusColor(status)}`}>
                {getStatusText(status)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderSection = (title: string, bookings: TidyCalBooking[], icon: React.ReactNode) => {
    if (bookings.length === 0) return null;

    return (
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {icon}
              {title} ({bookings.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {bookings.map(renderBookingCard)}
          </CardContent>
        </Card>
      </div>
    );
  };

  const organizedBookings = organizeBookings();

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <Phone className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p className="text-gray-500">No hay bookings disponibles</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {renderSection('Hoy', organizedBookings.today, <Clock className="h-5 w-5 text-red-500" />)}
      {renderSection('Mañana', organizedBookings.tomorrow, <Clock className="h-5 w-5 text-orange-500" />)}
      {renderSection('Esta Semana', organizedBookings.thisWeek, <Calendar className="h-5 w-5 text-blue-500" />)}
      {renderSection('Próximas Semanas', organizedBookings.nextWeeks, <Calendar className="h-5 w-5 text-green-500" />)}
    </div>
  );
};
