
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
  const [authError, setAuthError] = useState(false);

  const triggerPolling = useCallback(async () => {
    setLoading(true);
    setAuthError(false);
    try {
      console.log('🔄 Triggering TidyCal polling function...');

      // Call the tidycal-polling function instead of tidycal-api
      const { data, error } = await supabase.functions.invoke('tidycal-polling');

      if (error) {
        console.error('❌ Polling error:', error);
        throw error;
      }

      console.log('✅ Polling completed successfully:', data);

      // Show detailed results in toast
      const results = data.results;
      let toastMessage = `Procesados: ${results.bookings_processed}`;
      if (results.cancelled_bookings_found > 0) {
        toastMessage += `, Cancelados: ${results.cancelled_bookings_found}`;
      }
      if (results.bookings_skipped > 0) {
        toastMessage += `, Omitidos: ${results.bookings_skipped}`;
      }
      if (results.bookings_failed > 0) {
        toastMessage += `, Errores: ${results.bookings_failed}`;
      }

      toast({
        title: "Sincronización completada",
        description: toastMessage,
      });

      // Refresh data
      await loadSyncLogs();
      await loadProcessedBookings();

      return data;
    } catch (error) {
      console.error('❌ Error triggering polling:', error);
      toast({
        title: "Error en sincronización",
        description: `Error: ${error.message}`,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const loadSyncLogs = useCallback(async () => {
    try {
      setAuthError(false);
      
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log('User not authenticated, skipping sync logs fetch');
        setAuthError(true);
        return [];
      }

      const { data, error } = await supabase
        .from('tidycal_sync_logs')
        .select('*')
        .order('sync_started_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error loading sync logs:', error);
        if (error.message.includes('RLS') || error.message.includes('policy')) {
          setAuthError(true);
        }
        return [];
      }
      
      setSyncLogs(data || []);
      return data;
    } catch (error) {
      console.error('Error loading sync logs:', error);
      setAuthError(true);
      return [];
    }
  }, []);

  const loadProcessedBookings = useCallback(async (limit = 20) => {
    try {
      setAuthError(false);
      
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log('User not authenticated, skipping processed bookings fetch');
        setAuthError(true);
        return [];
      }

      const { data, error } = await supabase
        .from('tidycal_processed_bookings')
        .select('*')
        .order('processed_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error loading processed bookings:', error);
        if (error.message.includes('RLS') || error.message.includes('policy')) {
          setAuthError(true);
        }
        return [];
      }
      
      setProcessedBookings(data || []);
      return data;
    } catch (error) {
      console.error('Error loading processed bookings:', error);
      setAuthError(true);
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
    // Only load data if user is authenticated
    const checkAuthAndLoadData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        loadSyncLogs();
        loadProcessedBookings();
      } else {
        setAuthError(true);
      }
    };

    checkAuthAndLoadData();
  }, [loadSyncLogs, loadProcessedBookings]);

  return {
    triggerPolling,
    loadSyncLogs,
    loadProcessedBookings,
    getLastSyncStatus,
    syncLogs,
    processedBookings,
    loading,
    authError
  };
};
