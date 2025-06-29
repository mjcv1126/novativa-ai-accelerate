
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
    console.log('🔄 TidyCal polling started at:', new Date().toISOString());

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

    // Calculate time range - get all bookings from 7 days ago to 30 days in the future
    // This ensures we catch any recent changes or new bookings
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
    const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));

    // Get the last successful sync time to be more efficient
    const { data: lastSync } = await supabase
      .from('tidycal_sync_logs')
      .select('sync_completed_at, last_booking_date')
      .eq('status', 'completed')
      .order('sync_completed_at', { ascending: false })
      .limit(1)
      .single();

    let startTime = sevenDaysAgo;
    if (lastSync?.last_booking_date) {
      // Start from the last booking date minus 1 hour for safety
      const lastBookingTime = new Date(lastSync.last_booking_date);
      lastBookingTime.setHours(lastBookingTime.getHours() - 1);
      startTime = lastBookingTime;
      console.log('📅 Using incremental sync from:', startTime.toISOString());
    } else {
      console.log('📅 Full sync from:', startTime.toISOString());
    }

    // Fetch bookings from TidyCal
    const tidyCalHeaders = {
      'Authorization': `Bearer ${tidyCalToken}`,
      'Content-Type': 'application/json',
    };

    const queryParams = new URLSearchParams({
      starts_at: startTime.toISOString(),
      ends_at: thirtyDaysFromNow.toISOString(),
    });

    const tidyCalUrl = `https://tidycal.com/api/bookings?${queryParams.toString()}`;
    console.log('🔍 Fetching bookings from TidyCal:', tidyCalUrl);

    const response = await fetch(tidyCalUrl, { headers: tidyCalHeaders });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('TidyCal API error response:', errorText);
      throw new Error(`TidyCal API error: ${response.status} ${response.statusText} - ${errorText}`);
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
        console.log(`🔄 Processing booking ${booking.id} - ${booking.contact?.name} - ${booking.starts_at}`);

        // Check if booking already processed recently (within last hour to avoid reprocessing)
        const oneHourAgo = new Date(now.getTime() - (60 * 60 * 1000));
        const { data: existingBooking } = await supabase
          .from('tidycal_processed_bookings')
          .select('id, processed_at, sync_status')
          .eq('tidycal_booking_id', booking.id)
          .gte('processed_at', oneHourAgo.toISOString())
          .single();

        if (existingBooking) {
          console.log(`⏭️ Booking ${booking.id} already processed recently (${existingBooking.sync_status}), skipping`);
          bookingsSkipped++;
          continue;
        }

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

        // Record the processed booking (upsert to handle duplicates)
        await supabase
          .from('tidycal_processed_bookings')
          .upsert([{
            tidycal_booking_id: booking.id,
            contact_id: contactId,
            booking_starts_at: booking.starts_at,
            booking_ends_at: booking.ends_at,
            contact_email: booking.contact?.email || '',
            contact_name: booking.contact?.name || '',
            sync_status: syncStatus,
            error_message: errorMessage,
            processed_at: new Date().toISOString()
          }], {
            onConflict: 'tidycal_booking_id'
          });

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
            .upsert([{
              tidycal_booking_id: booking.id,
              contact_id: null,
              booking_starts_at: booking.starts_at,
              booking_ends_at: booking.ends_at,
              contact_email: booking.contact?.email || '',
              contact_name: booking.contact?.name || '',
              sync_status: 'error',
              error_message: error.message,
              processed_at: new Date().toISOString()
            }], {
              onConflict: 'tidycal_booking_id'
            });
        } catch (recordError) {
          console.error('Failed to record failed booking:', recordError);
        }
      }
    }

    // Update sync log with results
    const finalStatus = bookingsFailed > 0 ? 'partial_success' : 'completed';
    await supabase
      .from('tidycal_sync_logs')
      .update({
        sync_completed_at: new Date().toISOString(),
        bookings_found: bookings.length,
        bookings_processed: bookingsProcessed,
        bookings_skipped: bookingsSkipped,
        bookings_failed: bookingsFailed,
        status: finalStatus,
        last_booking_date: lastBookingDate
      })
      .eq('id', syncLog.id);

    console.log('🎉 TidyCal polling completed successfully');
    console.log(`📊 Results: Found: ${bookings.length}, Processed: ${bookingsProcessed}, Skipped: ${bookingsSkipped}, Failed: ${bookingsFailed}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'TidyCal polling completed',
        sync_type: lastSync?.last_booking_date ? 'incremental' : 'full',
        results: {
          bookings_found: bookings.length,
          bookings_processed: bookingsProcessed,
          bookings_skipped: bookingsSkipped,
          bookings_failed: bookingsFailed,
          last_booking_date: lastBookingDate,
          status: finalStatus
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
