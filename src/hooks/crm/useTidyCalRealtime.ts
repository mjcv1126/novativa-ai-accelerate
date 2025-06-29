
import { useCallback, useEffect, useState, useRef } from 'react';
import { toast } from '@/components/ui/use-toast';

interface RealtimeMessage {
  type: string;
  status?: string;
  message?: string;
  data?: any;
  error?: string;
}

interface SyncStatus {
  connected: boolean;
  lastSync?: Date;
  isProcessing: boolean;
}

export const useTidyCalRealtime = () => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    connected: false,
    isProcessing: false
  });
  const [realtimeData, setRealtimeData] = useState<any[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const connect = useCallback(() => {
    try {
      // Use the correct WebSocket URL for the Supabase edge function
      const wsUrl = `wss://gktrnjjbhqxkbcvonzxv.supabase.co/functions/v1/tidycal-realtime`;
      
      console.log('🔗 Connecting to TidyCal real-time sync...');
      
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('✅ Connected to TidyCal real-time sync');
        setSyncStatus(prev => ({ ...prev, connected: true }));
        
        // Subscribe to sync updates
        ws.send(JSON.stringify({
          type: 'subscribe_sync_updates'
        }));

        toast({
          title: "Conexión establecida",
          description: "Sincronización en tiempo real activada",
        });
      };

      ws.onmessage = (event) => {
        try {
          const message: RealtimeMessage = JSON.parse(event.data);
          console.log('📨 Real-time message received:', message);

          switch (message.type) {
            case 'connection':
              console.log('🔗 Connection confirmed');
              break;

            case 'subscription':
              console.log('📡 Subscribed to updates');
              break;

            case 'sync_completed':
              console.log('✅ Sync completed via real-time');
              setSyncStatus(prev => ({ 
                ...prev, 
                lastSync: new Date(),
                isProcessing: false 
              }));
              
              toast({
                title: "Sincronización completada",
                description: `Procesados: ${message.data?.results?.bookings_processed || 0}`,
              });
              break;

            case 'sync_error':
              console.error('❌ Sync error via real-time:', message.error);
              setSyncStatus(prev => ({ ...prev, isProcessing: false }));
              
              toast({
                title: "Error de sincronización",
                description: message.error || "Error desconocido",
                variant: "destructive",
              });
              break;

            case 'sync_status':
              if (message.data) {
                setSyncStatus(prev => ({
                  ...prev,
                  lastSync: message.data.sync_completed_at ? new Date(message.data.sync_completed_at) : undefined
                }));
              }
              break;

            case 'booking_update':
              // Handle real-time booking updates
              setRealtimeData(prev => [message.data, ...prev.slice(0, 9)]);
              
              toast({
                title: "Nueva reserva",
                description: `${message.data?.contact_name} - ${message.data?.booking_type?.title}`,
              });
              break;

            case 'error':
              console.error('❌ WebSocket error:', message.message);
              break;
          }
        } catch (error) {
          console.error('❌ Error parsing real-time message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('❌ WebSocket connection error:', error);
        setSyncStatus(prev => ({ ...prev, connected: false }));
      };

      ws.onclose = () => {
        console.log('🔌 WebSocket connection closed');
        setSyncStatus(prev => ({ ...prev, connected: false }));
        
        // Auto-reconnect after 5 seconds
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('🔄 Attempting to reconnect...');
          connect();
        }, 5000);
      };

    } catch (error) {
      console.error('❌ Failed to connect to real-time sync:', error);
      setSyncStatus(prev => ({ ...prev, connected: false }));
    }
  }, []);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    setSyncStatus(prev => ({ ...prev, connected: false }));
  }, []);

  const triggerManualSync = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      setSyncStatus(prev => ({ ...prev, isProcessing: true }));
      
      wsRef.current.send(JSON.stringify({
        type: 'trigger_manual_sync'
      }));
      
      console.log('🔄 Manual sync triggered via WebSocket');
    } else {
      toast({
        title: "Error de conexión",
        description: "No hay conexión en tiempo real activa",
        variant: "destructive",
      });
    }
  }, []);

  const getSyncStatus = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'get_sync_status'
      }));
    }
  }, []);

  useEffect(() => {
    connect();
    
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    syncStatus,
    realtimeData,
    connect,
    disconnect,
    triggerManualSync,
    getSyncStatus,
  };
};
