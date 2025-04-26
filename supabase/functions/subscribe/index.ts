
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SENDFOX_API_KEY = Deno.env.get("SENDFOX_API_KEY");
const SENDFOX_API_ENDPOINT = "https://api.sendfox.com/contacts";

interface SubscribeRequest {
  email: string;
  listId?: number;
}

interface ErrorResponse {
  success: boolean;
  message: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
};

serve(async (req) => {
  // Enable CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  // Only accept POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ 
      success: false, 
      message: "Method not allowed" 
    }), {
      headers: { 
        "Content-Type": "application/json",
        ...corsHeaders
      },
      status: 405,
    });
  }

  try {
    console.log("Processing subscription request");
    
    // Parse request body
    let email;
    let listId;
    try {
      const body = await req.json();
      email = body.email;
      listId = body.listId || 254803; // Default to Novati list if not provided
      console.log(`Email received: ${email}, List ID: ${listId}`);
    } catch (e) {
      console.error("Failed to parse request body:", e);
      return new Response(JSON.stringify({
        success: false,
        message: "Invalid request body",
      }), {
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        },
        status: 400,
      });
    }
    
    if (!email) {
      console.error("Email is required");
      return new Response(JSON.stringify({
        success: false,
        message: "Email is required",
      }), {
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        },
        status: 400,
      });
    }

    // Verify SendFox API key exists
    if (!SENDFOX_API_KEY) {
      console.error("SendFox API key not found");
      return new Response(JSON.stringify({
        success: false,
        message: "Server configuration error",
      }), {
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        },
        status: 500,
      });
    }

    console.log(`Subscribing email: ${email} to SendFox list: ${listId}`);

    // Make request to SendFox API
    const response = await fetch(SENDFOX_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SENDFOX_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        lists: [listId], // Add the specified list ID
      }),
    });

    const data = await response.json();
    console.log("SendFox API response:", data);

    if (!response.ok) {
      console.error("SendFox API error:", data);
      
      // Check if email already exists (common error)
      if (data.errors?.email?.includes("has already been taken")) {
        return new Response(JSON.stringify({
          success: true,
          message: "Email already subscribed",
        }), {
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders
          },
          status: 200,
        });
      }

      return new Response(JSON.stringify({
        success: false,
        message: "Failed to subscribe",
        error: data.errors || data.message || "Unknown error",
      }), {
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        },
        status: 400,
      });
    }

    // Successful subscription
    return new Response(JSON.stringify({
      success: true,
      message: "Successfully subscribed",
    }), {
      headers: { 
        "Content-Type": "application/json",
        ...corsHeaders
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error processing subscription:", error);
    
    return new Response(JSON.stringify({
      success: false,
      message: "Failed to process subscription",
      error: error instanceof Error ? error.message : String(error),
    }), {
      headers: { 
        "Content-Type": "application/json",
        ...corsHeaders
      },
      status: 500,
    });
  }
});
