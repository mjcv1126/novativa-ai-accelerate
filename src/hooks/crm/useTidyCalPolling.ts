
import { useCallback, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface SyncLog {
  id: string;
  sync_started_at: string;
  sync_completed_at?: string;
  bookings_found: number;
  bookings_processed: number;
  bookings_skipped: number;
  bookings_failed: number;
  status: string;
  error_message?: string;
  last_booking_date?: string;
}

interface ProcessedBooking {
  id: string;
  tidycal_booking_id: number;
  contact_id?: string;
  processed_at: string;
  booking_starts_at: string;
  booking_ends_at: string;
  contact_email: string;
  contact_name: string;
  sync_status: string;
  error_message?: string;
}

export const useTidyCalPolling = () => {
  const [syncLogs, setSyncLogs] = useState<SyncLog[]>([]);
  const [processedBookings, setProcessedBookings] = useState<ProcessedBooking[]>([]);
  const [loading, setLoading] = useState(false);

  const triggerPolling = useCallback(async () => {
    setLoading(true);
    try {
      console.log('🔄 Triggering TidyCal polling...');

      const { data, error } = await supabase.functions.invoke('tidycal-polling');

      if (error) {
        console.error('Polling error:', error);
        throw error;
      }

      console.log('✅ Polling completed:', data);

      toast({
        title: "Sincronización completada",
        description: `Procesados: ${data.results.bookings_processed}, Omitidos: ${data.results.bookings_skipped}`,
      });

      // Refresh data
      await loadSyncLogs();
      await loadProcessedBookings();

      return data;
    } catch (error) {
      console.error('Error triggering polling:', error);
      toast({
        title: "Error en sincronización",
        description: "No se pudo completar la sincronización automática",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const loadSyncLogs = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('tidycal_sync_logs')
        .select('*')
        .order('sync_started_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      
      setSyncLogs(data || []);
      return data;
    } catch (error) {
      console.error('Error loading sync logs:', error);
      return [];
    }
  }, []);

  const loadProcessedBookings = useCallback(async (limit = 20) => {
    try {
      const { data, error } = await supabase
        .from('tidycal_processed_bookings')
        .select('*')
        .order('processed_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      
      setProcessedBookings(data || []);
      return data;
    } catch (error) {
      console.error('Error loading processed bookings:', error);
      return [];
    }
  }, []);

  const getLastSyncStatus = useCallback(() => {
    if (syncLogs.length === 0) return null;
    
    const lastSync = syncLogs[0];
    return {
      date: lastSync.sync_started_at,
      status: lastSync.status,
      processed: lastSync.bookings_processed,
      failed: lastSync.bookings_failed,
      error: lastSync.error_message
    };
  }, [syncLogs]);

  useEffect(() => {
    loadSyncLogs();
    loadProcessedBookings();
  }, [loadSyncLogs, loadProcessedBookings]);

  return {
    triggerPolling,
    loadSyncLogs,
    loadProcessedBookings,
    getLastSyncStatus,
    syncLogs,
    processedBookings,
    loading
  };
};
