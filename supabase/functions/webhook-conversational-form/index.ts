import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-webhook-secret',
}

// Validation schema for incoming leads
const leadSchema = z.object({
  first_name: z.string().trim().min(1).max(100),
  last_name: z.string().trim().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().regex(/^\+?[0-9\s\-()]{7,20}$/, 'Invalid phone number format'),
  country_code: z.string().max(10).optional(),
  country_name: z.string().max(100).optional(),
  services_of_interest: z.string().max(500).optional(),
  investment_budget: z.string().max(200).optional(),
  submission_datetime: z.string().optional()
})

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify webhook secret
    const webhookSecret = Deno.env.get('WEBHOOK_SECRET');
    const providedSecret = req.headers.get('x-webhook-secret');
    
    if (webhookSecret && providedSecret !== webhookSecret) {
      console.error('❌ Invalid webhook secret');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }), 
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('📨 Webhook received from Make.com:', req.method)

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }), 
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const body = await req.json()
    console.log('📋 Webhook payload received')

    // Extract and normalize lead data
    const rawLeadData = {
      first_name: body.first_name || body.firstName || body.nombre || '',
      last_name: body.last_name || body.lastName || body.apellido || '',
      email: body.email || body.correo || '',
      phone: body.phone || body.telefono || body.whatsapp || '',
      country_code: body.country_code || body.codigo_pais || extractCountryCode(body.phone || ''),
      country_name: body.country_name || body.pais || 'Honduras',
      services_of_interest: body.services_of_interest || body.servicios || body.asunto || '',
      investment_budget: body.investment_budget || body.presupuesto || body.inversion || 'Cuento con presupuesto inicial',
      submission_datetime: body.submission_datetime || body.fecha || new Date().toISOString()
    }

    // Validate with zod schema
    let validatedData;
    try {
      validatedData = leadSchema.parse(rawLeadData);
    } catch (validationError) {
      console.error('❌ Validation failed:', validationError);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid data format',
          details: validationError.errors 
        }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('✅ Data validated successfully')

    // Insert lead into database
    const { data, error } = await supabase
      .from('conversational_form_leads')
      .insert([validatedData])
      .select()

    if (error) {
      console.error('❌ Database error:', error)
      return new Response(
        JSON.stringify({ error: 'Database error', details: error.message }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('✅ Lead saved successfully')

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Lead saved successfully',
        data: data[0]
      }), 
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('❌ Webhook error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

// Helper function to extract country code from phone number
function extractCountryCode(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '')
  
  // Common country codes
  if (cleanPhone.startsWith('504')) return '504' // Honduras
  if (cleanPhone.startsWith('506')) return '506' // Costa Rica
  if (cleanPhone.startsWith('502')) return '502' // Guatemala
  if (cleanPhone.startsWith('503')) return '503' // El Salvador
  if (cleanPhone.startsWith('507')) return '507' // Panamá
  if (cleanPhone.startsWith('505')) return '505' // Nicaragua
  if (cleanPhone.startsWith('57')) return '57'   // Colombia
  if (cleanPhone.startsWith('52')) return '52'   // México
  if (cleanPhone.startsWith('1')) return '1'     // USA/Canada
  
  // Default to Honduras if can't determine
  return '504'
}