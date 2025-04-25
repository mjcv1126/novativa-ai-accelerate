
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
const ASSISTANT_ID = "asst_0n98mnqxf4SiqOHMDvv5Jbbs"

serve(async (req) => {
  try {
    const { message, threadId } = await req.json()

    // Create headers with OpenAI API key
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "OpenAI-Beta": "assistants=v1"
    }

    let currentThreadId = threadId

    // If no thread exists, create a new one
    if (!currentThreadId) {
      const threadResponse = await fetch("https://api.openai.com/v1/threads", {
        method: "POST",
        headers,
        body: JSON.stringify({})
      })

      if (!threadResponse.ok) {
        throw new Error(`Failed to create thread: ${threadResponse.status}`)
      }

      const threadData = await threadResponse.json()
      currentThreadId = threadData.id
      console.log("Created new thread:", currentThreadId)
    }

    // Add the user message to the thread
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
      throw new Error(`Failed to add message: ${messageResponse.status}`)
    }

    // Run the assistant
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
      throw new Error(`Failed to run assistant: ${runResponse.status}`)
    }

    const runData = await runResponse.json()
    let runId = runData.id
    let runStatus = runData.status

    // Poll for completion
    while (runStatus === "queued" || runStatus === "in_progress") {
      // Wait for a short period before polling again
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const runCheckResponse = await fetch(
        `https://api.openai.com/v1/threads/${currentThreadId}/runs/${runId}`,
        {
          headers
        }
      )

      if (!runCheckResponse.ok) {
        throw new Error(`Failed to check run status: ${runCheckResponse.status}`)
      }

      const runCheckData = await runCheckResponse.json()
      runStatus = runCheckData.status

      if (runStatus === "failed" || runStatus === "cancelled" || runStatus === "expired") {
        throw new Error(`Run ended with status: ${runStatus}`)
      }
    }

    // Get the latest messages
    const messagesResponse = await fetch(
      `https://api.openai.com/v1/threads/${currentThreadId}/messages`,
      {
        headers
      }
    )

    if (!messagesResponse.ok) {
      throw new Error(`Failed to retrieve messages: ${messagesResponse.status}`)
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

    return new Response(
      JSON.stringify({
        message: responseContent,
        threadId: currentThreadId
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200
      }
    )
  } catch (error) {
    console.error("Error:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500
      }
    )
  }
})
