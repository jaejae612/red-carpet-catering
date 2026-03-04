// SMS notification service using Supabase Edge Function + Semaphore (PH SMS Gateway)
// Setup required:
// 1. Sign up at semaphore.co and get an API key
// 2. Deploy the send-sms edge function to Supabase
// 3. Add SEMAPHORE_API_KEY to Supabase secrets: supabase secrets set SEMAPHORE_API_KEY=your_key

import { supabase } from './supabase'
import { formatDate, formatTime, formatCurrency } from './emailService'

export const sendSMS = async ({ to, message }) => {
  if (!to || !message) {
    return { success: false, error: 'Missing phone number or message' }
  }

  // Clean phone number: remove spaces, dashes, ensure format
  const cleanPhone = to.replace(/[\s\-()]/g, '')

  try {
    const { data: { session } } = await supabase.auth.getSession()

    const response = await fetch(`${supabase.supabaseUrl}/functions/v1/send-sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token || ''}`,
      },
      body: JSON.stringify({ to: cleanPhone, message })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('SMS error:', data)
      return { success: false, error: data.error || 'Failed to send SMS' }
    }

    return { success: true, data }
  } catch (error) {
    console.error('SMS error:', error)
    return { success: false, error: error.message }
  }
}

// SMS Templates
export const smsTemplates = {
  bookingReminder: (booking) => {
    const daysUntil = Math.ceil((new Date(booking.event_date) - new Date()) / (1000 * 60 * 60 * 24))
    return `[Red Carpet Catering] Reminder: Your event is in ${daysUntil} day(s) on ${booking.event_date} at ${booking.venue}. ${booking.number_of_pax} pax - ${formatCurrency(booking.total_amount)}. For questions call 0917-187-6510.`
  },

  bookingConfirmation: (booking) => {
    return `[Red Carpet Catering] Booking confirmed! ${booking.event_date} at ${booking.venue}, ${booking.number_of_pax} pax. Total: ${formatCurrency(booking.total_amount)}. Ref: #${booking.id?.slice(0, 8).toUpperCase()}`
  },

  paymentReceived: (booking, amount) => {
    return `[Red Carpet Catering] Payment of ${formatCurrency(amount)} received for booking #${booking.id?.slice(0, 8).toUpperCase()}. Thank you!`
  },

  foodOrderUpdate: (order, status) => {
    const statusMsg = {
      confirmed: 'Your order has been confirmed',
      preparing: 'Your order is being prepared',
      ready: 'Your order is ready for pickup/delivery',
      delivered: 'Your order has been delivered'
    }
    return `[Red Carpet Catering] ${statusMsg[status] || `Order status: ${status}`}. Order #${order.id?.slice(0, 8).toUpperCase()}. Total: ${formatCurrency(order.total_amount)}`
  }
}

// Send booking reminder SMS
export const sendBookingReminderSMS = async (booking) => {
  if (!booking.customer_phone) return { success: false, error: 'No phone number' }
  return await sendSMS({
    to: booking.customer_phone,
    message: smsTemplates.bookingReminder(booking)
  })
}

// Send booking confirmation SMS
export const sendBookingConfirmationSMS = async (booking) => {
  if (!booking.customer_phone) return { success: false, error: 'No phone number' }
  return await sendSMS({
    to: booking.customer_phone,
    message: smsTemplates.bookingConfirmation(booking)
  })
}
