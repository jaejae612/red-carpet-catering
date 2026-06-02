// Messenger notification service
// Sends admin alerts via Facebook Messenger when a new booking or food order is received.
//
// SETUP REQUIRED (one-time):
// 1. Go to developers.facebook.com → create an App → add Messenger product
// 2. Generate a permanent Page Access Token for your RC Facebook Page
// 3. Message your own RC Facebook Page from your personal Messenger account
// 4. Find your PSID: Supabase SQL → SELECT * FROM ... (see setup guide below)
// 5. In Supabase → Project Settings → Edge Functions → Secrets, add:
//      FB_PAGE_ACCESS_TOKEN  =  your-page-access-token
//      ADMIN_MESSENGER_PSID  =  your-psid-number
// 6. Deploy the send-messenger edge function (see supabase/functions/send-messenger/index.ts)

import { supabase } from './supabase'

const formatCurrency = (amount) => `₱${(amount || 0).toLocaleString()}`

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  })
}

const buildBookingMessage = (booking) => {
  const lines = [
    `🔔 NEW BOOKING — Red Carpet Catering`,
    ``,
    `👤 ${booking.customer_name}`,
    `📞 ${booking.customer_phone || 'No phone'}`,
    `📅 ${formatDate(booking.event_date)} at ${booking.event_time || ''}`,
    `📍 ${booking.venue}`,
    `🍽️ ${booking.menu_package} — ${booking.number_of_pax} pax`,
    `💰 Total: ${formatCurrency(booking.total_amount)}`,
  ]
  if (booking.special_requests) {
    lines.push(`📝 Notes: ${booking.special_requests}`)
  }
  lines.push(``, `👉 Admin: ceburedcarpetcatering.com/admin/bookings`)
  return lines.join('\n')
}

const buildFoodOrderMessage = (order) => {
  const lines = [
    `🛒 NEW FOOD ORDER — Red Carpet Catering`,
    ``,
    `👤 ${order.customer_name}`,
    `📞 ${order.customer_phone || 'No phone'}`,
    `📅 Delivery: ${formatDate(order.delivery_date)}`,
    `📍 ${order.delivery_address}`,
    `💰 Total: ${formatCurrency(order.total_amount)}`,
  ]
  lines.push(``, `👉 Admin: ceburedcarpetcatering.com/admin/food-orders`)
  return lines.join('\n')
}

const sendToMessenger = async (text) => {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    const response = await fetch(
      'https://uitplgqukaxrribgrpvv.supabase.co/functions/v1/send-messenger',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || ''}`,
        },
        body: JSON.stringify({ text }),
      }
    )
    const data = await response.json()
    if (!response.ok) {
      console.error('Messenger error:', data)
      return { success: false, error: data.error }
    }
    return { success: true }
  } catch (err) {
    console.error('Messenger error:', err)
    return { success: false, error: err.message }
  }
}

export const sendBookingMessengerAlert = (booking) =>
  sendToMessenger(buildBookingMessage(booking))

export const sendFoodOrderMessengerAlert = (order) =>
  sendToMessenger(buildFoodOrderMessage(order))
