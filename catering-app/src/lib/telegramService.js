// Telegram notification service
// Sends admin alerts via Telegram Bot when a new booking or food order is received.
//
// SETUP REQUIRED (one-time):
// 1. Open Telegram → search @BotFather → send /newbot → follow prompts → copy the bot token
// 2. Start a chat with your new bot (send it any message)
// 3. Visit: https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
//    Find your chat ID in the JSON response under result[0].message.chat.id
// 4. In Supabase → Project Settings → Edge Functions → Secrets, add:
//      TELEGRAM_BOT_TOKEN      = your-bot-token
//      TELEGRAM_ADMIN_CHAT_ID  = your-chat-id
// 5. Deploy the send-telegram edge function:
//      npx supabase functions deploy send-telegram --project-ref uitplgqukaxrribgrpvv

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
    `🔔 <b>NEW BOOKING — Red Carpet Catering</b>`,
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
    `🛒 <b>NEW FOOD ORDER — Red Carpet Catering</b>`,
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

const sendToTelegram = async (text) => {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    const response = await fetch(
      'https://uitplgqukaxrribgrpvv.supabase.co/functions/v1/send-telegram',
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
      console.error('Telegram error:', data)
      return { success: false, error: data.error }
    }
    return { success: true }
  } catch (err) {
    console.error('Telegram error:', err)
    return { success: false, error: err.message }
  }
}

export const sendBookingTelegramAlert = (booking) =>
  sendToTelegram(buildBookingMessage(booking))

export const sendFoodOrderTelegramAlert = (order) =>
  sendToTelegram(buildFoodOrderMessage(order))
