
import { useCallback, useEffect, useState, useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import { useTidyCalAutoSync } from './useTidyCalAutoSync';

interface RealtimeMessage {
  type: string;
  status?: string;
  message?: string;
  data?: any;
  error?: string;
  timestamp?: string;
}

interface SyncStatus {
  connected: boolean;
  lastSync?: Date;
  isProcessing: boolean;
  connectionError?: string;
}

export const useTidyCalRealtime = () => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    connected: false,
    isProcessing: false
  });
  const [realtimeData, setRealtimeData] = useState<any[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const pingIntervalRef = useRef<NodeJS.Timeout>();
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 999; // Practically infinite reconnections
  const shouldStayConnected = useRef(true); // Always try to stay connected

  const { syncAllBookings } = useTidyCalAutoSync();

  const connect = useCallback(() => {
    if (!shouldStayConnected.current) return;

    // Clear any existing reconnection timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    // Close existing connection if any
    if (wsRef.current) {
      wsRef.current.close();
    }

    try {
      const wsUrl = `wss://gktrnjjbhqxkbcvonzxv.supabase.co/functions/v1/tidycal-realtime`;
      
      console.log('🔗 Connecting to TidyCal real-time sync (permanent connection)...', wsUrl);
      
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      const connectionTimeout = setTimeout(() => {
        if (ws.readyState === WebSocket.CONNECTING) {
          console.log('⏰ Connection timeout, retrying...');
          ws.close();
        }
      }, 10000);

      ws.onopen = () => {
        console.log('✅ TidyCal real-time permanently connected');
        clearTimeout(connectionTimeout);
        reconnectAttempts.current = 0;
        
        setSyncStatus(prev => ({ 
          ...prev, 
          connected: true,
          connectionError: undefined
        }));
        
        // Subscribe to sync updates
        ws.send(JSON.stringify({
          type: 'subscribe_sync_updates'
        }));

        // Start aggressive ping to maintain connection
        pingIntervalRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'ping' }));
          }
        }, 15000); // Ping every 15 seconds to keep connection alive

        toast({
          title: "Sincronización permanente activada",
          description: "TidyCal está conectado en tiempo real",
        });
      };

      ws.onmessage = (event) => {
        try {
          const message: RealtimeMessage = JSON.parse(event.data);
          console.log('📨 Real-time message:', message);

          switch (message.type) {
            case 'connection':
            case 'subscription':
              console.log('🔗 Connection established and subscribed');
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
              console.error('❌ Sync error:', message.error);
              setSyncStatus(prev => ({ ...prev, isProcessing: false }));
              break;

            case 'booking_update':
              setRealtimeData(prev => [message.data, ...prev.slice(0, 9)]);
              
              toast({
                title: "Nueva reserva sincronizada",
                description: `${message.data?.contact_name} - ${message.data?.booking_type?.title}`,
              });
              break;

            case 'pong':
              console.log('🏓 Connection alive');
              break;
          }
        } catch (error) {
          console.error('❌ Error parsing message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        clearTimeout(connectionTimeout);
        setSyncStatus(prev => ({ 
          ...prev, 
          connected: false,
          connectionError: 'Error de conexión'
        }));
      };

      ws.onclose = (event) => {
        console.log('🔌 Connection closed:', event.code, event.reason);
        clearTimeout(connectionTimeout);
        
        if (pingIntervalRef.current) {
          clearInterval(pingIntervalRef.current);
        }
        
        setSyncStatus(prev => ({ 
          ...prev, 
          connected: false
        }));
        
        // Always try to reconnect if we should stay connected
        if (shouldStayConnected.current) {
          const delay = Math.min(1000 * Math.pow(1.5, Math.min(reconnectAttempts.current, 10)), 30000);
          reconnectAttempts.current++;
          
          console.log(`🔄 Auto-reconnecting in ${delay}ms (attempt ${reconnectAttempts.current})`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, delay);
        }
      };

    } catch (error) {
      console.error('❌ Failed to connect:', error);
      setSyncStatus(prev => ({ 
        ...prev, 
        connected: false,
        connectionError: 'Error al inicializar'
      }));
      
      // Retry connection
      if (shouldStayConnected.current) {
        reconnectTimeoutRef.current = setTimeout(connect, 5000);
      }
    }
  }, []);

  const disconnect = useCallback(() => {
    shouldStayConnected.current = false;
    
    if (wsRef.current) {
      wsRef.current.close(1000, 'Manual disconnect');
      wsRef.current = null;
    }
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
    }
    
    setSyncStatus(prev => ({ 
      ...prev, 
      connected: false,
      connectionError: undefined
    }));
  }, []);

  const triggerManualSync = useCallback(async () => {
    try {
      setSyncStatus(prev => ({ ...prev, isProcessing: true }));
      
      // Usar la nueva sincronización automática
      await syncAllBookings();
      
      setSyncStatus(prev => ({ 
        ...prev, 
        isProcessing: false,
        lastSync: new Date()
      }));
      
      console.log('🔄 Manual sync completed');
    } catch (error) {
      console.error('❌ Manual sync failed:', error);
      setSyncStatus(prev => ({ ...prev, isProcessing: false }));
      
      // Force reconnection if not connected
      if (!syncStatus.connected) {
        connect();
        
        toast({
          title: "Reconectando...",
          description: "Reestableciendo conexión permanente",
        });
      }
    }
  }, [syncAllBookings, syncStatus.connected, connect]);

  // Auto-connect on mount and maintain connection
  useEffect(() => {
    shouldStayConnected.current = true;
    connect();
    
    return () => {
      shouldStayConnected.current = false;
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    syncStatus,
    realtimeData,
    connect,
    disconnect,
    triggerManualSync,
  };
};
