
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
      console.error('❌ Error creating sync log:', syncLogError);
      throw syncLogError;
    }

    console.log('📝 Sync log created with ID:', syncLog.id);

    // Calculate extended time range to catch all bookings
    const now = new Date();
    const sixtyDaysAgo = new Date(now.getTime() - (60 * 24 * 60 * 60 * 1000));
    const sixtyDaysFromNow = new Date(now.getTime() + (60 * 24 * 60 * 60 * 1000));

    // Fetch ALL bookings from TidyCal (including cancelled ones)
    const tidyCalHeaders = {
      'Authorization': `Bearer ${tidyCalToken}`,
      'Content-Type': 'application/json',
    };

    const queryParams = new URLSearchParams({
      starts_at: sixtyDaysAgo.toISOString(),
      ends_at: sixtyDaysFromNow.toISOString(),
    });

    const tidyCalUrl = `https://tidycal.com/api/bookings?${queryParams.toString()}`;
    console.log('🔍 Fetching ALL bookings from TidyCal:', tidyCalUrl);

    const response = await fetch(tidyCalUrl, { headers: tidyCalHeaders });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ TidyCal API error response:', errorText);
      throw new Error(`TidyCal API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const tidyCalData = await response.json();
    const bookings = tidyCalData.data || [];

    console.log(`📊 Found ${bookings.length} total bookings from TidyCal`);
    
    // Log specific booking we're tracking
    const targetBooking = bookings.find(b => b.id.toString() === '5097933');
    if (targetBooking) {
      console.log('🎯 Found target booking 5097933:', {
        id: targetBooking.id,
        cancelled_at: targetBooking.cancelled_at,
        status: targetBooking.status,
        contact_name: targetBooking.contact?.name,
        contact_email: targetBooking.contact?.email,
        contact_phone: targetBooking.contact?.phone_number
      });
    } else {
      console.log('⚠️ Target booking 5097933 not found in results');
    }

    let bookingsProcessed = 0;
    let bookingsSkipped = 0;
    let bookingsFailed = 0;
    let cancelledBookingsFound = 0;
    let lastBookingDate = null;

    const LLAMADA_PROGRAMADA_STAGE_ID = 'b9b4d1b9-461e-4fac-bebd-e3af2d527a97';
    const LLAMADA_CANCELADA_STAGE_ID = '7af3eb42-610b-4861-9429-85119b1d2693';

    // Enhanced contact finding function with detailed logging
    async function findContactByBooking(booking) {
      console.log(`🔍 Searching for contact for booking ${booking.id}:`);
      console.log(`   - Name: ${booking.contact?.name}`);
      console.log(`   - Email: ${booking.contact?.email}`);
      console.log(`   - Phone: ${booking.contact?.phone_number}`);
      
      let contact = null;

      // 1. Search by email in primary and additional emails
      if (booking.contact?.email) {
        console.log(`   🔎 Searching by email: ${booking.contact.email}`);
        const { data: contactsByEmail } = await supabase
          .from('contacts')
          .select('*')
          .or(`email.eq.${booking.contact.email},additional_emails.cs.{"${booking.contact.email}"}`);
        
        if (contactsByEmail && contactsByEmail.length > 0) {
          contact = contactsByEmail[0];
          console.log(`   ✅ Found contact by email: ${contact.id} - ${contact.first_name} ${contact.last_name}`);
          return contact;
        }
        console.log(`   ❌ No contact found by email: ${booking.contact.email}`);
      }

      // 2. Search by phone in primary and additional phones
      if (booking.contact?.phone_number) {
        console.log(`   🔎 Searching by phone: ${booking.contact.phone_number}`);
        const cleanPhone = booking.contact.phone_number.replace(/\D/g, '');
        const { data: contactsByPhone } = await supabase
          .from('contacts')
          .select('*')
          .or(`phone.ilike.%${cleanPhone}%,additional_phones.cs.{"${booking.contact.phone_number}"}`);
        
        if (contactsByPhone && contactsByPhone.length > 0) {
          contact = contactsByPhone[0];
          console.log(`   ✅ Found contact by phone: ${contact.id} - ${contact.first_name} ${contact.last_name}`);
          return contact;
        }
        console.log(`   ❌ No contact found by phone: ${booking.contact.phone_number}`);
      }

      // 3. Search by booking ID in activities (most reliable for existing bookings)
      console.log(`   🔎 Searching by booking ID: ${booking.id}`);
      const { data: activitiesWithBooking } = await supabase
        .from('contact_activities')
        .select('contact_id, contacts(*), id, title, status')
        .eq('tidycal_booking_id', booking.id);
      
      if (activitiesWithBooking && activitiesWithBooking.length > 0) {
        contact = activitiesWithBooking[0].contacts;
        console.log(`   ✅ Found contact by booking ID: ${contact?.id} - ${contact?.first_name} ${contact?.last_name}`);
        console.log(`   📋 Associated activities:`, activitiesWithBooking.map(a => ({ id: a.id, title: a.title, status: a.status })));
        return contact;
      }
      console.log(`   ❌ No contact found by booking ID: ${booking.id}`);

      // 4. Search by name as last resort
      if (booking.contact?.name) {
        console.log(`   🔎 Searching by name: ${booking.contact.name}`);
        const nameParts = booking.contact.name.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');
        
        if (firstName) {
          let nameQuery = `first_name.ilike.%${firstName}%,last_name.ilike.%${firstName}%`;
          if (lastName) {
            nameQuery += `,first_name.ilike.%${lastName}%,last_name.ilike.%${lastName}%`;
          }
          
          const { data: contactsByName } = await supabase
            .from('contacts')
            .select('*')
            .or(nameQuery);
          
          if (contactsByName && contactsByName.length > 0) {
            contact = contactsByName[0];
            console.log(`   ✅ Found contact by name: ${contact.id} - ${contact.first_name} ${contact.last_name}`);
            return contact;
          }
          console.log(`   ❌ No contact found by name: ${booking.contact.name}`);
        }
      }

      console.log(`   ❌ No contact found for booking ${booking.id}`);
      return null;
    }

    // Process each booking
    for (const booking of bookings) {
      try {
        const isCancelled = !!booking.cancelled_at;
        console.log(`\n🔄 Processing booking ${booking.id}:`);
        console.log(`   - Contact: ${booking.contact?.name}`);
        console.log(`   - Starts at: ${booking.starts_at}`);
        console.log(`   - Cancelled: ${isCancelled}`);
        console.log(`   - Cancelled at: ${booking.cancelled_at}`);

        let contactId = null;
        let syncStatus = 'success';
        let errorMessage = null;

        // Handle cancelled bookings (priority flow)
        if (isCancelled) {
          console.log(`❌ Processing CANCELLED booking ${booking.id}`);
          cancelledBookingsFound++;

          const contact = await findContactByBooking(booking);

          if (contact) {
            console.log(`👤 Processing cancellation for contact: ${contact.id} - ${contact.first_name} ${contact.last_name}`);
            contactId = contact.id;

            // 1. Cancel ALL activities linked to this booking ID
            console.log(`📅 Searching for activities to cancel for booking ${booking.id}`);
            const { data: existingActivities } = await supabase
              .from('contact_activities')
              .select('*')
              .eq('tidycal_booking_id', booking.id);

            console.log(`   Found ${existingActivities?.length || 0} activities for booking ${booking.id}`);

            if (existingActivities && existingActivities.length > 0) {
              for (const activity of existingActivities) {
                console.log(`   🔄 Cancelling activity: ${activity.id} - ${activity.title} (current status: ${activity.status})`);
                
                const { error: updateError } = await supabase
                  .from('contact_activities')
                  .update({
                    status: 'cancelled',
                    is_completed: false,
                  })
                  .eq('id', activity.id);

                if (updateError) {
                  console.error(`   ❌ Error updating activity ${activity.id}:`, updateError);
                } else {
                  console.log(`   ✅ Activity ${activity.id} cancelled successfully`);
                }
              }
            } else {
              console.log(`   ⚠️ No activities found for booking ${booking.id}`);
            }

            // 2. Move contact to "Llamada cancelada" stage
            console.log(`🔄 Moving contact ${contact.id} to cancelled stage: ${LLAMADA_CANCELADA_STAGE_ID}`);
            
            const { error: updateContactError } = await supabase
              .from('contacts')
              .update({ 
                stage_id: LLAMADA_CANCELADA_STAGE_ID,
                last_contact_date: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })
              .eq('id', contact.id);

            if (updateContactError) {
              console.error(`   ❌ Error updating contact stage:`, updateContactError);
              syncStatus = 'error';
              errorMessage = `Failed to update contact stage: ${updateContactError.message}`;
            } else {
              console.log(`   ✅ Contact ${contact.id} moved to cancelled stage successfully`);
            }

            // 3. Create cancellation note (without due date)
            console.log(`📝 Creating cancellation note for contact ${contact.id}`);
            const { error: noteError } = await supabase
              .from('contact_activities')
              .insert([{
                contact_id: contact.id,
                activity_type: 'note',
                title: 'Cliente canceló llamada vía TidyCal',
                description: `Booking ID: ${booking.id}\nFecha original: ${new Date(booking.starts_at).toLocaleString('es-ES')}\nCancelado el: ${new Date(booking.cancelled_at).toLocaleString('es-ES')}`,
                status: 'completed',
                is_completed: true,
                completed_at: new Date().toISOString()
              }]);

            if (noteError) {
              console.error(`   ❌ Error creating cancellation note:`, noteError);
            } else {
              console.log(`   ✅ Cancellation note created successfully`);
            }

          } else {
            console.log(`⚠️ Contact not found for cancelled booking ${booking.id}`);
            syncStatus = 'warning';
            errorMessage = 'Contact not found for cancelled booking';
          }

          bookingsProcessed++;
        } else {
          // Handle active bookings
          console.log(`📅 Processing active booking ${booking.id}`);

          // Check if activity already exists to prevent duplicates
          const { data: existingActivity } = await supabase
            .from('contact_activities')
            .select('*')
            .eq('tidycal_booking_id', booking.id)
            .single();

          if (existingActivity) {
            console.log(`⏭️ Activity already exists for booking ${booking.id} - skipping`);
            bookingsSkipped++;
          } else {
            // Find or create contact
            let contact = await findContactByBooking(booking);

            if (!contact) {
              console.log(`👤 Creating new contact for booking ${booking.id}`);
              
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
                console.error(`❌ Error creating contact:`, contactError);
                throw contactError;
              }

              contact = newContact;
              console.log(`✅ New contact created: ${contact.id} - ${contact.first_name} ${contact.last_name}`);
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
            console.log(`📅 Creating activity for active booking ${booking.id}`);
            
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
              console.error(`❌ Error creating activity:`, activityError);
            } else {
              console.log(`✅ Activity created for active booking ${booking.id}`);
            }

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

    console.log('\n🎉 TidyCal polling completed successfully');
    console.log(`📊 Final Results:`);
    console.log(`   - Total bookings found: ${bookings.length}`);
    console.log(`   - Cancelled bookings found: ${cancelledBookingsFound}`);
    console.log(`   - Bookings processed: ${bookingsProcessed}`);
    console.log(`   - Bookings skipped: ${bookingsSkipped}`);
    console.log(`   - Bookings failed: ${bookingsFailed}`);
    console.log(`   - Status: ${finalStatus}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'TidyCal polling completed',
        results: {
          bookings_found: bookings.length,
          cancelled_bookings_found: cancelledBookingsFound,
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
