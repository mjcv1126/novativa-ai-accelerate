
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

    const LLAMADA_PROGRAMADA_STAGE_ID = 'b9b4d1b9-461e-4fac-bebd-e3af2d527a97';
    const LLAMADA_CANCELADA_STAGE_ID = '7af3eb42-610b-4861-9429-85119b1d2693';

    // Process each booking using the same logic as webhook
    for (const booking of bookings) {
      try {
        console.log(`🔄 Processing booking ${booking.id} - ${booking.contact?.name} - ${booking.starts_at} - Cancelled: ${!!booking.cancelled_at}`);

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

        let contactId = null;
        let syncStatus = 'success';
        let errorMessage = null;

        try {
          // Handle cancelled bookings
          if (booking.cancelled_at) {
            console.log('❌ Processing cancelled booking:', booking.id);

            // Find the contact by email
            const { data: contact } = await supabase
              .from('contacts')
              .select('*')
              .eq('email', booking.contact?.email)
              .single();

            if (contact) {
              console.log('👤 Found contact for cancelled booking:', contact.id);
              contactId = contact.id;

              // Find and cancel the existing activity
              const { data: existingActivity } = await supabase
                .from('contact_activities')
                .select('*')
                .eq('tidycal_booking_id', booking.id)
                .single();

              if (existingActivity) {
                console.log('📅 Cancelling existing activity:', existingActivity.id);
                
                // Cancel the activity
                await supabase
                  .from('contact_activities')
                  .update({
                    status: 'cancelled',
                    is_completed: false,
                    description: `${existingActivity.description}\n\n❌ CANCELADA: Cliente canceló la llamada desde TidyCal el ${new Date().toLocaleString()}`
                  })
                  .eq('id', existingActivity.id);
              }

              // Move contact to "Llamada cancelada" stage
              await supabase
                .from('contacts')
                .update({ 
                  stage_id: LLAMADA_CANCELADA_STAGE_ID,
                  last_contact_date: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                })
                .eq('id', contact.id);

              // Create a follow-up activity
              await supabase
                .from('contact_activities')
                .insert([{
                  contact_id: contact.id,
                  activity_type: 'note',
                  title: 'Llamada cancelada por el cliente',
                  description: `El cliente ${booking.contact?.name} canceló su llamada programada desde TidyCal.\n\nBooking ID: ${booking.id}\nFecha original: ${booking.starts_at}\nCancelada el: ${new Date().toISOString()}\n\nContacto movido automáticamente a etapa "Llamada cancelada".`,
                  status: 'completed',
                  is_completed: true,
                  completed_at: new Date().toISOString()
                }]);

              console.log('✅ Successfully processed booking cancellation');
            } else {
              console.log('⚠️ Contact not found for cancelled booking');
            }
          } else {
            // Handle active bookings (same logic as webhook for booking.created)
            console.log('📅 Processing active booking:', booking.id);

            // Check if contact already exists
            const { data: existingContact } = await supabase
              .from('contacts')
              .select('*')
              .eq('email', booking.contact?.email)
              .single();

            if (!existingContact) {
              console.log('👤 Creating new contact for booking:', booking.id);
              
              const nameParts = booking.contact?.name?.split(' ') || ['', ''];
              const firstName = nameParts[0] || '';
              const lastName = nameParts.slice(1).join(' ') || '';

              const { data: newContact, error: contactError } = await supabase
                .from('contacts')
                .insert([{
                  first_name: firstName,
                  last_name: lastName,
                  email: booking.contact?.email || '',
                  phone: booking.contact?.phone_number || '',
                  country_code: '',
                  country_name: '',
                  stage_id: LLAMADA_PROGRAMADA_STAGE_ID,
                  notes: `Contacto creado automáticamente desde TidyCal booking #${booking.id}`,
                  last_contact_date: new Date().toISOString()
                }])
                .select()
                .single();

              if (contactError) {
                console.error('❌ Error creating contact:', contactError);
                throw contactError;
              }

              contactId = newContact.id;
            } else {
              contactId = existingContact.id;
              console.log('✅ Using existing contact:', contactId);
              
              // Move contact to "Llamada programada" stage
              await supabase
                .from('contacts')
                .update({ 
                  stage_id: LLAMADA_PROGRAMADA_STAGE_ID,
                  last_contact_date: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                })
                .eq('id', contactId);
            }

            // Create activity if it doesn't exist
            const { data: existingActivity } = await supabase
              .from('contact_activities')
              .select('*')
              .eq('tidycal_booking_id', booking.id)
              .single();

            if (!existingActivity) {
              console.log('📅 Creating activity for booking:', booking.id);
              
              const { error: activityError } = await supabase
                .from('contact_activities')
                .insert([{
                  contact_id: contactId,
                  activity_type: 'call',
                  title: `${booking.booking_type?.name || 'Llamada'} desde TidyCal`,
                  description: `Booking ID: ${booking.id}\nContacto: ${booking.contact?.name}\nEmail: ${booking.contact?.email}`,
                  tidycal_booking_id: booking.id,
                  tidycal_booking_reference: `${booking.id}`,
                  is_completed: false,
                  status: 'pending',
                  due_date: booking.starts_at
                }]);

              if (activityError) {
                console.error('❌ Error creating activity:', activityError);
                throw activityError;
              }
            }
          }

          console.log('✅ Successfully processed booking:', booking.id);
          bookingsProcessed++;
        } catch (error) {
          console.error(`❌ Failed to process booking ${booking.id}:`, error);
          syncStatus = 'error';
          errorMessage = error.message;
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
