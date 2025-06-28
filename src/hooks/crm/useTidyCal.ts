
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const useTidyCal = () => {
  const getTidyCalBookings = useCallback(async () => {
    try {
      console.log('🔍 Fetching TidyCal bookings...');
      
      // Calculate date range for next 30 days
      const now = new Date();
      const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
      
      const { data, error } = await supabase.functions.invoke('tidycal-api', {
        body: { 
          action: 'get_bookings',
          starts_at: now.toISOString(),
          ends_at: thirtyDaysFromNow.toISOString(),
          cancelled: false // Only get active bookings
        }
      });

      if (error) {
        console.error('🔥 Supabase function error:', error);
        return { error };
      }

      console.log('📊 TidyCal API response:', data);
      return data;
    } catch (error: any) {
      console.error('💥 Error fetching TidyCal bookings:', error);
      
      // Better error handling for different scenarios
      if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
        toast({
          title: "Token inválido",
          description: "El token de TidyCal no tiene los permisos necesarios para leer bookings",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "No se pudieron cargar las reservas de TidyCal",
          variant: "destructive",
        });
      }
      
      return { error: { message: error.message } };
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

  const setupCronJob = useCallback(async () => {
    try {
      console.log('🔧 Setting up TidyCal cron job...');

      const { data, error } = await supabase.functions.invoke('setup-tidycal-cron');

      if (error) throw error;

      console.log('✅ Cron job setup completed:', data);

      toast({
        title: "Éxito",
        description: "Sincronización automática configurada correctamente",
      });

      return data;
    } catch (error) {
      console.error('Error setting up cron job:', error);
      toast({
        title: "Error",
        description: "No se pudo configurar la sincronización automática",
        variant: "destructive",
      });
      return null;
    }
  }, []);

  const triggerPolling = useCallback(async () => {
    try {
      console.log('🔄 Triggering manual polling...');

      const { data, error } = await supabase.functions.invoke('tidycal-polling');

      if (error) throw error;

      console.log('✅ Manual polling completed:', data);

      toast({
        title: "Sincronización completada",
        description: `Procesados: ${data.results.bookings_processed}, Omitidos: ${data.results.bookings_skipped}`,
      });

      return data;
    } catch (error) {
      console.error('Error triggering polling:', error);
      toast({
        title: "Error",
        description: "No se pudo ejecutar la sincronización manual",
        variant: "destructive",
      });
      return null;
    }
  }, []);

  return {
    getTidyCalBookings,
    syncBookingToContact,
    setupCronJob,
    triggerPolling,
  };
};
