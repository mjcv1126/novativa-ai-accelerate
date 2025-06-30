
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
    const payload = await req.json();
    console.log('📝 TidyCal Webhook payload:', JSON.stringify(payload, null, 2));

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const LLAMADA_PROGRAMADA_STAGE_ID = 'b9b4d1b9-461e-4fac-bebd-e3af2d527a97';
    const LLAMADA_CANCELADA_STAGE_ID = '7af3eb42-610b-4861-9429-85119b1d2693';

    // Handle booking created
    if (payload.event === 'booking.created') {
      const booking = payload.data;
      console.log('📅 Processing booking created:', booking.id);

      // Check if contact already exists
      const { data: existingContact } = await supabase
        .from('contacts')
        .select('*')
        .eq('email', booking.contact?.email)
        .single();

      let contactId: string;

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

      // Create activity
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

      console.log('✅ Successfully processed booking created');
    }

    // Handle booking cancelled
    if (payload.event === 'booking.cancelled') {
      const booking = payload.data;
      console.log('❌ Processing booking cancelled:', booking.id);

      // Find the contact by email
      const { data: contact } = await supabase
        .from('contacts')
        .select('*')
        .eq('email', booking.contact?.email)
        .single();

      if (contact) {
        console.log('👤 Found contact for cancelled booking:', contact.id);

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
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('💥 Webhook error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Webhook processing failed',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
