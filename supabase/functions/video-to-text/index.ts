
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('voice_text_api');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Function to convert base64 to blob
async function base64ToBlob(base64: string, contentType: string, fileName: string): Promise<File> {
  // Decode base64 string
  const binary = atob(base64);
  
  // Create byte array
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  // Create blob and convert it to a file
  const blob = new Blob([bytes], { type: contentType });
  const file = new File([blob], fileName, { type: contentType });
  
  return file;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check for OpenAI API key
    if (!openAIApiKey) {
      console.error('API key not configured');
      throw new Error('OpenAI API key not configured');
    }

    // Get data from the request
    const requestData = await req.json();
    const { videoBase64, fileName } = requestData;
    
    if (!videoBase64) {
      console.error('No video data provided');
      throw new Error('No video data provided');
    }
    
    console.log(`Processing video file: ${fileName}`);
    
    // Determine content type based on file extension
    let contentType = 'video/mp4'; // Default
    if (fileName) {
      const extension = fileName.split('.').pop()?.toLowerCase();
      if (extension === 'mov') contentType = 'video/quicktime';
      else if (extension === 'avi') contentType = 'video/x-msvideo';
      else if (extension === 'wmv') contentType = 'video/x-ms-wmv';
    }
    
    // Convert base64 to file
    const videoFile = await base64ToBlob(videoBase64, contentType, fileName || 'video.mp4');
    
    // Create FormData for OpenAI API
    const whisperFormData = new FormData();
    whisperFormData.append('file', videoFile);
    whisperFormData.append('model', 'whisper-1');
    
    console.log('Sending request to OpenAI API');
    
    // Send request to OpenAI API
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
    console.log('Successfully got transcription');
    
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
