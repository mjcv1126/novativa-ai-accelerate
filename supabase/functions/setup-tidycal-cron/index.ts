
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
    console.log('🔧 Setting up TidyCal cron job');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // First, unschedule any existing TidyCal polling jobs
    console.log('🧹 Cleaning up existing cron jobs');
    
    const { error: unscheduleError } = await supabase.rpc('cron_unschedule', {
      job_name: 'tidycal-polling-every-15-minutes'
    });

    if (unscheduleError && !unscheduleError.message.includes('does not exist')) {
      console.error('Error unscheduling existing job:', unscheduleError);
    }

    // Schedule new cron job to run every 15 minutes
    console.log('⏰ Scheduling new cron job for TidyCal polling');
    
    const cronQuery = `
      SELECT cron.schedule(
        'tidycal-polling-every-15-minutes',
        '*/15 * * * *', -- Every 15 minutes
        $$
        SELECT
          net.http_post(
            url:='${supabaseUrl}/functions/v1/tidycal-polling',
            headers:='{"Content-Type": "application/json", "Authorization": "Bearer ${supabaseAnonKey}"}'::jsonb,
            body:='{"scheduled": true}'::jsonb
          ) as request_id;
        $$
      );
    `;

    const { error: scheduleError } = await supabase.rpc('exec_sql', {
      sql: cronQuery
    });

    if (scheduleError) {
      console.error('Error scheduling cron job:', scheduleError);
      throw scheduleError;
    }

    console.log('✅ TidyCal cron job setup completed successfully');

    // Also trigger an immediate polling to test
    console.log('🧪 Triggering immediate test polling');
    
    const testResponse = await fetch(`${supabaseUrl}/functions/v1/tidycal-polling`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({ test: true })
    });

    const testResult = await testResponse.json();
    console.log('🧪 Test polling result:', testResult);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'TidyCal cron job setup completed successfully',
        cron_schedule: '*/15 * * * * (every 15 minutes)',
        test_result: testResult
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('💥 Error setting up TidyCal cron job:', error);
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
