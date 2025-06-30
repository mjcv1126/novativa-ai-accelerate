
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check if this is a WebSocket upgrade request
    const upgradeHeader = req.headers.get("upgrade");
    if (upgradeHeader !== "websocket") {
      return new Response("Expected WebSocket connection", { 
        status: 400,
        headers: corsHeaders 
      });
    }

    // Upgrade to WebSocket
    const { socket, response } = Deno.upgradeWebSocket(req);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    socket.onopen = () => {
      console.log('🔗 WebSocket connection established for TidyCal real-time sync');
      
      // Send connection confirmation
      socket.send(JSON.stringify({
        type: 'connection',
        status: 'connected',
        message: 'TidyCal real-time sync connected',
        timestamp: new Date().toISOString()
      }));
    };

    socket.onmessage = async (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('📨 Received WebSocket message:', message);

        switch (message.type) {
          case 'subscribe_sync_updates':
            // Client wants to subscribe to sync updates
            socket.send(JSON.stringify({
              type: 'subscription',
              status: 'subscribed',
              message: 'Subscribed to TidyCal sync updates',
              timestamp: new Date().toISOString()
            }));
            break;

          case 'trigger_manual_sync':
            // Client requests manual sync
            console.log('🔄 Manual sync triggered via WebSocket');
            
            try {
              // Trigger the polling function
              const pollResult = await supabase.functions.invoke('tidycal-polling');
              
              if (pollResult.error) {
                console.error('❌ Polling error:', pollResult.error);
                socket.send(JSON.stringify({
                  type: 'sync_error',
                  error: pollResult.error.message,
                  timestamp: new Date().toISOString()
                }));
              } else {
                console.log('✅ Sync completed successfully');
                socket.send(JSON.stringify({
                  type: 'sync_completed',
                  data: pollResult.data,
                  timestamp: new Date().toISOString()
                }));
              }
            } catch (error) {
              console.error('❌ Error invoking polling function:', error);
              socket.send(JSON.stringify({
                type: 'sync_error',
                error: error.message,
                timestamp: new Date().toISOString()
              }));
            }
            break;

          case 'get_sync_status':
            // Get latest sync status
            try {
              const { data: lastSync, error } = await supabase
                .from('tidycal_sync_logs')
                .select('*')
                .order('sync_started_at', { ascending: false })
                .limit(1)
                .maybeSingle();
              
              if (error) {
                console.error('❌ Error getting sync status:', error);
                socket.send(JSON.stringify({
                  type: 'sync_status_error',
                  error: error.message,
                  timestamp: new Date().toISOString()
                }));
              } else {
                socket.send(JSON.stringify({
                  type: 'sync_status',
                  data: lastSync,
                  timestamp: new Date().toISOString()
                }));
              }
            } catch (error) {
              console.error('❌ Error querying sync status:', error);
              socket.send(JSON.stringify({
                type: 'sync_status_error',
                error: error.message,
                timestamp: new Date().toISOString()
              }));
            }
            break;

          case 'ping':
            // Respond to ping with pong
            socket.send(JSON.stringify({
              type: 'pong',
              timestamp: new Date().toISOString()
            }));
            break;

          default:
            console.log('❓ Unknown message type:', message.type);
            socket.send(JSON.stringify({
              type: 'error',
              message: 'Unknown message type',
              timestamp: new Date().toISOString()
            }));
        }
      } catch (error) {
        console.error('❌ WebSocket message error:', error);
        socket.send(JSON.stringify({
          type: 'error',
          message: 'Invalid message format',
          timestamp: new Date().toISOString()
        }));
      }
    };

    socket.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
    };

    socket.onclose = (event) => {
      console.log('🔌 WebSocket connection closed:', event.code, event.reason);
    };

    return response;
  } catch (error) {
    console.error('💥 Error setting up WebSocket:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'WebSocket setup failed',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
