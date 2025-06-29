
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const { headers } = req;
  const upgradeHeader = headers.get("upgrade") || "";

  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket connection", { status: 400 });
  }

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
      message: 'TidyCal real-time sync connected'
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
            message: 'Subscribed to TidyCal sync updates'
          }));
          break;

        case 'trigger_manual_sync':
          // Client requests manual sync
          console.log('🔄 Manual sync triggered via WebSocket');
          
          // Trigger the polling function
          const pollResult = await supabase.functions.invoke('tidycal-polling');
          
          if (pollResult.error) {
            socket.send(JSON.stringify({
              type: 'sync_error',
              error: pollResult.error.message
            }));
          } else {
            socket.send(JSON.stringify({
              type: 'sync_completed',
              data: pollResult.data
            }));
          }
          break;

        case 'get_sync_status':
          // Get latest sync status
          const { data: lastSync } = await supabase
            .from('tidycal_sync_logs')
            .select('*')
            .order('sync_started_at', { ascending: false })
            .limit(1)
            .single();
          
          socket.send(JSON.stringify({
            type: 'sync_status',
            data: lastSync
          }));
          break;
      }
    } catch (error) {
      console.error('❌ WebSocket message error:', error);
      socket.send(JSON.stringify({
        type: 'error',
        message: 'Invalid message format'
      }));
    }
  };

  socket.onerror = (error) => {
    console.error('❌ WebSocket error:', error);
  };

  socket.onclose = () => {
    console.log('🔌 WebSocket connection closed');
  };

  return response;
});
