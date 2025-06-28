
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
    console.log('🔧 Setting up TidyCal cron job...');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Enable pg_cron and pg_net extensions if not already enabled
    try {
      await supabase.rpc('exec', { 
        sql: 'CREATE EXTENSION IF NOT EXISTS pg_cron;' 
      });
      await supabase.rpc('exec', { 
        sql: 'CREATE EXTENSION IF NOT EXISTS pg_net;' 
      });
      console.log('✅ Extensions enabled');
    } catch (error) {
      console.log('Extensions may already be enabled or need manual setup:', error);
    }

    // Remove existing cron job if exists
    try {
      const { error: deleteError } = await supabase
        .from('cron.job')
        .delete()
        .eq('jobname', 'tidycal-sync');

      if (deleteError && !deleteError.message.includes('does not exist')) {
        console.error('Error removing existing cron job:', deleteError);
      }
    } catch (error) {
      console.log('No existing cron job to remove or cron not available');
    }

    // Create new cron job to run every minute
    const cronJobSQL = `
      SELECT cron.schedule(
        'tidycal-sync',
        '* * * * *', -- every minute
        $$
        SELECT
          net.http_post(
              url:='${supabaseUrl}/functions/v1/tidycal-polling',
              headers:='{"Content-Type": "application/json", "Authorization": "Bearer ${supabaseAnonKey}"}'::jsonb,
              body:=concat('{"triggered_at": "', now(), '"}')::jsonb
          ) as request_id;
        $$
      );
    `;

    try {
      const { data, error } = await supabase.rpc('exec', { 
        sql: cronJobSQL 
      });

      if (error) {
        console.error('Error creating cron job:', error);
        throw error;
      }

      console.log('✅ Cron job created successfully:', data);
    } catch (error) {
      console.error('Failed to create cron job. This may need to be done manually:', error);
      
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Cron job setup failed - may need manual configuration',
          manual_setup_instructions: {
            sql: cronJobSQL,
            note: 'Run this SQL manually in your Supabase SQL editor if cron setup fails'
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🎉 TidyCal cron job setup completed successfully');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'TidyCal sync cron job configured to run every minute',
        schedule: 'Every minute (* * * * *)',
        function_url: `${supabaseUrl}/functions/v1/tidycal-polling`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('💥 Cron setup error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        note: 'Manual cron setup may be required in Supabase dashboard'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
