
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
    console.log('TidyCal webhook received:', req.method);

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const payload = await req.json();
    console.log('Webhook payload:', JSON.stringify(payload, null, 2));

    // Extract booking information from the webhook
    const booking = payload.data || payload;
    const { contact, starts_at, ends_at, booking_type, cancelled_at } = booking;

    if (!contact || !contact.email) {
      console.error('No contact information found in webhook');
      return new Response(
        JSON.stringify({ error: 'No contact information found' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Search for existing contact by email or phone
    let existingContact = null;
    
    const { data: contactByEmail } = await supabase
      .from('contacts')
      .select('*')
      .eq('email', contact.email)
      .single();

    if (contactByEmail) {
      existingContact = contactByEmail;
    } else if (contact.phone_number) {
      const { data: contactByPhone } = await supabase
        .from('contacts')
        .select('*')
        .eq('phone', contact.phone_number)
        .single();
      
      if (contactByPhone) {
        existingContact = contactByPhone;
      }
    }

    // Determine the appropriate stage based on booking status
    const now = new Date();
    const bookingStart = new Date(starts_at);
    let targetStage = null;
    let activityTitle = '';
    let activityDescription = '';
    let shouldCancelPreviousActivity = false;

    if (cancelled_at) {
      // Booking was cancelled - move to "No Contesta" (position 4)
      const { data: noAnswerStage } = await supabase
        .from('crm_stages')
        .select('*')
        .eq('position', 4)
        .eq('is_active', true)
        .single();
      
      targetStage = noAnswerStage;
      activityTitle = 'Llamada Cancelada';
      activityDescription = `Llamada cancelada en TidyCal\nBooking ID: ${booking.id}\nFecha original: ${new Date(starts_at).toLocaleString('es-ES')}`;
      shouldCancelPreviousActivity = true;
    } else if (bookingStart < now && !existingContact) {
      // Past booking and contact doesn't exist - move to "Contactado" (position 3)
      const { data: contactedStage } = await supabase
        .from('crm_stages')
        .select('*')
        .eq('position', 3)
        .eq('is_active', true)
        .single();
      
      targetStage = contactedStage;
      activityTitle = 'Llamada Completada';
      activityDescription = `Llamada completada exitosamente\nBooking ID: ${booking.id}\nDuración: ${booking_type?.duration_minutes || 'N/A'} minutos`;
    } else if (bookingStart < now && existingContact) {
      // Past booking but contact exists - don't take action
      console.log('Contact already exists and booking is past, no action needed');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'No action needed - contact exists and booking is past',
          contact_id: existingContact.id
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    } else {
      // Future booking - move to "Llamada Programada" (position 2)
      const { data: scheduledStage } = await supabase
        .from('crm_stages')
        .select('*')
        .eq('position', 2)
        .eq('is_active', true)
        .single();
      
      targetStage = scheduledStage;
      activityTitle = `Llamada programada - ${booking_type?.title || 'TidyCal Booking'}`;
      activityDescription = `Llamada programada a través de TidyCal\nBooking ID: ${booking.id}\nDuración: ${booking_type?.duration_minutes || 'N/A'} minutos\nTimezone: ${contact.timezone || 'N/A'}`;
      shouldCancelPreviousActivity = true; // Cancel previous if this is a reschedule
    }

    // Create contact if it doesn't exist
    if (!existingContact) {
      console.log('No existing contact found, creating new one');
      
      // Parse the name into first and last name
      const nameParts = contact.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Get the first stage if no target stage is set
      if (!targetStage) {
        const { data: firstStage } = await supabase
          .from('crm_stages')
          .select('*')
          .eq('position', 1)
          .eq('is_active', true)
          .single();

        targetStage = firstStage;
      }

      // Create new contact
      const { data: newContact, error: createError } = await supabase
        .from('contacts')
        .insert([{
          first_name: firstName,
          last_name: lastName,
          email: contact.email,
          phone: contact.phone_number || '',
          country_code: '', // TidyCal doesn't provide this
          country_name: '', // TidyCal doesn't provide this
          stage_id: targetStage?.id || null,
          notes: `Contacto creado automáticamente desde TidyCal booking #${booking.id}`
        }])
        .select()
        .single();

      if (createError) {
        console.error('Error creating contact:', createError);
        return new Response(
          JSON.stringify({ error: 'Failed to create contact', details: createError }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      existingContact = newContact;
    } else if (targetStage) {
      // Update existing contact stage only if target stage is set
      const { error: updateError } = await supabase
        .from('contacts')
        .update({ 
          stage_id: targetStage.id,
          last_contact_date: new Date().toISOString()
        })
        .eq('id', existingContact.id);

      if (updateError) {
        console.error('Error updating contact stage:', updateError);
        return new Response(
          JSON.stringify({ error: 'Failed to update contact stage', details: updateError }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    }

    console.log('Working with contact:', existingContact.id);

    // Cancel previous call activities if needed (for cancellations or reschedules)
    if (shouldCancelPreviousActivity) {
      const { data: previousActivities } = await supabase
        .from('contact_activities')
        .select('*')
        .eq('contact_id', existingContact.id)
        .eq('activity_type', 'call')
        .eq('is_completed', false);

      if (previousActivities && previousActivities.length > 0) {
        for (const activity of previousActivities) {
          await supabase
            .from('contact_activities')
            .update({ 
              is_completed: true,
              completed_at: new Date().toISOString(),
              title: 'Llamada Cancelada',
              description: `${activity.description}\n\nCancelada debido a ${cancelled_at ? 'cancelación' : 'reprogramación'} en TidyCal`
            })
            .eq('id', activity.id);
        }
      }
    }

    // Create appropriate activity only if not a past booking with existing contact
    if (!(bookingStart < now && existingContact && !cancelled_at)) {
      // Check for duplicate activities before creating
      const startDate = new Date(starts_at);
      const { data: duplicateCheck } = await supabase
        .from('contact_activities')
        .select('*')
        .eq('contact_id', existingContact.id)
        .eq('activity_type', cancelled_at ? 'note' : 'call')
        .eq('scheduled_date', startDate.toISOString().split('T')[0])
        .eq('scheduled_time', startDate.toTimeString().split(' ')[0].substring(0, 5));

      if (!duplicateCheck || duplicateCheck.length === 0) {
        if (cancelled_at) {
          // For cancelled bookings, create a note activity
          const { error: activityError } = await supabase
            .from('contact_activities')
            .insert([{
              contact_id: existingContact.id,
              activity_type: 'note',
              title: activityTitle,
              description: activityDescription,
              is_completed: true
            }]);

          if (activityError) {
            console.error('Error creating cancellation note:', activityError);
          }
        } else if (bookingStart < now) {
          // For completed calls, create a completed call activity
          const { error: activityError } = await supabase
            .from('contact_activities')
            .insert([{
              contact_id: existingContact.id,
              activity_type: 'call',
              title: activityTitle,
              description: activityDescription,
              is_completed: true,
              completed_at: new Date().toISOString()
            }]);

          if (activityError) {
            console.error('Error creating completed call activity:', activityError);
          }
        } else {
          // For future calls, create a scheduled call activity
          const startDate = new Date(starts_at);
          
          const { error: activityError } = await supabase
            .from('contact_activities')
            .insert([{
              contact_id: existingContact.id,
              activity_type: 'call',
              title: activityTitle,
              description: activityDescription,
              scheduled_date: startDate.toISOString().split('T')[0],
              scheduled_time: startDate.toTimeString().split(' ')[0].substring(0, 5),
              is_completed: false
            }]);

          if (activityError) {
            console.error('Error creating scheduled call activity:', activityError);
          }
        }
      } else {
        console.log('Duplicate activity found, skipping creation');
      }
    }

    // Create stage change activity if stage was updated
    if (targetStage) {
      const { error: stageActivityError } = await supabase
        .from('contact_activities')
        .insert([{
          contact_id: existingContact.id,
          activity_type: 'status_change',
          title: 'Cambio de etapa automático',
          description: `Contacto movido automáticamente a "${targetStage.name}" por ${cancelled_at ? 'cancelación de' : bookingStart < now ? 'finalización de' : ''} booking de TidyCal`,
          is_completed: true
        }]);

      if (stageActivityError) {
        console.error('Error creating stage change activity:', stageActivityError);
      }
    }

    console.log('TidyCal webhook processed successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Booking processed successfully',
        contact_id: existingContact.id,
        stage: targetStage?.name || 'No cambio de etapa',
        action: cancelled_at ? 'cancelled' : bookingStart < now ? 'completed' : 'scheduled'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error processing TidyCal webhook:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
