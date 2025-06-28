
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
    const { action, ...params } = await req.json();
    const tidyCalToken = Deno.env.get('Tidycal_Token');
    
    if (!tidyCalToken) {
      throw new Error('TidyCal token not configured');
    }

    const headers = {
      'Authorization': `Bearer ${tidyCalToken}`,
      'Content-Type': 'application/json',
    };

    let response;

    switch (action) {
      case 'get_bookings':
        const { starts_at, ends_at, cancelled } = params;
        let url = 'https://tidycal.com/api/bookings';
        const queryParams = new URLSearchParams();
        
        if (starts_at) queryParams.append('starts_at', starts_at);
        if (ends_at) queryParams.append('ends_at', ends_at);
        if (cancelled !== undefined) queryParams.append('cancelled', cancelled.toString());
        
        if (queryParams.toString()) {
          url += `?${queryParams.toString()}`;
        }

        response = await fetch(url, { headers });
        break;

      case 'get_booking':
        const { booking_id } = params;
        response = await fetch(`https://tidycal.com/api/bookings/${booking_id}`, { headers });
        break;

      case 'sync_booking':
        const bookingId = params.booking_id;
        
        // Get booking details from TidyCal
        const bookingResponse = await fetch(`https://tidycal.com/api/bookings/${bookingId}`, { headers });
        
        if (!bookingResponse.ok) {
          throw new Error(`Failed to fetch booking: ${bookingResponse.statusText}`);
        }

        const booking = await bookingResponse.json();
        
        // Process the booking using our webhook logic
        const webhookResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/tidycal-webhook`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
          },
          body: JSON.stringify(booking)
        });

        if (!webhookResponse.ok) {
          throw new Error(`Failed to process booking: ${webhookResponse.statusText}`);
        }

        return new Response(
          JSON.stringify({ success: true, message: 'Booking synced successfully' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    if (!response.ok) {
      throw new Error(`TidyCal API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('TidyCal API error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
