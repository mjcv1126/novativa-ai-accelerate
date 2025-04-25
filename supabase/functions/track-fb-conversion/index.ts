
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const FB_ACCESS_TOKEN = Deno.env.get('FB_ACCESS_TOKEN')
const PIXEL_ID = Deno.env.get('PIXEL_ID')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
  }

  try {
    const { eventName, eventData } = await req.json()

    if (!FB_ACCESS_TOKEN || !PIXEL_ID) {
      throw new Error('Facebook API credentials not configured')
    }

    const response = await fetch(
      `https://graph.facebook.com/v17.0/${PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [{
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            user_data: eventData.userData || {},
            custom_data: eventData.customData || {},
          }],
          access_token: FB_ACCESS_TOKEN
        })
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Facebook API Error: ${JSON.stringify(error)}`)
    }

    const result = await response.json()
    return new Response(JSON.stringify({ success: true, result }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (error) {
    console.error('Conversion API Error:', error)
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 400,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
})
