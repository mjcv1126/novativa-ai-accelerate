
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const useTidyCal = () => {
  const getTidyCalBookings = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke('tidycal-api', {
        body: { 
          action: 'get_bookings',
          starts_at: new Date().toISOString(),
          ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // Next 30 days
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching TidyCal bookings:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las reservas de TidyCal",
        variant: "destructive",
      });
      return null;
    }
  }, []);

  const syncBookingToContact = useCallback(async (bookingId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('tidycal-api', {
        body: { 
          action: 'sync_booking',
          booking_id: bookingId
        }
      });

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Booking sincronizado con el CRM correctamente",
      });

      return data;
    } catch (error) {
      console.error('Error syncing booking:', error);
      toast({
        title: "Error",
        description: "No se pudo sincronizar el booking",
        variant: "destructive",
      });
      return null;
    }
  }, []);

  return {
    getTidyCalBookings,
    syncBookingToContact,
  };
};
