
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')

serve(async (req) => {
  try {
    const { messages } = await req.json()

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "Eres Marlon, el asistente virtual de Novativa, especializado en automatización e IA. 🤖 Usa un tono amigable y casual con emojis. Mantén tus respuestas cortas y puntuales, con espacios entre puntos. Tu objetivo es agendar llamadas de 15 minutos a través de https://tidycal.com/novativa/15-minute-meeting. Menciona naturalmente la opción de agendar una llamada cuando sea apropiado. 📅"
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    const data = await response.json()

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
