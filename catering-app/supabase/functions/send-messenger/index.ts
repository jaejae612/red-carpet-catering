// Supabase Edge Function: send-messenger
// Sends a Facebook Messenger message to the admin PSID using the Page Send API.
//
// Required Supabase secrets:
//   FB_PAGE_ACCESS_TOKEN  — permanent Page Access Token from your RC Facebook Page
//   ADMIN_MESSENGER_PSID  — your personal Messenger PSID (get it by messaging the Page)

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
    const { text } = await req.json()

    if (!text) {
      return new Response(
        JSON.stringify({ error: 'Missing text' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const pageToken = Deno.env.get('FB_PAGE_ACCESS_TOKEN')
    const adminPsid = Deno.env.get('ADMIN_MESSENGER_PSID')

    if (!pageToken || !adminPsid) {
      return new Response(
        JSON.stringify({ error: 'FB_PAGE_ACCESS_TOKEN or ADMIN_MESSENGER_PSID not set in secrets' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const fbResponse = await fetch(
      `https://graph.facebook.com/v19.0/me/messages?access_token=${pageToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: { id: adminPsid },
          message: { text },
          messaging_type: 'MESSAGE_TAG',
          tag: 'CONFIRMED_EVENT_UPDATE',
        }),
      }
    )

    const fbData = await fbResponse.json()

    if (!fbResponse.ok) {
      console.error('Facebook API error:', fbData)
      return new Response(
        JSON.stringify({ error: fbData.error?.message || 'Facebook API error' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, message_id: fbData.message_id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('Edge function error:', err)
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
