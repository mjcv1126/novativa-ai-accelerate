
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const SENDFOX_API_KEY = Deno.env.get('SENDFOX_API_KEY')
const SENDFOX_LIST_ID = '1'

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
    const { email } = await req.json()

    const response = await fetch('https://api.sendfox.com/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SENDFOX_API_KEY}`
      },
      body: JSON.stringify({
        email,
        lists: [SENDFOX_LIST_ID]
      })
    })

    if (!response.ok) {
      throw new Error('Error en SendFox API')
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
