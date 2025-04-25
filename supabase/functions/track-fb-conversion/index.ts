
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const FB_ACCESS_TOKEN = Deno.env.get('FB_ACCESS_TOKEN')
const PIXEL_ID = 'TU_PIXEL_ID' // Reemplaza con tu Pixel ID

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
            ...eventData
          }],
          access_token: FB_ACCESS_TOKEN
        })
      }
    )

    if (!response.ok) {
      throw new Error('Error en Facebook Conversion API')
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})
