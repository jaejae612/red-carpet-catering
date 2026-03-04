// Supabase Edge Function for sending SMS via Semaphore (PH SMS Gateway)
// Deploy: supabase functions deploy send-sms
// Set secret: supabase secrets set SEMAPHORE_API_KEY=your_key_here

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const SEMAPHORE_API_KEY = Deno.env.get('SEMAPHORE_API_KEY')
    if (!SEMAPHORE_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'SEMAPHORE_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { to, message } = await req.json()

    if (!to || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing "to" or "message" field' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Send via Semaphore API
    const response = await fetch('https://api.semaphore.co/api/v4/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apikey: SEMAPHORE_API_KEY,
        number: to,
        message: message,
        sendername: 'REDCARPET'  // Register sender name in Semaphore dashboard
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Semaphore error:', data)
      return new Response(
        JSON.stringify({ error: 'Failed to send SMS', details: data }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('SMS error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
