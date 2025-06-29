
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
    const { contact, starts_at, ends_at, booking_type, cancelled_at, questions } = booking;

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

    // Get active automation rules
    const { data: automationRules } = await supabase
      .from('tidycal_automation_rules')
      .select('*')
      .eq('is_active', true);

    console.log('Found automation rules:', automationRules?.length || 0);

    // Determine trigger condition
    const now = new Date();
    const bookingStart = new Date(starts_at);
    let triggerCondition = '';

    if (cancelled_at) {
      triggerCondition = 'booking_cancelled';
    } else if (payload.event === 'booking.rescheduled') {
      triggerCondition = 'booking_rescheduled';
    } else if (existingContact && bookingStart > now) {
      triggerCondition = 'contact_exists_future_call';
    } else if (existingContact && bookingStart < now) {
      triggerCondition = 'contact_exists_past_call';
    } else if (!existingContact && bookingStart < now) {
      triggerCondition = 'contact_not_exists_past_call';
    } else if (!existingContact && bookingStart > now) {
      triggerCondition = 'new_contact_future_call';
    }

    console.log('Trigger condition determined:', triggerCondition);

    // Find matching automation rule
    const matchingRule = automationRules?.find(rule => rule.trigger_condition === triggerCondition);
    
    if (!matchingRule) {
      console.log('No matching automation rule found for trigger:', triggerCondition);
    } else {
      console.log('Using automation rule:', matchingRule.name);
    }

    // Extract business info from TidyCal questions
    let businessInfo = '';
    if (questions && questions.length > 0) {
      const businessQuestion = questions.find(q => 
        q.question.includes('Negocio') || q.question.includes('IA') || q.question.includes('ayudarte')
      );
      if (businessQuestion) {
        businessInfo = businessQuestion.answer;
      }
    }

    // Create or update contact
    if (!existingContact) {
      console.log('No existing contact found, creating new one');
      
      // Parse the name into first and last name
      const nameParts = contact.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Get target stage from rule or default
      let targetStageId = null;
      if (matchingRule && matchingRule.target_stage_id) {
        targetStageId = matchingRule.target_stage_id;
      } else {
        // Default to first stage
        const { data: firstStage } = await supabase
          .from('crm_stages')
          .select('id')
          .eq('position', 1)
          .eq('is_active', true)
          .single();
        targetStageId = firstStage?.id;
      }

      // Prepare notes with business info
      let notes = `Contacto creado automáticamente desde TidyCal booking #${booking.id}`;
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
          phone: contact.phone_number || '',
          country_code: '', // TidyCal doesn't provide this
          country_name: '', // TidyCal doesn't provide this
          stage_id: targetStageId,
          notes: notes
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
    } else if (matchingRule) {
      // Update existing contact
      let updateData: any = {};
      
      if (matchingRule.target_stage_id) {
        updateData.stage_id = matchingRule.target_stage_id;
      }
      
      updateData.last_contact_date = new Date().toISOString();
      
      // Add business info to notes if available
      if (businessInfo && matchingRule.contact_action === 'update') {
        const currentNotes = existingContact.notes || '';
        updateData.notes = currentNotes + `\n\nActualización TidyCal: ${businessInfo}`;
      }

      if (Object.keys(updateData).length > 0) {
        const { error: updateError } = await supabase
          .from('contacts')
          .update(updateData)
          .eq('id', existingContact.id);

        if (updateError) {
          console.error('Error updating contact:', updateError);
        }
      }
    }

    console.log('Working with contact:', existingContact.id);

    // Handle cancellation logic
    if (triggerCondition === 'booking_cancelled' && matchingRule?.cancel_previous_activity) {
      // Cancel previous activities for this booking
      const { data: previousActivities } = await supabase
        .from('contact_activities')
        .select('*')
        .eq('contact_id', existingContact.id)
        .eq('tidycal_booking_id', booking.id)
        .eq('is_completed', false);

      if (previousActivities && previousActivities.length > 0) {
        for (const activity of previousActivities) {
          await supabase
            .from('contact_activities')
            .update({ 
              is_completed: true,
              status: 'cancelled',
              completed_at: new Date().toISOString(),
              description: `${activity.description}\n\nCancelada automáticamente: ${matchingRule.name}`
            })
            .eq('id', activity.id);
        }
        console.log(`Cancelled ${previousActivities.length} previous activities`);
      }
    }

    // Handle rescheduled bookings
    if (triggerCondition === 'booking_rescheduled') {
      // Update existing activities for this booking
      const { data: existingActivities } = await supabase
        .from('contact_activities')
        .select('*')
        .eq('contact_id', existingContact.id)
        .eq('tidycal_booking_id', booking.id);

      if (existingActivities && existingActivities.length > 0) {
        const startDate = new Date(starts_at);
        
        for (const activity of existingActivities) {
          await supabase
            .from('contact_activities')
            .update({
              scheduled_date: startDate.toISOString().split('T')[0],
              scheduled_time: startDate.toTimeString().split(' ')[0].substring(0, 5),
              due_date: starts_at,
              description: `${activity.description}\n\nReprogramada automáticamente: ${matchingRule?.name || 'Sistema'}`
            })
            .eq('id', activity.id);
        }
        console.log(`Updated ${existingActivities.length} rescheduled activities`);
      }
    }

    // Create activity if rule specifies it
    if (matchingRule && matchingRule.create_activity && triggerCondition !== 'booking_rescheduled') {
      const startDate = new Date(starts_at);
      
      let activityData = {
        contact_id: existingContact.id,
        activity_type: cancelled_at ? 'note' : 'call',
        title: matchingRule.activity_title || 'Actividad TidyCal',
        description: matchingRule.activity_description || `Booking ID: ${booking.id}`,
        tidycal_booking_id: booking.id,
        tidycal_booking_reference: `${booking.id}`,
        is_completed: cancelled_at || bookingStart < now,
        status: cancelled_at ? 'cancelled' : (bookingStart < now ? 'completed' : 'pending')
      };

      // Add scheduling info for future calls
      if (!cancelled_at && bookingStart > now) {
        activityData = {
          ...activityData,
          scheduled_date: startDate.toISOString().split('T')[0],
          scheduled_time: startDate.toTimeString().split(' ')[0].substring(0, 5),
          due_date: starts_at
        };
      }

      // Add completion date for past calls
      if (bookingStart < now && !cancelled_at) {
        activityData = {
          ...activityData,
          completed_at: new Date().toISOString()
        };
      }

      const { error: activityError } = await supabase
        .from('contact_activities')
        .insert([activityData]);

      if (activityError) {
        console.error('Error creating activity:', activityError);
      } else {
        console.log('Activity created successfully');
      }
    }

    // Log rule execution
    if (matchingRule) {
      await supabase
        .from('tidycal_rule_executions')
        .insert([{
          rule_id: matchingRule.id,
          tidycal_booking_id: booking.id,
          contact_id: existingContact.id,
          execution_result: 'success',
          error_message: null
        }]);
    }

    // Create stage change activity if stage was updated
    if (matchingRule && matchingRule.target_stage_id) {
      const { data: targetStage } = await supabase
        .from('crm_stages')
        .select('name')
        .eq('id', matchingRule.target_stage_id)
        .single();

      const { error: stageActivityError } = await supabase
        .from('contact_activities')
        .insert([{
          contact_id: existingContact.id,
          activity_type: 'status_change',
          title: 'Cambio de etapa automático',
          description: `Contacto movido automáticamente a "${targetStage?.name || 'Etapa desconocida'}" por regla: ${matchingRule.name}`,
          is_completed: true,
          tidycal_booking_id: booking.id
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
        rule_applied: matchingRule?.name || 'No rule matched',
        trigger_condition: triggerCondition
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
