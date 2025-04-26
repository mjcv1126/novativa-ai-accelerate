
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const SENDFOX_API_KEY = Deno.env.get('SENDFOX_API_KEY')
const SENDFOX_LIST_ID = '1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    })
  }

  try {
    const { email } = await req.json()

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email es requerido' }), 
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          } 
        }
      )
    }

    if (!SENDFOX_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'API key no configurada' }), 
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          } 
        }
      )
    }

    console.log(`Enviando suscripción para: ${email}`)

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

    const responseData = await response.json()
    
    if (!response.ok) {
      console.error('Error en SendFox API:', responseData)
      throw new Error(`Error en SendFox API: ${JSON.stringify(responseData)}`)
    }

    console.log('Suscripción exitosa:', responseData)

    return new Response(
      JSON.stringify({ success: true, data: responseData }), 
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    )
  } catch (error) {
    console.error('Error en función subscribe:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 400, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    )
  }
})
