
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SENDFOX_API_KEY = Deno.env.get("SENDFOX_API_KEY");
const SENDFOX_API_ENDPOINT = "https://api.sendfox.com/contacts";

interface SubscribeRequest {
  email: string;
}

interface ErrorResponse {
  success: boolean;
  message: string;
}

serve(async (req) => {
  // Enable CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
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
        "Access-Control-Allow-Origin": "*"
      },
      status: 405,
    });
  }

  try {
    // Parse request body
    const { email } = await req.json() as SubscribeRequest;
    
    if (!email) {
      return new Response(JSON.stringify({
        success: false,
        message: "Email is required",
      }), {
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
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
          "Access-Control-Allow-Origin": "*"
        },
        status: 500,
      });
    }

    console.log(`Subscribing email: ${email} to SendFox`);

    // Make request to SendFox API
    const response = await fetch(SENDFOX_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SENDFOX_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        lists: [], // Add your list IDs here if needed
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
            "Access-Control-Allow-Origin": "*"
          },
          status: 200,
        });
      }

      return new Response(JSON.stringify({
        success: false,
        message: "Failed to subscribe",
      }), {
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        status: response.status,
      });
    }

    // Successful subscription
    return new Response(JSON.stringify({
      success: true,
      message: "Successfully subscribed",
    }), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error processing subscription:", error);
    
    return new Response(JSON.stringify({
      success: false,
      message: "Failed to process subscription",
    }), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      status: 500,
    });
  }
});
