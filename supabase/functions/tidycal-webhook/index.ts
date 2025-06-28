
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
    const { contact, starts_at, ends_at, booking_type } = booking;

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

    if (!existingContact) {
      console.log('No existing contact found, creating new one');
      
      // Parse the name into first and last name
      const nameParts = contact.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Create new contact if not found
      const { data: newContact, error: createError } = await supabase
        .from('contacts')
        .insert([{
          first_name: firstName,
          last_name: lastName,
          email: contact.email,
          phone: contact.phone_number || '',
          country_code: '', // TidyCal doesn't provide this
          country_name: '', // TidyCal doesn't provide this
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
    }

    console.log('Working with contact:', existingContact.id);

    // Find stage #2 "Llamada Programada"
    const { data: stage, error: stageError } = await supabase
      .from('crm_stages')
      .select('*')
      .eq('position', 2)
      .eq('is_active', true)
      .single();

    if (stageError || !stage) {
      console.error('Stage #2 not found:', stageError);
      // Try to find any stage with "llamada" or "programada" in the name
      const { data: fallbackStage } = await supabase
        .from('crm_stages')
        .select('*')
        .ilike('name', '%llamada%')
        .eq('is_active', true)
        .single();
      
      if (!fallbackStage) {
        console.error('No suitable stage found for "Llamada Programada"');
        return new Response(
          JSON.stringify({ error: 'Stage "Llamada Programada" not found' }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    }

    const targetStage = stage || fallbackStage;

    // Update contact to stage #2
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

    console.log('Contact updated to stage:', targetStage.name);

    // Create call activity with TidyCal booking details
    const startDate = new Date(starts_at);
    const endDate = new Date(ends_at);
    
    const { error: activityError } = await supabase
      .from('contact_activities')
      .insert([{
        contact_id: existingContact.id,
        activity_type: 'call',
        title: `Llamada programada - ${booking_type?.title || 'TidyCal Booking'}`,
        description: `Llamada programada a través de TidyCal\nBooking ID: ${booking.id}\nDuración: ${booking_type?.duration_minutes || 'N/A'} minutos\nTimezone: ${contact.timezone || 'N/A'}`,
        scheduled_date: startDate.toISOString().split('T')[0],
        scheduled_time: startDate.toTimeString().split(' ')[0].substring(0, 5),
        is_completed: false
      }]);

    if (activityError) {
      console.error('Error creating activity:', activityError);
      return new Response(
        JSON.stringify({ error: 'Failed to create activity', details: activityError }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Call activity created successfully');

    // Create stage change activity
    const { error: stageActivityError } = await supabase
      .from('contact_activities')
      .insert([{
        contact_id: existingContact.id,
        activity_type: 'status_change',
        title: 'Cambio de etapa automático',
        description: `Contacto movido automáticamente a "${targetStage.name}" por booking de TidyCal`,
        is_completed: true
      }]);

    if (stageActivityError) {
      console.error('Error creating stage change activity:', stageActivityError);
    }

    console.log('TidyCal webhook processed successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Booking processed successfully',
        contact_id: existingContact.id,
        stage: targetStage.name
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
