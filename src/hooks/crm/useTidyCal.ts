
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

// Helper function to format dates for TidyCal API (without milliseconds)
function formatDateForTidyCal(date: Date): string {
  return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

export const useTidyCal = () => {
  const getTidyCalBookings = useCallback(async (includePast: boolean = false) => {
    try {
      console.log('🔍 Fetching TidyCal bookings...');
      
      // Calculate date range - include past 30 days if includePast is true
      const now = new Date();
      const startDate = includePast 
        ? new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000)) // 30 days ago
        : now;
      const endDate = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days from now
      
      // Format dates properly for TidyCal (without milliseconds)
      const startsAt = formatDateForTidyCal(startDate);
      const endsAt = formatDateForTidyCal(endDate);
      
      console.log('📅 Date range:', startsAt, 'to', endsAt);
      
      const { data, error } = await supabase.functions.invoke('tidycal-api', {
        body: { 
          action: 'get_bookings',
          starts_at: startsAt,
          ends_at: endsAt,
          cancelled: false // Get both active and cancelled bookings
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
      } else if (error.message?.includes('422') || error.message?.includes('Validation')) {
        toast({
          title: "Error de formato",
          description: "Los parámetros de fecha no tienen el formato correcto",
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

  const getAllBookingsForSync = useCallback(async () => {
    try {
      console.log('🔄 Fetching all bookings for sync (including past and cancelled)...');
      
      // Get bookings from 30 days ago to 30 days in the future
      const now = new Date();
      const startDate = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
      const endDate = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
      
      const startsAt = formatDateForTidyCal(startDate);
      const endsAt = formatDateForTidyCal(endDate);
      
      // Get all bookings (including cancelled ones)
      const { data, error } = await supabase.functions.invoke('tidycal-api', {
        body: { 
          action: 'get_bookings',
          starts_at: startsAt,
          ends_at: endsAt
          // Don't filter by cancelled status to get all bookings
        }
      });

      if (error) {
        console.error('🔥 Error fetching all bookings:', error);
        return { error };
      }

      console.log('📊 All bookings fetched for sync:', data?.data?.length || 0);
      return data;
    } catch (error: any) {
      console.error('💥 Error fetching all bookings for sync:', error);
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
        description: `Procesados: ${data.results?.bookings_processed || 0}, Omitidos: ${data.results?.bookings_skipped || 0}`,
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
    getAllBookingsForSync,
    syncBookingToContact,
    setupCronJob,
    triggerPolling,
  };
};
