
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
    console.log('🚀 TidyCal webhook received:', req.method);

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
    console.log('📦 Webhook payload:', JSON.stringify(payload, null, 2));

    // Extract booking information from the webhook
    const booking = payload.data || payload;
    const { contact, starts_at, ends_at, booking_type, cancelled_at, questions, id: booking_id } = booking;

    if (!contact || !contact.email) {
      console.error('❌ No contact information found in webhook');
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

    console.log('🔍 Searching for contact with email:', contact.email);

    // Search for existing contact by email first, then by phone
    let existingContact = null;
    
    const { data: contactByEmail } = await supabase
      .from('contacts')
      .select('*')
      .eq('email', contact.email)
      .single();

    if (contactByEmail) {
      existingContact = contactByEmail;
      console.log('✅ Found existing contact by email:', existingContact.id);
    } else if (contact.phone_number) {
      // Format phone for search
      const formattedPhone = contact.phone_number.startsWith('+') ? 
        contact.phone_number : `+${contact.phone_number}`;
      
      const { data: contactByPhone } = await supabase
        .from('contacts')
        .select('*')
        .eq('phone', formattedPhone)
        .single();
      
      if (contactByPhone) {
        existingContact = contactByPhone;
        console.log('✅ Found existing contact by phone:', existingContact.id);
      }
    }

    // Get automation rules
    const { data: automationRules } = await supabase
      .from('tidycal_automation_rules')
      .select('*')
      .eq('is_active', true);

    console.log('🔧 Found automation rules:', automationRules?.length || 0);

    // Determine trigger condition and target stage
    const now = new Date();
    const bookingStart = new Date(starts_at);
    let triggerCondition = '';
    let targetStageId = null;

    if (cancelled_at) {
      triggerCondition = 'booking_cancelled';
      console.log('📋 Trigger: Booking cancelled');
      // Get "No Contesta" stage
      const { data: noAnswerStage } = await supabase
        .from('crm_stages')
        .select('id')
        .eq('name', 'No Contesta')
        .eq('is_active', true)
        .single();
      targetStageId = noAnswerStage?.id;
    } else if (existingContact && bookingStart > now) {
      triggerCondition = 'contact_exists_future_call';
      console.log('📋 Trigger: Existing contact + future call');
      // Get "Llamada Programada" stage
      const { data: programmedCallStage } = await supabase
        .from('crm_stages')
        .select('id')
        .eq('name', 'Llamada Programada')
        .eq('is_active', true)
        .single();
      targetStageId = programmedCallStage?.id;
    } else if (existingContact && bookingStart < now) {
      triggerCondition = 'contact_exists_past_call';
      console.log('📋 Trigger: Existing contact + past call');
      // Get "Contactado" stage
      const { data: contactedStage } = await supabase
        .from('crm_stages')
        .select('id')
        .eq('name', 'Contactado')
        .eq('is_active', true)
        .single();
      targetStageId = contactedStage?.id;
    } else if (!existingContact && bookingStart < now) {
      triggerCondition = 'contact_not_exists_past_call';
      console.log('📋 Trigger: New contact + past call');
      // Get "Contactado" stage for new contacts with past calls
      const { data: contactedStage } = await supabase
        .from('crm_stages')
        .select('id')
        .eq('name', 'Contactado')
        .eq('is_active', true)
        .single();
      targetStageId = contactedStage?.id;
    } else if (!existingContact && bookingStart > now) {
      triggerCondition = 'new_contact_future_call';
      console.log('📋 Trigger: New contact + future call');
      // Get "Llamada Programada" stage
      const { data: programmedCallStage } = await supabase
        .from('crm_stages')
        .select('id')
        .eq('name', 'Llamada Programada')
        .eq('is_active', true)
        .single();
      targetStageId = programmedCallStage?.id;
    }

    // If no target stage found, use first stage
    if (!targetStageId) {
      const { data: firstStage } = await supabase
        .from('crm_stages')
        .select('id')
        .eq('is_active', true)
        .order('position')
        .limit(1)
        .single();
      targetStageId = firstStage?.id;
    }

    console.log('🎯 Final trigger condition:', triggerCondition);
    console.log('🎯 Target stage ID:', targetStageId);

    // Extract business info from TidyCal questions
    let businessInfo = '';
    if (questions && questions.length > 0) {
      const businessQuestion = questions.find(q => 
        q.question && (
          q.question.includes('Negocio') || 
          q.question.includes('negocio') ||
          q.question.includes('IA') || 
          q.question.includes('ayudarte') ||
          q.question.includes('ayudar')
        )
      );
      if (businessQuestion && businessQuestion.answer) {
        businessInfo = businessQuestion.answer;
        console.log('💼 Business info extracted:', businessInfo.substring(0, 100) + '...');
      }
    }

    let contactId: string;

    // Create or update contact
    if (!existingContact) {
      console.log('👤 Creating new contact...');
      
      // Parse the name into first and last name
      const nameParts = contact.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Format phone number
      const formattedPhone = contact.phone_number ? 
        (contact.phone_number.startsWith('+') ? contact.phone_number : `+${contact.phone_number}`) : '';

      // Prepare notes with business info
      let notes = `Contacto creado automáticamente desde TidyCal booking #${booking_id || 'N/A'}`;
      if (businessInfo) {
        notes += `\n\nInformación del negocio: ${businessInfo}`;
      }

      // Create new contact
      const { data: newContact, error: createError } = await supabase
        .from('contacts')
        .insert([{
          first_name: firstName,
          last_name: lastName,
          email: contact.email,
          phone: formattedPhone,
          country_code: '', // TidyCal doesn't provide this
          country_name: '', // TidyCal doesn't provide this
          stage_id: targetStageId,
          notes: notes,
          last_contact_date: new Date().toISOString()
        }])
        .select()
        .single();

      if (createError) {
        console.error('❌ Error creating contact:', createError);
        return new Response(
          JSON.stringify({ error: 'Failed to create contact', details: createError }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      contactId = newContact.id;
      console.log('✅ New contact created:', contactId);
    } else {
      // Update existing contact
      contactId = existingContact.id;
      console.log('🔄 Updating existing contact:', contactId);
      
      let updateData: any = {
        stage_id: targetStageId,
        last_contact_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Add business info to notes if available
      if (businessInfo) {
        const currentNotes = existingContact.notes || '';
        updateData.notes = currentNotes + `\n\nActualización TidyCal (${new Date().toLocaleDateString()}): ${businessInfo}`;
      }

      const { error: updateError } = await supabase
        .from('contacts')
        .update(updateData)
        .eq('id', contactId);

      if (updateError) {
        console.error('❌ Error updating contact:', updateError);
      } else {
        console.log('✅ Contact updated successfully');
      }
    }

    // Handle cancellation logic
    if (cancelled_at) {
      console.log('❌ Processing booking cancellation...');
      // Cancel previous activities for this booking
      const { data: previousActivities } = await supabase
        .from('contact_activities')
        .select('*')
        .eq('contact_id', contactId)
        .eq('tidycal_booking_id', booking_id || 0)
        .eq('is_completed', false);

      if (previousActivities && previousActivities.length > 0) {
        for (const activity of previousActivities) {
          await supabase
            .from('contact_activities')
            .update({ 
              is_completed: true,
              status: 'cancelled',
              completed_at: new Date().toISOString(),
              description: `${activity.description}\n\nCancelada automáticamente desde TidyCal`
            })
            .eq('id', activity.id);
        }
        console.log(`✅ Cancelled ${previousActivities.length} previous activities`);
      }
    }

    // Create activity for the booking
    console.log('📅 Creating activity for booking...');
    const startDate = new Date(starts_at);
    const isPast = startDate < now;
    
    let activityData = {
      contact_id: contactId,
      activity_type: cancelled_at ? 'note' : 'call',
      title: cancelled_at ? 'Llamada cancelada desde TidyCal' : `Llamada programada desde TidyCal`,
      description: `Booking ID: ${booking_id || 'N/A'}\nContacto: ${contact.name}\nEmail: ${contact.email}${businessInfo ? `\n\nInfo del negocio: ${businessInfo}` : ''}`,
      tidycal_booking_id: booking_id || 0,
      tidycal_booking_reference: `${booking_id || 'N/A'}`,
      is_completed: cancelled_at || isPast,
      status: cancelled_at ? 'cancelled' : (isPast ? 'completed' : 'pending')
    };

    // Add scheduling info for future calls
    if (!cancelled_at && !isPast) {
      activityData = {
        ...activityData,
        scheduled_date: startDate.toISOString().split('T')[0],
        scheduled_time: startDate.toTimeString().split(' ')[0].substring(0, 5),
        due_date: starts_at
      };
    }

    // Add completion date for past calls
    if (isPast && !cancelled_at) {
      activityData = {
        ...activityData,
        completed_at: new Date().toISOString()
      };
    }

    const { error: activityError } = await supabase
      .from('contact_activities')
      .insert([activityData]);

    if (activityError) {
      console.error('❌ Error creating activity:', activityError);
    } else {
      console.log('✅ Activity created successfully');
    }

    // Store processed booking
    await supabase
      .from('tidycal_processed_bookings')
      .upsert([{
        tidycal_booking_id: booking_id || 0,
        contact_name: contact.name,
        contact_email: contact.email,
        booking_starts_at: starts_at,
        booking_ends_at: ends_at,
        contact_id: contactId,
        sync_status: cancelled_at ? 'cancelled' : 'success'
      }], {
        onConflict: 'tidycal_booking_id'
      });

    // Create stage change activity
    const { data: targetStage } = await supabase
      .from('crm_stages')
      .select('name')
      .eq('id', targetStageId)
      .single();

    const { error: stageActivityError } = await supabase
      .from('contact_activities')
      .insert([{
        contact_id: contactId,
        activity_type: 'status_change',
        title: 'Cambio de etapa automático',
        description: `Contacto movido automáticamente a "${targetStage?.name || 'Etapa desconocida'}" desde TidyCal webhook`,
        is_completed: true,
        tidycal_booking_id: booking_id || 0
      }]);

    if (stageActivityError) {
      console.error('❌ Error creating stage change activity:', stageActivityError);
    } else {
      console.log('✅ Stage change activity created');
    }

    console.log('🎉 TidyCal webhook processed successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Booking processed successfully',
        contact_id: contactId,
        trigger_condition: triggerCondition,
        target_stage: targetStage?.name,
        business_info_extracted: !!businessInfo
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('💥 Error processing TidyCal webhook:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
