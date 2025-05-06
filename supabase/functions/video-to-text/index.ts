
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('voice_text_api');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check for OpenAI API key
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Get the form data from the request
    const formData = await req.formData();
    const videoFile = formData.get('video');
    
    if (!videoFile || !(videoFile instanceof File)) {
      throw new Error('No video file provided');
    }
    
    // Extract audio from video using OpenAI Whisper API
    // Note: OpenAI's Whisper can accept video files directly and extract the audio
    const whisperFormData = new FormData();
    whisperFormData.append('file', videoFile);
    whisperFormData.append('model', 'whisper-1');
    
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
      },
      body: whisperFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    
    return new Response(
      JSON.stringify({ text: data.text }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error in video-to-text function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
