import { useCallback, useEffect, useState, useRef } from 'react';
import { toast } from '@/components/ui/use-toast';

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
  const maxReconnectAttempts = 5;

  const connect = useCallback(() => {
    // Clear any existing reconnection timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    // Close existing connection if any
    if (wsRef.current) {
      wsRef.current.close();
    }

    try {
      // Use the correct WebSocket URL for the Supabase edge function
      const wsUrl = `wss://gktrnjjbhqxkbcvonzxv.supabase.co/functions/v1/tidycal-realtime`;
      
      console.log('🔗 Connecting to TidyCal real-time sync...', wsUrl);
      
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      // Set connection timeout
      const connectionTimeout = setTimeout(() => {
        if (ws.readyState === WebSocket.CONNECTING) {
          console.log('⏰ Connection timeout, closing...');
          ws.close();
        }
      }, 10000); // 10 seconds timeout

      ws.onopen = () => {
        console.log('✅ Connected to TidyCal real-time sync');
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

        // Start ping interval to keep connection alive
        pingIntervalRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'ping' }));
          }
        }, 30000); // Ping every 30 seconds

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

            case 'pong':
              // Connection is alive
              console.log('🏓 Pong received');
              break;

            case 'error':
              console.error('❌ WebSocket error:', message.message);
              break;

            default:
              console.log('❓ Unknown message type:', message.type);
          }
        } catch (error) {
          console.error('❌ Error parsing real-time message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('❌ WebSocket connection error:', error);
        clearTimeout(connectionTimeout);
        setSyncStatus(prev => ({ 
          ...prev, 
          connected: false,
          connectionError: 'Error de conexión WebSocket'
        }));
      };

      ws.onclose = (event) => {
        console.log('🔌 WebSocket connection closed:', event.code, event.reason);
        clearTimeout(connectionTimeout);
        
        if (pingIntervalRef.current) {
          clearInterval(pingIntervalRef.current);
        }
        
        setSyncStatus(prev => ({ 
          ...prev, 
          connected: false,
          connectionError: event.code !== 1000 ? `Conexión cerrada: ${event.code}` : undefined
        }));
        
        // Auto-reconnect with exponential backoff
        if (reconnectAttempts.current < maxReconnectAttempts) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
          reconnectAttempts.current++;
          
          console.log(`🔄 Attempting to reconnect in ${delay}ms (attempt ${reconnectAttempts.current}/${maxReconnectAttempts})`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, delay);
        } else {
          console.log('❌ Max reconnection attempts reached');
          setSyncStatus(prev => ({ 
            ...prev, 
            connectionError: 'Máximo de intentos de reconexión alcanzado'
          }));
        }
      };

    } catch (error) {
      console.error('❌ Failed to connect to real-time sync:', error);
      setSyncStatus(prev => ({ 
        ...prev, 
        connected: false,
        connectionError: 'Error al inicializar la conexión'
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
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
    
    reconnectAttempts.current = 0;
    setSyncStatus(prev => ({ 
      ...prev, 
      connected: false,
      connectionError: undefined
    }));
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
