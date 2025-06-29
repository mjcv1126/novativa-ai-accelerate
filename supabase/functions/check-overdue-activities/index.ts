
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🕐 Checking for overdue activities...');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const now = new Date();
    
    // Find overdue follow-up activities that are not completed
    const { data: overdueActivities, error: fetchError } = await supabase
      .from('contact_activities')
      .select('*')
      .eq('title', 'Seguimiento')
      .eq('is_completed', false)
      .lt('due_date', now.toISOString());

    if (fetchError) {
      console.error('❌ Error fetching overdue activities:', fetchError);
      throw fetchError;
    }

    console.log(`📋 Found ${overdueActivities?.length || 0} overdue activities`);

    let processedCount = 0;
    
    if (overdueActivities && overdueActivities.length > 0) {
      for (const activity of overdueActivities) {
        try {
          // Step 1: Close the overdue activity
          await supabase
            .from('contact_activities')
            .update({
              is_completed: true,
              status: 'cancelled',
              completed_at: now.toISOString(),
              description: `${activity.description}\n\nActividad cerrada automáticamente por vencimiento (${now.toLocaleDateString()})`
            })
            .eq('id', activity.id);

          // Step 2: Move contact to the final stage
          await supabase
            .from('contacts')
            .update({
              stage_id: '550fa40f-fff9-4043-a478-fc10b00ae87b',
              last_contact_date: now.toISOString()
            })
            .eq('id', activity.contact_id);

          // Step 3: Create stage change activity
          await supabase
            .from('contact_activities')
            .insert([{
              contact_id: activity.contact_id,
              activity_type: 'status_change',
              title: 'Movido por actividad vencida',
              description: 'Contacto movido automáticamente por vencimiento de actividad de seguimiento. No se completó el seguimiento en tiempo.',
              is_completed: true,
              completed_at: now.toISOString()
            }]);

          processedCount++;
          console.log(`✅ Processed overdue activity for contact: ${activity.contact_id}`);
          
        } catch (activityError) {
          console.error(`❌ Error processing activity ${activity.id}:`, activityError);
        }
      }
    }

    console.log(`🎉 Processed ${processedCount} overdue activities`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Processed ${processedCount} overdue activities`,
        total_found: overdueActivities?.length || 0,
        processed: processedCount
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('💥 Error checking overdue activities:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
