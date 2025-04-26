
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
const ASSISTANT_ID = "asst_0n98mnqxf4SiqOHMDvv5Jbbs"

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, threadId } = await req.json()
    console.log('Request received:', { message, threadId, assistantId: ASSISTANT_ID })

    // Create headers with OpenAI API key
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "OpenAI-Beta": "assistants=v1"
    }

    let currentThreadId = threadId

    // If no thread exists, create a new one
    if (!currentThreadId) {
      console.log('Creating new thread...')
      const threadResponse = await fetch("https://api.openai.com/v1/threads", {
        method: "POST",
        headers,
        body: JSON.stringify({})
      })

      if (!threadResponse.ok) {
        const errorData = await threadResponse.json()
        console.error('Error creating thread:', errorData)
        throw new Error(`Failed to create thread: ${threadResponse.status}: ${JSON.stringify(errorData)}`)
      }

      const threadData = await threadResponse.json()
      currentThreadId = threadData.id
      console.log("Created new thread:", currentThreadId)
    } else {
      console.log("Using existing thread:", currentThreadId)
    }

    // Add the user message to the thread
    console.log('Adding message to thread...')
    const messageResponse = await fetch(
      `https://api.openai.com/v1/threads/${currentThreadId}/messages`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          role: "user",
          content: message
        })
      }
    )

    if (!messageResponse.ok) {
      const errorData = await messageResponse.json()
      console.error('Error adding message:', errorData)
      throw new Error(`Failed to add message: ${messageResponse.status}: ${JSON.stringify(errorData)}`)
    }
    console.log('Message added successfully')

    // Run the assistant
    console.log('Running assistant...')
    const runResponse = await fetch(
      `https://api.openai.com/v1/threads/${currentThreadId}/runs`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          assistant_id: ASSISTANT_ID
        })
      }
    )

    if (!runResponse.ok) {
      const errorData = await runResponse.json()
      console.error('Error running assistant:', errorData)
      throw new Error(`Failed to run assistant: ${runResponse.status}: ${JSON.stringify(errorData)}`)
    }

    const runData = await runResponse.json()
    let runId = runData.id
    let runStatus = runData.status
    console.log("Run created with ID:", runId, "Status:", runStatus)

    // Poll for completion
    while (runStatus === "queued" || runStatus === "in_progress") {
      // Wait for a short period before polling again
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log("Checking run status...")
      const runCheckResponse = await fetch(
        `https://api.openai.com/v1/threads/${currentThreadId}/runs/${runId}`,
        {
          headers
        }
      )

      if (!runCheckResponse.ok) {
        const errorData = await runCheckResponse.json()
        console.error('Error checking run status:', errorData)
        throw new Error(`Failed to check run status: ${runCheckResponse.status}: ${JSON.stringify(errorData)}`)
      }

      const runCheckData = await runCheckResponse.json()
      runStatus = runCheckData.status
      console.log("Current run status:", runStatus)

      if (runStatus === "failed" || runStatus === "cancelled" || runStatus === "expired") {
        throw new Error(`Run ended with status: ${runStatus}`)
      }
    }

    // Get the latest messages
    console.log("Run completed. Fetching messages...")
    const messagesResponse = await fetch(
      `https://api.openai.com/v1/threads/${currentThreadId}/messages`,
      {
        headers
      }
    )

    if (!messagesResponse.ok) {
      const errorData = await messagesResponse.json()
      console.error('Error retrieving messages:', errorData)
      throw new Error(`Failed to retrieve messages: ${messagesResponse.status}: ${JSON.stringify(errorData)}`)
    }

    const messagesData = await messagesResponse.json()
    
    // Get the most recent assistant message
    const assistantMessage = messagesData.data
      .filter(msg => msg.role === "assistant")
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]

    if (!assistantMessage) {
      throw new Error("No assistant message found")
    }

    const responseContent = assistantMessage.content[0].text.value
    console.log("Responding with assistant message:", responseContent.substring(0, 50) + "...")

    return new Response(
      JSON.stringify({
        message: responseContent,
        threadId: currentThreadId
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      }
    )
  } catch (error) {
    console.error("Error:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500
      }
    )
  }
})
