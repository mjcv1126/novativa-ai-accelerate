
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Helper function to format dates for TidyCal API (without milliseconds)
function formatDateForTidyCal(date: Date): string {
  return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...params } = await req.json();
    const tidyCalToken = Deno.env.get('Tidycal_Token');
    
    console.log('🔍 TidyCal API called with action:', action);
    console.log('📝 Token configured:', tidyCalToken ? 'Yes' : 'No');
    
    if (!tidyCalToken) {
      console.error('❌ TidyCal token not configured');
      return new Response(
        JSON.stringify({ 
          error: { 
            message: 'TidyCal token not configured',
            code: 'MISSING_TOKEN'
          } 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const headers = {
      'Authorization': `Bearer ${tidyCalToken}`,
      'Content-Type': 'application/json',
    };

    let response;

    switch (action) {
      case 'get_bookings':
        let { starts_at, ends_at, cancelled } = params;
        
        // Format dates properly for TidyCal (without milliseconds)
        if (starts_at) {
          const startDate = new Date(starts_at);
          starts_at = formatDateForTidyCal(startDate);
          console.log('📅 Formatted starts_at:', starts_at);
        }
        
        if (ends_at) {
          const endDate = new Date(ends_at);
          ends_at = formatDateForTidyCal(endDate);
          console.log('📅 Formatted ends_at:', ends_at);
        }
        
        console.log('📅 Fetching bookings from:', starts_at, 'to:', ends_at);
        
        let url = 'https://tidycal.com/api/bookings';
        const queryParams = new URLSearchParams();
        
        if (starts_at) queryParams.append('starts_at', starts_at);
        if (ends_at) queryParams.append('ends_at', ends_at);
        if (cancelled !== undefined) queryParams.append('cancelled', cancelled.toString());
        
        if (queryParams.toString()) {
          url += `?${queryParams.toString()}`;
        }

        console.log('🌐 Making request to:', url);
        console.log('🔗 Query parameters:', queryParams.toString());
        response = await fetch(url, { headers });
        break;

      case 'get_booking':
        const { booking_id } = params;
        console.log('📋 Fetching booking:', booking_id);
        response = await fetch(`https://tidycal.com/api/bookings/${booking_id}`, { headers });
        break;

      case 'sync_booking':
        const bookingId = params.booking_id;
        console.log('🔄 Syncing booking:', bookingId);
        
        // Get booking details from TidyCal
        const bookingResponse = await fetch(`https://tidycal.com/api/bookings/${bookingId}`, { headers });
        
        if (!bookingResponse.ok) {
          const errorText = await bookingResponse.text();
          console.error('❌ Failed to fetch booking:', bookingResponse.status, errorText);
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
          const errorText = await webhookResponse.text();
          console.error('❌ Failed to process booking:', webhookResponse.status, errorText);
          throw new Error(`Failed to process booking: ${webhookResponse.statusText}`);
        }

        console.log('✅ Booking synced successfully');
        return new Response(
          JSON.stringify({ success: true, message: 'Booking synced successfully' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      default:
        console.error('❌ Unknown action:', action);
        throw new Error(`Unknown action: ${action}`);
    }

    console.log('📊 TidyCal API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ TidyCal API error:', response.status, response.statusText, errorText);
      
      // Handle specific error codes
      if (response.status === 401) {
        return new Response(
          JSON.stringify({ 
            error: { 
              message: 'Token de TidyCal no autorizado. Verifica que el token tenga permisos de lectura para bookings.',
              code: 'UNAUTHORIZED',
              status: 401
            } 
          }),
          { 
            status: 401, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      // Handle 422 validation errors with specific message
      if (response.status === 422) {
        let errorDetails;
        try {
          errorDetails = JSON.parse(errorText);
        } catch (e) {
          errorDetails = { message: errorText };
        }
        
        return new Response(
          JSON.stringify({ 
            error: { 
              message: `Error de validación en TidyCal: ${errorDetails.message || 'Formato de datos incorrecto'}`,
              code: 'VALIDATION_ERROR',
              status: 422,
              details: errorDetails
            } 
          }),
          { 
            status: 422, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          error: { 
            message: `TidyCal API error: ${response.status} ${response.statusText}`,
            code: 'API_ERROR',
            status: response.status,
            details: errorText
          } 
        }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    console.log('✅ TidyCal API success, returning', data?.data?.length || 0, 'items');
    
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('💥 TidyCal API error:', error);
    return new Response(
      JSON.stringify({ 
        error: { 
          message: error.message,
          code: 'INTERNAL_ERROR'
        } 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
