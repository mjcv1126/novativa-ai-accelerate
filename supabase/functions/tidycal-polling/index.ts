
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔄 TidyCal polling started');

    const tidyCalToken = Deno.env.get('Tidycal_Token');
    if (!tidyCalToken) {
      throw new Error('TidyCal token not configured');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create sync log entry
    const { data: syncLog, error: syncLogError } = await supabase
      .from('tidycal_sync_logs')
      .insert([{
        sync_started_at: new Date().toISOString(),
        status: 'running'
      }])
      .select()
      .single();

    if (syncLogError) {
      console.error('Error creating sync log:', syncLogError);
      throw syncLogError;
    }

    console.log('📝 Sync log created:', syncLog.id);

    // Calculate time range (last 2 hours to avoid missing bookings)
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - (2 * 60 * 60 * 1000));

    // Fetch bookings from TidyCal
    const tidyCalHeaders = {
      'Authorization': `Bearer ${tidyCalToken}`,
      'Content-Type': 'application/json',
    };

    const queryParams = new URLSearchParams({
      starts_at: twoHoursAgo.toISOString(),
      ends_at: new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)).toISOString(), // Next 30 days
    });

    const tidyCalUrl = `https://tidycal.com/api/bookings?${queryParams.toString()}`;
    console.log('🔍 Fetching bookings from TidyCal:', tidyCalUrl);

    const response = await fetch(tidyCalUrl, { headers: tidyCalHeaders });

    if (!response.ok) {
      throw new Error(`TidyCal API error: ${response.status} ${response.statusText}`);
    }

    const tidyCalData = await response.json();
    const bookings = tidyCalData.data || [];

    console.log(`📊 Found ${bookings.length} bookings from TidyCal`);

    let bookingsProcessed = 0;
    let bookingsSkipped = 0;
    let bookingsFailed = 0;
    let lastBookingDate = null;

    // Process each booking
    for (const booking of bookings) {
      try {
        // Check if booking already processed
        const { data: existingBooking } = await supabase
          .from('tidycal_processed_bookings')
          .select('id')
          .eq('tidycal_booking_id', booking.id)
          .single();

        if (existingBooking) {
          console.log(`⏭️ Booking ${booking.id} already processed, skipping`);
          bookingsSkipped++;
          continue;
        }

        console.log(`🔄 Processing booking ${booking.id}`);

        // Process the booking using existing webhook logic
        const webhookResponse = await fetch(`${supabaseUrl}/functions/v1/tidycal-webhook`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseServiceKey}`,
          },
          body: JSON.stringify(booking)
        });

        let contactId = null;
        let syncStatus = 'success';
        let errorMessage = null;

        if (webhookResponse.ok) {
          const webhookResult = await webhookResponse.json();
          contactId = webhookResult.contact_id;
          console.log(`✅ Booking ${booking.id} processed successfully, contact: ${contactId}`);
          bookingsProcessed++;
        } else {
          const errorText = await webhookResponse.text();
          console.error(`❌ Failed to process booking ${booking.id}:`, errorText);
          syncStatus = 'error';
          errorMessage = errorText;
          bookingsFailed++;
        }

        // Record the processed booking
        await supabase
          .from('tidycal_processed_bookings')
          .insert([{
            tidycal_booking_id: booking.id,
            contact_id: contactId,
            booking_starts_at: booking.starts_at,
            booking_ends_at: booking.ends_at,
            contact_email: booking.contact.email,
            contact_name: booking.contact.name,
            sync_status: syncStatus,
            error_message: errorMessage
          }]);

        // Update last booking date
        if (!lastBookingDate || new Date(booking.starts_at) > new Date(lastBookingDate)) {
          lastBookingDate = booking.starts_at;
        }

      } catch (error) {
        console.error(`💥 Error processing booking ${booking.id}:`, error);
        bookingsFailed++;

        // Still record the failed booking
        try {
          await supabase
            .from('tidycal_processed_bookings')
            .insert([{
              tidycal_booking_id: booking.id,
              contact_id: null,
              booking_starts_at: booking.starts_at,
              booking_ends_at: booking.ends_at,
              contact_email: booking.contact.email,
              contact_name: booking.contact.name,
              sync_status: 'error',
              error_message: error.message
            }]);
        } catch (recordError) {
          console.error('Failed to record failed booking:', recordError);
        }
      }
    }

    // Update sync log with results
    await supabase
      .from('tidycal_sync_logs')
      .update({
        sync_completed_at: new Date().toISOString(),
        bookings_found: bookings.length,
        bookings_processed: bookingsProcessed,
        bookings_skipped: bookingsSkipped,
        bookings_failed: bookingsFailed,
        status: bookingsFailed > 0 ? 'partial_success' : 'completed',
        last_booking_date: lastBookingDate
      })
      .eq('id', syncLog.id);

    console.log('🎉 TidyCal polling completed successfully');
    console.log(`📊 Results: Found: ${bookings.length}, Processed: ${bookingsProcessed}, Skipped: ${bookingsSkipped}, Failed: ${bookingsFailed}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'TidyCal polling completed',
        results: {
          bookings_found: bookings.length,
          bookings_processed: bookingsProcessed,
          bookings_skipped: bookingsSkipped,
          bookings_failed: bookingsFailed,
          last_booking_date: lastBookingDate
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('💥 TidyCal polling error:', error);

    // Try to update sync log with error if we have one
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      
      const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      await supabase
        .from('tidycal_sync_logs')
        .update({
          sync_completed_at: new Date().toISOString(),
          status: 'failed',
          error_message: error.message
        })
        .eq('status', 'running')
        .order('sync_started_at', { ascending: false })
        .limit(1);
    } catch (logError) {
      console.error('Failed to update sync log with error:', logError);
    }

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
