
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

    // Calculate extended time range to catch all bookings
    const now = new Date();
    const sixtyDaysAgo = new Date(now.getTime() - (60 * 24 * 60 * 60 * 1000));
    const sixtyDaysFromNow = new Date(now.getTime() + (60 * 24 * 60 * 60 * 1000));

    // Fetch ALL bookings from TidyCal including cancelled ones
    const tidyCalHeaders = {
      'Authorization': `Bearer ${tidyCalToken}`,
      'Content-Type': 'application/json',
    };

    const queryParams = new URLSearchParams({
      starts_at: sixtyDaysAgo.toISOString(),
      ends_at: sixtyDaysFromNow.toISOString(),
      // Don't filter by status - get ALL bookings
    });

    const tidyCalUrl = `https://tidycal.com/api/bookings?${queryParams.toString()}`;
    console.log('🔍 Fetching ALL bookings from TidyCal (including cancelled):', tidyCalUrl);

    const response = await fetch(tidyCalUrl, { headers: tidyCalHeaders });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('TidyCal API error response:', errorText);
      throw new Error(`TidyCal API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const tidyCalData = await response.json();
    const bookings = tidyCalData.data || [];

    console.log(`📊 Found ${bookings.length} bookings from TidyCal (including cancelled)`);

    let bookingsProcessed = 0;
    let bookingsSkipped = 0;
    let bookingsFailed = 0;
    let lastBookingDate = null;

    const LLAMADA_PROGRAMADA_STAGE_ID = 'b9b4d1b9-461e-4fac-bebd-e3af2d527a97';
    const LLAMADA_CANCELADA_STAGE_ID = '7af3eb42-610b-4861-9429-85119b1d2693';

    // Helper function to find contact by multiple fields
    async function findContactByBooking(booking) {
      console.log(`🔍 Searching for contact - Email: ${booking.contact?.email}, Phone: ${booking.contact?.phone_number}, Name: ${booking.contact?.name}`);
      
      let contact = null;

      // 1. Search by email first
      if (booking.contact?.email) {
        const { data: contactsByEmail } = await supabase
          .from('contacts')
          .select('*')
          .or(`email.eq.${booking.contact.email},additional_emails.cs.{"${booking.contact.email}"}`);
        
        if (contactsByEmail && contactsByEmail.length > 0) {
          contact = contactsByEmail[0];
          console.log('✅ Found contact by email:', contact.id);
          return contact;
        }
      }

      // 2. Search by phone
      if (booking.contact?.phone_number) {
        const cleanPhone = booking.contact.phone_number.replace(/\D/g, '');
        const { data: contactsByPhone } = await supabase
          .from('contacts')
          .select('*')
          .or(`phone.ilike.%${cleanPhone}%,additional_phones.cs.{"${booking.contact.phone_number}"}`);
        
        if (contactsByPhone && contactsByPhone.length > 0) {
          contact = contactsByPhone[0];
          console.log('✅ Found contact by phone:', contact.id);
          return contact;
        }
      }

      // 3. Search by booking ID in activities
      const { data: activitiesWithBooking } = await supabase
        .from('contact_activities')
        .select('contact_id, contacts(*)')
        .eq('tidycal_booking_id', booking.id);
      
      if (activitiesWithBooking && activitiesWithBooking.length > 0) {
        contact = activitiesWithBooking[0].contacts;
        console.log('✅ Found contact by booking ID in activities:', contact?.id);
        return contact;
      }

      // 4. Search by name as last resort
      if (booking.contact?.name) {
        const nameParts = booking.contact.name.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');
        
        if (firstName) {
          const { data: contactsByName } = await supabase
            .from('contacts')
            .select('*')
            .or(`first_name.ilike.%${firstName}%,last_name.ilike.%${firstName}%${lastName ? `,first_name.ilike.%${lastName}%,last_name.ilike.%${lastName}%` : ''}`);
          
          if (contactsByName && contactsByName.length > 0) {
            contact = contactsByName[0];
            console.log('✅ Found contact by name:', contact.id);
            return contact;
          }
        }
      }

      console.log('❌ No contact found for booking:', booking.id);
      return null;
    }

    // Process each booking
    for (const booking of bookings) {
      try {
        console.log(`🔄 Processing booking ${booking.id} - ${booking.contact?.name} - ${booking.starts_at} - Cancelled: ${!!booking.cancelled_at}`);

        let contactId = null;
        let syncStatus = 'success';
        let errorMessage = null;

        // Handle cancelled bookings (priority flow)
        if (booking.cancelled_at) {
          console.log('❌ Processing CANCELLED booking:', booking.id);

          const contact = await findContactByBooking(booking);

          if (contact) {
            console.log('👤 Found contact for cancelled booking:', contact.id, contact.email, contact.first_name, contact.last_name);
            contactId = contact.id;

            // 1. Cancel ALL activities linked to this booking ID
            console.log('📅 Cancelling activities for booking:', booking.id);
            const { data: existingActivities } = await supabase
              .from('contact_activities')
              .select('*')
              .eq('tidycal_booking_id', booking.id);

            if (existingActivities && existingActivities.length > 0) {
              for (const activity of existingActivities) {
                await supabase
                  .from('contact_activities')
                  .update({
                    status: 'cancelled',
                    is_completed: false,
                  })
                  .eq('id', activity.id);
                
                console.log('✅ Activity cancelled:', activity.id);
              }
            }

            // 2. Move contact to "Llamada cancelada" stage
            console.log(`🔄 Moving contact to cancelled stage: ${LLAMADA_CANCELADA_STAGE_ID}`);
            
            await supabase
              .from('contacts')
              .update({ 
                stage_id: LLAMADA_CANCELADA_STAGE_ID,
                last_contact_date: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })
              .eq('id', contact.id);

            console.log('✅ Contact moved to cancelled stage');

            // 3. Create cancellation note (without due date)
            console.log('📝 Creating cancellation note');
            await supabase
              .from('contact_activities')
              .insert([{
                contact_id: contact.id,
                activity_type: 'note',
                title: 'Cliente canceló llamada vía TidyCal',
                description: `Booking ID: ${booking.id}\nFecha original: ${new Date(booking.starts_at).toLocaleString()}\nCancelado el: ${new Date(booking.cancelled_at).toLocaleString()}`,
                status: 'completed',
                is_completed: true,
                completed_at: new Date().toISOString()
              }]);

            console.log('✅ Cancellation note created');
          } else {
            console.log('⚠️ Contact not found for cancelled booking:', booking.id);
            syncStatus = 'warning';
            errorMessage = 'Contact not found for cancelled booking';
          }

          bookingsProcessed++;
        } else {
          // Handle active bookings
          console.log('📅 Processing active booking:', booking.id);

          // Check if activity already exists to prevent duplicates
          const { data: existingActivity } = await supabase
            .from('contact_activities')
            .select('*')
            .eq('tidycal_booking_id', booking.id)
            .single();

          if (existingActivity) {
            console.log('⏭️ Activity already exists for booking:', booking.id, '- skipping');
            bookingsSkipped++;
          } else {
            // Find or create contact
            let contact = await findContactByBooking(booking);

            if (!contact) {
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

              contact = newContact;
            }

            contactId = contact.id;
            
            // Move existing contact to "Llamada programada" stage
            await supabase
              .from('contacts')
              .update({ 
                stage_id: LLAMADA_PROGRAMADA_STAGE_ID,
                last_contact_date: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })
              .eq('id', contactId);

            // Create activity for active booking
            console.log('📅 Creating activity for active booking:', booking.id);
            
            await supabase
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

            console.log('✅ Activity created for active booking');
            bookingsProcessed++;
          }
        }

        // Record the processed booking
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

        // Record the failed booking
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

    // Try to update sync log with error
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
