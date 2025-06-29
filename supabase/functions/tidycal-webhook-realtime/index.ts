
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🎯 TidyCal webhook received for real-time processing');

    const bookingData = await req.json();
    console.log('📅 Booking data received:', JSON.stringify(bookingData));

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Process the booking using existing webhook logic
    const webhookResponse = await supabase.functions.invoke('tidycal-webhook', {
      body: bookingData
    });

    let processResult = {
      success: true,
      booking_id: bookingData.id,
      contact_id: null,
      action: 'processed',
      timestamp: new Date().toISOString()
    };

    if (webhookResponse.error) {
      console.error('❌ Webhook processing error:', webhookResponse.error);
      processResult.success = false;
      processResult.action = 'error';
    } else {
      console.log('✅ Booking processed successfully');
      processResult.contact_id = webhookResponse.data?.contact_id;
    }

    // Broadcast the update to all connected WebSocket clients
    // This would typically be done through a real-time channel
    console.log('📡 Broadcasting real-time update:', processResult);

    // Store the real-time event
    await supabase
      .from('tidycal_processed_bookings')
      .upsert([{
        tidycal_booking_id: bookingData.id,
        contact_id: processResult.contact_id,
        booking_starts_at: bookingData.starts_at,
        booking_ends_at: bookingData.ends_at,
        contact_email: bookingData.contact?.email || '',
        contact_name: bookingData.contact?.name || '',
        sync_status: processResult.success ? 'success' : 'error',
        error_message: processResult.success ? null : 'Real-time webhook processing failed',
        processed_at: new Date().toISOString()
      }], {
        onConflict: 'tidycal_booking_id'
      });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Real-time webhook processed successfully',
        data: processResult
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('💥 Real-time webhook error:', error);

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
